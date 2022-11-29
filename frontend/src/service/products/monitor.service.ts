import type { CpuPageResult } from "@/types/api/products/cpu";
import type { MonitorPageResult, MonitorQuery } from "@/types/api/products/monitor";
import type { AxiosInstance } from "axios";
import { createApiClient } from "../api.service";
import interceptorService from "../interceptor.service";

class MonitorService {
    api: AxiosInstance;

    constructor(baseUrl = "/api/product/monitor") {
        this.api = createApiClient(baseUrl);
        interceptorService(this.api);
    }

    async getProduct({
        pageSize = 20,
        page = 1,
        query = <MonitorQuery>{}, }): Promise<MonitorPageResult | null> {
        return new Promise(async (resolve, reject) => {
            try {
                const res = (await this.api.get<MonitorPageResult>("/", {
                    params: {
                        page: page,
                        pageSize: pageSize,
                        _id: query._id,
                        productName: query.productName,
                        productBrand: query.productBrand,
                        screenSize: query.screenSize,
                        resolution: query.resolution,
                        refreshRate: query.refreshRate,
                        responseTime: query.responseTime,
                        panelType: query.panelType,
                        ratio: query.ratio,
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

const monitorService = new MonitorService();
export default monitorService;
