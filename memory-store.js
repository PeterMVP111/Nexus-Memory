// memory-store.js

class MemoryStore {
    constructor() {
        this.active = {};
        this.distilled = {};
        this.essence = {};
    }

    saveActive(key, value) {
        this.active[key] = value;
    }

    saveDistilled(key, value) {
        this.distilled[key] = value;
    }

    saveEssence(key, value) {
        this.essence[key] = value;
    }

    getActive(key) {
        return this.active[key];
    }

    getDistilled(key) {
        return this.distilled[key];
    }

    getEssence(key) {
        return this.essence[key];
    }
}

module.exports = MemoryStore;