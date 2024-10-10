const express=require('express');
require('dotenv').config();
const connectDB = require('./config/database');
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

connectDB()

const auth=require('./auth/auth.router');
const fertilizers=require('./fertilizers/fertilizers.router');
const pesticides=require('./pesticides/pesticides.router');
const reviews=require('./reviews/reviews.router');

app.use('/auth',auth);
app.use('/fertilizers',fertilizers);
app.use('/pesticides',pesticides);
app.use('/reviews',reviews);

app.listen(5000,()=>{
    console.log(`server is running on port 5000`)
})