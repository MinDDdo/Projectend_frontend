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
    no: Number;
    checked: Boolean;
}

export interface AssigntmentCheckStatus {
    no: Number;
    classroom_id: string; 
}

export interface AssignmentResponse {
    
}