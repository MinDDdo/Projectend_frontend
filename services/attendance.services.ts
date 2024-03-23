import axios, { AxiosError } from "axios";
import type { AttendanceCreateDto, AttendanceExportDto, AttendanceUpdateDto, AttendanceResponse } from "~/interfaces/attendance.interface";
import { checkToken } from "./auth"; 
import type { Response } from "~/interfaces/response.interface";
import { saveAs } from 'file-saver';



export const createAttendance = async (data: AttendanceCreateDto) => {
    try {
        const authStore = useStore.authStore();

        if (!await checkToken()) {
            console.log('Unauthorize');

            return null;
        }

        const apiUrl = useRuntimeConfig().public.apiUrl;

        const response = await axios({
            method: 'post',
            url: apiUrl + "attendance/create-attendance",
            headers: {
                'Authorization': 'Bearer ' + authStore.access_token
            },
            data: {
                attendance_date: data?.attendance_date,
                student: data?.student,
                classroom_id: data?.classroom_id
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

export const updateAttendance = async (attendanceId: string, data: AttendanceUpdateDto) => {
    try {
        const authStore = useStore.authStore();

        if (!await checkToken()) {
            console.log('Unauthorize');

            return null;
        }

        const apiUrl = useRuntimeConfig().public.apiUrl;

        const response = await axios({
            method: 'put',
            url: apiUrl + "attendance/"+ attendanceId +"/update-attendance",
            headers: {
                'Authorization': 'Bearer ' + authStore.access_token
            },
            data: {
                student: data.student
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

export const deleteAttendance = async (attendanceId: string) => {
    try {
        const authStore = useStore.authStore();

        if (!await checkToken()) {
            console.log('Unauthorize');

            return null;
        }

        const apiUrl = useRuntimeConfig().public.apiUrl;

        const response = await axios({
            method: 'delete',
            url: apiUrl + "attendance/"+ attendanceId +"/delete-attendance",
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

export const getAllAttendance = async (classroomId: string): Promise<Response<AttendanceResponse[]> | null> => {
    try {
        const authStore = useStore.authStore();

        if (!await checkToken()) {
            console.log('Unauthorize');

            return null;
        }

        const apiUrl = useRuntimeConfig().public.apiUrl; 

        const response = await axios<Response<AttendanceResponse[]>>({
            method: 'get',
            url: apiUrl + "attendance/"+ classroomId +"/getAll-attendance",
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

export const getAttendanceById = async (attendanceId: string) => {
    try {
        const authStore = useStore.authStore();

        if (!await checkToken()) {
            console.log('Unauthorize');

            return null;
        }

        const apiUrl = useRuntimeConfig().public.apiUrl; 

        const response = await axios({
            method: 'get',
            url: apiUrl + "attendance/"+ attendanceId +"/getById-attendance",
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

export const exportAttendance = async (classroom_id: string, startDate: string, endDate: string): Promise<any | null> => {
    try {
        const authStore = useStore.authStore();

        if (!await checkToken()) {
            console.log('Unauthorize');

            return null;
        }

        const apiUrl = useRuntimeConfig().public.apiUrl; 
         
        const response = await axios({
            method: 'post',
            url: apiUrl + "attendance/export-attendance-excel",
            responseType: 'arraybuffer',
            headers: {
                'Authorization': 'Bearer ' + authStore.access_token
            },
            data: {
                classroom_id: classroom_id
            },
            params: {
                start_date: startDate,
                end_date: endDate
            }
        })

        // console.log(response);

        // const contentType = response.headers['content-type'];
        // const contentDisposition = response.headers['content-disposition'];

        // console.log(contentType, contentDisposition)
      
        // // Handle successful response
        // // Save the file using file-saver
        // const blob = new Blob([response.data], { type: contentType });
        // saveAs(blob, contentDisposition.split('filename=')[1]);

        return response.data;

    }catch (error){
        if (error instanceof AxiosError){
            return error.response?.data;
        
        }
        return null;
    }
}

const attendanceService = {
    createAttendance,
    updateAttendance,
    deleteAttendance,
    getAllAttendance,
    getAttendanceById,
    exportAttendance
}

export default attendanceService;
