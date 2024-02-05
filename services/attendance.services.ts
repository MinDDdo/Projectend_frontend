import axios, { AxiosError } from "axios";
import type { AttendanceCreateDto, AttendanceExportDto, AttendanceUpdateDto } from "~/interfaces/attendance.interface";

export const createAttendance = async (data: AttendanceCreateDto) => {
    try {
        const response = await axios({
            method: 'post',
            url: "http://localhost/:8080/v1/attendance/create-attendance/",
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
        return 'Something went wrong';
    }
}

export const updateAttendance = async (attendanceId: string, data: AttendanceUpdateDto) => {
    try {
        const response = await axios({
            method: 'put',
            url: "http://localhost/:8080/v1/attendance/"+ attendanceId +"/update-attendance",
            data: {
                student: data.student
            }
        })
        return response.data;

    }catch (error){
        if (error instanceof AxiosError){
            return error.response?.data;
        }
        return 'Something went wrong'
    }
}

export const deleteAttendance = async (attendanceId: string) => {
    try {
        const response = await axios({
            method: 'delete',
            url: "http://localhost/:8080/v1/attendance/"+ attendanceId +"/delete-attendance"
        })
        return response.data;

    }catch (error){
        if (error instanceof AxiosError){
            return error.response?.data;
        }
        return 'Something went wrong';
    }
}

export const getAllAttendance = async (classroomId: string) => {
    try {
        const response = await axios({
            method: 'get',
            url: "http://localhost/:8080/v1/attendance/"+ classroomId +"getAll-attendance"
        })
        return response.data;
        
    }catch (error){
        if (error instanceof AxiosError){
            return error.response?.data;
        }
        return 'Something went wrong';
    }
}

export const getAttendanceById = async (attendanceId: string) => {
    try {
        const response = await axios({
            method: 'get',
            url: "http://localhost/:8080/v1/attendance/"+ attendanceId +"/getById-attendance"
        })
        return response.data;

    }catch (error){
        if (error instanceof AxiosError){
            return error.response?.data;
        }
        return 'Something went wrong';
    }
}

export const exportAttendance = async (data: AttendanceExportDto) => {
    try {
        const response = await axios({
            method: 'get',
            url: "http://localhost:8080/v1/attendance/export-attendance-excel",
            data: {
                classroom_id: data.classroom_id
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

const attendanceService = {
    createAttendance,
    updateAttendance,
    deleteAttendance,
    getAllAttendance,
    getAttendanceById,
    exportAttendance
}

export default attendanceService;
