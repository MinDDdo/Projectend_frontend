import axios, { AxiosError } from "axios";
import type { AssignmentCheckDto, AssignmentCreateDto, AssignmentUpdateDto, AssigntmentCheckStatus } from "~/interfaces/assignment.interface";

export const createAssignment = async (classroomId: string, data: AssignmentCreateDto ) => {
    try {
        const response = await axios({
            method: 'post',
            url: "http://localhost/:8080/v1/assignment/create-attendance",
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
        return 'Something went wrong';
    }
}

export const getAllAssignment = async (classroomId: string) => {
    try {
        const response = await axios({
            method: 'get',
            url: "http://localhost/:8080/v1/assignment/"+ classroomId +"/getAll-assignment"
        })
        return response.data;

    }catch (error){
        if (error instanceof AxiosError){
            return error.response?.data;
        }
        return 'Something went wrong'
    }
}

export const getAssignmentById = async (assignmentId: string) => {
    try {
        const response = await axios({
            method: 'get',
            url: "http://localhost/:8080/v1/assignment/getById-assignment/" + assignmentId
        })
        return response.data;

    }catch (error) {
        if (error instanceof AxiosError){
            return error.response?.data;
        }
        return 'Something went wrong'
    }
}

export const updateAssignmentById = async (assignmentId: string, data: AssignmentUpdateDto) => {
    try {
        const response = await axios({
            method: 'put',
            url: "http://localhost/:8080/v1/assignment/update-assignment/" + assignmentId,
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
        return 'Somethong went wrong'
    }
}

export const deleteAssignmentById = async (assignmentId: string) => {
    try {
        const response = await axios({
            method: 'delete',
            url: "http://localhost:8080/v1/assignmnet/delete-assignment/" + assignmentId
        })
        return response.data;

    }catch (error){
        if (error instanceof AxiosError){
            return error.response?.data;
        }
        return 'Something went wrong'
    }
}

export const checkAssignment = async (assignmentId: string, data: AssignmentCheckDto) => {
    try {
        const response = await axios({
            method: 'post',
            url: "http://localhost/:8080/v1/assignment/check-assignment/" + assignmentId,
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
        return 'Something went wrong'
    }
}

export const studentCheckStatusAssignment = async (data: AssigntmentCheckStatus) => {
    try {
        const response = await axios({
            method: 'post',
            url: "http://localhost/:8080/v1/assignment/check-handin",
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
        return 'Something went wrong'
    }
}

const assignmentService = {
    createAssignment,
    getAllAssignment,
    getAssignmentById,
    updateAssignmentById,
    deleteAssignmentById,
    studentCheckStatusAssignment
}

export default assignmentService;
