const express=require('express');
require('dotenv').config();
const connectDB = require('./config/database');
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

connectDB()

const auth=require('./auth/auth.router')

app.use('/auth',auth)

app.listen(5000,()=>{
    console.log(`server is running on port 5000`)
})