import { ProductService } from "../services/product.service.js";
import { MongoDB } from '../services/mongo.js';
import serverConfig from "../configs/server.config.js";
import { convertStringToArray } from "../utils/convert.js";

export const allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

export const getProducts = async (req, res) => {
    let pageReq = parseInt(req.query.page) || 1;
    let pageSizeReq = parseInt(req.query.pageSize) || 50;
    const query = {
        _id: req.query._id,
        productType: req.query.productType,
        productName: req.query.productName,
        productBrand: req.query.productBrand,
    }
    if (pageReq < 0) pageReq = 0
    if (pageSizeReq < 0) pageSizeReq = 0

    const productService = new ProductService(MongoDB.client)
    let result = await productService.getProducts({
        page: pageReq,
        pageSize: pageSizeReq,
        query: query
    })
    // console.log(result);
    if (result.length) {
        const total = result.length
        let pageSize = pageSizeReq
        let page = pageReq
        let start = (page - 1) * pageSize;
        if (start > total) start = Math.ceil(total / pageSize - 1) * pageSize
        const currPage = start / pageSize + 1;
        const rawRecords = result.slice(start, start + 1 * pageSize)

        // const records = rawRecords;
        rawRecords.forEach(element => {
            element.productPhoto = serverConfig.SERVERNAME + element.productPhoto;
        });
        res.status(200).json({
            meta: {
                totalPage: Math.ceil(total / pageSize) || 0,
                totalItems: total,
                currentPage: currPage,
                pageSize: pageSize,
            },
            data: rawRecords
        })
    } else {
        res.status(500).json({ msg: 'no record' })
    }
}

