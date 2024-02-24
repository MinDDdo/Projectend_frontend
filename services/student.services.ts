import axios, { AxiosError } from "axios";
import { type StudentCreateDto, type RandomGroupDto, type StudentUpdateDto, type StudentResponse } from "~/interfaces/student.interface";
import { checkToken } from "./auth"; 
import type { Response } from "~/interfaces/response.interface";


export const createStudent = async (classroomId: string, data: StudentCreateDto) => {
    try {
        const authStore = useStore.authStore();

        if (!await checkToken()) {
            console.log('Unauthorize');

            return null;
        }

        const apiUrl = useRuntimeConfig().public.apiUrl;

        const response = await axios({
            method: 'post',
            url: apiUrl + "student/"+ classroomId +"/create-student" ,
            headers: {
                'Authorization': 'Bearer ' + authStore.access_token
            },
            data: {
                firstname: data.firstname,
                lastname: data.lastname,
                no: data.no
            }
        })
        return response.data
    }catch (error) {
        if (error instanceof AxiosError) {
            return error.response?.data;
        }

        return null;
    }
}

export const updateStudent = async (studentId: string, data: StudentUpdateDto) => {
    try {
        const authStore = useStore.authStore();

        if (!await checkToken()) {
            console.log('Unauthorize');

            return null;
        }

        const apiUrl = useRuntimeConfig().public.apiUrl;

        const response = await axios({
            method: 'put',
            url: apiUrl + "student/update-student/" + studentId,
            headers: {
                'Authorization': 'Bearer ' + authStore.access_token
            },
            data: {
                firstname: data.firstname,
                lastname: data.lastname
            }
        })
        return response.data;

    }catch (error) {
        if (error instanceof AxiosError) {
            return error.response?.data;
        }

        return null;
    }
}

export const getAllStudent = async (classroomId: string) => {
    try {
        const authStore = useStore.authStore();

        if (!await checkToken()) {
            console.log('Unauthorize');

            return null;
        }

        const apiUrl = useRuntimeConfig().public.apiUrl;

        const response = await axios<Response<StudentResponse[]>>({
            method: 'get',
            url: apiUrl + "student/"+ classroomId +"/getAll-student",
            headers: {
                'Authorization': 'Bearer ' + authStore.access_token
            }
        })
        return response.data;

    }catch (error) {
        if (error instanceof AxiosError) {
            return error.response?.data;
        }

        return null;
    }
}

export const getStudentById = async (
    classroomId: string ,
    studentId: string
): Promise<Response<StudentResponse> | null> => {
    try {
        const authStore = useStore.authStore();

        if (!await checkToken()) {
            console.log('Unauthorize');

            return null;
        }

        const apiUrl = useRuntimeConfig().public.apiUrl;

        const response = await axios<Response<StudentResponse>>({
            method: 'get',
            url: apiUrl + "student/"+ classroomId +"/getById-student/" + studentId,
            headers: {
                'Authorization': 'Bearer ' + authStore.access_token
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

export const deleteStudentById = async (studentId: string) => {
    try {
        const authStore = useStore.authStore();

        if (!await checkToken()) {
            console.log('Unauthorize');

            return null;
        }

        const apiUrl = useRuntimeConfig().public.apiUrl;

        const response = await axios({
            method: 'delete',
            url: apiUrl + "student/deleteById-student/" + studentId,
            headers: {
                'Authorization': 'Bearer ' + authStore.access_token
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

export const randomGroup = async (classroomId: string, data: RandomGroupDto) => {
    try {
        const authStore = useStore.authStore();

        if (!await checkToken()) {
            console.log('Unauthorize');

            return null;
        }

        const apiUrl = useRuntimeConfig().public.apiUrl;

        const response = await axios({
            method: 'post',
            url: apiUrl + "student/"+ classroomId +"/group-student",
            headers: {
                'Authorization': 'Bearer ' + authStore.access_token
            },
            data: {
                group_size: data.group_size
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

const studentService = {
    createStudent,
    updateStudent,
    getAllStudent, 
    getStudentById,
    deleteStudentById,
    randomGroup
}

export default studentService;