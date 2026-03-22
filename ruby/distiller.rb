# distiller.rb - Noise Filter
def distill(memory_data)
  return [] unless memory_data.is_a?(Array)
  memory_data.select do |item|
    next true  if item[:keep] == true
    next false if item[:avoid] == true
    item[:note] && !item[:note].strip.empty?
  end
end
