module.exports= (req,res,next) =>{
    
    // if(!(req.files.image) || !req.body.title || !req.body.description || !req.body.price){
    //     return res.redirect('/insertItems')
    // }
    console.log("Call has been made to me")  
    next()
}