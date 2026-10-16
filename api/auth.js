
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Usuario from "./usuarios.js";

const router = express.Router();

router.post("/cadastro", async (req, res) => {
    try {
        const { nome, email, telefone, idade, senha } = req.body;

        if (!nome || !email || !telefone || idade === undefined || !senha) {
            return res.status(400).json({
                erro: "Preencha todos os campos obrigatórios."
            });
        }

        if (typeof senha !== "string" || senha.length < 8) {
            return res.status(400).json({
                erro: "A senha deve ter pelo menos 8 caracteres."
            });
        }

        const emailNormalizado = email.trim().toLowerCase();

        const existente = await Usuario.findOne({
            $or: [
                { email: emailNormalizado },
                { telefone: String(telefone).trim() }
            ]
        });

        if (existente) {
            return res.status(409).json({
                erro: "Este e-mail ou telefone já está cadastrado."
            });
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        const usuario = await Usuario.create({
            nome: nome.trim(),
            email: emailNormalizado,
            telefone: String(telefone).trim(),
            idade,
            senhaHash
        });

        return res.status(201).json({
            id: usuario._id,
            nome: usuario.nome,
            email: usuario.email
        });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({
                erro: "Este e-mail ou telefone já está cadastrado."
            });
        }

        console.error("Erro no cadastro:", err.message);

        return res.status(500).json({
            erro: "Não foi possível concluir o cadastro."
        });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({
                erro: "Informe o e-mail e a senha."
            });
        }

        const usuario = await Usuario.findOne({
            email: email.trim().toLowerCase()
        }).select("+senhaHash");

        if (!usuario) {
            return res.status(401).json({
                erro: "E-mail ou senha inválidos."
            });
        }

        const senhaConfere = await bcrypt.compare(
            senha,
            usuario.senhaHash
        );

        if (!senhaConfere) {
            return res.status(401).json({
                erro: "E-mail ou senha inválidos."
            });
        }

        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET não configurado.");

            return res.status(500).json({
                erro: "Erro de configuração do servidor."
            });
        }

        const token = jwt.sign(
            {
                sub: usuario._id.toString(),
                email: usuario.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h",
                issuer: "kinetic-api",
                audience: "kinetic-app"
            }
        );

        return res.json({
            token,
            usuario: {
                id: usuario._id,
                nome: usuario.nome,
                email: usuario.email
            }
        });
    } catch (err) {
        console.error("Erro no login:", err.message);

        return res.status(500).json({
            erro: "Não foi possível realizar o login."
        });
    }
});

export default router;
