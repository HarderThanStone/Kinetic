import mongoose from "mongoose";
import { REGEX_DIA } from "../constantes";

const usoTelaSchema = new mongoose.Schema(
    {
        usuario: {type: mongoose.Schema.Types.ObjectId, ref: "Usuarios", required: true},
        dia: {type: String, required: true, match: [REGEX_DIA, "O dia deve ser em formato AAAA-MM-DD."]},
        minutos: {type: Number, required: true, min: 0, max: 1440},
        pausas: {types: Number, default: 0, min:0, max:500},
    },
    {timestamps: true}
);

usoTelaSchema.index({ usuario: 1, dia: 1 }, { unique: true });

export default mongoose.model("UsoTela", usoTelaSchema);
