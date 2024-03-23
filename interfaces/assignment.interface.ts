export interface AssignmentCreateDto {
    assign_name: string;
    assign_detail: string;
    assign_due: string;
}

export interface AssignmentUpdateDto {
    assign_name: string;
    assign_detail: string;
    assign_due: string;
}

export interface AssignmentCheckDto {
    no: number;
    checked: Boolean;
}

export interface AssigntmentCheckStatus {
    no: number;
    classroom_id: string; 
}


export interface AssigntmentStudentResponse {
    assign_id: string;
    classroom_id: string;
    assign_name: string;
    assign_detail: string;
    handin_detail: {
        no: number;
        firstname: string;
        lastname: string;
        handin: boolean;
    };
    assign_create: string;
    assign_due: string;
}

export interface AssignmentResponse {
    assign_create:  string;
    assign_detail:  string;
    assign_due: string;
    assign_name:    string;
    classroom_id:   string;
    id: string;
    student: AssignmentHandinStatus[]
}

export interface AssignmentHandinStatus {
    no: number,
    firstname: string,
    lastname: string,
    handin: boolean
}