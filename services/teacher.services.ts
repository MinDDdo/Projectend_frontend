import axios, { AxiosError } from 'axios';
import type { TeacherSigupDto, TeacherUpdateDto } from '~/interfaces/teacher.interface';


export const signup = async (data: TeacherSigupDto) => {
    try {
        const apiUrl = useRuntimeConfig().public.apiUrl;

        const response = await axios({
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

        return 'Something went wrong';
    } 
}

export const update = async (teacherId: string ,data: TeacherUpdateDto) => {
    try {
        const apiUrl = useRuntimeConfig().public.apiUrl;

        const response = await axios({
            method: 'post',
            url: apiUrl + "teacher/update/" + teacherId,
            data: {
                firstname: data.firstname, 
                lastname: data.lastname,
                dob: data.dob, 
                gender: data.gender, 
                line_contact: data.line_contact, 
                phone_contact: data.phone_contact
            }
        })

        return response.data;
    }catch (error){
        if (error instanceof AxiosError) {
            return error.response?.data;
        }

        return 'Something went wrong';
    } 
}

const teacherService = {
    signup,
    update
}


export default teacherService;