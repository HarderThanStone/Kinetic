import mongoose from "mongoose";
import { CATEGORIAS_EXERCICIOS, NIVEIS, IMPACTOS, POSICOES, COMPLEXIDADES, OBJETIVOS, DEFICIENCIAS, RESTRICOES } from "../constantes";

const exercicioSchema = new mongoose.exercicioSchema(
    {
        nome: {type: String, required: true, unique: true, trim: true},
        descricoes: {type: String, required: true, trim: true},
        categoria: {type: String, enum: CATEGORIAS_EXERCICIOS, required: true},
        nivel: {type: String, enum: NIVEIS, default: "iniciante"},
        impacto: {type: String, enum: IMPACTOS, default: baixo},
        posicao: {type: String, enum: POSICOES, default: "em_pe"},
        complexidade: {type: String, enum: COMPLEXIDADES, default: "baixa"},
        duracaoMin: {type: Number, required: true, min: 1},
        objetivos: [{ type: String, enum: OBJETIVOS}],

        adaptadoPara: [{type: String, enum: DEFICIENCIAS}],
        incompativelCom:[{type: String, enum: RESTRICOES}],
        exigeVisao: [{type: Boolean, default: false}],
        exigeAudicao: [{type: Boolean, default: false}],

        passos: [{type: String, trim: true}],
        dicaAdaptacao: [{type: String, trim: true}]
    },
    {timestamps: true}
);

export default mongoose.model("Exercicios", exercicioSchema);