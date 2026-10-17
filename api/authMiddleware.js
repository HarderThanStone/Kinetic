import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
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

        req.usuario = payload;

        next();
    } catch (err) {
        return res.status(401).json({
            erro: "Token inválido ou expirado."
        });
    }
}
