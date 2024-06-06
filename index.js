require('dotenv').config();
const conn = require('./db/conn');
const Usuario = require("./models/Usuario");
const Jogo = require("./models/Jogo");
const express = require("express");
const app = express();
const { engine } = require("express-handlebars");

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
        console.log("Ocorreu um erro ao sincronizar/conectar com o banco de dados: " + err);
    });

app.engine("handlebars", engine());
app.set("view engine", "handlebars");

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(express.json());

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/usuarios", async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({ raw: true });
        res.render("usuarios", { usuarios });
    } catch (err) {
        res.status(500).send("Ocorreu um erro ao buscar os usuários");
    }
});

app.get("/usuarios/novo", (req, res) => {
    res.render("formUsuario");
});

app.post("/usuarios/novo", async (req, res) => {
    const { nickname, nome } = req.body;
    try {
        const usuario = await Usuario.create({ nickname, nome });
        res.send("Usuario inserido com o id: " + usuario.id);
    } catch (err) {
        res.status(500).send("Ocorreu um erro ao criar o usuário");
    }
});

app.get("/jogos/novo", (req, res) => {
    res.render("formJogo");
});

app.post("/jogos/novo", async (req, res) => {
    const { titulo, descricao, precoBase } = req.body;
    try {
        const jogo = await Jogo.create({ titulo, descricao, precoBase });
        res.send("O jogo inserido com o id: " + jogo.id);
    } catch (err) {
        res.status(500).send("Ocorreu um erro ao criar o jogo");
    }
});

app.listen(8000, () => {
    console.log("O servidor está rodando na porta 8000!");
});
