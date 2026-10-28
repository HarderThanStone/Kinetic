
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
const CAMPOS_PERFIL = ["objetivo", "nivel", "alturaCm", "pesoKg"];
const CAMPOS_ACESSIBILIDADE = ["fonteMaior", "altoContraste", "leitorDeTela","legendas","reduzirAnimacoes"];
const CAMPOS_CONFIGURACOES = ["monitoramentoDeTela","limiteTelaDiarioMin","intervaloPausaMin","notificacoes"];

function montarAtualizacao(corpo) {
  const atualizacao = pegarCampos(corpo, CAMPOS_SIMPLES);

  const grupos = [
    ["perfil", CAMPOS_PERFIL],
    ["acessibilidade", CAMPOS_ACESSIBILIDADE],
    ["configuracoes", CAMPOS_CONFIGURACOES]
  ];

  for (const [grupo, campos] of grupos) {
    const valores = pegarCampos(corpo?.[grupo], campos);

    for (const [campo, valor] of Object.entries(valores)) {
      atualizacao[`${grupo}.${campo}`] = valor;
    }
  }

  if (typeof atualizacao.nome === "string") {
    atualizacao.nome = atualizacao.nome.trim();
  }

  if (atualizacao.telefone !== undefined) {
    atualizacao.telefone = String(atualizacao.telefone).trim();
  }

  return atualizacao;
}

router.get("/", async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.sub);

    if (!usuario) {
      return res.status(404).json({erro: "Usuário não encontrado."});
    }

    return res.json(usuario);
  } catch (err) {
    return tratarErro(res, err, "Não foi possível carregar o perfil.");
  }
});

router.patch("/", async (req, res) => {
  try {
    const atualizacao = montarAtualizacao(req.body);

    if (Object.keys(atualizacao).length === 0) {
      return res.status(400).json({erro: "Nenhum campo válido para atualizar."});
    }

    const usuario = await Usuario.findById(req.usuario.sub);

    if (!usuario) {
      return res.status(404).json({erro: "Usuário não encontrado."});
    }

    usuario.set(atualizacao);
    await usuario.save();

    return res.json(usuario);
  } catch (err) {
    return tratarErro(res,err, "Não foi possível atualizar o perfil.");
  }
});

router.put("/condicoes", async (req, res) => {
  try {
    const {deficiencias = [], restricoes = [], observacoes = ""} = req.body || {};

    const defs = validarLista(deficiencias, DEFICIENCIAS, "deficiencias");

    if (defs.erro) {
      return res.status(400).json({ erro: defs.erro});
    }

    const rests = validarLista(restricoes, RESTRICOES, "restricoes");

    if (rests.erro) {
      return res.status(400).json({erro: rests.erro});
    }

    if (typeof observacoes !== "string" ||observacoes.length > 500) {
      return res.status(400).json({erro: "As observações devem ser um texto de até 500 caracteres."});
    }

    const usuario = await Usuario.findById(req.usuario.sub);

    if (!usuario) {
      return res.status(404).json({erro: "Usuário não encontrado."});
    }

    usuario.set({"condicoes.deficiencias": defs.valor, "condicoes.restricoes": rests.valor,
    "condicoes.observacoes": observacoes.trim() });

    await usuario.save();

    return res.json(usuario.condicoes);
  } catch (err) {
    return tratarErro(res, err, "Não foi possível salvar as condições.");
  }
});

router.patch("/senha", async (req, res) => {
  try {
    const { senhaAtual, novaSenha } = req.body || {};

    if (!senhaAtual || !novaSenha) {
      return res.status(400).json({erro: "Informe a senha atual e a nova senha."});
    }

    if (typeof novaSenha !== "string" || novaSenha.length < 8) {
      return res.status(400).json({erro: "A nova senha deve ter pelo menos 8 caracteres." });
    }

    const usuario = await Usuario.findById( req.usuario.sub).select("+senhaHash");

    if (!usuario) {
        return res.status(404).json({ erro: "Usuário não encontrado."});
    }

    const confere = await bcrypt.compare( senhaAtual,usuario.senhaHash);

    if (!confere) {return res.status(401).json({ erro: "A senha atual está incorreta."});
    }

    usuario.senhaHash = await bcrypt.hash(novaSenha, 10);
    await usuario.save();

    return res.json({mensagem: "Senha alterada com sucesso."});
  } catch (err) {
    return tratarErro( res, err,"Não foi possível alterar a senha.");
  }
});

router.delete("/", async (req, res) => {
  try {
    const { senha, confirmacao } = req.body || {};

    if (confirmacao !== "EXCLUIR") {
      return res.status(400).json({erro: 'Para excluir a conta, envie "confirmacao": "EXCLUIR".'});
    }

    if (!senha) {
      return res.status(400).json({erro: "Informe a sua senha para confirmar."});
    }

    const usuario = await Usuario.findById(req.usuario.sub).select("+senhaHash");

    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado."});
    }

    const confere = await bcrypt.compare(senha, suario.senhaHash);

    if (!confere) {
      return res.status(401).json({ erro: "Senha incorreta. A conta não foi excluída."});
    }

    const filtro = {usuario: usuario._id};

    await Promise.all([
      Atividade.deleteMany(filtro),
      Rotina.deleteMany(filtro),
      Meta.deleteMany(filtro),
      UsoTela.deleteMany(filtro),
      Lembrete.deleteMany(filtro)
    ]);

    await Usuario.deleteOne({_id: usuario._id});

    return res.json({mensagem: "Conta e dados excluídos com sucesso."});
  } catch (err) {
    return tratarErro(
      res, err,"Não foi possível excluir a conta.");
  }
});

export default router;
