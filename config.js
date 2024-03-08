const mysql=require('mysql')
require("dotenv").config();
const con=mysql.createConnection({
    host:process.env.MYSQL_HOST,
    user:process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATABASE
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