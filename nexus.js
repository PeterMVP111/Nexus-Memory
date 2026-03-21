import { translate } from './translator.js';
import { distill } from './distiller.js';

export function processInput(input, type) {
    const footprint = translate(input, type);
    if (footprint.noise === true) {
        return distill(footprint);
    }
    return footprint;
}