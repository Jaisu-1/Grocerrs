const Item = require('../database/models/Item')

module.exports =async(req,res)=>{
    id=req.params;   
    const items = await Item.find({$and:[{available:true},{totalQuantity:{ $gt: 0 }}]})
    res.json({items})
}