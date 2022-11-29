import { useAuthStore } from "@/stores/auth/AuthStore";
import type { AxiosError, AxiosHeaders, AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import axios from 'axios'
import { createApiClient } from "./api.service";
import tokenService from "./token.service";

const apiClient = createApiClient('/');
// let MAX_RETRIES = 5;
// let ONE_MINUTE = 60 * 1000;
let isRefreshToken = false;
// let isRefreshing = false;
let subscribers: ((token: string) => void)[] = [];

function onRefreshed(authorisationToken: string) {
    subscribers.map(cb => {
        console.log('is retry ???');
        cb(authorisationToken)
    });
    subscribers = [];
}

function subscribeTokenRefresh(cb: ((token: string) => void)) {
    subscribers.push(cb);
}

interface AxiosConfig extends AxiosRequestConfig {
    retryCount?: number;
}
interface AxiosConfigCustom extends AxiosConfig {
    retryCount: number;
    authorization: string;
}
interface AxiosErrorCustom extends AxiosError {
    config: AxiosConfigCustom;
}

export default (axiosInstance: AxiosInstance) => {

    axiosInstance.interceptors.request.use(
        async (config: AxiosRequestConfig) => {
            const token = await tokenService.getLocalAccessToken();
            if (token && config.headers) {
                // type RawAxiosHeaders = Record<string, AxiosHeaderValue | AxiosHeaders>;
                config.headers = {
                    ...config.headers,
                    authorization: `Bearer ${token}`
                }
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    axiosInstance.interceptors.response.use(
        (response) => response,
        async (error: AxiosErrorCustom) => {
            /**
            * Retry when 401 requests
            *
            */
            const originalRequest = error.config;

            // if (originalRequest.url === "/signin" || originalRequest.url === "/refreshToken") {
            //     return Promise.reject(error);
            // }

            if (error.response?.status == 401) {

                if (!isRefreshToken) {
                    isRefreshToken = true;
                    try {
                        const success = await useAuthStore().refreshToken();
                        if (success) {
                            isRefreshToken = false;
                            originalRequest.headers = { //fix -> type RawAxiosHeaders = Record<string, AxiosHeaderValue | AxiosHeaders>;
                                ...originalRequest.headers,
                                authorization: `Bearer ${success.newAccessToken}`
                            }
                            onRefreshed(success.newAccessToken);
                            console.log(originalRequest)
                            return Promise.resolve(apiClient(originalRequest));
                        }
                    } catch (error) {
                        isRefreshToken = false;
                        subscribers = [];
                    }
                } else {
                    return new Promise(resolve => {
                        subscribeTokenRefresh(token => {
                            if (token && originalRequest.headers) {
                                originalRequest.headers = { //fix -> type RawAxiosHeaders = Record<string, AxiosHeaderValue | AxiosHeaders>;
                                    ...originalRequest.headers,
                                    authorization: `Bearer ${token}`
                                }
                            }
                            resolve(apiClient(originalRequest));
                        });
                    });
                }
            }
            return Promise.reject(error);
        },
    );
}
