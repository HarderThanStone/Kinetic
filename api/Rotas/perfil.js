import express from "express";
import bcrypt from "bcryptjs";
import Usuario from "../usuarios.js";
import Atividade from "../models/Atividade.js";
import Rotina from "../models/Rotina.js";
import Meta from "../models/Meta.js";
import UsoTela from "../models/UsoTela.js";
import Lembrete from "../models/Lembrete.js";
import { DEFICIENCIAS, RESTRICOES } from "../constantes.js";
import { tratarErro } from "../utils/erros.js";
import { pegarCampos, validarLista } from "../utils/validar.js";

const router = express.Router();

const CAMPOS_SIMPLES = ["nome", "telefone", "idade"];
const CAMPOS_PERFIL = ["objetivo", "nivel", "alturaCm", "pesoKG"];
const CAMPOS_ACESSIBILIDADE = ["fonteMaior", "altoContraste", "leitorDeTela", "legendas", "intervaloPausaMin", "notificacoes"];

function montarAtualizacao (corpo) {
    const montarAtualizacao = pegarCampos(corpo, CAMPOS_SIMPLES);

    const grupos = [
        ["perfil", CAMPOS_PERFIL],
        ["acessibilidade", CAMPOS_ACESSIBILIDADE],
        ["configuracoes", CAMPO_CONFIGURACOES]
    ];

    for (const [grupo, campos] of grupos){
        const valores = pegarCampos(corpo?.[grupo], campos);

        for (const [campo, valor] of Object.entries(valores)) {
            atualizacao[`${grupo}.${campo}`] = valor;
        }
    }

    if(typeof atualizacao.nome === "string") atualizacao.nome = atualizacao.nome.trim();
    if (atualizacao.telefone !== undefined) atualizacao.telefone = String(atualizacao.telefone).trim();

    return atualizacao;
}

router.get("/", async(req, res) =>{
    try{
        const usuario = await Usuario.findById(req.usuario.sub);

        if(!usuario) {
            return res.status(404).json({erro: "Usuário não encontrado."});
            }

            res.json(usuario);
    } catch(err) {
        return tratarErro(res, err, "Não foi possível carregar o perfil.");
    }
});

router.patch("/", async(req, res) =>{
    try {
        const atualizacao = montarAtualizacao(req.body);

        if (Object.keys(atualizacao).length === 0){
            return res.status(400).json({erro: "Nenhum campo válido para atualizar."});
        }

        const usuario = await Usuario.findById(req.usuario.sub);

        if(!usuario){
            return res.status(404).json({erro: "Usuário não encontrado."});
        }

        usuario.set(atualizacao);
        await usuario.save();

        return res.json(usuario);
    } catch (err) {
        return tratarErro(res, err, "Não foi possível atualizar o perfil.")
    }
});

