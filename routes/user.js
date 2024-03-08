const express=require('express');
const router=express.Router();
const con=require('../config')

router.post('/',(req,res)=>
{
    const data=req.body;
   con.query('INSERT INTO users SET ? ',data,(error,result,fields)=>{
    if(error)
    error;
    res.send(result)

   })
});

router.get('/',(req,res)=>
{
    
   con.query('SELECT * FROM users',(error,result)=>{
    if(error)
    res.send("error")
else
    res.send(result)

   })
});





module.exports=router;