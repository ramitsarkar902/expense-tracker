
const path=require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors= require('colors');
const morgan = require('morgan');
const connectDB=require('./config/db')

dotenv.config({path:'./config/config.env'})

connectDB();

const transactions = require('./routes/transaction')

const app=express();

app.use(express.json());

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.use('/api/v1/transactions',transactions);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
  }


const PORT= process.env.Port || 5000;
app.listen(PORT,console.log(`Server running ${process.env.NODE_ENV} mode on ${PORT}`.yellow.bold));