'use strict';

/**
 * translator.js — Input Processor
 * Converts raw input into a structured footprint that Nexus can route.
 * Detects type, noise level, and extracts semantic context.
 */

const NOISE_PATTERNS = [
    /^(ok|okay|sure|yes|no|thanks|gracias|si|np)[\.\!\?]?$/i,
    /^(hola|hi|hey|hello)[\.\!\?]?$/i,
];

const TYPE_PATTERNS = {
    code:     /```[\s\S]*```|function\s+\w+|class\s+\w+|import\s+|require\(|const\s+\w+\s*=/,
    image:    /\.(png|jpg|jpeg|gif|webp|svg)(\s|$)|imagen|screenshot|captura/i,
    document: /\.(pdf|docx|txt|md)(\s|$)|documento|archivo|file/i,
    identity: /yo soy|me llamo|me recuerdas|remember me|i am \w+/i,
    question: /\?$/,
};

/**
 * Detects if input is pure noise (no value to store)
 */
function isNoise(text) {
    if (!text || text.trim().length < 3) return true;
    return NOISE_PATTERNS.some(p => p.test(text.trim()));
}

/**
 * Detects input type for routing
 */
function detectType(text) {
    for (const [type, pattern] of Object.entries(TYPE_PATTERNS)) {
        if (pattern.test(text)) return type;
    }
    return 'text';
}

/**
 * Calculates relevance score (0-1) based on semantic density
 */
function scoreRelevance(text) {
    const words = text.trim().split(/\s+/).length;
    const hasNumbers = /\d/.test(text);
    const hasSpecificTerms = /\b(porque|entonces|por lo tanto|es decir|en resumen|objetivo|problema|solución)\b/i.test(text);

    let score = Math.min(words / 50, 1) * 0.5;
    if (hasNumbers) score += 0.1;
    if (hasSpecificTerms) score += 0.2;
    if (text.includes('?')) score += 0.1;
    if (text.length > 200) score += 0.1;

    return Math.min(score, 1);
}

/**
 * Main translate function
 * Returns structured footprint or marks as noise
 */
function translate(text, contextHint = {}) {
    const trimmed = text?.trim() || '';

    if (isNoise(trimmed)) {
        return { noise: true, original: trimmed };
    }

    const type = detectType(trimmed);
    const relevance = scoreRelevance(trimmed);

    return {
        noise: false,
        type,
        original: trimmed,
        relevance,
        intention: contextHint.intention || 'inform',
        relation:  contextHint.relation  || 'neutral',
        limits:    contextHint.limits    || {},
        timestamp: Date.now(),
    };
}

module.exports = { translate };
