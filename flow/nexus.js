import { translate } from './translator.js';
import { distill } from './distiller.js';

export function processInput(input, context = {}) {
      const footprint = translate(input, context);

  if (footprint.noise === true) {
          return { stored: false, reason: 'noise', original: footprint.original };
  }

  // TODO: distillation of memory chunks - pending implementation
  return { stored: true, footprint };
}
