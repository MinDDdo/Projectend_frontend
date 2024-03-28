<script setup lang="ts">
import type { TeacherResponse } from '~/interfaces/teacher.interface';
import type { StudentResponse } from '~/interfaces/student.interface';
import type { AttendanceResponse } from '~/interfaces/attendance.interface';
import VueDatePicker from '@vuepic/vue-datepicker';
import dayjs from 'dayjs';
import 'dayjs/locale/th';

interface StudentItem {
    no: number;
    firstname: string;
    lastname: string;
    status: string;
}

const route = useRoute();
const teacherStore = useStore.teacherStore();

const teacher = ref<TeacherResponse | null>(null);
const loadingPage = ref<boolean>(false);
const attendances = ref<AttendanceResponse[]>([]);
const showCreateCheckStudent = ref<boolean>(false);
const dueDateSelected = ref<string>('');
const studentList = ref<StudentResponse[]>([]);
const studentCheckStatusList = ref<StudentItem[]>([]);
const showConfirmDeleteCheck = ref<boolean>(false);
const selectedAttendance = ref<AttendanceResponse | null>(null);
const showUpdateAttendanceModal = ref<boolean>(false);


onMounted(async () => {
    loadingPage.value = true;

    await getTeacherById();
    await getAllAttendance();
    await getAllStudent();

    setTimeout(() => { loadingPage.value = false }, 200)
})

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
}

const getAllStudent = async () => {
    const data = await useApi.studentService.getAllStudent(route.params?.id + '');

    if (!data) {
        return navigateTo('/home');
    }

    
    studentList.value = data.result.data;
} 

const onOpenCreateCheckStudent = () => {
    studentCheckStatusList.value = [];
    dueDateSelected.value = '';
    showCreateCheckStudent.value = true;

    studentList.value.forEach((item) => {
        studentCheckStatusList.value.push({
            no: item.no,
            firstname: item.firstname,
            lastname: item.lastname,
            status: ''
        });
    })
}

const onCheck = (no: number, status: 'present' | 'absent' | 'leave' | 'late') => {
    studentCheckStatusList.value = studentCheckStatusList.value.map(item => {
        if (item.no === no) {
            item.status = status;
        }

        return item;
    })
}

const onSubmitCreateCheck = async () => {
    if (dueDateSelected.value === '') {
        return;
    }
    
    let canCreate = true;
    for (const item of studentCheckStatusList.value) {
        if (item.status === '') {
            canCreate = false;
            break;
        }
    }

    for (const item of attendances.value) {
        if (dayjs(item.date).format('YYYY-MM-DD') ===  dayjs(dueDateSelected.value).format('YYYY-MM-DD')) {
            canCreate = false;
            break;
        }
    }
    
    if (!canCreate) {
        return;
    }

    showCreateCheckStudent.value = false;
    loadingPage.value = true;

    const data = await useApi.attendanceService.createAttendance({
        classroom_id: route.params?.id + '',
        student: studentCheckStatusList.value,
        attendance_date: dayjs(dueDateSelected.value).format('YYYY-MM-DD HH:mm:ss')
    })

    if (!data) {
        return navigateTo('/home');
    }

    await getAllAttendance();

    setTimeout(() => { loadingPage.value = false }, 200)
}

const formatDate = (date: string) => {
    return dayjs(date).locale('th').format('DD MMM YYYY');
}

const onShowDeleteDialog = (attendance: AttendanceResponse) => {
    selectedAttendance.value = attendance;
    showConfirmDeleteCheck.value = true;
}

const onDeleletAttendance = async () => {
    showConfirmDeleteCheck.value = false;
    loadingPage.value = true;

    const data = await useApi.attendanceService.deleteAttendance(selectedAttendance.value?.id || '');

    if (!data) {
        return navigateTo('/home');
    }

    await getAllAttendance();

    setTimeout(() => { loadingPage.value = false }, 200)
}

const onShowUpdateAttendance = (attendance: AttendanceResponse) => {
    studentCheckStatusList.value = [];
    selectedAttendance.value = attendance;

    const attendanceObj = attendances.value.find(item => item.id === attendance.id);

    if (!attendanceObj) {
        return;
    }

    dueDateSelected.value = dayjs(attendanceObj.date).format("YYYY-MM-DD");

    attendanceObj.student.forEach((item) => {
        studentCheckStatusList.value.push({
            no: item.no,
            firstname: item.firstname,
            lastname: item.lastname,
            status: item.status
        });
    })

    showUpdateAttendanceModal.value = true;
} 

