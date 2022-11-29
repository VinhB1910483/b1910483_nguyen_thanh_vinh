import type { CpuPageResult } from "@/types/api/products/cpu";
import type { MousePageResult, MouseQuery } from "@/types/api/products/mouse";
import type { AxiosInstance } from "axios";
import { createApiClient } from "../api.service";
import interceptorService from "../interceptor.service";

class MouseService {
    api: AxiosInstance;

    constructor(baseUrl = "/api/product/mouse") {
        this.api = createApiClient(baseUrl);
        interceptorService(this.api);
    }

    async getProduct({
        pageSize = 20,
        page = 1,
        query = <MouseQuery>{}, }): Promise<MousePageResult | null> {
        return new Promise(async (resolve, reject) => {
            try {
                const res = (await this.api.get<MousePageResult>("/", {
                    params: {
                        page: page,
                        pageSize: pageSize,
                        _id: query._id,
                        productName: query.productName,
                        productBrand: query.productBrand,
                        trackingMethod: query.trackingMethod,
                        connectType: query.connectType,
                        dpi: query.dpi,
                        hand: query.hand,
                        color: query.color,
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

const mouseService = new MouseService();
export default mouseService;
