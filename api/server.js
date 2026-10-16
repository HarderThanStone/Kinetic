
import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Usuario from "./usuarios.js";
import authRouter from "./auth.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/teste", (req, res) => {
    res.json({
        mensagem: "Servidor correto!",
        porta: process.env.PORT || 3000
    });
});

app.use("/auth", authRouter);

app.post("/usuarios", async (req, res) => {
    try {
        const usuario = await Usuario.create(req.body);

        return res.status(201).json({
            id: usuario._id,
            nome: usuario.nome,
            email: usuario.email,
            telefone: usuario.telefone,
            idade: usuario.idade
        });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({
                erro: "E-mail ou telefone já cadastrado."
            });
        }

        return res.status(400).json({
            erro: err.message
        });
    }
});

app.get("/usuarios", async (req, res) => {
    try {
        const usuarios = await Usuario.find().select(
            "nome email telefone idade createdAt"
        );

        return res.json(usuarios);
    } catch (err) {
        return res.status(500).json({
            erro: err.message
        });
    }
});

app.get("/servidor", (req, res) => {
    const conectado = mongoose.connection.readyState === 1;

    return res.json({
        ok: true,
        banco: conectado ? "conectado" : "desconectado"
    });
});

app.use((req, res) => {
    return res.status(404).json({
        erro: "Rota não encontrada.",
        metodo: req.method,
        caminho: req.originalUrl
    });
});

const PORT = process.env.PORT || 3000;

try {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI não configurado no arquivo .env");
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("Conectado ao MongoDB");

    app.listen(PORT, () => {
        console.log(`API rodando na porta ${PORT}`);
        console.log("Cadastro: POST /auth/cadastro");
        console.log("Login: POST /auth/login");
    });
} catch (err) {
    console.error("Erro ao iniciar a API:", err.message);
    process.exit(1);
}
