var Item = require('../database/models/Item')
mongoose = require('mongoose');

console.log("This is item ", Item.body);


module.exports = async(req,res)=>{
    console.log(req.body)
    itemId=req.body.itemId
    quantity=req.body.quantity
    change=req.body.change
    console.log(req.body)
    if(quantity>0)
    {
        if(!req.session.userId)
        {
            return res.redirect('/login')
        }
        userId=req.session.userId
        if(req.session.cart)
        {
            console.log("Cart already present")
            Cart=req.session.cart;
            console.log("hi")
            for(var i in Cart.items)
            {   total=0;
                console.log(itemId)
                const item = Item.findById(Cart.items[i].ItemId);
                console.log(item.totalQuantity);
                quantityAvailable=item.totalQuantity;
                console.log(quantityAvailable)
                if(Cart.items[i].itemId==itemId)
                {
                    price=parseFloat(Cart.items[i].price,10)
                    if(change == "dec" && quantity>1)
                    {
                        Cart.items[i].price=(price-(price/Cart.items[i].quantity)).toFixed(2)+""
                        Cart.price=(parseFloat(Cart.price,10)-(price/Cart.items[i].quantity)).toFixed(2)+""
                        Cart.items[i].quantity = (Cart.items[i].quantity)-1
                    }                    
                    else if(change == "inc" && quantity < quantityAvailable)
                    {
                      
                        Cart.items[i].price=(price+(price/Cart.items[i].quantity)).toFixed(2)+""
                        Cart.price=(parseFloat(Cart.price,10)+(price/Cart.items[i].quantity)).toFixed(2)+""
                        Cart.items[i].quantity = (Cart.items[i].quantity)+1
                    }

                    
                }

            }
            req.session.cart=Cart
            console.log("Cart is here :",Cart)

        }
        
    }

    res.redirect('/cart')
    
}
