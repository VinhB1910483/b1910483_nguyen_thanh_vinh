import type { CpuPageResult } from "@/types/api/products/cpu";
import type { StorageDrivePageResult, StorageDriveQuery } from "@/types/api/products/storagedrive";
import type { AxiosInstance } from "axios";
import { createApiClient } from "../api.service";
import interceptorService from "../interceptor.service";

class StoageDriveService {
    api: AxiosInstance;

    constructor(baseUrl = "/api/product/storage-drive") {
        this.api = createApiClient(baseUrl);
        interceptorService(this.api);
    }

    async getProduct({
        pageSize = 20,
        page = 1,
        query = <StorageDriveQuery>{}, }): Promise<StorageDrivePageResult | null> {
        return new Promise(async (resolve, reject) => {
            try {
                const res = (await this.api.get<StorageDrivePageResult>("/", {
                    params: {
                        page: page,
                        pageSize: pageSize,
                        _id: query._id,
                        productName: query.productName,
                        productBrand: query.productBrand,
                        type: query.type,
                        capacity: query.capacity,
                        maxRead: query.maxRead,
                        maxWrite: query.maxWrite,
                        cache: query.cache,
                        form: query.form,
                        interface: query.interface,
                        pricePerGb: query.pricePerGb,
                    }

                })).data;
                console.log(res)
                resolve(res);
            } catch (error) {
                reject(null);
            }
        })
    }
    async test(productType: string) {
        const res = (await this.api.get("/", {
            params: {
                type: productType,
            }
        })).data;
        console.log(res)
    }
}

const stoageDriveService = new StoageDriveService();
export default stoageDriveService;
