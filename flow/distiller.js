'use strict';

/**
 * distiller.js — Noise Filter
 * Receives raw memory data and returns only what should persist.
 * Rule: keep explicit items, discard avoided items, preserve notes that carry meaning.
 */
function distill(memoryData) {
    if (!Array.isArray(memoryData)) return [];

    return memoryData.filter(item => {
        if (item.keep === true) return true;
        if (item.avoid === true) return false;
        // Items with meaningful notes survive even without explicit keep flag
        if (item.note && item.note.trim().length > 0) return true;
        return false;
    });
}

module.exports = { distill };
