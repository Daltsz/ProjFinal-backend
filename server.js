const express = require("express");
const app = express();
const session = require("express-session");
const bodyParser = require('body-parser');
const cors = require("cors");
const dbConect = require("./model/BD");


let xinxila = '';

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());


app.use(session({

    secret: 'config.session.secret',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}



}));








app.get("/", async (req, res) =>{

    console.log(req.session.login);

    req.session.login = xinxila;
    
    console.log(req.session.login);
    console.log(req.session);

    if(req.session && req.session.login){

        
        res.json(req.session.id);

    }else{

        res.json('false');

    }

  

});






app.post("/api/register", async (req, res) =>{

    const user = req.body;
    const email = req.body.email;
    register =  await dbConect.find(email);

    console.log(register)

    if(register[0] != null){
        console.log(register)
        res.json(-1)

    }else{
        
        dbConect.insert(user);
        res.json(1);

    }
    



});




app.post("/api/query", async (req, res) =>{

    const word = req.body.word;
    
    wordFelling =  await dbConect.findWord(word);

    if(typeof wordFelling[0] === 'undefined'){

        res.json(`${word} - Neutral`);

    }else{


        res.json(`${wordFelling[0].word} - ${wordFelling[0].felling} `);



    }

});




app.post("/api/login", async (req, res) =>{

    const email = req.body.email;
    const password = req.body.password;

    const value = req.body;

    login =  await dbConect.findLogin(value);


    if(typeof login[0] === 'undefined'){


        res.json(-1)


    }else{

        if(login[0].email == email && login[0].password == password){


            xinxila = email;
    
            res.json(1);
    
        }



    }
        

});








app.listen( process.env.PORT || 10000, () => {

    console.log("Servidor Esta rodando na Porta 10000");



});