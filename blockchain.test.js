const Blockchain = require('./blockchain');
const Block = require('./Block');

describe('Blockchain',() => {
    let blockchain,newChain,originalChain;

    beforeEach(() => {
        blockchain = new Blockchain();
        newChain = new Blockchain();
        originalChain = blockchain.chain;
    });

    it('contains a chain Array instance',() => {
        expect(blockchain.chain instanceof Array).toBe(true);
    });
    it('starts with the genesis block',() => {
        expect(blockchain.chain[0]).toEqual(Block.genesis());
    });
    it('adds a new block to the chain',()=> {
        const newData = 'Byt3 data';
        blockchain.addBlock({data: newData});
        expect(blockchain.chain[blockchain.chain.length-1].data).toEqual(newData);
    });
    describe('isValidChain()',() => {
        describe('when the chain does not start with the genesis block ',()=>{
            it('returns false',() => {
                blockchain.chain[0] = {data:'fake-genesis'};
                expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
            });
        });
        describe('when the chain does not start with the genesis block and has multiple blocks',()=>{
            beforeEach(()=>{
                blockchain.addBlock({data:'bears'});
                blockchain.addBlock({data:'byt3'});
                blockchain.addBlock({data:'battlestar'});
            })
            describe('and a lasthash reference has changed',()=>{
                it('returns false',()=>{

                    blockchain.chain[2].lasthash = 'broken-lasthash';
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                });
            });
            describe('and the chain contains a block with an invalid field',()=>{
                it('returns false',()=>{

                    blockchain.chain[2].data = 'some-bad-data';
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                });
            });
            describe('and the chain does not contain any invalid blocks',()=>{
                it('returns true',()=>{

                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);

                });
            });
        });
    });
    describe('replaceChain()',() => {
        let errorMock, logMock ;
        beforeEach(()=>{
            errorMock = jest.fn();
            logMock = jest.fn();
            global.console.error = errorMock ;
            global.console.log = logMock ;
        });
        describe('when the new chain is not longer',()=>{
            it('does not replace the chain',()=>{
                newChain.chain[0] = {new : 'chain'};
                blockchain.replaceChain(newChain.chain);
                expect(blockchain.chain).toEqual(originalChain);
            });

        });
        describe('when the new chain is longer',()=>{
            beforeEach(()=>{
                newChain.addBlock({data:'Bears'});
                newChain.addBlock({data:'Byt3'});
                newChain.addBlock({data:'battlestar'});
            });
            describe('and the chain is invalid',()=>{
                newChain.chain[2].hash = 'some-fake-hash';
                blockchain.replaceChain(newChain.chain);
                expect(blockchain.chain).toEqual(originalChain);
            });
            describe('and the chain is valid',()=>{
                it('replaces the chain',()=>{
                    blockchain.replaceChain(newChain.chain);
                    expect(blockchain.chain).toEqual(newChain.chain);
                });

            });

        });
    });
});