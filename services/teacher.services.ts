import axios, { AxiosError } from 'axios';
import type { TeacherSigupDto, TeacherUpdateDto, TeacherResponse, SignupResponse } from '~/interfaces/teacher.interface';
import { checkToken } from "./auth"; 
import type { Response } from "~/interfaces/response.interface";


export const signup = async (data: TeacherSigupDto): Promise<Response<SignupResponse> | null >=> {
    try {

        const authStore = useStore.authStore();

        const apiUrl = useRuntimeConfig().public.apiUrl;

        const response = await axios<Response<SignupResponse>>({
            method: 'post',
            url: apiUrl + "teacher/signup",
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

        return null;
    } 
}

export const update = async (teacherId: string ,data: TeacherUpdateDto) => {
    try {
        const authStore = useStore.authStore();

        if (!await checkToken()) {
            console.log('Unauthorize');

            return null;
        }
        const apiUrl = useRuntimeConfig().public.apiUrl;

        const response = await axios({
            method: 'put',
            url: apiUrl + "teacher/update/" + teacherId,
            data: {
                firstname: data.firstname, 
                lastname: data.lastname,
                dob: data.dob, 
                gender: data.gender, 
                line_contact: data.line_contact, 
                phone_contact: data.phone_contact
            },
            headers: {
                'Authorization': 'Bearer ' + authStore.access_token 
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

export const getTeacherById = async (teacherId: string):Promise<Response<TeacherResponse> | null>  => {
    try {
        const authStore = useStore.authStore();

        if (!await checkToken()) {
            console.log('Unauthorize');

            return null;
        }
        const apiUrl = useRuntimeConfig().public.apiUrl;

        const response = await axios<Response<TeacherResponse>>({
            method: 'get',
            url: apiUrl + "teacher/getById/" + teacherId,
            headers: {
                'Authorization': 'Bearer ' + authStore.access_token 
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



const teacherService = {
    signup,
    update,
    getTeacherById
}


export default teacherService;