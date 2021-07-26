const express = require('express')
const app = express()
const mongoose = require('mongoose');
const UserDetail = require('./public/userdetails'); //importing module from userdetails js
const bcrypt = require('bcrypt');
const fs = require('fs');
mongoose.set('useCreateIndex', true);
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'asdasd23423874234jerfjk#$@#$424sfa4j';
//connect to mongo  db
const dbURL = 'mongodb+srv://admin:admin@cluster0.efglu.mongodb.net/GameC-DB?retryWrites=true&w=majority'


mongoose.connect(dbURL,{useNewUrlParser: true, useUnifiedTopology: true}).then((result) =>{
    console.log("Connected to the database");
    app.listen(3000);
}).catch((err) =>{
    console.log(err);
})

const users = []

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.render('home.ejs')
})

app.get('/trending', (req, res) => {
    //reading the items.json file 
    fs.readFile ('items.json', function(error,data){    //this is a must to be able to use <%%> in html
        if(error){
            res.status(500).end();
        }else{
            res.render('trending.ejs',{
                items: JSON.parse(data)
            })
        }
    })
})

app.get('/index',(req,res)=>{
    res.render('index.ejs')
})

app.get('/login',(req,res)=>{
    res.render('login.ejs')
})

app.post('/', async (req, res) => {
    //getting username, pw and email
    const {name, password: plainPW, email} = req.body;
    const password = await bcrypt.hash(plainPW,10);    

    try{    //try adding user to the database
        const user = await UserDetail.create({
            username: name,
            password: password,
            email: email
        })
    }catch(e){  //if catch error...
        if(e.code === 11000){
            return res.redirect('/')
        }
        throw e;
    }
    res.redirect('/');
})

app.post('/login', async (req,res) =>{
    const username = req.body.name;
    const password = req.body.password;
    const user = await UserDetail.findOne({username}).lean();

    if(!user){
        console.log("User not found");
    }

    if(await bcrypt.compare(password, user.password)){
        console.log("Logged in");
        res.redirect('/index');
    }
    const token = jwt.sign({
        name: user.name
    }, JWT_SECRET)
})

