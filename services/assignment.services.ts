import axios, { AxiosError } from "axios";
import type { AssignmentCheckDto, AssignmentCreateDto, AssignmentResponse, AssignmentUpdateDto, AssigntmentCheckStatus } from "~/interfaces/assignment.interface";
import { checkToken } from "./auth"; 
import type { Response } from "~/interfaces/response.interface";

export const createAssignment = async (classroomId: string, data: AssignmentCreateDto)
    :Promise<Response<AssignmentCreateDto> | null> => {
    try {
        const authStore = useStore.authStore();
        const apiUrl = useRuntimeConfig().public.apiUrl;

        const response = await axios<Response<AssignmentCreateDto>>({
            method: 'post',
            url: apiUrl + `assignment/${classroomId}/create-assignment`,
            headers: {
                'Authorization': 'Bearer ' + authStore.access_token
            },
            data: {
                assign_name: data.assign_name,
                assign_detail: data.assign_detail,
                assign_due: data.assign_due
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

export const getAllAssignment = async (classroomId: string): Promise<Response<AssignmentResponse[]> | null> => {
    try {
        const authStore = useStore.authStore();

        if (!await checkToken()) {
            return null;
        }

        const apiUrl = useRuntimeConfig().public.apiUrl;

        const response = await axios<Response<AssignmentResponse[]>>({
            method: 'get',
            url: apiUrl + "assignment/"+ classroomId +"/getAll-assignment",
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

export const getAssignmentById = async (assignmentId: string): Promise<Response<AssignmentResponse> | null> => {
    try {
        const authStore = useStore.authStore();

        if (!await checkToken()) {
            return null;
        }

        const apiUrl = useRuntimeConfig().public.apiUrl;

        const response = await axios<Response<AssignmentResponse>>({
            method: 'get',
            url: apiUrl + "assignment/getById-assignment/" + assignmentId,
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

export const updateAssignmentById = async (assignmentId: string, data: AssignmentUpdateDto): Promise<Response<null> | null> => {
    try {
        const authStore = useStore.authStore();

        if (!await checkToken()) {
            return null;
        }

        const apiUrl = useRuntimeConfig().public.apiUrl;

        const response = await axios<Response<null>>({
            method: 'put',
            url: apiUrl + "assignment/update-assignment/" + assignmentId,
            headers: {
                'Authorization': 'Bearer ' + authStore.access_token
            },
            data: {
                assign_name: data.assign_name,
                assign_detail: data.assign_detail,
                assign_due: data.assign_due
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

export const deleteAssignmentById = async (assignmentId: string): Promise<Response<null> | null> => {
    try {
        const authStore = useStore.authStore();

        if (!await checkToken()) {
            return null;
        }

        const apiUrl = useRuntimeConfig().public.apiUrl;

        const response = await axios<Response<null>>({
            method: 'delete',
            url: apiUrl + "assignment/delete-assignment/" + assignmentId,
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

export const checkAssignment = async (assignmentId: string, data: AssignmentCheckDto): Promise<Response<null> | null> => {
    try {
        const authStore = useStore.authStore();

        if (!await checkToken()) {
            return null;
        }

        const apiUrl = useRuntimeConfig().public.apiUrl;

        const response = await axios({
            method: 'post',
            url: apiUrl + "assignment/check-assignment/" + assignmentId,
            headers: {
                'Authorization': 'Bearer ' + authStore.access_token
            },
            data: {
                no: data.no,
                checked: data.checked
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

export const studentCheckStatusAssignment = async (data: AssigntmentCheckStatus) => {
    try {
        const authStore = useStore.authStore();

        if (!await checkToken()) {
            return null;
        }

        const apiUrl = useRuntimeConfig().public.apiUrl; 

        const response = await axios({
            method: 'post',
            url: apiUrl + "assignment/check-handin",
            headers: {
                'Authorization': 'Bearer ' + authStore.access_token
            },
            data: {
                no: data.no,
                classroom_id: data.classroom_id
            }
        })
        return response.data;
    }catch (error){
        if (error instanceof AxiosError){
            return error.response?.data
        }
        return null;
    }
}

const assignmentService = {
    createAssignment,
    getAllAssignment,
    getAssignmentById,
    updateAssignmentById,
    deleteAssignmentById,
    studentCheckStatusAssignment,
    checkAssignment
}

export default assignmentService;
