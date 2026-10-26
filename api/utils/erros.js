export function tratarErros(res, err, mensagemPadrao = "Erro interno no servidor!") {
    if (err.name === "ValidationError"){
        const detalhes = Object.values(err.erros).map((e) => err.message)

        return res.status(400).json({
            erro: "Dados inválidos!",
            detalhes
        });
    }

    if (err.name === "CastError"){
         return res.status(400).json({
            erro: `Valor inválido para o campo "${err.path}".`
         });
    }

    if(err.code === 11000){
        return res.status(409).json({
            erro: "Já existe um registro com esses dados!"
        });
    }

    console.error(mensagemPadrao, err.message);
    return res.status(500).json({erro: mensagemPadrao});

}