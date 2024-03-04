import _ from 'lodash';
import dayjs from 'dayjs';
import axios, { AxiosError } from 'axios';
import type { Response } from '~/interfaces/response.interface'; 
import type { LoginResponse } from '~/interfaces/authen.interface';
import { jwtDecode } from 'jwt-decode';

export const checkToken = async () => {
    const authStore = useStore.authStore();

    if (_.isEmpty(authStore.access_token) && _.isEmpty(authStore.refresh_token)) {
        console.log('Invalid Token');
        authStore.$reset();

        return false;
    }

    const accessDecode: { exp: number } = jwtDecode(authStore.access_token);
    const refreshDecode: { exp: number } = jwtDecode(authStore.refresh_token);

    const config = useRuntimeConfig().public.apiUrl;
    

    // Check expired ACCESS TOKEN
    if (dayjs.unix(accessDecode.exp).isBefore(dayjs())) {
        console.log('Access Expired')
        authStore.access_token = '';

        // Check expired REFRESH TOKEN
        if (dayjs.unix(refreshDecode.exp).isBefore(dayjs())) {
            console.log('Resfres Exprired');
            authStore.$reset();

            console.log('Go to login');
            return false;
        }
        
        console.log('Refesh token');

        try {
            const response = await axios<Response<Pick<LoginResponse, 'access_token'>>>({
                method: 'post',
                url: config + 'auth/refresh_token',
                data: { 
                    refresh_token: authStore.refresh_token
                }
            });

            authStore.access_token = response.data.result.data.access_token;

            return true;
        } catch (error) {
            console.log(error);
            if (error instanceof AxiosError) {
                return false;
            }

            return false;
        }
    }

    return true;
}

export const checkStudentToken = async () => {
    const authStudentStore = useStore.authStudentStore();

    if (_.isEmpty(authStudentStore.access_token) && _.isEmpty(authStudentStore.refresh_token)) {
        console.log('Invalid Token');
        authStudentStore.$reset();

        return false;
    }

    const accessDecode: { exp: number } = jwtDecode(authStudentStore.access_token);
    const refreshDecode: { exp: number } = jwtDecode(authStudentStore.refresh_token);

    const config = useRuntimeConfig().public.apiUrl;
    

    // Check expired ACCESS TOKEN
    if (dayjs.unix(accessDecode.exp).isBefore(dayjs())) {
        console.log('Access Expired')
        authStudentStore.access_token = '';

        // Check expired REFRESH TOKEN
        if (dayjs.unix(refreshDecode.exp).isBefore(dayjs())) {
            console.log('Resfres Exprired');
            authStudentStore.$reset();

            console.log('Go to login');
            return false;
        }
        
        console.log('Refesh token');

        try {
            const response = await axios<Response<Pick<LoginResponse, 'access_token'>>>({
                method: 'post',
                url: config + 'auth/refresh_token',
                data: { 
                    refresh_token: authStudentStore.refresh_token
                }
            });

            authStudentStore.access_token = response.data.result.data.access_token;

            return true;
        } catch (error) {
            console.log(error);
            if (error instanceof AxiosError) {
                return false;
            }

            return false;
        }
    }

    return true;
}