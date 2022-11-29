import type { ProductPageResult, ProductQuery } from "@/types/api/products/product";
import type { AxiosInstance } from "axios";
import { createApiClient } from "../api.service";
import interceptorService from "../interceptor.service";

class ProductService {
    api: AxiosInstance;

    constructor(baseUrl = "/api/product") {
        this.api = createApiClient(baseUrl);
        interceptorService(this.api);
    }
    async getProducts({ pageSize = 20, page = 1, query = <ProductQuery>{} }) {
        const res = (await this.api.get<ProductPageResult>("/", {
            params: {
                ...query,
                page: page,
                pageSize: pageSize,
            }
        })).data;
        console.log(res)
        return res;
    }

}

const productService = new ProductService();
export default productService;
