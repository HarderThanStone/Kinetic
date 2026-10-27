import mongoose from "mongoose";
import { TIPO_ATIVIDADE, INTENSIDADE } from "../constantes";

const atividadeSchema = new mongoose.Schema(
    {
        usuario: {type: mongoose.Schema.Types.ObjectId, ref: "Usarios", required: true},
        tipo: { type: String, enum: TIPOS_ATIVIDADE, required: true },
        titulo: { type: String, trim: true, maxlength: 80 },
        duracaoMin: { type: Number, required: true, min: 1, max: 1440 },
        intensidade: { type: String, enum: INTENSIDADES, default: "moderada" },
        distanciaEmKm: { type: Number, min: 0, max: 1000 },
        calorias: { type: Number, min: 0, max: 20000 },
        data: { type: Date, default: Date.now },
        observacoes: { type: String, trim: true, maxlength: 300 },
        rotina: { type: mongoose.Schema.Types.ObjectId, ref: "Rotinas" }
    },
    {timestamps: true}
);

atividadeSchema.index({ usuario: 1, data:-1 });

export default mongoose.model("Atividades", atividadeSchema);