const express = require("express")
const server = express()

//ligar o servidor 



//configurar caminhos da minha aplicação
//página inicial
//req: Requisição
//res: Resposta
server.get("/", function(req, res)  {
    res.send("Cheguei aqui")
} )

server.listen(3000)