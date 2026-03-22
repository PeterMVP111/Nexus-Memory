'use strict';

const { translate } = require('./translator.js');
const { distill }   = require('./distiller.js');

function processInput(input, context = {}) {
    const footprint = translate(input, context);

    if (footprint.noise === true) {
        return { stored: false, reason: 'noise', original: footprint.original };
    }

    // TODO: distillation of memory chunks — pending implementation
    // when translator generates chunked output, route through distill() here

    return { stored: true, footprint };
}

module.exports = { processInput };