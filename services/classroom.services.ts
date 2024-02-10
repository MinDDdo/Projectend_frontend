import axios, { AxiosError } from "axios";
import type { ClassroomCreateDto, ClassroomUpdateDto } from "~/interfaces/classroom.interface";
import { checkToken } from "./auth"; 
import type { Response } from "~/interfaces/response.interface";

export const createClassroom = async (data: ClassroomCreateDto) => {
    try {
        if (await checkToken()) {
            console.log('Unauthorize');

            return null;
        }

        const apiUrl = useRuntimeConfig().public.apiUrl;

        const access_token = await useAuth.getToken('access_token');

        const response = await axios({
            method: 'post',
            url: apiUrl + "classroom/create",
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            data: {
                name: data.name,
                owner: data.owner
            }
        })

        return response.data;
    }catch (error) {
        if (error instanceof AxiosError){
            return error.response?.data;
        }
        return 'Something went wrong';
    }
}

export const getAllClassroom = async (teacherId: string): Promise<Response<any> | null> => {
    try {
        const authStore = useStore.authStore();

        if (!await checkToken()) {
            console.log('Unauthorize');

            return null;
        }

        const apiUrl = useRuntimeConfig().public.apiUrl;

        const response = await axios({
            method: 'get',
            url: apiUrl + "classroom/getAll/" + teacherId,
            headers: {
                'Authorization': 'Bearer ' + authStore.access_token
            }
        })

        return response.data;
    }catch (error){
        console.log(error);

        if (error instanceof AxiosError){
            return error.response?.data;
        }
        
        return null;
    }
}

export const getClassroomById = async (classroomId: string) => {
    try {
        const response = await axios({
            method: 'get',
            url: "http://localhost/v1/classroom/getById/" + classroomId
        })
        return response.data;

    }catch(error) {
        if (error instanceof AxiosError){
            return error.response?.data;
        }
        return 'Something went wrong';
    }
}

export const updateClassroomById = async (classroomId:string, data: ClassroomUpdateDto) => {
    try{
        const response = await axios({
            method: 'put',
            url: "http://localhost/v1/classroom/updateById/" + classroomId,
            data: {
                name: data.name
            }
        })
        return response.data;

    }catch (error){
        if (error instanceof AxiosError){
            return error.response?.data;
        }
        return 'Something went wrong';
    }
}

export const deleteClassroomById = async (classroomId: string) => {
    try {
        const response = await axios({
            method: 'delete',
            url: "http://localhost/v1/classroom/deleteById/" + classroomId
        })
        return response.data;

    }catch (error){
        if (error instanceof AxiosError){
            return error.response?.data;
        }
        return 'Something went wrong';
    }
}

const classroomService = {
    createClassroom,
    getAllClassroom,
    getClassroomById,
    updateClassroomById,
    deleteClassroomById
}
export default classroomService
