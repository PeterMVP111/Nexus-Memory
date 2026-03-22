# frozen_string_literal: true

# translator.rb - Input Processor
NOISE_PATTERNS = [
  /^(ok|okay|sure|yes|no|thanks|gracias|si|np)[\.\!\?]?$/i,
  /^(hola|hi|hey|hello)[\.\!\?]?$/i
].freeze

TYPE_PATTERNS = {
  code:     /```[\s\S]*```|def\s+\w+|class\s+\w+|require\s+|const\s+\w+\s*=/,
  image:    /\.(png|jpg|jpeg|gif|webp|svg)(\s|$)|imagen|screenshot|captura/i,
  document: /\.(pdf|docx|txt|md)(\s|$)|documento|archivo|file/i,
  identity: /yo soy|me llamo|me recuerdas|remember me|i am \w+/i,
  question: /\?$/
}.freeze

def is_noise?(text)
  return true if text.nil? || text.strip.length < 3
  NOISE_PATTERNS.any? { |pattern| pattern.match?(text.strip) }
end

def detect_type(text)
  TYPE_PATTERNS.find { |_, pattern| pattern.match?(text) }&.first || :text
end

def score_relevance(text)
  words = text.strip.split(/\s+/).length
  score  = [words / 50.0, 1].min * 0.5
  score += 0.1 if /\d/.match?(text)
  score += 0.2 if /\b(porque|entonces|por lo tanto|es decir|objetivo|problema|solución)\b/i.match?(text)
  score += 0.1 if text.include?('?')
  score += 0.1 if text.length > 200
  [score, 1].min
end

def translate(text, context_hint = {})
  trimmed = text&.strip || ''
  return { noise: true, original: trimmed } if is_noise?(trimmed)

  {
    noise: false,
    type: detect_type(trimmed),
    original: trimmed,
    relevance: score_relevance(trimmed),
    intention: context_hint[:intention] || 'inform',
    relation:  context_hint[:relation]  || 'neutral',
    limits:    context_hint[:limits]    || {},
    timestamp: Time.now.to_i
  }
end
