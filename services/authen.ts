import axios, { AxiosError } from 'axios';

export const login = async (email: string, password: string) => {
    try {
        const response = await axios({
            method: 'post',
            url: "http://localhost:8080/v1/auth/login",
            data: {
                email: email,
                password: password
            }
        })
        return response.data

    }catch (error){
        console.log(error);
    }
    
}