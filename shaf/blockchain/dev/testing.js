var Blockchain = require('./blockchain.js')

var bitcoin = new Blockchain()

bitcoin.createnewblock("fdfsdf","sasdasdsa","nonce1")
bitcoin.createnewTx(50,"shafey","hadia")

bitcoin.createnewblock("f","sasd","nonce2")

console.log(bitcoin)
//console.log(bitcoin.getlastTxs(1))
//console.log(bitcoin.getlastblock(1))
//console.log(bitcoin.blockhashing("dsaad","faefddsafa","asdfasd"))