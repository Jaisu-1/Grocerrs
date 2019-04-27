const Transaction = require('../database/models/Transaction')

module.exports = async(req,res)=>{
    const transaction = await Transaction.find({userId: req.session.userId})
    console.log(transaction)
    res.render('purchaseHistory',{transaction})
}