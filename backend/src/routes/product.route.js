import { Router } from "express";
// import { isAdmin, isUser } from "../../middlewares/user.js";
// import { getRams } from "../../controllers/products/ram.controller.js";
// import cpuRoute from "./cpu.route.js";
// import mainboardRoute from "./mainboard.route.js";
// import monitorRoute from "./monitor.route.js";
// import ramRoute from "./ram.route.js";
// import storageDriveRoute from "./storageDrive.route.js";
// import mouseRoute from "./mouse.route.js";
// import videoCardRoute from "./videocard.route.js";
import {
    getProducts,
    getCpus,
    getMainboards,
    getMonitors,
    getMouses,
    getRams,
    getStorageDrives,
    getVideocards
} from "../controllers/product.controller.js";

const productRoute = Router();

productRoute.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
});

productRoute.get('/', getProducts)
productRoute.use('/cpu', getCpus);
productRoute.use('/mainboard', getMainboards);
productRoute.use('/monitor', getMonitors);
productRoute.use('/mouse', getMouses);
productRoute.use('/ram', getRams);
productRoute.use('/storage-drive', getStorageDrives);
productRoute.use('/video-card', getVideocards);

// productRoute.get('/test')

export default productRoute;