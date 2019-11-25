const express = require('express');
const app = express();
const path = require('path');
const convert = require('./lib/convert');

//Set views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//set file as CSS, SCSS...
app.use(express.static(path.join(__dirname, 'public')));

//HTTP Method
app.get('/', (req, res) => res.render('home') );
app.get('/cotacao', (req, res) => { 
    const {quotation, amount} = req.query;
    if(quotation && amount){
        const _convert = convert.convert(quotation, amount);
        res.render('cotacao', {
            error: false,
            quotation: convert.toMoney(quotation),
            amount: convert.toMoney(amount),
            _convert: convert.toMoney(_convert)
        });
    }else{
        res.render('cotacao', {
            error: 'Invalid Value'
        });
    }
});

//port
app.listen(3333, err =>{
    if(err){
        console.log('Sorry, can not start!');
    }else{
        console.log('convertmymoney is running');
    }    
});