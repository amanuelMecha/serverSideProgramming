var express = require('express');
var router = express.Router();

//localhost:3000/products
router.post('/',(req,res)=>{
    res.json({status:'success',data:'what a good day'});
}); 

router.put('/',(req,res)=>{
   
    res.json({status:'success',data:'nodejs is awesome'});
});

//localhost:3000/products
router.get('/',function(req,res){
    console.log('products');
 
    const data={
        name:'umur',
        lastname:'inan',
        address:{
            street:'123 N Main'
        }
    };
    res.json(data);
});

//localhost:3000/products/computers

router.get('/computers',(req,res)=>{
    res.send('computers');
});

module.exports= router;