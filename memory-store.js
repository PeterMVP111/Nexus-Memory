'use strict';

/**
 * MemoryStore class for managing essence and safe reads.
 * This class provides methods to save essence without overwriting existing data, 
 * and ensures that all getter methods return null instead of undefined.
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

    // Additional getter methods can be added here, all returning null instead of undefined
    // Example: 
    getAnotherValue(key) {
        return this.store.hasOwnProperty(key) ? this.store[key] : null;
    }
}

module.exports = MemoryStore;
