import type { UserFormData } from "@/types/api/system/user";
import type { AxiosInstance } from "axios";
import axios from "axios";
import { createApiClient } from "./api.service";
import interceptorService from "./interceptor.service";

class UserService {
    api: AxiosInstance;

    constructor(baseUrl = "/api/user") {
        this.api = createApiClient(baseUrl);
        interceptorService(this.api);
    }

    async updateUser(data: UserFormData) {
        return new Promise<boolean>(async (resolve, reject) => {
            try {
                const res = await this.api.patch("/profile", {
                    "user": {
                        "address": data.address,
                        "city": data.city,
                        "phone": data.phone,
                    }
                })
                resolve(true);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    reject(error);
                }
                reject(false);
            }
        })
    }
    async test() {
        const res = (await this.api.get("/profile")).data;
        console.log(res)
    }
}

const userService = new UserService()
export default userService;
