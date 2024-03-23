export interface AttendanceCreateDto  {
    attendance_date: Date;
    student: []
    classroom_id: string;
}

export interface AttendanceUpdateDto {
    student: [];
}

export interface AttendanceExportDto {
    classroom_id: string;
}

export interface AttendanceStudentCheckDto {
    no: number;
    classroom_id: string;
}

export interface AttendanceResponse {
    id: string,
    classroom_id: string,
    date: string,
    student: { no: number, firstname: string, lastname: string, status: string }[]
}