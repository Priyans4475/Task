const mysql=require('mysql')
const con=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:"",
    database:"financemanagement"
})

con.connect((err)=>{
    if(err)
    {
        console.warn("error in connection")
    }
    else
    console.log('database connected successfully')
})

module.exports =con;