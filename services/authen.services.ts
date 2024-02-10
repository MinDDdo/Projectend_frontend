import axios, { AxiosError } from 'axios';
import type { LoginDto, LoginResponse, RefreshTokenDto } from '~/interfaces/authen.interface';
import type { Response } from '~/interfaces/response.interface';
import { checkToken } from "./auth"; 

export const login = async ({ email, password }: LoginDto): Promise<Response<LoginResponse> | null> => {
    try {
        const authStore = useStore.authStore();

        if (!await checkToken()) {
            console.log('Unauthorize');

            return null;
        }

        const apiUrl = useRuntimeConfig().public.apiUrl;

        const response = await axios<Response<LoginResponse>>({
            method: 'post',
            url: apiUrl + "auth/login",
            headers: {
                'Authorization': 'Bearer ' + authStore.access_token
            },
            data: {
                email: email,
                password: password
            }
        })

        console.log(response);
        
        return response.data;
    }catch (error){
        if (error instanceof AxiosError) {
            return error.response?.data;
        }

        console.log(error);
        return null;
    }
}

export const refreshToken = async ({ refresh_token }: RefreshTokenDto) => {
    try {
        const authStore = useStore.authStore();

        if (!await checkToken()) {
            console.log('Unauthorize');

            return null;
        }

        const apiUrl = useRuntimeConfig().public.apiUrl;

        const response = await axios({
            method: 'post',
            url: apiUrl + "auth/refresh_token",
            headers: {
                'Authorization': 'Bearer ' + authStore.access_token
            },
            data: {
                refresh_token: refresh_token
            }
        })

        return response.data;
    }catch (error){
        if (error instanceof AxiosError) {
            return error.response?.data;
        }

        return null;
    }
}

const authenService = {
    login,
    refreshToken
}

export default authenService;