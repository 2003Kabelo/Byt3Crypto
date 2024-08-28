const cryptoHash = require('./crypto-hash');

describe('crypto-hash',() => {
    it('generates the SHA256 ',() => {
        expect(cryptoHash('Byt3')).toEqual('7020573543b915831723c66d05f5678d1675f4052ff2863c158b4549ef2bcd77');
    });
    it('it produces the same hash with the same inputs in any order',()=> {
        expect(cryptoHash('one','two','three').toEqual(cryptoHash('three','two','one')));
    });


});