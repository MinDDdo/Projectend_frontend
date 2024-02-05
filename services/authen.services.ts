import axios, { AxiosError } from 'axios';
import type { LoginDto, RefreshTokenDto } from '~/interfaces/authen.interface';
import type { Response } from '~/interfaces/response.interface';

export const login = async ({ email, password }: LoginDto): Promise<Response<any> | any> => {
    try {
        const response = await axios({
            method: 'post',
            url: "http://localhost:8080/v1/auth/login",
            data: {
                email: email,
                password: password
            }
        })

        return response.data;
    }catch (error){
        if (error instanceof AxiosError) {
            return error.response?.data;
        }

        return 'Something went wrong';
    }
}

export const refreshToken = async ({ refresh_token }: RefreshTokenDto) => {
    try {
        const response = await axios({
            method: 'post',
            url: "http://localhost:8080/v1/auth/refresh_token",
            data: {
                refresh_token: refresh_token
            }
        })

        return response.data;
    }catch (error){
        if (error instanceof AxiosError) {
            return error.response?.data;
        }

        return 'Something went wrong';
    }
}

const authenService = {
    login,
    refreshToken
}

export default authenService;