import type { UserSignInForm, UserSignUpForm } from "@/types/api/system/auth";
import type { UserFormData, UserItem } from "@/types/api/system/user";
import type { AxiosInstance, AxiosError } from "axios";
import axios from "axios";
import { createApiClient } from "./api.service";
import interceptor from './interceptor.service'
import tokenService from "./token.service";
class AuthService {
    api: AxiosInstance;

    constructor(baseUrl = "/api/user") {
        this.api = createApiClient(baseUrl);
        interceptor(this.api);
    }

    async signup(data: UserSignUpForm) {
        return new Promise<UserItem>(async (resolve, reject) => {
            try {
                const res = await this.api.post("/signup", {
                    "user": {
                        "username": data.username,
                        "email": data.email,
                        "name": data.name,
                        "lastname": data.lastname,
                        "password": data.password,
                        "roles": data?.roles
                    }
                })
                console.log(res.data)
                resolve(res.data);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    reject(error);
                }
                reject(null);
            }
        })
    }

    signin(data: UserSignInForm) {
        return new Promise<UserItem>(async (resolve, reject) => {
            try {
                const res = await this.api.post("/signin", {
                    "user": {
                        "username": data.userName,
                        "password": data.password
                    }
                })
                resolve(res.data);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    reject(error);
                }
                console.log(error)
                reject(null);
            }
        })
    }

    async logout() {
        return (await this.api.post("/logout", {},
            { headers: { "refreshToken": tokenService.getLocalRefreshToken(), } })).data;
    }

    async refreshToken() {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const res = await this.api.post(
                    "/refreshToken",
                    {},
                    { headers: { "refreshToken": await tokenService.getLocalRefreshToken(), } })
                tokenService.updateLocalAccessToken(res.data.newAccessToken, res.data.tokenExpired)
                resolve(res.data);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    reject(error);
                }
            }
            reject(null);

        })
    }
    async test() {
        return (await this.api.get("/")).data;
    }
}

const authService = new AuthService()
export default authService;
