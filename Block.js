const {GENESIS_DATA} = require('./config');
const cryptoHash = require('crypto-hash')
class Block {

    constructor({timestamp,lasthash,data,hash}) {
        this.timestamp = timestamp;
        this.lasthash = lasthash;
        this.data = data ;
        this.hash = hash ;
    }
    static genesis() {
        return new this(GENESIS_DATA);

    }
    static mineBlock({lastBlock,data}) {
        const timestamp = Date.now();
        const lasthash = lastBlock.hash;

        return new this({
                timestamp,
                lastHash,
                data,
                hash : cryptoHash(timestamp,lasthash,data)
            }
        );
    }

}
module.exports = Block;
