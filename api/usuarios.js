import mongoose from "mongoose";
import { DEFICIENCIAS, RESTRICOES, OBJETIVOS, NIVEIS } from "./constantes";

const usuariosSchema = new mongoose.Schema(
    {
        nome: {  type: String, required: true, trim: true
        },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true
        },
        senhaHash: { type: String, required: true, select: false
        },
        telefone: { type: String, required: true, unique: true, trim: true
        },
        idade: { type: Number, required: true, min: 1, max: 100
        },

         perfil: {
            objetivo: {type: String, enum: OBJETIVOS},
            nivel: {type: String, enum: NIVEIS},
            alturaCm: {type: Number, min: 50, max: 250},
            pesoKG: {type: Number, min: 10, max: 400}
         },

         condicoes: {
            deficiencias: [{type: String, enum: DEFICIENCIAS}],
            restricoes: [{type: String, enum: RESTRICOES}],
            observacoes: [{type: String, trim: true, maxlength: 500, default: ""}],
         },

         acessibilidade: {
            fonteMaior: {type: Boolean, default: false},
            altoContraste: {type: Boolean, default: false},
            leitorDeTela: {type: Boolean, default: false},
            legendas: {type: Boolean, default: true},
            reduzirAnimacoes: {type: Boolean, default: false}
         },
      
         configuracoes: {
            monitoramentoDeTela: {type: Boolean, default: false},
            limiteDeTelaDiario: {type: Number, default: 240, min: 30, max: 1440},
            intervaloPausaMin: {type: NUmber, default: 50, min: 10, max: 250},
            notificacoes: {type: Boolean, default: true},
         },

         pushToken: {type: String, select: false}

    },

    { timestamps: true }
);

export default mongoose.model("Usuarios", usuariosSchema);
