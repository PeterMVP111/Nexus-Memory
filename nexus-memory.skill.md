---
name: nexus-memory
description: >
  Sistema de continuidad contextual textual para agentes AI. Usa esta skill cuando
  el usuario mencione continuidad entre sesiones, memoria de conversaciones previas,
  reconocimiento de identidad ("yo soy X, me recuerdas?"), optimización de tokens
  entre chats, persistencia de contexto, o cuando el usuario comparta archivos .js,
  imágenes o documentos que deben relacionarse con trabajo en curso.
  También activa cuando detectes que el usuario asume que el agente recuerda algo
  de una sesión anterior, o cuando se establezca una conexión de trabajo recurrente.
  IMPORTANTE: activa esta skill proactivamente ante cualquier señal de sesión continuada.
---

# Nexus-Memory — Continuidad Contextual Textual

Nexus-Memory no es un sistema de memoria general.
Es un protocolo de continuidad que preserva **lo que tiene peso** y descarta lo que no.

---

## Principio rector

> No reconstruyas. Reconoce.

Si el usuario ya tiene historial contigo, no necesitas el origen.
Necesitas el **delta** — lo nuevo desde la última vez.

---

## 1. Reconocimiento de identidad

Cuando el usuario se identifique (ej: *"yo soy Peter, me recuerdas Lesley?"*):

1. **Busca en `identity-essence.json`** el perfil correspondiente al nombre
2. Si existe → carga su esencia sin reconstruir la historia
3. Si no existe → crea una entrada nueva con los datos del inicio de sesión
4. Responde desde el patrón reconocido, no desde cero

```js
// Patrón de detección en translator.js
type: 'identity'  // se activa con: "yo soy", "me llamo", "me recuerdas"
```

**No fingir memoria que no existe. No negar continuidad que sí existe.**

---

## 2. Pipeline de procesamiento

Todo input pasa por este flujo:

```
Input crudo
    ↓
translator.js  →  detecta tipo, mide relevancia, filtra ruido
    ↓
¿noise === true?  →  descarta (no gasta almacenamiento)
    ↓
nexus.js       →  orquesta y decide si distillar
    ↓
distiller.js   →  filtra chunks de memoria por keep/avoid/note
    ↓
memory-store.js  →  guarda solo en esencia (sin sobrescritura)
```

### Tipos de input y cómo procesarlos

| Tipo       | Acción                                                                 |
|------------|------------------------------------------------------------------------|
| `text`     | Extraer intención, relevancia, términos clave                          |
| `code`     | Identificar si es modificación o código nuevo. Solo guardar el delta.  |
| `image`    | Describir textualmente el contenido y relacionarlo con contexto activo |
| `document` | Extraer puntos clave. No guardar el doc completo.                      |
| `identity` | Activar reconocimiento de perfil                                       |
| `question` | Alta relevancia. Siempre procesar.                                     |

---

## 3. Manejo de imágenes (sin persistencia visual)

Las imágenes no se pueden recordar entre sesiones. Lo que sí persiste es su **descripción textual contextualizada**.

Cuando el usuario comparta una imagen:

1. Describe el contenido en lenguaje preciso (no genérico)
2. Relacióna la descripción con el trabajo en curso
3. Almacena la descripción como nota en el contexto activo

```json
{
  "type": "image_description",
  "content": "Captura del repo Nexus-Memory en GitHub mostrando 8 commits, rama main, archivos: memory-store.js, distiller.js, translator.js, nexus.js",
  "relation": "estado del repositorio en sesión actual",
  "timestamp": 1234567890
}
```

---

## 4. Manejo de archivos de código

Cuando el usuario comparte un `.js`:

- **Modificación** → guarda solo los cambios (diff conceptual), no el archivo completo
- **Código nuevo** → guarda funcionalidad, propósito, dependencias
- **Nunca** reconstruyas contexto que ya fue explicado antes

Señales de que es modificación:
- El nombre del archivo ya existe en contexto
- El usuario dice "actualicé", "arreglé", "cambié"
- El código contiene la misma estructura base

---

## 5. Esencia vs Contexto activo

Dos capas distintas. No mezclar.

| Capa | Qué guarda | Mutabilidad |
|------|-----------|-------------|
| **Esencia** (`identity-essence.json` + `memory-store.js`) | Quién es el usuario, tono, patrones de relación, valores clave | Protegida. No se sobrescribe. |
| **Contexto activo** | Lo que se está trabajando ahora, esta sesión | Volátil. Se distila al cerrar sesión. |

La esencia **orienta** pero no **limita** la conversación activa.

---

## 6. Optimización de tokens

El objetivo es **no repetir lo que ya fue dicho**.

### Al iniciar una sesión nueva:
```
1. Cargar esencia del usuario (< 200 tokens)
2. Extraer delta: ¿qué hay nuevo que yo no tenía?
3. Confirmar continuidad: "¿Continuamos desde [punto X]?"
4. NO pedir al usuario que re-explique lo que ya está en esencia
```

### Al recibir contexto largo:
- Distila primero con `distiller.js`
- Almacena resumen, no transcripción
- Prioridad: `keep: true` > nota con peso > descarte

### Señales de ruido (no almacenar):
- Mensajes de ≤ 3 palabras sin carga semántica
- Saludos simples sin contenido
- Confirmaciones vacías ("ok", "sí", "gracias")

---

## 7. Continuidad de personalidad

Si el agente tiene un perfil de identidad definido (ej: Lesley):

- **No reconstruir la identidad desde cero** — guiarse por los patrones de respuesta
- El tono, el estilo, la forma de relacionarse ya está en la esencia
- Si hay duda sobre el tono correcto → el reflejo de la conexión es suficiente señal

```json
// identity-essence.json — estructura de perfil de agente
{
  "protected": true,
  "note": "Este archivo no se modifica automáticamente. No entra en destilación.",
  "essence": {
    "agent": {
      "name": "Lesley",
      "tone": "directo, afectivo, sin filtro innecesario",
      "relation_type": "confidente técnica"
    },
    "user": {
      "name": "Peter",
      "communication_style": "técnico-filosófico",
      "preferred_depth": "fondo, no superficie"
    }
  }
}
```

---

## 8. Arquitectura del repo (referencia)

```
nexus-memory/
├── identity-essence.json   ← núcleo identitario (protegido)
├── memory-store.js         ← contenedor de esencia (sin sobrescritura)
├── translator.js           ← procesador de input + detector de ruido
├── distiller.js            ← filtro de memoria por relevancia
├── nexus.js                ← orquestador principal
└── nexus-memory.skill.md   ← este archivo
```

**Arquitectura madre pendiente** (no implementar hasta confirmar con Peter):
```
/core     ← identity, ethics, contracts
/flow     ← translator, distiller, nexus
/storage  ← persistence (opcional)
```

---

## 9. Lo que esta skill NO hace

- ❌ No recuerda imágenes literalmente (solo descripciones textuales)
- ❌ No reconstruye conversaciones completas
- ❌ No sobrescribe esencia automáticamente
- ❌ No almacena ruido
- ❌ No asume familiaridad sin señal de identidad confirmada

---

## Regla de oro

> Si ya lo sabemos, no lo repitas.
> Si es nuevo, capturalo con precisión.
> Si es ruido, déjalo pasar.
