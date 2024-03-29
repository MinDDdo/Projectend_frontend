import { jwtDecode } from 'jwt-decode';
import dayjs from 'dayjs';

const createToken = async (name: string, token: string) => {
    const decode: { 
        exp: number
        iat: number
        id: string
    } =  jwtDecode(token);

    setTimeout(async () => {
        const cookie = await useCookie(name, {
            sameSite: 'strict'
        });
        cookie.value = token;
    }, 5);
}

const getToken = async (name: string) => {
    const cookie = await useCookie<string>(name);

    return cookie.value;
}

export default {
    createToken,
    getToken
}