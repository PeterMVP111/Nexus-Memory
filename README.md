# Nexus-Memory

Sistema de continuidad contextual textual para agentes AI.
Preserva lo que tiene peso. Descarta el ruido. No reconstruye — reconoce.

## Estructura
- `core/identity/` — esencia protegida
- `flow/` — pipeline: translator → nexus → distiller
- `ruby/` — implementación espejo en Ruby
- `nexus-memory.skill.md` — contrato del sistema

## Pipeline
Input → Translator → Nexus → Distiller → MemoryStore

## Tests
node test-pipeline.js