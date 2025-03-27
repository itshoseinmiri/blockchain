const crypto = require('crypto')


class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash
        this.hash = this.calculateHash()
        this.nonce = 0
    }

    calculateHash() {
        return crypto.createHash('sha256').update(this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash + this.nonce).digest('hex');
    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++
            this.hash = this.calculateHash()
        }
        console.log("Block mined: " + this.hash)
    }
}

class Blockchain {
    constructor () {
        this.chain = [this.createGenesisBlock()]
    }

    createGenesisBlock() {
        return new Block(0, '06/06/2025', "Genesis Block", '0')
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1]
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash
        newBlock.hash = newBlock.calculateHash()
        this.chain.push(newBlock)
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

let BavelamCoin = new Blockchain()

BavelamCoin.addBlock(new Block(1, "10/07/2025", { amount: 100 }))
BavelamCoin.addBlock(new Block(2, "12/07/2025", { amount: 50 }))
BavelamCoin.addBlock(new Block(3, "14/07/2025", { amount: 200 }))
BavelamCoin.addBlock(new Block(4, "16/07/2025", { amount: 500 }))
console.log(JSON.stringify(BavelamCoin, null, 4))

console.log("Is blockchain valid? " + BavelamCoin.isChainValid())