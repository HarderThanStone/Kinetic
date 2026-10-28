import mongoose from "mongoose";
import { TIPOS_LEMBRETE, REGEX_DIA, REGEX_HORARIO } from "../constantes";

const lembreteSchema = new mongoose.Schema({
    usuario: {type: mongoose.Schema.Types.ObjectId, ref: "Usuarios", required: true},
    titulo: {type: String, required: true, trim: true, maxlength: 60},
    mensagem: {type: String, enum: TIPOS_LEMBRETE, default: "atividade"},
    horario: {type: String, required: true, match: [REGEX_HORARIO, "O horário deve estar no formato HH:MM."]},

    dias: {
        type: [Number],
        default: [],
        validate: {
            validator: (lista) => lista.every((n) => Number.isInteger(n) && n >= 0 && n <= 6),
            message: "Os dias devem ser números de 0 (domingo) a 6 (sábado)."
        }
    },
    ativo: {type: Boolean, default: true}
},
{timestamps: true}
);

lembreteSchema.index({usuario: 1, ativo:1});

export default mongoose.model("Lembretes", lembreteSchema);