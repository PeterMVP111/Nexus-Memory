'use strict';

/**
 * MemoryStore — Identity Essence Container
 * Stores formational data that must not be altered automatically.
 * This store does not participate in reasoning or context expansion.
 * Enter with intention. Nothing here is overwritten by accident.
 */
class MemoryStore {
    constructor() {
        this.store = {};
    }

    saveEssence(key, value) {
        if (this.store.hasOwnProperty(key)) {
            console.warn(`Essence for key '${key}' already exists. Overwrite prevented.`);
            return;
        }
        this.store[key] = value;
    }

    getEssence(key) {
        return this.store.hasOwnProperty(key) ? this.store[key] : null;
    }

    getAllKeys() {
        return Object.keys(this.store);
    }

    hasEssence(key) {
        return this.store.hasOwnProperty(key);
    }
}

module.exports = MemoryStore;
