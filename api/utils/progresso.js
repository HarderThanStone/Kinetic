import Atividade from "../models/Atividade.js";
import UsoTela from "../models/UsoTela.js";
import {diaLocal, inicioDoDia, fimDoDia,
inicioDaSemana, somarDias, listarDias, diasEntre
} from "./datas.js";

export async function buscarAtividadesDoDia(usuarioId, data = new Date()) {
    return Atividade.find({
        usuario: usuarioId,
        data: { $gte: inicioDoDia(data), $lte: fimDoDia(data) },
    }).sort({ data: -1 });
}

export async function resumirAtividadesDoDia(usuarioId, data = new Date()) {
    const atividades = await buscarAtividadesDoDia(usuarioId, data);
    const minutos = atividades.reduce((total, atividade) => total + atividade.duracaoMin, 0);
    return {
        dia: diaLocal(data),
        minutos,
        quantidade: atividades.length,
        atividades,
    };
}

export async function buscarUsoTelaDaSemana(usuarioId, data = new Date()) {
    const inicio = inicioDaSemana(data);
    const fim = fimDoDia(somarDias(inicio, 6));
    return UsoTela.find({
        usuario: usuarioId,
        dia: { $gte: diaLocal(inicio), $lte: diaLocal(fim) },
    }).sort({ dia: 1 });
}

export function montarDiasDaSemana(data = new Date()) {
    const inicio = inicioDaSemana(data);
    return listarDias(inicio, somarDias(inicio, 6));
}

export function limitarPercentual(valor, alvo) {
    if (!Number.isFinite(Number(valor)) || !Number.isFinite(Number(alvo)) || Number(alvo) <= 0) {
        return 0;
    }
    return Math.min(100, Math.max(0, Math.round((Number(valor) / Number(alvo)) * 100)));
}

export { diasEntre };

