import mongoose from "mongoose";

const usuariosSchema = new mongoose.Schema(
    {
        nome: {type: String, required:true},
        email: {type: String, required:true, unique: true},
        telefone: {type: Number, required:true, unique: true},
        idade: {type: Number, required:true}
    },
    {timestamps: true}
)

export default mongoose.model('Usuarios', usuariosSchema);