require('dotenv').config();
const conn = require('./db/conn');
const Usuario = require("./models/Usuario");

/*conn.authenticate()
    .then(() => {
        console.log('Conectado ao banco de dados com sucesso');
    })
    .catch((err) => {
        console.log('Ocorreu um erro: ' + err);
    });

conn.sync({ force: true })
    .then(() => {
        console.log("Banco de dados sincronizado com sucesso");
    })
    .catch((err) => {
        console.log("Ocorreu um erro ao sincronizar/ conectar com o banco de dados: " + err);
    });
*/

const express = require("express")
const app= express();

app.use(
    express.urlencoded({
        extended: true
        })
);
app.use(express.json());

app.get("/usuarios/novo", (req,res)=>{
    res.sendFile(`${__dirname}/views/formUsuario.html`);
})

app.post("/usuarios/novo", async (req,res)=>{
    const nickname= req.body.nickname;
    const nome= req.body.nome;
    
    const dadosUsuario = {
        nickname,
        nome,
    }
    const usuario = await Usuario.create(dadosUsuario)

    res.send("Usuario inserido sobre o id: " + usuario.id)
})
    
app.listen(8000, ()=>{
    console.log("O serve esta rodando na porta 8000!")
})