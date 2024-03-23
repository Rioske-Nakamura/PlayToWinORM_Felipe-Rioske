const {Client}  = require("pg")

const Client =new Client({
    user: "postgres",
    passoword: "passoword_postgres",
    host: "localhost",
    port: "5432",
    nome: "nome_do_banco"
})

