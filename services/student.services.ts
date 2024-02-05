import axios, { AxiosError } from "axios";
import type { StudentCreateDto, RandomGroupDto, StudentUpdateDto } from "~/interfaces/student.interface";

export const createStudent = async (classroomId: string, data: StudentCreateDto) => {
    try {
        const response = await axios({
            method: 'post',
            url: "http://localhost:8080/v1/student/"+ classroomId +"/create-student" ,
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

        return 'Something went worong';
    }
}

export const updateStudent = async (studentId: string, data: StudentUpdateDto) => {
    try {
        const response = await axios({
            method: 'put',
            url: "http://localhost:8080/v1/student/update-student/" + studentId,
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

        return 'Something went worong';
    }
}

export const getAllStudent = async (classroomId: string) => {
    try {
        const response = await axios({
            method: 'get',
            url: "http://localhost:8080/v1/student/"+ classroomId +"/getAll-student"
        })
        return response.data;

    }catch (error) {
        if (error instanceof AxiosError) {
            return error.response?.data;
        }

        return 'Something went wrong';
    }
}

export const getStudentById = async (classroomId: string ,studentId: string) => {
    try {
        const response = await axios({
            method: 'get',
            url: "http://localhost:8080/v1/student/"+ classroomId +"/getById-student/" + studentId
        })
        return response.data;

    }catch (error) {
        if (error instanceof AxiosError){
            return error.response?.data;
        }
        return 'Something went wrong';
    }
}

export const deleteStudentById = async (studentId: string) => {
    try {
        const response = await axios({
            method: 'delete',
            url: "http://localhost:8080/v1/student/deleteById-student/" + studentId
        })

        return response.data;

    }catch (error) {
        if (error instanceof AxiosError){
            return error.response?.data;
        }
        return 'Something went wrong';
    }
}

export const randomGroup = async (classroomId: string, data: RandomGroupDto) => {
    try {
        const response = await axios({
            method: 'post',
            url: "http://localhost:8080/v1/student/"+ classroomId +"/group-student",
            data: {
                group_size: data.group_size
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

const studentService = {
    createStudent,
    updateStudent,
    getAllStudent, 
    getStudentById,
    deleteStudentById,
    randomGroup
}

export default studentService;