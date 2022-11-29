import type { CpuPageResult } from "@/types/api/products/cpu";
import type { MainboardPageResult, MainboardQuery } from "@/types/api/products/mainboard";
import type { AxiosInstance } from "axios";
import { createApiClient } from "../api.service";
import interceptorService from "../interceptor.service";

class MainboardService {
    api: AxiosInstance;

    constructor(baseUrl = "/api/product/mainboard") {
        this.api = createApiClient(baseUrl);
        interceptorService(this.api);
    }

    async getProduct({
        pageSize = 20,
        page = 1,
        query = <MainboardQuery>{}, }): Promise<MainboardPageResult | null> {
        return new Promise(async (resolve, reject) => {
            try {
                const res = (await this.api.get<MainboardPageResult>("/", {
                    params: {
                        page: page,
                        pageSize: pageSize,
                        _id: query._id,
                        productName: query.productName,
                        productBrand: query.productBrand,
                        chipset: query.chipset,
                        socket: query.socket,
                        ramStandard: query.ramStandard,
                        form: query.form,
                        color: query.color,
                        ramCap: query.ramCap,
                        ramSlot: query.ramSlot,
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

const mainboardService = new MainboardService();
export default mainboardService;
