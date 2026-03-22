# frozen_string_literal: true

# MemoryStore — Identity Essence Container
# Stores formational data that must not be altered automatically.
# This store does not participate in reasoning or context expansion.
# Enter with intention. Nothing here is overwritten by accident.
class MemoryStore
  def initialize
    @store = {}
  end

  def save_essence(key, value)
    if @store.key?(key)
      warn "Essence for key '#{key}' already exists. Overwrite prevented."
      return
    end
    @store[key] = value
  end

  def get_essence(key)
    @store.key?(key) ? @store[key] : nil
  end

  def all_keys
    @store.keys
  end

  def has_essence?(key)
    @store.key?(key)
  end
end
