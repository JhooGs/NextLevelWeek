const express = require("express")
const server = express()


//pegar o banco de dados
const db = require("./database/db.js")

//configurar pasta publica 
server.use(express.static("public"))

//Habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true}))



//utilizando template engine, ele te permite utilizar laços de repetição e outros no html
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//ligar o servidor 

//nodemon serve para atualizar o servidor sempre que tiver alteração sem precisar reiniciar o servidor

//configurar caminhos da minha aplicação
//página inicial
//req: Requisição
//res: Resposta
//Como a gente ligou o nunjucks com servidor express, ele já localiza as páginas com o render
server.get("/", function (req, res) {
    return res.render("index.html")
})

server.get("/create-point", function (req, res) {

    //req.query: Query strings da nossa url
    //console.log(req.query)

    return res.render("create-point.html")
})

server.post("/savepoint", function(req , res){

    //req.body: O corpo do nosso formulário
    //console.log(req.body)

    //Inserir dados no banco de dados
       //Inserir dados na tabela 
    const query = `
      INSERT INTO places (
          image,
          name,
          address,
          address2,
          state,
          city,
          items) 
          VALUES(?,?,?,?,?,?,?);
      `

   const values = [
       req.body.image,
       req.body.name,
       req.body.address,
       req.body.address2,
       req.body.state,
       req.body.city,
       req.body.items

   ]

    function afterInsertData(err){
       if(err){
        console.log(err)
           return res.send("Erro no cadastro")
       }

       console.log("Cadastrado com sucesso")
       console.log(this)

       return res.render("create-point.html",{saved: true})
   } 

   db.run(query,values, afterInsertData)
})



server.get("/search", function (req, res) {

    const search = req.query.search

    if(search == ""){
        //pesquisa vazia 
        return res.render("search-results.html",{total: 0})

    }

    //pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city like '%${search}%'`, function(err,rows){
        if(err){
            return console.log(err)
        }

        const total = rows.length
        
        console.log("Aquio estão seus registros")
        console.log(rows)

        //Mostrar a página html com os dados do banco de dados
        return res.render("search-results.html",{places:rows, total: total})
    }) 
})

server.listen(3000)