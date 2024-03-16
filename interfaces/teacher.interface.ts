export interface TeacherSigupDto {
    firstname: string;
    lastname: string;
    dob: string;
    gender: string;
    email: string;
    password: string;
}

export interface TeacherUpdateDto {
    firstname?: string; 
    lastname?: string;
    dob?: string; 
    gender?: string;    
    line_contact?: string; 
    phone_contact?: string;
    image?: string;
}

export interface TeacherResponse {
    firstname: string;
    lastname: string;
    dob: string;
    gender: string;
    line_contact: string;
    phone_contact: string,
    image: string;
}

export interface SignupResponse {
    firstname: string;
    lastname: string;
    dob: string;
    gender: string;
    email: string;
    password: string; 
}

