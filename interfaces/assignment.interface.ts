export interface AssignmentCreateDto {
    assign_name: string;
    assign_detail: string;
    assign_due: Date;
}

export interface AssignmentUpdateDto {
    assign_name: string;
    assign_detail: string;
    assign_due: Date;
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
    handin_detail: string;
    

}