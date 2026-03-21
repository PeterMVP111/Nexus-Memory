const { processInput } = require('./flow/nexus.js');

const tests = [
    { input: "ok",                          expect: false },
    { input: "hola",                        expect: false },
    { input: "necesito rediseñar el flujo de translator.js porque detecté un bug en el scoring", expect: true },
    { input: "```function test() {}```",    expect: true },
    { input: "yo soy Peter me recuerdas?", expect: true },
];

let passed = 0;
tests.forEach(({ input, expect }, i) => {
    const result = processInput(input);
    const ok = result.stored === expect;
    console.log(`${ok ? '✅' : '❌'} Test ${i + 1}: "${input.slice(0, 40)}..."`);
    if (ok) passed++;
});

console.log(`\n${passed}/${tests.length} tests passed`);
