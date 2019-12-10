const apiBcb = require('./api.bcb');
const axios = require('axios');
// const getCotacaoAPI = jest.fn();
// getCotacaoAPI.mockResolvedValue(4.14);

jest.mock('axios');

test('getCotacaoAPI', () => {
    const resMock = {
       data: {
           value: [{cotacaoVenda: 4.14}]
       } 
    }

    axios.get.mockResolvedValue(resMock);

    apiBcb.getCotacaoAPI('04-04-2019').then(resp => {
        expect(resp).toEqual(resMock);
        // expect(axios.get.mock.calls[0][0].toBe('url'));
    });

}); 