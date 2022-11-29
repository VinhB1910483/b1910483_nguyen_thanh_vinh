import { refreshToken, signIn, logout, signUp, updateUserAddress } from "../controllers/user.controller.js";
import { validateForm, validateLoginForm, validateRegisterForm, } from "../middlewares/requestValidator.js";
import { isUser } from "../middlewares/user.js";
import { Router } from "express";


const userRoute = Router();

userRoute.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-access-token, refreshtoken, Origin, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST");

    next();
});

userRoute.get('/', async (req, res, next) => {
    let rs = ''//await Models.User.findByUsername('vinh466')
    res.send('asdad');
})


userRoute.post('/signup', validateRegisterForm, validateForm, signUp)

userRoute.post('/signin', validateLoginForm, validateForm, signIn)

userRoute.post('/logout', logout)

userRoute.post('/refreshToken', refreshToken)

userRoute.get('/profile', isUser, (req, res, next) => {
    res.send('Welcome to User Profile');
})
userRoute.patch('/profile', isUser, updateUserAddress)

userRoute.post('/test', async (req, res) => {
    console.log(req.query.username);
    const isExist = ''//await Models.User.findByUsername(req.query.username)
    res.status(200).json(isExist);
})

export default userRoute;