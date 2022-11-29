import type { CpuPageResult } from "@/types/api/products/cpu";
import type { VideoCardPageResult, VideoCardQuery } from "@/types/api/products/videocard";
import type { AxiosInstance } from "axios";
import { createApiClient } from "../api.service";
import interceptorService from "../interceptor.service";

class VideoCardService {
    api: AxiosInstance;

    constructor(baseUrl = "/api/product/video-card") {
        this.api = createApiClient(baseUrl);
        interceptorService(this.api);
    }

    async getProduct({
        pageSize = 20,
        page = 1,
        query = <VideoCardQuery>{}, }): Promise<VideoCardPageResult | null> {
        return new Promise(async (resolve, reject) => {
            try {
                const res = (await this.api.get<VideoCardPageResult>("/", {
                    params: {
                        page: page,
                        pageSize: pageSize,
                        _id: query._id,
                        productName: query.productName,
                        productBrand: query.productBrand,
                        chipsetName: query.chipsetName,
                        coreClock: query.coreClock,
                        boostClock: query.boostClock,
                        color: query.color,
                        length: query.length,
                        memory: query.memory,
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

const videoCardService = new VideoCardService();
export default videoCardService;
