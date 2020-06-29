//Importar a depêndencia do sqlite3
// Verbose significa que você quer ver mais informações 
const sqlite3 = require("sqlite3").verbose()

//criar o objeto que ira fazer operações no banco de dados

const db = new sqlite3.Database("./src/database/database.db")
//Executando script 
//node src/database/db.js
// utilizar o obejto de banco de dados para nossas operações 
//serialize significa que ele vai executar uma sequencia de códigos
db.serialize(()=>{
    //Criar uma tabela
    //A crase ` serve para rodar o código com quebra de linha 
    db.run(`
        CREATE TABLE IF NOT EXISTS places(
            id INTEGER  PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
        `)
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
        "https://images.unsplash.com/photo-1584921467312-99ff98cc2ebd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        "Colectoria",
        "Guilherme Gemballa, Jardim América",
        "Número 260",
        "Santa Catarina",
        "Rio do sul",
        "Resíduos Eletrônicos e Lâmpadas"
    ]

    function afterInsertData(err){
        if(err){
            return console.log(err)
        }

        console.log("Cadastrado com sucesso")
        console.log(this)
    }

    db.run(query,values, afterInsertData)

    //Consultar dados na tabela

    //Deletar um dado da tabela 
})