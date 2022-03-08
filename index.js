var express = require("express");
var app = express();
var session = require("express-session");
var flash = require("express-flash");
var bodyParser = require("body-parser");

//Configurando View Engine
app.set('view engine', 'ejs');

//Configuração do body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Configurando session 
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));
app.use(flash());

//Routes 
app.get("/", (request, response) => {
  console.log("Está rodando");
  response.send("Running...");
});


app.listen(1103, (request, response) => {
  console.log("Server Running");
});