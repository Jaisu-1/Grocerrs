const transaction = require('../database/models/Transaction')
const Item = require('../database/models/Item')
module.exports = (req,res)=>{
    itemId=req.session.cart
    item_price=req.body.price
    userId=req.session.userId
    CartItems=req.session.cart.items
    CartPrice=req.session.cart.price
    currentDate=new Date()
    req.session.cart=""
    transaction.create({
        userId,
        items: CartItems,
        timestamp: currentDate,
        totalPrice: CartPrice,
    },(error,transaction)=>{
        if(error)
        {
            console.log(error)
        }
        else{
            for (var i in CartItems)
            {
                
                Item.update(
                    { _id: CartItems[i].itemId },
                    {
                        $inc: { totalQuantity: -CartItems[i].quantity}
                    },(error,item)=>{
                        console.log(error)
                    })            
            } 
        }
        res.render('transactionCompleted',{userId,CartItems,currentDate,CartPrice})
    })
    
}
