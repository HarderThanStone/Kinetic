import mongoose from "mongoose";
import {TIPO_ATIVIDADE, REGEX_HORARIO}  from "../constantes.js";

const itemSchema = new mongoose.Schema(
    {
        nome: {type: String, required: true, trim: true, maxlength: 80},
        tipo: {type: String, enum: TIPO_ATIVIDADE, default: "outra"},
        duracaoMin: {type: Number, required: true, min:1, max: 600},
        series: {type: Number, min: 1, max: 50},
        repeticoes: {type: Number, min: 1, max: 50},
        exercicios: {type: mongoose.Schema.Types.ObjectId, ref: "Exercicios"}
    },

    {_id: false}
);

const rotinaSchema = new.mongoose.Schema(
    {
        usuario: {type: mongoose.Schema.Types.ObjectId, ref: "Usuarios", required: true},
        nome: {type: String, required: true, trim: true, maxlength:80},

        dias: {type: [Number], 
        validate:{
            validator: (lista) => lista.every((n) => Number.isInteger(n) && n >= 0 <=  6),
            message: "Os dias devem ser números de  0 (domingo) a 6 (sábado)."
            }
        },
        horario: {
            type: String,
            match: [REGEX_HORARIO, "O horário deve estar no formato: HH:MM."]        
        },
        itens: {
            type: [itemSchema],
            validate: {
                validator: (lista) =>  lista.length > 0,
                message: "A rotina precisa ter pelo menos um item."
            }
        },
        ativa: {type: Boolean, default: true}
    },
    {timestamps: true}
);

rotinaSchema.index({ usuario: 1, ativa: 1});

export default mongoose.mdoel("Rotinas", rotinaSchema);

