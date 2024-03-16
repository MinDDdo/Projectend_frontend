import axios, { AxiosError } from "axios";
import { type StudentCreateDto, type RandomGroupDto, type StudentUpdateDto, type StudentResponse } from "~/interfaces/student.interface";
import { checkStudentToken, checkToken } from "./auth"; 
import type { Response } from "~/interfaces/response.interface";
import type { LoginResponse } from '~/interfaces/authen.interface';
import type { ClassroomResponse } from "~/interfaces/classroom.interface";
import type { AssignmentCheckDto, AssigntmentCheckStatus } from "~/interfaces/assignment.interface";
import type { AttendanceStudentCheckDto } from "~/interfaces/attendance.interface";
import type { StudentAttendanceResponse } from "~/interfaces/student.interface";


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
        const authStudentStore = useStore.authStudentStore();

        if (!await checkStudentToken()) {
            console.log('Unauthorize');

            return null;
        }

        const apiUrl = useRuntimeConfig().public.apiUrl;

        const response = await axios({
            method: 'put',
            url: apiUrl + "student/update-student/" + studentId,
            headers: {
                'Authorization': 'Bearer ' + authStudentStore.access_token
            },
            data: {
                firstname: data.firstname,
                lastname: data.lastname,
                image: data.image
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
        const authStudentStore = useStore.authStudentStore();

        if (!await checkStudentToken()) {
            console.log('Unauthorize');

            return null;
        }

        const apiUrl = useRuntimeConfig().public.apiUrl;

        const response = await axios<Response<StudentResponse>>({
            method: 'get',
            url: apiUrl + "student/"+ classroomId +"/getById-student/" + studentId,
            headers: {
                'Authorization': 'Bearer ' + authStudentStore.access_token
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

export const joinClassroom = async (classroomCode: string, no: string): Promise<Response<LoginResponse> | null> => {
    try {
        const apiUrl = useRuntimeConfig().public.apiUrl;

        const response = await axios<Response<LoginResponse>>({
            method: 'post',
            url: apiUrl + "auth/join-classroom",
            data: {
                classroom_code: classroomCode,
                no: no
            }
        })
    
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response?.data;
        }

        console.log(error);
        return null;
    }
}

export const getClassroomById = async (classroomId: string): Promise<Response<ClassroomResponse> | null> => {
    try {
        const authStudentStore = useStore.authStudentStore();

        if (!await checkStudentToken()) {
            console.log('Unauthorize');

            return null;
        }

        const apiUrl = useRuntimeConfig().public.apiUrl;
        
        const response = await axios<Response<ClassroomResponse>>({
            method: 'get',
            url: apiUrl + "classroom/getById/" + classroomId,
            headers: {
                'Authorization': 'Bearer ' + authStudentStore.access_token 
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

export const studentCheckStatusAssignment = async (data: AssigntmentCheckStatus) => {
    try {
        const authStudentStore = useStore.authStudentStore();

        if (!await checkStudentToken()) {
            console.log('Unauthorize');

            return null;
        }

        const apiUrl = useRuntimeConfig().public.apiUrl; 

        const response = await axios({
            method: 'post',
            url: apiUrl + "assignment/check-handin",
            headers: {
                'Authorization': 'Bearer ' + authStudentStore.access_token
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

export const studentCheckStatusAttendance = async (data: AttendanceStudentCheckDto): Promise<Response<StudentAttendanceResponse> | null> => {
    try {
        console.log(data)
        const authStudentStore = useStore.authStudentStore();

        if (!await checkStudentToken()) {
            console.log('Unauthorize');

            return null;
        }

        const apiUrl = useRuntimeConfig().public.apiUrl; 


        const response = await axios<Response<StudentAttendanceResponse>>({
            method: 'post',
            url: apiUrl + "attendance/check-attendance",
            headers: {
                'Authorization': 'Bearer ' + authStudentStore.access_token,
            },
            data: {
                no: data.no,
                classroom_id: data.classroom_id
            }
        })

        console.log("This is attendance student", response.data.result.data)

        return response.data;
    }catch (error){
        if (error instanceof AxiosError){
            return error.response?.data
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
    randomGroup,
    joinClassroom,
    getClassroomById,
    studentCheckStatusAssignment,
    studentCheckStatusAttendance
}

export default studentService;