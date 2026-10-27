import { REGEX_DIA} from "../constantes.js";

const OFFSET_MS = -3 * 60 * 60 * 1000;
const DIA_MS = 24 * 60 * 60 * 1000;

export function diaLocal(data = new Date()) {
    const local = new Date(new Date(data).getTime() + OFFSET_MS);
    return local.toISOString().slice(0, 10);
}

function textoDoDia(entrada){
    if (typeof entrada === "string" && REGEX_DIA.test(entrada)) {
        return entrada;
    }
    return diaLocal(entrada);
}

export function inicioDoDia(entrada = new Date()){
    return new Date(Date.parse(`${textoDoDia(entrada)}T00:00:00.000Z`) - OFFSET_MS);
}

export function fimDoDia(entrada = new Date()){
    return new Date(inicioDoDia(entrada).getTime() + DIA_MS - 1);
}

export function diaDaSemana(entrada = new Date()){
    return new Date(Date.parse(`${textoDoDia(entrada)}T00:00:00.000Z`)).getUTCDay();
}

export function inicioDaSemana(entrada =  new Date()){
    const voltar = (diaDaSemana(entrada) + 6) %7;
    return new Date(inicioDoDia(entrada).getTime() - voltar * DIA_MS); 
}

export function somarDias(data, quantidade){
    return new Date(new Date(data).getTime() + quantidade * DIA_MS);
}

export function listarDias(inicio, fim){
    const dias = []
    let atual = inicioDoDia(inicio);
    const limite = inicioDoDia(fim).getTime();

    while (atual.getTime() <= limite){
        dias.push(diaLocal(atual));
        atual = new Date(atual.getTime() + DIA_MS);
    }

    return dias;
}

export function diasEntre(diaA, diaB){
    return Math.round((Date.parse(`${diaB}T00:00:00.000Z`) - Date.parse(`${diaA}T00:00:00.000Z`)) / DIA_MS);
}

export function dataValida(valor){
    if(valor === undefined || valor === null || valor === ""){
        return null;
    }

    if(typeof valor === "string" && REGEX_DIA.test(valor)){
        return inicioDoDia(valor);
    }

    const data = new Date(valor);
    return Number.isNaN(data.getTime()) ? null : data;
}