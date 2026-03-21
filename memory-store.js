// Updated memory-store.js with new methods and removed getAnotherValue
// New methods: hasEssence and getAllKeys

class MemoryStore {
    constructor() {
        this.store = {};
    }

    // Checks if the essence exists in the store
    hasEssence(key) {
        return this.store.hasOwnProperty(key);
    }

    // Retrieve all keys from the store
    getAllKeys() {
        return Object.keys(this.store);
    }

    // Other existing methods...
    // Removed getAnotherValue method
}

module.exports = MemoryStore;