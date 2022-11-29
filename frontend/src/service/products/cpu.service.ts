import type { CpuPageResult, CpuQuery } from "@/types/api/products/cpu";
import type { AxiosInstance } from "axios";
import { createApiClient } from "../api.service";
import interceptorService from "../interceptor.service";

class CpuService {
    api: AxiosInstance;

    constructor(baseUrl = "/api/product/cpu") {
        this.api = createApiClient(baseUrl);
        interceptorService(this.api);
    }

    async getProduct({
        pageSize = 20,
        page = 1,
        query = <CpuQuery>{}, }): Promise<CpuPageResult | null> {
        return new Promise(async (resolve, reject) => {
            try {
                const res = (await this.api.get<CpuPageResult>("/", {
                    params: {
                        page: page,
                        pageSize: pageSize,
                        cpuId: query._id,
                        _id: query._id,
                        brand: query.brand,
                        processor: query.processor,
                        gen: query.gen,
                        socket: query.socket,
                        cpuName: query.cpuName,
                        igpu: query.igpu,
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
                brand: ['am', 'in'],
            }
        })).data;
        console.log(res)
    }
}

const cpuService = new CpuService();
export default cpuService;
