import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import jwtConfig from "../configs/jwt.config.js";
import { StatusCodes } from 'http-status-codes';
import { UserService } from '../services/user.service.js';
import { MongoDB } from '../services/mongo.js';
import { v4 as uuidv4 } from 'uuid';

export const createAccessToken = async (userid) => {
    let tokenExpired = jwtConfig.jwtExpiration;

    const token = await jwt.sign(
        { userid: userid, iat: 0 },
        jwtConfig.secret,
        { expiresIn: tokenExpired }
    );
    tokenExpired = tokenExpired + Math.floor(Date.now() / 1000)
    return { token, tokenExpired };
}
/**
 * @status 200 OK
 * @status 409 User exist
 * @status 500 Server Cannot create
 */
export const signUp = async (req, res) => {
    const userData = {
        username: req.body.user.username,
        password: bcrypt.hashSync(req.body.user.password),
        email: req.body.user.email,
        name: req.body.user.name || '',
        lastname: req.body.user.lastname || '',
        address: '',
        city: '',
        phone: '',
    }

    try {
        const userService = new UserService(MongoDB.client)
        const isExist = await userService.findByUsername(userData.username)
        console.log(isExist)
        if (!isExist || !isExist.length) {
            const user = await userService.create(userData)
            if (user) {
                res.status(StatusCodes.OK).json(user);
            } else {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Currently cannot add, please try again" });
            }
            return;
        } else res.status(StatusCodes.CONFLICT).json({ err: 'User is exist' });
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
};
/**
 * @status 200 OK
 * @status 401 Invalid Password
 * @status 404 Invalid User
 * @status 500 Server Error
 */
export const signIn = async (req, res) => {
    const signInData = {
        username: req.body.user.username,
        password: req.body.user.password,
    }
    console.log(signInData);
    try {
        const userService = new UserService(MongoDB.client)
        const user = await userService.findByUsername(signInData.username)
        console.log('find user | user ctl 68');
        console.log(user)
        if (user.length) {
            const passwordIsValid = await bcrypt.compareSync(signInData.password, user[0].password);
            if (passwordIsValid) {
                const { token, tokenExpired } = await createAccessToken(user[0]._id);
                const refreshToken = await jwt.sign(
                    { userid: user[0]._id, iat: 0 },
                    jwtConfig.secret,
                    { expiresIn: jwtConfig.jwtRefreshExpiration }
                );
                await userService.updateRefreshToken(user[0]._id, refreshToken);
                return res.status(StatusCodes.OK).json({
                    username: user[0].username,
                    email: user[0].email,
                    name: user[0].name,
                    lastname: user[0].lastname,
                    address: user[0].address,
                    city: user[0].city,
                    phone: user[0].phone,
                    createdAt: user[0].createdAt,
                    updatedAt: user[0].updatedAt,
                    accessToken: token,
                    tokenExpired: tokenExpired,
                    refreshToken: refreshToken,
                });
            } else {
                return res.status(StatusCodes.UNAUTHORIZED).json({
                    message: "Invalid Password!"
                });
            }
        }
        return res.status(StatusCodes.NOT_FOUND).json({
            message: "User not exist!"
        });
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
};
/**
 * @status 200 OK
 * @status 404 No token provided || Refresh token not exist
 */
export const logout = async (req, res) => {
    const refreshToken = req.headers.refreshtoken;
    console.log(refreshToken);
    if (!refreshToken) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "No token provided!" });
    }
    res.status(StatusCodes.OK).json({ msg: "Log out successfully" });
};
/**
 * @status 200 OK
 * @status 404 No token provided || Refresh token not exist
 * @status 409 Unauthorized
 */
export const refreshToken = async (req, res) => {
    const refreshToken = req.headers.refreshtoken;
    if (!refreshToken) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "No token provided!" });
    }
    jwt.verify(refreshToken, jwtConfig.secret, async (err, decoded) => {
        if (err) return res.status(StatusCodes.FORBIDDEN).json({ msg: 'Unauthorized' });
        const userService = new UserService(MongoDB.client)

        const dbRefreshToken = await userService.findById((decoded).userid);
        if (!dbRefreshToken) {
            return res.status(StatusCodes.NOT_FOUND).json({ msg: "Refresh token not exist" });
        }
        if ((dbRefreshToken.tokenExpired).getTime() < new Date().getTime()) {
            await Models.RefreshToken.remove(refreshToken)
            return res.status(StatusCodes.FORBIDDEN).json({ msg: 'Unauthorized' });
        }
        const { token: newAccessToken, tokenExpired } = await createAccessToken(dbRefreshToken.username);
        return res.status(200).json({ newAccessToken, tokenExpired });
    });
};

export const updateUserAddress = async (req, res) => {
    if (req.body.user) console.log(req.body.user);
    console.log(req.userid);
    const userService = new UserService(MongoDB.client)
    await userService.update(req.userid, req.body.user)
    res.status(200).send("User updateUserAddress.");
};