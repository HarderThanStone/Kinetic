import mongoose from "mongoose";
import { TIPOS_META, PERIODOS_META } from "../constantes";

const  metaSchema = new mongoose.Schema(
    {
        usuario: {type: mongoose.Schema.Types.ObjectId, ref: "Usuarios", required: true},
        titulo: {type: String, required: true, trim: true, maxlength: 80},
        tipo: {type: String, enum: TIPOS_META, required: true},
        periodo: {type: String, enum: PERIODOS_META, required: true},
        valorAlvo: {type: Number, required: true, min: 1},
        prazo: {type: Date},
        ativa: {type: Boolean, default: true}
    },
    {timestamps: true}
);

metaSchema.index({usuario: 1, ativa: 1});

export default mongoose.model("Metas", metaSchema);