const onSubmitUpdateAttendance = async () => {
    if (dueDateSelected.value === '') {
        return;
    }
    
    let canUpdate = true;
    for (const item of studentCheckStatusList.value) {
        if (item.status === '') {
            canUpdate = false;
            break;
        }
    }
    
    if (!canUpdate) {
        return;
    }

    showUpdateAttendanceModal.value = false;
    loadingPage.value = true;

    const data = await useApi.attendanceService.updateAttendance(
        selectedAttendance.value?.id || '',
        {
            student: studentCheckStatusList.value,
            attendance_date: dayjs(dueDateSelected.value).format('YYYY-MM-DD HH:mm:ss')
        }
    )

    if (!data) {
        return navigateTo('/home');
    }

    await getAllAttendance();

    setTimeout(() => { loadingPage.value = false }, 200)
}
</script>

<template>
    <div class="min-h-screen bg-[#EEF5FF] relative">
        <div class="flex justify-between px-10 items-center pt-5">
            <div class="p-3 hover:bg-gray-200 duration-100 rounded-md cursor-pointer">
                <Icon 
                    @click="$router.back()"
                    name="ion:arrow-back-outline" 
                    class="text-2xl" 
                />
            </div>
            
            <teacher-card 
                :image="teacher?.image || ''" 
                :name="`${teacher?.firstname} ${teacher?.lastname}`" 
            />
        </div>


        <div class="flex justify-center mt-10">
            <div class=" bg-white p-5 rounded-[20px] relative w-fit"> 
                <div class="bg-[#B598CD] p-3 rounded-[15px] w-[250px] absolute transform left-1/2 -top-[1px] -translate-y-1/2 -translate-x-1/2">
                    <p class="text-center text-2xl font-bold text-white">เช็คชื่อ</p>
                </div>

                <button 
                    @click="onOpenCreateCheckStudent"
                    type="button" 
                    class="flex items-center text-white bg-[#676B7D] w-fit px-5 py-2 rounded-xl text-lg gap-x-1 mt-8 "
                >
                    สร้าง
                    <Icon name="ion:plus-round" class="" />
                </button>

                <div 
                    class="grid overflow-y-auto overflow-x-auto mt-8 mx-auto 
                    lg:w-[800px] md:w-[600px] w-[400px]  max-h-[600px]"
                >
                    <table class="w-full">
                        <thead>
                            <tr class="bg-[#BEDAE6]">
                                <th class="py-2 font-bold  min-w-[100px] ">วันที่</th>
                                <th class="py-2 font-bold min-w-[400px]">หมดเขต</th>
                                <th class="py-2 font-bold "></th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="item of attendances">
                                <td class="py-3 pl-5 text-start">{{ formatDate(item.date) }}</td>

                                <td class="py-3 text-center">{{ formatDate(item.date) }}</td>

                                <td class="py-3 text-start">
                                    <div class="flex items-center gap-x-3 p-2">
                                        <Icon 
                                            name="ion:edit" 
                                            class="text-gray-500 hover:text-blue-600 h-[18px] w-[18px] cursor-pointer" 
                                            @click="onShowUpdateAttendance(item)"
                                        />

                                        <div class="h-3 w-[0.5px] bg-gray-300"></div>

                                        <Icon 
                                            name="ion:md-trash" 
                                            class="text-gray-500 hover:text-red-500 h-[18px] w-[18px] cursor-pointer" 
                                            @click="onShowDeleteDialog(item)"
                                        />
                                    </div>
                                </td>
                            </tr>

                            <tr v-if="attendances.length === 0">
                                <td colspan="3" class="pt-2 text-center">
                                    <div class="text-center py-5 w-full text-gray-500 rounded-xl border">
                                        ไม่มีข้อมูลการเช็คชื่อ
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <div 
        v-if="showCreateCheckStudent"
        @click="showCreateCheckStudent = false" 
        class="fixed w-full top-0 left-0 min-h-screen bg-gray-400/70"
    >
    </div>

    <div 
        v-if="showUpdateAttendanceModal"
        @click="showUpdateAttendanceModal = false" 
        class="fixed w-full top-0 left-0 min-h-screen bg-gray-400/70"
    >
    </div>

    <div 
        v-if="showCreateCheckStudent" 
        class="fixed 
        top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
        "
    >
        <div class=" bg-white p-5 rounded-[20px] relative w-[700px] min-h-[600px]"> 
            <div class="bg-[#B598CD] p-3 rounded-[15px] w-[250px] absolute transform left-1/2 -top-[1px] -translate-y-1/2 -translate-x-1/2">
                <p class="text-center text-2xl font-bold text-white">สร้างการเช็คชื่อ</p>
            </div>

            <div class="flex justify-between items-center mt-10">
                <VueDatePicker 
                    v-model="dueDateSelected" 
                    :clearable="false" 
                    no-today 
                    format="dd-MM-yyyy"
                    hide-offset-dates
                    placeholder="กำหนดวันเช็คชื่อ"
                    class="!w-[180px]"
                />

                <button 
                    @click="onSubmitCreateCheck"
                    type="button" 
                    class="flex items-center text-white bg-[#6EA66A] disabled:bg-gray-500 disabled:text-gray-700 w-fit px-5 py-2 rounded-xl text-base gap-x-1"
                >
                    บันทึก
                </button>
            </div>

            <div 
                class="grid overflow-y-auto overflow-x-auto mt-4
                max-h-[500px]"
            >
                <table>
                    <thead class="bg-white sticky top-0">
                        <tr>
                            <th class="min-w-[70px]">
                                <div class="flex">
                                    <div class="bg-[#BEDAE6] py-2 w-[100px] rounded-[15px]">เลขที่</div>
                                </div>
                            </th>

                            <th class="min-w-[180px]" colspan="2">
                                <div class="flex justify-center">
                                    <div class="bg-[#BEDAE6] py-2 w-[170px] rounded-[15px]">รายชื่อ</div>
                                </div>
                            </th>

                            <th class="py-2 font-bold min-w-[50px]">มา</th>
                            <th class="py-2 font-bold min-w-[50px]">ขาด</th>
                            <th class="py-2 font-bold min-w-[50px]">ลา</th>
                            <th class="py-2 font-bold min-w-[50px]">สาย</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="item, idx of studentCheckStatusList">
                            <td class="py-2 pl-10 text-start font-bold">{{ item.no }}</td>

                            <td class="py-2">{{ item.firstname }}</td>

                            <td class="py-2">{{ item.lastname }}</td>

                            <td>
                                <div class="flex justify-center">
                                    <div 
                                        @click="onCheck(item.no, 'present')"
                                        class="border-2 rounded-md h-[30px] w-[30px] cursor-pointer flex items-center justify-center"
                                        :class="{
                                            'border-transparent bg-[#6EA66A]': item.status === 'present',
                                            'border-[#475A7D]':  item.status !== 'present'
                                        }"
                                    >
                                        <Icon name="ion:checkmark" class="text-white text-2xl" />
                                    </div>
                                </div>
                            </td>

                            <td>
                                <div class="flex justify-center">
                                    <div 
                                        @click="onCheck(item.no, 'absent')"
                                        class="border-2 rounded-md h-[30px] w-[30px] cursor-pointer flex items-center justify-center"
                                        :class="{
                                            'border-transparent bg-[#D14A4A]': item.status === 'absent',
                                            'border-[#475A7D]': item.status !== 'absent'
                                        }"
                                    >
                                        <Icon name="ion:checkmark" class="text-white text-2xl" />
                                    </div>
                                </div>
                            </td>

                            <td>
                                <div class="flex justify-center">
                                    <div 
                                        @click="onCheck(item.no, 'leave')"
                                        class="border-2 rounded-md h-[30px] w-[30px] cursor-pointer flex items-center justify-center"
                                        :class="{
                                            'border-transparent bg-[#F9DC38]': item.status === 'leave',
                                            'border-[#475A7D]': item.status !== 'leave'
                                        }"
                                    >
                                        <Icon name="ion:checkmark" class="text-white text-2xl" />
                                    </div>
                                </div>
                            </td>
                            
                            <td>
                                <div class="flex justify-center">
                                    <div 
                                        @click="onCheck(item.no, 'late')"
                                        class="border-2 rounded-md h-[30px] w-[30px] cursor-pointer flex items-center justify-center"
                                        :class="{
                                            'border-transparent bg-[#FEAD59]': item.status === 'late',
                                            'border-[#475A7D]': item.status !== 'late'
                                        }"
                                    >
                                        <Icon name="ion:checkmark" class="text-white text-2xl" />
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <div 
        v-if="showUpdateAttendanceModal" 
        class="fixed 
        top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
        "
    >
        <div class=" bg-white p-5 rounded-[20px] relative w-[700px] min-h-[600px]"> 
            <div class="bg-[#B598CD] p-3 rounded-[15px] w-[250px] absolute transform left-1/2 -top-[1px] -translate-y-1/2 -translate-x-1/2">
                <p class="text-center text-2xl font-bold text-white">แก้ไขการเช็คชื่อ</p>
            </div>

            <div class="flex justify-between items-center mt-10">
                <VueDatePicker 
                    v-model="dueDateSelected" 
                    :clearable="false" 
                    no-today 
                    format="dd-MM-yyyy"
                    hide-offset-dates
                    placeholder="กำหนดวันเช็คชื่อ"
                    class="!w-[180px]"
                />

                <button 
                    @click="onSubmitUpdateAttendance"
                    type="button" 
                    class="flex items-center text-white bg-[#6EA66A] disabled:bg-gray-500 disabled:text-gray-700 w-fit px-5 py-2 rounded-xl text-base gap-x-1"
                >
                    บันทึก
                </button>
            </div>

            <div 
                class="grid overflow-y-auto overflow-x-auto mt-4
                max-h-[500px]"
            >
                <table>
                    <thead class="bg-white sticky top-0">
                        <tr>
                            <th class="min-w-[70px]">
                                <div class="flex">
                                    <div class="bg-[#BEDAE6] py-2 w-[100px] rounded-[15px]">เลขที่</div>
                                </div>
                            </th>

                            <th class="min-w-[180px]" colspan="2">
                                <div class="flex justify-center">
                                    <div class="bg-[#BEDAE6] py-2 w-[170px] rounded-[15px]">รายชื่อ</div>
                                </div>
                            </th>

                            <th class="py-2 font-bold min-w-[50px]">มา</th>
                            <th class="py-2 font-bold min-w-[50px]">ขาด</th>
                            <th class="py-2 font-bold min-w-[50px]">ลา</th>
                            <th class="py-2 font-bold min-w-[50px]">สาย</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="item, idx of studentCheckStatusList">
                            <td class="py-2 pl-10 text-start font-bold">{{ item.no }}</td>

                            <td class="py-2">{{ item.firstname }}</td>

                            <td class="py-2">{{ item.lastname }}</td>

                            <td>
                                <div class="flex justify-center">
                                    <div 
                                        @click="onCheck(item.no, 'present')"
                                        class="border-2 rounded-md h-[30px] w-[30px] cursor-pointer flex items-center justify-center"
                                        :class="{
                                            'border-transparent bg-[#6EA66A]': item.status === 'present',
                                            'border-[#475A7D]':  item.status !== 'present'
                                        }"
                                    >
                                        <Icon name="ion:checkmark" class="text-white text-2xl" />
                                    </div>
                                </div>
                            </td>

                            <td>
                                <div class="flex justify-center">
                                    <div 
                                        @click="onCheck(item.no, 'absent')"
                                        class="border-2 rounded-md h-[30px] w-[30px] cursor-pointer flex items-center justify-center"
                                        :class="{
                                            'border-transparent bg-[#D14A4A]': item.status === 'absent',
                                            'border-[#475A7D]': item.status !== 'absent'
                                        }"
                                    >
                                        <Icon name="ion:checkmark" class="text-white text-2xl" />
                                    </div>
                                </div>
                            </td>

                            <td>
                                <div class="flex justify-center">
                                    <div 
                                        @click="onCheck(item.no, 'leave')"
                                        class="border-2 rounded-md h-[30px] w-[30px] cursor-pointer flex items-center justify-center"
                                        :class="{
                                            'border-transparent bg-[#F9DC38]': item.status === 'leave',
                                            'border-[#475A7D]': item.status !== 'leave'
                                        }"
                                    >
                                        <Icon name="ion:checkmark" class="text-white text-2xl" />
                                    </div>
                                </div>
                            </td>
                            
                            <td>
                                <div class="flex justify-center">
                                    <div 
                                        @click="onCheck(item.no, 'late')"
                                        class="border-2 rounded-md h-[30px] w-[30px] cursor-pointer flex items-center justify-center"
                                        :class="{
                                            'border-transparent bg-[#FEAD59]': item.status === 'late',
                                            'border-[#475A7D]': item.status !== 'late'
                                        }"
                                    >
                                        <Icon name="ion:checkmark" class="text-white text-2xl" />
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <Loading v-if="loadingPage" />

    <Modal v-model:show="showConfirmDeleteCheck" title="การเช็คชื่อ" @on-confirm="onDeleletAttendance" />
</template>

<style scoped>
</style>