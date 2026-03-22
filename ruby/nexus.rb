# frozen_string_literal: true

# nexus.rb - Orchestrator
require_relative 'translator'
require_relative 'distiller'

def process_input(input, context = {})
  footprint = translate(input, context)
  if footprint[:noise]
    { stored: false, reason: 'noise', original: footprint[:original] }
  elsif footprint[:memory_chunks].is_a?(Array)
    { stored: true, distilled: distill(footprint[:memory_chunks]), meta: footprint }
  else
    { stored: true, footprint: footprint }
  end
end

module_function :process_input
