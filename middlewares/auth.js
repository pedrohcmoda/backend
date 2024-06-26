const jwt = require('jsonwebtoken');

const authConfig = require("../config/auth.json")

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send({ error: 'Nenhum token foi fornecido' });
    }

    const parts = authHeader.split(' ');

    if (!parts.length === 2) {
        return res.status(401).send({ error: 'Erro no token' });
    }

    const [scheme, token] = parts;

    if(!/^Bearer$/.test(scheme)) {
        return res.status(401).send({ error: 'Token com formatação falha' });
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) return res.status(401).send({ error: 'Token inválido' });
        req.userId=decoded.id;
        console.log(decoded.id)

        return next();
    })

}