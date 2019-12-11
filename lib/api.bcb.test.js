const apiBcb = require('./api.bcb');
const axios = require('axios');
 //const getCotacaoAPI = jest.fn();
// getCotacaoAPI.mockResolvedValue(4.14);

jest.mock('axios');

test('getCotacaoAPI', () => {
    
    const resMock = { data: { value: [{cotacaoVenda: 4.14}] } };

    axios.get.mockResolvedValue(resMock);
   
    apiBcb.getCotacaoAPI('url').then(resp => {
        expect(resp).toEqual(resMock);
        expect(axios.get.mock.calls[0][0]).toBe('url');
    });
}); 

test('extractCotacao', ()=> {
    const cotacao = apiBcb.extractCotacao({ data: { value: [{cotacaoVenda: 4.14}] } });
    expect(cotacao).toBe(4.14);
});

test('getUrl', () => {
    const url = apiBcb.getUrl({ data: { value: [{ date: '' }] } });
    expect(url).toBe('https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27[object Object]%27&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao');
});

test('getToday', () =>{
    const today = apiBcb.getToday();
    expect(today).toBe('12-11-2019');
});