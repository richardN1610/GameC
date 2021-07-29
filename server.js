const express = require('express')
const mongoose = require('mongoose');
const UserDetail = require('./public/userdetails'); //importing module from userdetails js
const bcrypt = require('bcrypt');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const jwt = require('jsonwebtoken');
const { Socket } = require('net');
const JWT_SECRET = 'asdasd23423874234jerfjk#$@#$424sfa4j';
//connect to mongo  db
const dbURL = 'mongodb+srv://admin:admin@cluster0.efglu.mongodb.net/GameC-DB?retryWrites=true&w=majority'

mongoose.set('useCreateIndex', true);
mongoose.connect(dbURL,{useNewUrlParser: true, useUnifiedTopology: true}).then((result) =>{
    console.log("Connected to the database");
    app.listen(3000);
}).catch((err) =>{
    console.log(err);
})

const app = express()
app.use('/', express.static(path.join(__dirname, 'views')))
app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'));
app.use(bodyParser.json());
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

    console.log(name);
	try {
		const response = await UserDetail.create({
			username: name,
			password : password,
            email : email
		})
		console.log('User created successfully: ', response)
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'Username already in use' })
		}
		throw error
	}
    res.json({status: 'ok'})
    
})

app.post('/login', async (req,res) =>{
    const username = req.body.username;
    const password = req.body.password;
    const user = await UserDetail.findOne({username}).lean();
    if(!user){
		return res.json({ status: 'error', error: 'Invalid Credentials.' })
    }

    if(await bcrypt.compare(password, user.password)){
        const token = jwt.sign({
            name: user.name
        }, JWT_SECRET)
        //res.redirect was causing the issue in here.
        return res.json({ status: 'ok', data: token})
    }

    res.json({ status: 'error', error: 'Invalid username/password'})
})
