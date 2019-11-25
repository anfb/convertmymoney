const express = require('express');
const app = express();
const path = require('path');

//Set views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//set file as CSS, SCSS...
app.use(express.static(path.join(__dirname, 'public')));

//HTTP Method
app.get('/', (req, res) => res.render('home') );

//port
app.listen(3333, err =>{
    if(err){
        console.log('Sorry, can not start!');
    }else{
        console.log('convertmymoney is running');
    }    
});