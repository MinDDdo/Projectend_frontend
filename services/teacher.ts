import axios, { AxiosError } from 'axios';
import type { TeachSigupDto } from '~/interfaces/teacher.interface';


export const signup = async (data: TeachSigupDto) => {
    try {
        const response = await axios({
            method: 'post',
            url: "http://localhost:8080/v1/auth/login",
            data: {
                firstname: data.firstname,
                lastname: data.lastname,
                dob: data.dob,
                gender: data.gender,
                email: data.email,
                password: data.password
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

const teacherService = {
    signup
}

export default teacherService;