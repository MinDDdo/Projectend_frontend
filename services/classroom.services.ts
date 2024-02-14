import axios, { AxiosError } from "axios";
import type { ClassroomCreateDto, ClassroomResponse, ClassroomUpdateDto } from "~/interfaces/classroom.interface";
import { checkToken } from "./auth"; 
import type { Response } from "~/interfaces/response.interface";

export const createClassroom = async (data: ClassroomCreateDto) => {
    try {
        const authStore = useStore.authStore();

        if (!await checkToken()) {
            console.log('Unauthorize');

            return null;
        }

        const apiUrl = useRuntimeConfig().public.apiUrl;

        const response = await axios({
            method: 'post',
            url: apiUrl + "classroom/create",
            headers: {
                'Authorization': 'Bearer ' + authStore.access_token
            },
            data: {
                name: data.name,
                owner: data.owner,
                subject_code: data.subject_code,
                grade: data.grade,
                image: data.image
            }
        })

        return response.data;
    }catch (error) {
        if (error instanceof AxiosError){
            return error.response?.data;
        }
        return null;
    }
}

export const getAllClassroom = async (teacherId: string): Promise<Response<ClassroomResponse[]> | null> => {
    try {
        const authStore = useStore.authStore();

        if (!await checkToken()) {
            console.log('Unauthorize');

            return null;
        }

        const apiUrl = useRuntimeConfig().public.apiUrl;

        const response = await axios<Response<ClassroomResponse[]>>({
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

export const getClassroomById = async (classroomId: string): Promise<Response<ClassroomResponse> | null> => {
    try {
        const authStore = useStore.authStore();

        if (!await checkToken()) {
            console.log('Unauthorize');

            return null;
        }

        const apiUrl = useRuntimeConfig().public.apiUrl;
        
        const response = await axios<Response<ClassroomResponse>>({
            method: 'get',
            url: apiUrl + "classroom/getById/" + classroomId,
            headers: {
                'Authorization': 'Bearer ' + authStore.access_token 
            }
        })
        return response.data;

    }catch(error) {
        if (error instanceof AxiosError){
            return error.response?.data;
        }
        return null;
    }
}

export const updateClassroomById = async (classroomId:string, data: ClassroomUpdateDto) => {
    try{
        const authStore = useStore.authStore();

        if (!await checkToken()) {
            console.log('Unauthorize');

            return null;
        }

        const apiUrl = useRuntimeConfig().public.apiUrl;

        const response = await axios({
            method: 'put',
            url: apiUrl + "classroom/updateById/" + classroomId,
            headers: {
                'Authorization': 'Bearer ' + authStore.access_token
            },
            data: {
                name: data.name
            }
        })
        return response.data;

    }catch (error){
        if (error instanceof AxiosError){
            return error.response?.data;
        }
        return null;
    }
}

export const deleteClassroomById = async (classroomId: string) => {
    try {
        const authStore = useStore.authStore();

        if (!await checkToken()) {
            console.log('Unauthorize');

            return null;
        }

        const apiUrl = useRuntimeConfig().public.apiUrl;

        const response = await axios({
            method: 'delete',
            url: apiUrl + "classroom/deleteById/" + classroomId,
            headers: {
                'Authorization': 'Bearer ' + authStore.access_token
            }
        })
        return response.data;

    }catch (error){
        if (error instanceof AxiosError){
            return error.response?.data;
        }
        return null;
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
