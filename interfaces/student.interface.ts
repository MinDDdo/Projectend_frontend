export interface StudentCreateDto {
    firstname: string;
    lastname: string;
    no: number;
}

export interface StudentUpdateDto {
    firstname: string;
    lastname: string;
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