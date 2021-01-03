var sha256 =require('sha256')

function Blockchain(){
    this.chain = []
    this.mempool =[]
}

Blockchain.prototype.createnewblock = function(){
    if(this.chain.length == 0){
        previoushash = null
    }else{
        previoushash = this.chain[this.chain.length-1].hash
    }
        var nonce = this.proofofwork(previoushash,this.mempool)
        var hash = this.blockhashing(previoushash,this.mempool,nonce)
    var block = {
            'height': this.chain.length,
            'timestamp': Date.now(),
            'transactions': this.mempool,
            'previoushash': previoushash,
            'hash': hash,
            'nonce': nonce

        }

        this.chain.push(block)
        this.mempool = []
        return "New block will be added in block height"+block.height
}

Blockchain.prototype.blockhashing = function(previoushash,blockdata,nonce){
    var blockstring = previoushash + JSON.stringify(blockdata) + nonce
    return sha256(blockstring)
}

Blockchain.prototype.proofofwork = function(previoushash,blockdata){
        var nonce = 0;
        var hash = this.blockhashing(previoushash,blockdata,nonce)
        while(hash.substring(0,4) != "0000"){
            nonce++;
            hash = this.blockhashing(previoushash,blockdata,nonce)
        }
        return nonce
}

Blockchain.prototype.getlastblock = function(){
    var index = this.chain.length
    return this.chain[index - 1]
}

Blockchain.prototype.createnewTx = function(amount,sender,reciever){
    var Tx = {
        'timestamp': Date.now(),
        'amount': amount,
        'sender': sender,
        'reciever': reciever
    }

    this.mempool.push(Tx)
    var newblock = this.chain.length
    return "new Tx will be added in the block height"+newblock.length

}

Blockchain.prototype.getlastTxs = function(height){
    var block = this.chain[height]
    if(block){
        return block.transactions;
    }else{
        return 'block not found'
    }
}

module.exports = Blockchain;