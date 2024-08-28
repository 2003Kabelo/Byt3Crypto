const Block = require('./Block')
const {GENESIS_DATA} = require('./config');
const cryptoHash = require('./crypto-hash');
describe('Block',()=>{

    const timestamp = 'a-date';
    const lasthash = 'byt3Lasthash' ;
    const hash = 'Byt3Hash';
    const data = ['blockchain','data'];
    const block = new Block({timestamp , lasthash , hash , data ,});
    it('has timestamp,lasthash,data and hash',() => {
        expect(block.timestamp).toEqual(timestamp);
        expect(block.lasthash).toEqual(lasthash);
        expect(block.hash).toEqual(hash);
        expect(block.data).toEqual(data);
    });
    describe('genesis()', ()=> {

        const genesisBlock = Block.genesis();
        console.log('genesisBlock',genesisBlock);
        it('has a genesisBlock',() => {
            expect(genesisBlock instanceof Block).toBe(true);
        });
        it('returns genesisData',()=>{
            expect(genesisBlock).toEqual(GENESIS_DATA);
        })

    });
    describe('MineBlock()',() => {
        const lastBlock = Block.genesis();
        const data = 'mined data';
        const mineBlock = Block.mineBlock({lastBlock,data});
        it('Returns a Block instance',() => {
            expect(mineBlock instanceof Block).toBe(true);

        });
        it('Sets the lasthash to be the Hash of the lastblock',() => {
            expect(mineBlock.lasthash).toEqual(lastBlock.hash);
        });
        it('Sets the data',()=>{
            expect(mineBlock.data).toEqual(data);

        });
        it('Sets a timestamp',()=> {
            expect(mineBlock.timestamp).not.toEqual(undefined);
        });
        it('it creates a sha-256 based on proper inputs',() => {
            expect(mineBlock.hash).toEqual(cryptoHash(mineBlock.timestamp,lastBlock.hash,data));
        });



    });
});