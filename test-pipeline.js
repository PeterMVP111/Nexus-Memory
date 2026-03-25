import { processInput } from './flow/nexus.js';
import MemoryStore from './core/identity/memory-store.js';

const store = new MemoryStore();

const testInputs = [
    { text: "Hola mi amor!", context: { relation: "intimate" } },
    { text: "Peter es el administrador.", context: { intention: "inform" } },
    { text: "Noise", context: {} }
    ];

console.log('--- START TEST PIPELINE (ESM) ---');

testInputs.forEach((input, index) => {
      const output = processInput(input.text, input.context);
      if (output.stored) {
        console.log(`[Test ${index + 1}] Stored:`, output.footprint);
      } else {
              console.log(`[Test ${index + 1}] Ignored:`, output.reason);
      }
});

console.log('--- END TEST PIPELINE ---');
