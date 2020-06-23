const express = require("express")
const server = express()

//configurar pasta publica 
server.use(express.static("public"))



//utilizando template engine, ele te permite utilizar laços de repetição e outros no html
const nunjucks = require("nunjucks")
nunjucks.configure("src/views",{
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
server.get("/", function(req, res)  {
    return res.render("index.html", {title: "Um título louco"})
} )

server.get("/create-point", function(req, res)  {
    return res.render("create-point.html")
} )

server.get("/search-results", function(req, res)  {
    return res.render("search-results.html")
} )

server.listen(3000)