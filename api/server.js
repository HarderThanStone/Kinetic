
import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Usuario from "./usuarios.js";
import authRouter from "./auth.js";
import authMiddleware from "./authMiddleware.js";

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



app.get("/servidor", (req, res) => {
    const conectado = mongoose.connection.readyState === 1;

    return res.json({
        ok: true,
        banco: conectado ? "conectado" : "desconectado"
    });
});

app.get("/perfil", authMiddleware, async (req, res) => {
    const usuario = await Usuario.findById(req.usuario.sub)
        .select("-senhaHash");

    if (!usuario) {
        return res.status(404).json({
            erro: "Usuário não encontrado."
        });
    }

    return res.json(usuario);
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
    });
} catch (err) {
    console.error("Erro ao iniciar a API:", err.message);
    process.exit(1);
}