export const getCpus = async (req, res) => {
    let pageReq = parseInt(req.query.page) || 1;
    let pageSizeReq = parseInt(req.query.pageSize) || 50;
    const query = {
        _id: req.query._id,
        productName: (req.query.cpuName),
        productBrand: convertStringToArray(req.query.brand),
        processor: convertStringToArray(req.query.processor),
        gen: convertStringToArray(req.query.gen),
        socket: convertStringToArray(req.query.socket),
        iGpu: convertStringToArray(req.query.igpu),
    }
    if (pageReq < 0) pageReq = 0
    if (pageSizeReq < 0) pageSizeReq = 0

    const productService = new ProductService(MongoDB.client)
    let result = await productService.getCpus({
        query: query
    })
    // console.log(result);
    if (result.length) {
        const total = result.length
        let pageSize = pageSizeReq
        let page = pageReq
        let start = (page - 1) * pageSize;
        if (start > total) start = Math.ceil(total / pageSize - 1) * pageSize
        const currPage = start / pageSize + 1;
        const rawRecords = result.slice(start, start + 1 * pageSize)

        // const records = rawRecords;
        rawRecords.forEach(element => {
            element.productPhoto = serverConfig.SERVERNAME + element.productPhoto;
        });
        res.status(200).json({
            meta: {
                totalPage: Math.ceil(total / pageSize) || 0,
                totalItems: total,
                currentPage: currPage,
                pageSize: pageSize,
            },
            data: rawRecords
        })
    } else {
        res.status(500).json({ msg: 'no record' })
    }
}
export const getMainboards = async (req, res) => {
    let pageReq = parseInt(req.query.page) || 1;
    let pageSizeReq = parseInt(req.query.pageSize) || 50;
    const query = {
        _id: req.query._id,
        productName: req.query.productName,
        productBrand: convertStringToArray(req.query.productBrand),
        chipset: convertStringToArray(req.query.chipset),
        socket: convertStringToArray(req.query.socket),
        ramStandard: convertStringToArray(req.query.ramStandard),
        form: convertStringToArray(req.query.form),
        color: convertStringToArray(req.query.color),
        ramCap: convertStringToArray(req.query.ramCap),
        ramSlot: convertStringToArray(req.query.ramSlot),
    }
    if (pageReq < 0) pageReq = 0
    if (pageSizeReq < 0) pageSizeReq = 0

    const productService = new ProductService(MongoDB.client)
    let result = await productService.getMainboards({
        query: query
    })
    // console.log(result);
    if (result.length) {
        const total = result.length
        let pageSize = pageSizeReq
        let page = pageReq
        let start = (page - 1) * pageSize;
        if (start > total) start = Math.ceil(total / pageSize - 1) * pageSize
        const currPage = start / pageSize + 1;
        const rawRecords = result.slice(start, start + 1 * pageSize)

        // const records = rawRecords;
        rawRecords.forEach(element => {
            element.productPhoto = serverConfig.SERVERNAME + element.productPhoto;
        });
        res.status(200).json({
            meta: {
                totalPage: Math.ceil(total / pageSize) || 0,
                totalItems: total,
                currentPage: currPage,
                pageSize: pageSize,
            },
            data: rawRecords
        })
    } else {
        res.status(500).json({ msg: 'no record' })
    }
}
export const getMonitors = async (req, res) => {
    let pageReq = parseInt(req.query.page) || 1;
    let pageSizeReq = parseInt(req.query.pageSize) || 50;
    const query = {
        _id: req.query._id,
        productName: req.query.productName,
        productBrand: convertStringToArray(req.query.productBrand),
        screenSize: convertStringToArray(req.query.screenSize),
        resolution: convertStringToArray(req.query.resolution),
        refreshRate: convertStringToArray(req.query.refreshRate),
        responseTime: convertStringToArray(req.query.responseTime),
        panelType: convertStringToArray(req.query.panelType),
        ratio: convertStringToArray(req.query.ratio),
    }
    if (pageReq < 0) pageReq = 0
    if (pageSizeReq < 0) pageSizeReq = 0

    const productService = new ProductService(MongoDB.client)
    let result = await productService.getMonitors({
        query: query
    })
    // console.log(result);
    if (result.length) {
        const total = result.length
        let pageSize = pageSizeReq
        let page = pageReq
        let start = (page - 1) * pageSize;
        if (start > total) start = Math.ceil(total / pageSize - 1) * pageSize
        const currPage = start / pageSize + 1;
        const rawRecords = result.slice(start, start + 1 * pageSize)

        // const records = rawRecords;
        rawRecords.forEach(element => {
            element.productPhoto = serverConfig.SERVERNAME + element.productPhoto;
        });
        res.status(200).json({
            meta: {
                totalPage: Math.ceil(total / pageSize) || 0,
                totalItems: total,
                currentPage: currPage,
                pageSize: pageSize,
            },
            data: rawRecords
        })
    } else {
        res.status(500).json({ msg: 'no record' })
    }
}
export const getMouses = async (req, res) => {
    let pageReq = parseInt(req.query.page) || 1;
    let pageSizeReq = parseInt(req.query.pageSize) || 50;
    const query = {
        _id: req.query._id,
        productName: req.query.productName,
        productBrand: convertStringToArray(req.query.productBrand),
        trackingMethod: convertStringToArray(req.query.trackingMethod),
        connectType: convertStringToArray(req.query.connectType),
        dpi: convertStringToArray(req.query.dpi),
        hand: convertStringToArray(req.query.hand),
        color: convertStringToArray(req.query.color),
    }
    if (pageReq < 0) pageReq = 0
    if (pageSizeReq < 0) pageSizeReq = 0

    const productService = new ProductService(MongoDB.client)
    let result = await productService.getMouses({
        query: query
    })
    // console.log(result);
    if (result.length) {
        const total = result.length
        let pageSize = pageSizeReq
        let page = pageReq
        let start = (page - 1) * pageSize;
        if (start > total) start = Math.ceil(total / pageSize - 1) * pageSize
        const currPage = start / pageSize + 1;
        const rawRecords = result.slice(start, start + 1 * pageSize)

        // const records = rawRecords;
        rawRecords.forEach(element => {
            element.productPhoto = serverConfig.SERVERNAME + element.productPhoto;
        });
        res.status(200).json({
            meta: {
                totalPage: Math.ceil(total / pageSize) || 0,
                totalItems: total,
                currentPage: currPage,
                pageSize: pageSize,
            },
            data: rawRecords
        })
    } else {
        res.status(500).json({ msg: 'no record' })
    }
}
export const getRams = async (req, res) => {
    let pageReq = parseInt(req.query.page) || 1;
    let pageSizeReq = parseInt(req.query.pageSize) || 50;
    const query = {
        _id: req.query._id,
        productName: req.query.productName,
        productBrand: convertStringToArray(req.query.productBrand),
        capacity: convertStringToArray(req.query.capacity),
        speed: convertStringToArray(req.query.speed),
        standard: convertStringToArray(req.query.standard),
        module: convertStringToArray(req.query.module),
        color: convertStringToArray(req.query.color),
        latency: convertStringToArray(req.query.latency),
        cas: convertStringToArray(req.query.cas),
        pricePerGb: convertStringToArray(req.query.pricePerGb),
    }
    if (pageReq < 0) pageReq = 0
    if (pageSizeReq < 0) pageSizeReq = 0

    const productService = new ProductService(MongoDB.client)
    let result = await productService.getRams({
        query: query
    })
    // console.log(result);
    if (result.length) {
        const total = result.length
        let pageSize = pageSizeReq
        let page = pageReq
        let start = (page - 1) * pageSize;
        if (start > total) start = Math.ceil(total / pageSize - 1) * pageSize
        const currPage = start / pageSize + 1;
        const rawRecords = result.slice(start, start + 1 * pageSize)

        // const records = rawRecords;
        rawRecords.forEach(element => {
            element.productPhoto = serverConfig.SERVERNAME + element.productPhoto;
        });
        res.status(200).json({
            meta: {
                totalPage: Math.ceil(total / pageSize) || 0,
                totalItems: total,
                currentPage: currPage,
                pageSize: pageSize,
            },
            data: rawRecords
        })
    } else {
        res.status(500).json({ msg: 'no record' })
    }
}
export const getStorageDrives = async (req, res) => {
    let pageReq = parseInt(req.query.page) || 1;
    let pageSizeReq = parseInt(req.query.pageSize) || 50;
    const query = {
        _id: req.query._id,
        productName: req.query.productName,
        productBrand: convertStringToArray(req.query.productBrand),
        type: convertStringToArray(req.query.type),
        capacity: convertStringToArray(req.query.capacity),
        maxRead: convertStringToArray(req.query.maxRead),
        maxWrite: convertStringToArray(req.query.maxWrite),
        cache: convertStringToArray(req.query.cache),
        form: convertStringToArray(req.query.form),
        interface: convertStringToArray(req.query.interface),
        pricePerGb: convertStringToArray(req.query.pricePerGb),
    }
    if (pageReq < 0) pageReq = 0
    if (pageSizeReq < 0) pageSizeReq = 0

    const productService = new ProductService(MongoDB.client)
    let result = await productService.getStorageDrives({
        query: query
    })
    // console.log(result);
    if (result.length) {
        const total = result.length
        let pageSize = pageSizeReq
        let page = pageReq
        let start = (page - 1) * pageSize;
        if (start > total) start = Math.ceil(total / pageSize - 1) * pageSize
        const currPage = start / pageSize + 1;
        const rawRecords = result.slice(start, start + 1 * pageSize)

        // const records = rawRecords;
        rawRecords.forEach(element => {
            element.productPhoto = serverConfig.SERVERNAME + element.productPhoto;
        });
        res.status(200).json({
            meta: {
                totalPage: Math.ceil(total / pageSize) || 0,
                totalItems: total,
                currentPage: currPage,
                pageSize: pageSize,
            },
            data: rawRecords
        })
    } else {
        res.status(500).json({ msg: 'no record' })
    }
}
export const getVideocards = async (req, res) => {
    let pageReq = parseInt(req.query.page) || 1;
    let pageSizeReq = parseInt(req.query.pageSize) || 50;
    const query = {
        _id: req.query._id,
        productName: req.query.productName,
        productBrand: convertStringToArray(req.query.productBrand),
        chipsetName: convertStringToArray(req.query.chipsetName),
        coreClock: convertStringToArray(req.query.coreClock),
        boostClock: convertStringToArray(req.query.boostClock),
        color: convertStringToArray(req.query.color),
        length: convertStringToArray(req.query.length),
        memory: convertStringToArray(req.query.memory),
    }
    if (pageReq < 0) pageReq = 0
    if (pageSizeReq < 0) pageSizeReq = 0

    const productService = new ProductService(MongoDB.client)
    let result = await productService.getVideocards({
        query: query
    })
    // console.log(result);
    if (result.length) {
        const total = result.length
        let pageSize = pageSizeReq
        let page = pageReq
        let start = (page - 1) * pageSize;
        if (start > total) start = Math.ceil(total / pageSize - 1) * pageSize
        const currPage = start / pageSize + 1;
        const rawRecords = result.slice(start, start + 1 * pageSize)

        // const records = rawRecords;
        rawRecords.forEach(element => {
            element.productPhoto = serverConfig.SERVERNAME + element.productPhoto;
        });
        res.status(200).json({
            meta: {
                totalPage: Math.ceil(total / pageSize) || 0,
                totalItems: total,
                currentPage: currPage,
                pageSize: pageSize,
            },
            data: rawRecords
        })
    } else {
        res.status(500).json({ msg: 'no record' })
    }
}