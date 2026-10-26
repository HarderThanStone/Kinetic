export function idValido(id) {
    return typeof id === "string" && /^[0-9a-fA-F]{24}$/.test(id)
}

export function pegarCampos(origem, permitidos) {
    const resultado = {};

    if(!origem || typeof origem !== "object"){
        return resultado;
    }

    for (const campo of permitidos) {
        if(origem[campo] !== undefined){
            resultado[campo] = origem[campo];
        }
    }
     return resultado;
}

export function validarListar(valor, permitidos, nomeCampo) {
    if(!Array.isArray(valor)) {
        return {erro: `${nomeCampo} deve ser uma lista.`}
    }

    const invalidos = valor.filter((item) => !permitidos.includes(item));
    if(invalidos.length > 0){
        return {
            erro: `${nomeCampo} contém valores inválidos: ${invalidos.join(",  ")}.`
        };
    }

     return {valor: [...new Set(valor)]};
}

export function inteiroNoIntervalo(valor, padrao, minimo, maximo){
    const numero = Number.parseInt(valor, 10);

    if(Number.isNaN(numero)){
        return padrao;
    }
}