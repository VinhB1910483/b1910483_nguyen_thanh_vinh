import { Router } from "express";
import userRoute from "./user.route.js";
// import userRoute from "./user.route";
import productRoute from "./product.route.js";
// import { convertRegexpQuery, convertStringToArray } from "@utils/convert.util";

const Route = Router();

Route.get('/', (req, res, next) => {
    res.json({ msg: 'Welcome to server !!!' });
})
// Route.use('/user', userRoute);
Route.use('/user', userRoute);
Route.use('/product', productRoute);


export default Route;