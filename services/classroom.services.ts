import axios, { AxiosError } from "axios";
import type { ClassroomCreateDto, ClassroomUpdateDto } from "~/interfaces/classroom.interface";


export const createClassroom = async (data: ClassroomCreateDto) => {
    try {
        const response = await axios({
            method: 'post',
            url: "http://localhost/8080/v1/classroom/create",
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

export const getAllClassroom = async (teacherId: string) => {
    try {
        const response = await axios({
            method: 'get',
            url: "http://localhost:8080/v1/classroom/getAll/" + teacherId
        })
        return response.data;

    }catch (error){
        if (error instanceof AxiosError){
            return error.response?.data;
        }
        return 'Something went wrong';
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
