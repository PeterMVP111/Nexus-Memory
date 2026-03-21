function distillation(memoryData) {
    const distilledMemory = memoryData.filter(item => {
        return item.keep || (!item.avoid && !item.note);
    });

    return distilledMemory;
}

// Example usage:
const memoryData = [
    { keep: true, avoid: false, note: '' },
    { keep: false, avoid: true, note: 'not relevant' },
    { keep: false, avoid: false, note: 'important' },
];

console.log(distillation(memoryData)); // Should output items to keep
