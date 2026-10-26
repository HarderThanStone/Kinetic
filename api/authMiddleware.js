import jwt from "jsonwebtoken";
import Usuario from "./usuarios.js";

export default async function  authMiddleware(req, res, next) {
    const cabecalho = req.headers.authorization;

    if (!cabecalho || !cabecalho.startsWith("Bearer ")) {
        return res.status(401).json({
            erro: "Token não informado!"
        });
    }

    const token = cabecalho.replace("Bearer ", "");

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET, {
            issuer: "kinetic-api",
            audience: "kinetic-app"
        });

        const existe = await Usuario.existis({ _id: payload.sub});

        if(!existe) {
            return res.status(401).json({
                erro: "Conta não foi encontrada. Faça login novamente."
            });
        }

        req.usuario = payload;

        next();
    } catch (err) {
        return res.status(401).json({
            erro: "Token inválido ou expirado."
        });
    }
}
