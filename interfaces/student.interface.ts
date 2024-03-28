export interface StudentCreateDto {
    firstname: string;
    lastname: string;
    no: number;
    image: string;
}

export interface StudentUpdateDto {
    firstname?: string;
    lastname?: string;
    image?: string;
}

export interface StudentTeacherUpdateDto {
    firstname?: string;
    lastname?: string;
    no?: number;
}

export interface RandomGroupDto {
    group_size: number;
}

export interface StudentResponse {
    id: string;
    classroom_id: string;
    no: number;
    firstname: string;
    lastname: string;
    refresh_token: string;
    image: string;
}

export interface StudentAttendanceResponse {
    absent: number;
    late: number;
    leave: number;
    present: number;
}

export interface StudentGroupCreateDto {
    group_name: string;
    group_size: number;
}

export interface StudentGroupItem {
    firstname: string;
    lastname: string;
    no: number;
}

export interface StudentGroupResponse {
    id: string,
    classroom_id: string,
    group_name: string,
    group_size: number,
    data: [[StudentGroupItem]]
}