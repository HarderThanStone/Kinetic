
import mongoose from "mongoose";

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
        idade: { type: Number, required: true, min: 1
        }
    },
    { timestamps: true }
);

export default mongoose.model("Usuarios", usuariosSchema);
