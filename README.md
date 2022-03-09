# 🔮 Project  Validate  NodeJS

Objetivo do projeto é estudar como funciona as  validações através de um formulário. 

#### Tecnologias usadas:

- Body Parser :

  ```powershell
  npm install body-parser --save
  ```

- Express Flash: 

  ```powershell
  npm install express-flash --save 
  ```

- Express Session: 

  ```powershell
  npm install express-session --save
  ```

- Express: 

  ```powershell
  npm install express --save 
  ```

- EJS:

  ```powershell
  npm install ejs --save
  ```

- Cookie  Parser:

  ```powershell
  npm install cookie-parser --save
  ```

  

## 💻 Tipos  de  Validações

Existem dois tipos de validações: 

- Validações do lado do cliente 
  
  No lado do cliente as validações são feitas através dos campos do HTML , contudo esta técnica não oferece segurança, pois o usuário pode remover o atributo *"required"* e enviar os dados sem nenhum problema.
  Código de exemplo:
  
  ```html
  <input type="email" name="email" id="email" placeholder="email" required><br>
  ```
  
  
  
- Validações do lado do servidor
  
  São validações realizadas no back end, ou seja, no próprio servidor sem o acesso do cliente. 
  Código de exemplo:
  
  ```js
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
      response.send("Validação dos dados incorretos");
    } else {
      response.send("Validação realizada com sucesso");
    }
  ```
  
  

Cada aplicação determina qual tipo de validação será realizado, neste caso, as regras de negócio irão se aplicar ao que a aplicação precisa para o seu pleno funcionamento.

## 🍪 Ativando  Cookie Parser na  Session

Abaixo está a definição do cookie parser para a session com o valor de uma hora (60.000): 

```js
//Ativando Cookie Parser
app.use(cookieParser("senhaquegeracookie"))

//Configurando session 
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));
```

## 📸 O  que  são  *Flash  Sessions*?

**Flash Sessions** são sessões que **só duram por uma requisição**, ou seja, criamos a uma vez e **assim que a usamos ela é destruída**. Em resumo, flash sessions **são usadas para persistir informações em uma rota**.

Utilização do flash session para validar os dados no método post

```js
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
```

Abaixo pegamos os valores para transferir para a view: 

```js
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
```

Em seguida atribuímos os valores para a view: 

```html
 <form method="post" action="/form">
    <input type="email" name="email" id="email" placeholder="email" value="<%= email %> "><br>
    <%= emailError %> <br>
    <input type="text" name="nome" id="nome" placeholder="nome" value="<%= nome %> "><br>
    <%= nomeError %> <br>
    <input type="number" name="pontos" id="pontos" placeholder="pontos" value="<%= pontos %> "><br>
    <%= pontosError %> <br>
```

Este é mais um resumo finalizado para fins de estudos. 

Se gostou desse conteúdo, deixe uma star e acompanhe os outros repositórios! Em breve estarei colocando os links para ajudar na organização. 
