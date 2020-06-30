const express = require("express")
const server = express()


//pegar o banco de dados
const db = require("./database/db.js")

//configurar pasta publica 
server.use(express.static("public"))



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
    return res.render("create-point.html")
})

server.get("/search", function (req, res) {

    //pegar os dados do banco de dados
    db.all(`SELECT * FROM places`, function(err,rows){
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