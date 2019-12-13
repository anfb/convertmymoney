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

//Agrupamento de teste
describe('getToday', ()=> {
    const RealDate = Date;
    function mockDate(date){
            global.Date = class extends RealDate{
            constructor(){
                return new RealDate(date);
            }
        }
    }
    afterEach(()=>{
        global.Date = RealDate;
    });

    test('getToday', () => {
        //fixar a data que o objeto está retornando
       mockDate('2019-12-12T08:45:01z');
       const today = apiBcb.getToday(); 
       expect(today).toBe('12-12-2019');
    });  
});

test('getUrl', () => {
    const url = apiBcb.getUrl('MINHA-DATE');
    expect(url).toBe('https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27MINHA-DATE%27&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao');
});

test('getCotacao', () => {
    const getToday = jest.fn();
    getToday.mockReturnValue('2019-12-12');

    const getUrl = jest.fn();
    getUrl.mockReturnValue('url');

    //mock getCotacaoAPI
    const resMock = { data: { value: [{cotacaoVenda: 4.14}] } };
    const getCotacaoAPI = jest.fn();
    getCotacaoAPI.mockResolvedValue(resMock);

    const extractCotacao = jest.fn();
    extractCotacao.mockReturnValue(4.14);

    apiBcb.pure.getCotacao({getToday, getUrl, getCotacaoAPI, extractCotacao})().then(res => {
        expect(res).toBe(4.14);
    });


});

test('getCotacaoErr', () => {
    const getToday = jest.fn();
    getToday.mockReturnValue('2019-12-12');

    const getUrl = jest.fn();
    getUrl.mockReturnValue('url');

    //mock getCotacaoAPI
    const resMock = { };
    const getCotacaoAPI = jest.fn();
    getCotacaoAPI.mockReturnValue(Promise.reject('err'));

    const extractCotacao = jest.fn();
    extractCotacao.mockReturnValue(4.14);

    apiBcb.pure.getCotacao({getToday, getUrl, getCotacaoAPI, extractCotacao})().then(res => {
        expect(res).toBe(4.14);
    });


});



