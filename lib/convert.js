const convert = (quotation, amount) => {
    return quotation * amount;
};

const toMoney = valor => {
    return parseFloat(valor).toFixed(2);
};

module.exports = {
    convert,
    toMoney
};