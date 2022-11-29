import { ObjectId } from 'mongodb';
import { toIdFilter, toInArrayFilter, toRegExpFilter } from '../utils/convert.js';

export class ProductService {
    constructor(client) {
        this.Product = client.db().collection("products");
    }

    async getProducts({
        page = 1,
        pageSize = 50,
        query,
    }) {
        try {
            // Get total query record
            const idFiltter = toIdFilter({ _id: query._id })
            const filter = toRegExpFilter({
                productType: query.productType,
                productName: query.productName,
                productBrand: query.productBrand,
            });
            console.log({
                ...idFiltter,
                ...filter
            });
            const cursor = await this.Product.find(filter);
            const result = await cursor.toArray()
            return result;
        } catch (err) {
            console.log(err)
            return false;
        }
    }
    async getCpus({
        query,
    }) {
        try {
            // Get total query record
            const idFiltter = toIdFilter({ _id: query._id })
            const regExpFilter = toRegExpFilter({
                productName: query.productName,
                productBrand: query.productBrand,
                processor: query.processor,
                gen: query.gen,
                socket: query.socket,
                iGpu: query.iGpu,
            })
            const filter = {
                productType: 'cpu',
                ...idFiltter,
                ...regExpFilter
            }
            console.log(filter);
            const cursor = await this.Product.find(filter);
            const result = await cursor.toArray()
            return result;
        } catch (err) {
            console.log(err)
            return false;
        }
    }
    async getMainboards({
        query,
    }) {
        try {
            // Get total query record
            const idFiltter = toIdFilter({ _id: query._id })
            const inArrayFilter = toInArrayFilter({
                ramCap: query.ramCap,
                ramSlot: query.ramSlot,
            })
            const regExpFilter = toRegExpFilter({
                productName: query.productName,
                productBrand: query.productBrand,
                chipset: query.chipset,
                socket: query.socket,
                ramStandard: query.ramStandard,
                form: query.form,
                color: query.color,
            })
            const filter = {
                productType: 'mainboard',
                ...idFiltter,
                ...inArrayFilter,
                ...regExpFilter
            }
            console.log(filter);
            const cursor = await this.Product.find(filter);
            const result = await cursor.toArray()
            return result;
        } catch (err) {
            console.log(err)
            return false;
        }
    }
    async getMonitors({
        query,
    }) {
        try {
            // Get total query record
            const idFiltter = toIdFilter({ _id: query._id })
            const inArrayFilter = toInArrayFilter({})
            const regExpFilter = toRegExpFilter({
                productName: query.productName,
                productBrand: query.productBrand,
                screenSize: query.screenSize,
                resolution: query.resolution,
                refreshRate: query.refreshRate,
                responseTime: query.responseTime,
                panelType: query.panelType,
                ratio: query.ratio,
            })
            const filter = {
                productType: 'monitor',
                ...idFiltter,
                ...regExpFilter
            }
            console.log(filter);
            const cursor = await this.Product.find(filter);
            const result = await cursor.toArray()
            return result;
        } catch (err) {
            console.log(err)
            return false;
        }
    }
    async getMouses({
        query,
    }) {
        try {
            // Get total query record
            const idFiltter = toIdFilter({ _id: query._id })
            const inArrayFilter = toInArrayFilter({
                dpi: query.dpi,
            })
            const regExpFilter = toRegExpFilter({
                productName: query.productName,
                productBrand: query.productBrand,
                trackingMethod: query.trackingMethod,
                connectType: query.connectType,
                hand: query.hand,
                color: query.color,
            })
            const filter = {
                productType: 'mouse',
                ...idFiltter,
                ...inArrayFilter,
                ...regExpFilter
            }
            console.log(filter);
            const cursor = await this.Product.find(filter);
            const result = await cursor.toArray()
            return result;
        } catch (err) {
            console.log(err)
            return false;
        }
    }
    async getRams({
        query,
    }) {
        try {
            // Get total query record
            const idFiltter = toIdFilter({ _id: query._id })
            const inArrayFilter = toInArrayFilter({
                capacity: query.capacity,
                speed: query.speed,
                latency: query.latency,
                cas: query.cas,
                pricePerGb: query.pricePerGb,
            })
            const regExpFilter = toRegExpFilter({
                productName: query.productName,
                productBrand: query.productBrand,
                standard: query.standard,
                module: query.module,
                color: query.color,
            })
            const filter = {
                productType: 'ram',
                ...idFiltter,
                ...inArrayFilter,
                ...regExpFilter
            }
            console.log(filter);
            const cursor = await this.Product.find(filter);
            const result = await cursor.toArray()
            return result;
        } catch (err) {
            console.log(err)
            return false;
        }
    }
    async getStorageDrives({
        query,
    }) {
        try {
            // Get total query record
            const idFiltter = toIdFilter({ _id: query._id })
            const inArrayFilter = toInArrayFilter({
                pricePerGb: query.pricePerGb,
            })
            const regExpFilter = toRegExpFilter({
                productName: query.productName,
                productBrand: query.productBrand,
                type: query.type,
                capacity: query.capacity,
                maxRead: query.maxRead,
                maxWrite: query.maxWrite,
                cache: query.cache,
                form: query.form,
                interface: query.interface,
            })
            const filter = {
                productType: 'storage drive',
                ...idFiltter,
                ...inArrayFilter,
                ...regExpFilter
            }
            console.log(filter);
            const cursor = await this.Product.find(filter);
            const result = await cursor.toArray()
            return result;
        } catch (err) {
            console.log(err)
            return false;
        }
    }
    async getVideocards({
        query,
    }) {
        try {
            // Get total query record
            const idFiltter = toIdFilter({ _id: query._id })
            const inArrayFilter = toInArrayFilter({
                length: query.length,
                memory: query.memory,
            })
            const regExpFilter = toRegExpFilter({
                productName: query.productName,
                productBrand: query.productBrand,
                chipsetName: query.chipsetName,
                coreClock: query.coreClock,
                boostClock: query.boostClock,
                color: query.color,
            })
            const filter = {
                productType: 'video card',
                ...idFiltter,
                ...inArrayFilter,
                ...regExpFilter
            }
            console.log(filter);
            const cursor = await this.Product.find(filter);
            const result = await cursor.toArray()
            return result;
        } catch (err) {
            console.log(err)
            return false;
        }
    }
}

