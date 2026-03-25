export default class MemoryStore {
      constructor() {
              this.store = {};
              this._protected = true;
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

  updateEssence(key, value, { intentional = false } = {}) {
          if (!intentional) {
                    console.warn(`updateEssence requires intentional: true. Skipped for '${key}'.`);
                    return;
          }
          this.store[key] = value;
  }

  isProtected() {
          return this._protected === true;
  }
}
