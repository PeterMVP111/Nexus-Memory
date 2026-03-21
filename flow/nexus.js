'use strict';

const { translate } = require('./translator.js');
const { distill }   = require('./distiller.js');

function processInput(input, context = {}) {
    const footprint = translate(input, context);

    if (footprint.noise === true) {
        return { stored: false, reason: 'noise', original: footprint.original };
    }

    if (Array.isArray(footprint.memoryChunks)) {
        return {
            stored: true,
            distilled: distill(footprint.memoryChunks),
            meta: footprint,
        };
    }

    return { stored: true, footprint };
}

module.exports = { processInput };