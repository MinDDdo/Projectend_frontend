import authenService from "~/services/authen.services";
import teacherService from "~/services/teacher.services";
import studentService from "~/services/student.services";
import classroomService from "~/services/classroom.services";
import attendanceService from "~/services/attendance.services";
import assignmentService from "~/services/assignment.services";

const useApi = {
    authenService,
    teacherService,
    studentService,
    classroomService,
    attendanceService,
    assignmentService
}

export default useApi;