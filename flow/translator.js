/**
 * translator.js - Initial Classification
 */
export function translate(input, context = {}) {
      if (!input || input.trim().length < 4) {
              return { noise: true, original: input };
      }

  const lowerInput = input.toLowerCase();
      let type = 'text';

  if (lowerInput.includes('const ') || lowerInput.includes('function ')) {
          type = 'code';
  } else if (lowerInput.includes('peter') || lowerInput.includes('yo soy') || lowerInput.includes('administrador')) {
          type = 'identity';
  }

  return {
          type,
          score: lowerInput.length > 20 ? 0.8 : 0.5,
          content: input.trim(),
          context
  };
}
