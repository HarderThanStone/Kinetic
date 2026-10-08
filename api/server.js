import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Usuario from "./usuarios.js";

const app = express();
app.use(cors());
app.use(express.json());

    app.post('/usuarios', async (req, res) => {
        try{
            const usuario = await Usuario.create(req.body)
            res.status(200).json(usuario)
        } catch(err){
            res.status(400).json({erro: err.message })
        }

        app.get('/usuarios', async (req, res) => {
            res.json(await Usuario.find())
        })
    })

app.get('/servidor', async (req, res) =>{
    const conectado = mongoose.connection.readyState === 1
    res.json({ok: true, banco: conectado ? 'conectado' : 'desconctado'});

    const PORT = process.env.PORT || 3000;
    
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Conectado ao Mongo");
        app.listen(PORT, () => console.log("API rodando, porta:", PORT));
    } catch(err) {
        console.error("Erro ao conectar com a API:", err.message);
        process.exit(1);
    }
})