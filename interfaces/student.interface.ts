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