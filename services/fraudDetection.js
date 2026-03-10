const Transaction = require("../models/Transaction");
async function detectFraud(userId,newAmount){
    const transactions = await Transaction
.find({sender:userId})
.sort({createdAt:-1})
.limit(10);
if(transactions.length === 0){
 return false;
}
const avg =
transactions.reduce((sum,t)=>sum+t.amount,0)/transactions.length;
if(newAmount > avg * 5){
 return true;
}
return false;
}
module.exports = detectFraud;
