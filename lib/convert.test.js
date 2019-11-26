const _convert = require('./convert');

test('convert 4 quotation to 4 amount', () =>{
    expect(_convert.convert(4, 4)).toBe(16);
});
test('convert error result 4 quotation to 4 amount', () => {
    expect(_convert.convert(4, 4)).not.toBe(20);
});
test('Covert zero values', () => {
    expect(() => {
        _convert.convert(r, 4);
    }).toThrow();
});
test('Convert float to String', () => {
    expect(_convert.toMoney(2)).toBe('2.00');
});
test('Convert string to money', () => {
    expect(_convert.toMoney('2.00')).toBe('2.00');
});
