import axios, { AxiosError } from 'axios';
import type { TeacherSigupDto, TeacherUpdateDto, TeacherResponse, SignupResponse } from '~/interfaces/teacher.interface';
import { checkToken } from "./auth"; 
import type { Response } from "~/interfaces/response.interface";
import type {  AttendanceStudentCheckDto } from '~/interfaces/attendance.interface';
import type { StudentAttendanceResponse, StudentGroupCreateDto, StudentGroupResponse } from '~/interfaces/student.interface'; 
import type { StudentTeacherUpdateDto } from '~/interfaces/student.interface';


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

export const update = async (teacherId: string ,data: TeacherUpdateDto):Promise<Response<TeacherResponse> | null> => {
    try {
        const authStore = useStore.authStore();

        if (!await checkToken()) {
            return null;
        }
        const apiUrl = useRuntimeConfig().public.apiUrl;

        const response = await axios<Response<TeacherResponse>>({
            method: 'put',
            url: apiUrl + "teacher/update/" + teacherId,
            data: {
                firstname: data.firstname, 
                lastname: data.lastname,
                dob: data.dob, 
                gender: data.gender, 
                line_contact: data.line_contact, 
                phone_contact: data.phone_contact,
                image: data.image
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

        return null;
    } 
}

export const getTeacherById = async (teacherId: string):Promise<Response<TeacherResponse> | null>  => {
    try {
        const authStore = useStore.authStore();

        if (!await checkToken()) {
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

export const studentCheckStatusAttendance = async (data: AttendanceStudentCheckDto): Promise<Response<StudentAttendanceResponse> | null> => {
    try {
        const authStore = useStore.authStore();


        if (!await checkToken()) {
            return null;
        }

        const apiUrl = useRuntimeConfig().public.apiUrl; 


        const response = await axios<Response<StudentAttendanceResponse>>({
            method: 'post',
            url: apiUrl + "attendance/check-attendance",
            headers: {
                'Authorization': 'Bearer ' + authStore.access_token,
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

export const uploadStudent = async (classroomId: string, file: File): Promise<Response<null> | null> => {
    try {
        const authStore = useStore.authStore();


        if (!await checkToken()) {
            return null;
        }

        const apiUrl = useRuntimeConfig().public.apiUrl; 

        const formData = new FormData();
        formData.append('file', file);


        const response = await axios<Response<null>>({
            method: 'post',
            url: apiUrl + `student/${classroomId}/upload-student`,
            headers: {
                'Authorization': 'Bearer ' + authStore.access_token,
            },
            data: formData
        })

        return response.data;
    }catch (error){
        if (error instanceof AxiosError){
            return error.response?.data
        }
        return null;
    }
}

export const updateStudent = async (studentId: string, data: StudentTeacherUpdateDto) => {
    try {
        const authStore = useStore.authStore();


        if (!await checkToken()) {
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

export const createStudentGroup = async (classroom_id: string, data: StudentGroupCreateDto): Promise<Response<null> | null> => {
    try {
        const authStore = useStore.authStore();


        if (!await checkToken()) {
            return null;
        }

        const apiUrl = useRuntimeConfig().public.apiUrl;

        const response = await axios<Response<null>>({
            method: 'post',
            url: apiUrl + `student/${classroom_id}/create-group-student` ,
            headers: {
                'Authorization': 'Bearer ' + authStore.access_token
            },
            data: {
                group_name: data.group_name,
                group_size: data.group_size
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

export const getAllStudentGroup = async (classroom_id: string): Promise<Response<StudentGroupResponse[]> | null> => {
    try {
        const authStore = useStore.authStore();


        if (!await checkToken()) {
            return null;
        }

        const apiUrl = useRuntimeConfig().public.apiUrl;

        const response = await axios<Response<StudentGroupResponse[]>>({
            method: 'get',
            url: apiUrl + `student/${classroom_id}/group-student` ,
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

export const getStudentGroupById = async (classroom_id: string, group_id: string): Promise<Response<StudentGroupResponse> | null> => {
    try {
        const authStore = useStore.authStore();


        if (!await checkToken()) {
            return null;
        }

        const apiUrl = useRuntimeConfig().public.apiUrl;

        const response = await axios<Response<StudentGroupResponse>>({
            method: 'get',
            url: apiUrl + `student/${classroom_id}/group-student/${group_id}` ,
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

export const deleteStudentGroupById = async (group_id: string): Promise<Response<null> | null> => {
    try {
        const authStore = useStore.authStore();


        if (!await checkToken()) {
            return null;
        }

        const apiUrl = useRuntimeConfig().public.apiUrl;

        const response = await axios<Response<null>>({
            method: 'delete',
            url: apiUrl + `student/delete-group-student/${group_id}` ,
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


const teacherService = {
    signup,
    update,
    getTeacherById,
    studentCheckStatusAttendance,
    uploadStudent,
    updateStudent,
    createStudentGroup,
    getAllStudentGroup,
    getStudentGroupById,
    deleteStudentGroupById
}


export default teacherService;