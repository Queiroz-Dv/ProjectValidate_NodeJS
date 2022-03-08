var express = require("express");
var app = express();
var session = require("express-session");
var flash = require("express-flash");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");

//Configurando View Engine
app.set('view engine', 'ejs');

//Configuração do body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Ativando Cookie Parser
app.use(cookieParser("senhaquegeracookie"))

//Configurando session 
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));
app.use(flash());

//Routes 
app.get("/", (request, response) => {
  var emailError = request.flash("emailError");
  var pontosError = request.flash("pontosError");
  var nomeError = request.flash("nomeError");
  var email = request.flash("email");
  var pontos = request.flash("pontos");
  var nome = request.flash("nome");

  emailError = (emailError == undefined || emailError.length == 0) ? undefined : emailError;
  pontosError = (pontosError == undefined || pontosError.length == 0) ? undefined : pontosError;
  nomeError = (nomeError == undefined || nomeError.length == 0) ? undefined : nomeError;

  email = (email == undefined || email.length == 0) ? "" : email;
  pontos = (pontos == undefined || pontos.length == 0) ? "" : pontos;
  nome = (nome == undefined || nome.length == 0) ? "" : nome;


  response.render("index", {
    emailError,
    pontosError,
    nomeError,

    email: email,
    pontos: pontos,
    nome: nome,
  });
});

app.post("/form", (request, response) => {
  var { email, nome, pontos } = request.body;

  var emailError;
  var pontosError;
  var nomeError;

  if (email == undefined || email == "") {
    emailError = "E-mail inválido";
  }

  if (pontos == undefined || pontos < 20) {
    pontosError = "Você não pode ter menos de 20 pontos";
  }

  if (nome == undefined || nome == "") {
    nomeError = "O nome não pode ser vazio";
  }
  if (emailError != undefined ||
    pontosError != undefined ||
    nomeError != undefined) {
    request.flash("emailError", emailError);
    request.flash("pontosError", pontosError);
    request.flash("nomeError", nomeError);

    request.flash("email", email);
    request.flash("pontos", pontos);
    request.flash("nome", nome);

    response.redirect("/");
  } else {
    response.send("Validação realizada com sucesso");
  }
});

app.listen(1103, (request, response) => {
  console.log("Server Running");
});