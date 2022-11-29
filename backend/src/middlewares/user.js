import jwtConfig from "../configs/jwt.config.js";
import jwt from 'jsonwebtoken';

const catchError = (err, res) => {
    if (err) {
        return res.status(401).send({ message: "Unauthorized! Access Token was expired!" });
    }
    return res.status(403).send({ message: "Unauthorized!" });
}

export const isUser = (req, res, next) => {
    let bearerToken = req.headers.authorization;
    if (!bearerToken) return res.status(401).send({ message: "No token provided!" });

    let token = bearerToken.slice(7);
    jwt.verify(token, jwtConfig.secret, (err, decoded) => {
        if (err) return catchError(err, res);

        req.userid = (decoded).userid;
        console.log(decoded);
        next();
    });
};

export const isAdmin = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) return res.status(401).send({ message: "No token provided!" });

    jwt.verify(token, jwtConfig.secret, async (err, decoded) => {
        if (err) return catchError(err, res);

        // const userRole = await Models.UserRole.Table.findByPk((decoded as Token).username)
        // if (userRole && userRole.roleName === 'admin') req.isAdmin = true;
        else return catchError(new Error(), res);

        req.username = (decoded).username;
        next();
    });
};