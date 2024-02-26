export interface ClassroomCreateDto {
    name: string;
    owner: string;
    subject_code: string;
    grade: string;
    image: string;
}

export interface ClassroomUpdateDto {
    name: string;
    subject_code: string;
    grade: string;
    image: string;
}

export interface ClassroomResponse {
    code: string;
    grade: string;
    id: string;
    image: string;
    name: string;
    owner: string;
    subject_code: string;
}