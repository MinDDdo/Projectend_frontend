export interface AttendanceCreateDto  {
    attendance_date: string;
    student: any[]
    classroom_id: string;
}

export interface AttendanceUpdateDto {
    student: any[];
    attendance_date: string;
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