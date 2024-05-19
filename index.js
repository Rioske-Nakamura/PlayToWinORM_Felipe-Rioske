require('dotenv').config();
const conn = require('./db/conn');
const Usuario = require("./models/Usuario");
const Jogo = require("./models/Jogo")

conn.authenticate()
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

app.get("/jogos/novo", (req,res)=>{
    res.sendFile(`${__dirname}/views/formJogo.html`);
})

app.post("/jogos/novo", async (req,res)=>{
    const titulo= req.body.titulo;
    const descricao= req.body.descricao;
    const precoBase= req.body.precoBase;
    
    const dadosJogo = {
        titulo,
        descricao,
        precoBase,
    }
    const jogo = await Jogo.create(dadosJogo)

    res.send("O jogo inserido sobre o id: " + jogo.id)
})

app.listen(8000, ()=>{
    console.log("O serve esta rodando na porta 8000!")
})

