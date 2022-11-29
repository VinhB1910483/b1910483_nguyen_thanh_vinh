import type { CpuPageResult } from "@/types/api/products/cpu";
import type { RamPageResult, RamQuery } from "@/types/api/products/ram";
import type { AxiosInstance } from "axios";
import { createApiClient } from "../api.service";
import interceptorService from "../interceptor.service";

class RamService {
    api: AxiosInstance;

    constructor(baseUrl = "/api/product/ram") {
        this.api = createApiClient(baseUrl);
        interceptorService(this.api);
    }

    async getProduct({
        pageSize = 20,
        page = 1,
        query = <RamQuery>{}, }): Promise<RamPageResult | null> {
        return new Promise(async (resolve, reject) => {
            try {
                const res = (await this.api.get<RamPageResult>("/", {
                    params: {
                        page: page,
                        pageSize: pageSize,
                        _id: query._id,
                        productName: query.productName,
                        productBrand: query.productBrand,
                        capacity: query.capacity,
                        speed: query.speed,
                        standard: query.standard,
                        module: query.module,
                        color: query.color,
                        latency: query.latency,
                        cas: query.cas,
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
    async test(productType?: string) {
        const res = (await this.api.get("/", {
            params: {
                type: productType,
            }
        })).data;
        console.log(res)
    }
}

const ramService = new RamService();
export default ramService;
