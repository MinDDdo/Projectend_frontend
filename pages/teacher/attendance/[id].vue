<script setup lang="ts">
import type { TeacherResponse } from '~/interfaces/teacher.interface';
import type { ClassroomResponse } from '~/interfaces/classroom.interface';
import type { AttendanceResponse } from '~/interfaces/attendance.interface';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import { saveAs } from 'file-saver';

const route = useRoute();

const teacherStore = useStore.teacherStore();

const teacher = ref<TeacherResponse | null>(null);
const classroom = ref<ClassroomResponse | null>(null);
const loadingPage = ref<boolean>(false);
const loadingExport = ref<boolean>(false);
const attendances = ref<AttendanceResponse[]>([]);


onMounted(async () => {
    loadingPage.value = true;

    await getTeacherById();
    // await getClassroomById();
    await getAllAttendance();

    setTimeout(() => { loadingPage.value = false }, 200)
})

const getClassroomById = async () => {
    const data = await useApi.classroomService.getClassroomById(route.params?.id + '')

    if (!data) {
        return navigateTo('/home');
    }

    classroom.value = data.result.data;
}

const getTeacherById = async () => {
    const data = await useApi.teacherService.getTeacherById(teacherStore.id);

    if (!data) {
        return navigateTo('/home');
    }

    teacher.value = data.result.data;
}

const getAllAttendance = async () => {
    const data = await useApi.attendanceService.getAllAttendance(route.params?.id + '');
    
    if (!data) {
        return navigateTo('/home');
    }

    attendances.value = data.result.data;
    console.log(attendances.value);
}

const filterStudentStatus = (no: number, firstname: string, lastname: string) => {
    const filter: string[] = [];

    attendances.value.forEach((att) => {
        const status = att.student.filter((student) => {
            if (student.firstname === firstname && student.lastname === lastname && student.no === no) {
                return student;
            }
        })

       filter.push(status.at(0)?.status || 'absent');
    })

    return filter;
}

const mapStatus = (status: string) => {
    if (status === "present") return "มา";
    if (status === "absent") return "ขาด";
    if (status === "leave") return "ลา";
    if (status === "late") return "สาย";
    
    return "ขาด";
}

const onDownloadExcelFile = async () => {
    if (!loadingExport.value) {
        loadingExport.value = true;
        const data = await useApi.attendanceService.exportAttendance(
            route.params?.id + '',
            dayjs(attendances.value?.at(0)?.date).format("YYYY-MM-DD HH:mm:ss"),
            dayjs().format("YYYY-MM-DD HH:mm:ss")
        );

        console.log(data);
    
        const blob = new Blob([data]);

        saveAs(blob, "report.xlsx");
        // if (!data) {
        //     return navigateTo('/home');
        // }

        setTimeout(() => { loadingExport.value = false }, 200);
    }
}
</script>

<template>
    <div class="h-screen bg-[#EEF5FF]">
        <div class="flex justify-between items-center px-10 pt-5">
            <div class="p-3 hover:bg-gray-200 duration-100 rounded-md cursor-pointer">
                <Icon 
                    @click="$router.back()"
                    name="ion:arrow-back-outline" 
                    class="text-2xl" 
                />
            </div>

            <TeacherCard 
                :image="teacher?.image || ''" 
                :name="`${teacher?.firstname} ${teacher?.lastname}`" 
            />
        </div>

        <div class="flex justify-center relative lg:mt-0 mt-10">
            <div class="bg-[#475A7D]  rounded-[15px] w-[300px] h-[65px] absolute -top-[20px]">
                <p class="text-center text-white text-bold text-2xl mt-4">การเข้าเรียน</p>
            </div>
        </div>

        <div class="flex justify-center mt-5">
            <div class="bg-white p-5 rounded-[20px]">
                <div class="grid mt-10 overflow-y-auto overflow-x-auto mx-auto lg:max-w-[calc(100vw-300px)] md:max-w-[calc(100vw-100px)] max-w-[calc(100vw-50px)] min-h-[100px] max-h-[calc(100vh-300px)]">
                    <table class="w-full">
                        <thead>
                            <tr class=" ">
                                <th class="w-[100px] text-lg font-bold min-w-[70px]">เลขที่</th>

                                <th colspan="2" class="text-lg font-bold  min-w-[300px]">รายชื่อ</th>

                                <th v-for="item of attendances" class="text-lg font-semibold min-w-[180px]">
                                    {{ dayjs(item.date).locale('th').format('DD MMM YYYY') }}
                                </th>
                            </tr>
                        </thead>
    
                        <tbody>
                            <tr v-for="studentSet, idx of attendances.at(-1)?.student">
                                <td class="text-center font-bold text-lg">{{ idx + 1 }}</td>

                                <td class="text-start text-lg">{{ studentSet.firstname }}</td>

                                <td class="text-start text-lg">{{ studentSet.lastname }}</td>

                                <td 
                                    v-for="status of filterStudentStatus(studentSet.no, studentSet.firstname, studentSet.lastname)" 
                                    class="text-center text-lg bg-[#6EA66A]"
                                    :class="{
                                        'bg-[#6EA66A]': status === 'present',
                                        'bg-[#D14A4A]': status === 'absent',
                                        'bg-[#F9DC38]': status === 'leave',
                                        'bg-[#FEAD59]': status === 'late',
                                    }"
                                >
                                    {{ mapStatus(status) }}
                                </td>
                                <!-- <td class="text-center text-lg bg-[#D14A4A]">ขาด</td>
                                <td class="text-center text-lg bg-[#F9DC38]">ลา</td> -->

                            </tr>

                            <!-- <tr>
                                <td class="text-center font-bold text-lg">2</td>
                                <td class="text-center text-lg">สมศรี </td>
                                <td class="text-center text-lg">สุขใจ</td>
                                <td class="text-center text-lg bg-[#FEAD59]">สาย</td>
                                <td class="text-center text-lg bg-[#D14A4A]">ขาด</td>
                                <td class="text-center text-lg bg-[#D14A4A]">ขาด</td>

                            </tr>

                            <tr>
                                <td class="text-center font-bold text-lg">3</td>
                                <td class="text-center text-lg">สมศรี </td>
                                <td class="text-center text-lg">สุขใจ</td>
                                <td class="text-center text-lg bg-[#6EA66A]">มาเรียน</td>
                                <td class="text-center text-lg bg-[#6EA66A]">มาเรียน</td>
                                <td class="text-center text-lg bg-[#F9DC38]">ลา</td>

                            </tr> -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="flex justify-center mt-8">
            <button class="bg-[#676B7D] w-[180px] h-[50px] flex rounded-[15px]" @click="onDownloadExcelFile">
                <p class="text-center pl-10 mt-3 text-white font-bold">ดาวน์โหลด</p>
                <img src="~/assets/images/download.png" alt="download"
                class="w-[30px] mt-2 "
                />
            </button>
        </div>
        
    </div>

    <Loading v-if="loadingPage" />
</template>

<style>
table, th, td {
    border: 2px solid #ffffff;
}

th, td {
  padding: 5px;
  text-align: center;
}
</style>