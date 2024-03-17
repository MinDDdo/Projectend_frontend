<script lang="ts" setup>
import type { AssignmentResponse,AssignmentCreateDto } from '~/interfaces/assignment.interface';
import type { TeacherResponse } from '~/interfaces/teacher.interface';
import VueDatePicker from '@vuepic/vue-datepicker';
import dayjs from 'dayjs';
import 'dayjs/locale/th';

const route = useRoute();

const teacherStore = useStore.teacherStore();

const teacher = ref<TeacherResponse | null>(null);
const loadingPage = ref<boolean>(false);
const assignments = ref<AssignmentResponse[]>([]);
const selectAssignment = ref<AssignmentResponse | null>(null);

const dueDateSelected = ref<string>('');
const assignmentForm = reactive({
    topic: '',
    detail: ''
});


const showCreateAssignment = ref<boolean>(false);
const showDetailAssignment = ref<boolean>(false);

onMounted(async () => {
    loadingPage.value = true;

    await getTeacherById();
    await getAssignmentAll();

    setTimeout(() => { loadingPage.value = false }, 200);
})

const getTeacherById = async () => {
    const data = await useApi.teacherService.getTeacherById(teacherStore.id);

    if (!data) {
        return navigateTo('/home');
    }

    teacher.value = data.result.data;
}

const getAssignmentAll = async () => {
    const data = await useApi.assignmentService.getAllAssignment(route.params?.id.toString());

    if (!data) {
        return navigateTo('/home');
    }

    assignments.value = data.result.data;
}


const formatDate = (date: string) => {
    return dayjs(date).locale('th').format('DD MMM YYYY');
}

const onCloseCreateAssignment = () => {
    showCreateAssignment.value = false;

    assignmentForm.topic = '';
    assignmentForm.detail = '';
}


const onSubmitCreateAssignment = async () => {
    // close Modal
    showCreateAssignment.value = false;
    
    const data = await useApi.assignmentService.createAssignment(route.params?.id + '', {
        assign_name: assignmentForm.topic,
        assign_detail: assignmentForm.detail,
        assign_due: dayjs(dueDateSelected.value).format('YYYY-MM-DD HH:mm:ss')
    })

    if (!data) {
        return navigateTo('/home');
    }

    // Clear form
    assignmentForm.topic = '';
    assignmentForm.detail = '';
    dueDateSelected.value = '';

    await getAssignmentAll();
}


const onSelectAssignment = async (assign: AssignmentResponse) => {
    selectAssignment.value = assign;
    showDetailAssignment.value = true;
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

        <div class="flex justify-center ">
            <div class="bg-[#475A7D]  rounded-[15px] w-[300px] h-[65px] ">
                <p class="text-center text-white text-bold text-2xl mt-4">งานที่หมอบหมาย</p>
            </div>
        </div>

        <div class="flex flex-col justify-center mt-8 w-[700px] mx-auto">
            <button 
                @click="showCreateAssignment = true"
                type="button" 
                class="bg-[#FFFFFF] rounded-[15px] p-2 w-[160px] flex item-center mb-8"
            >
                <img 
                    src="~/assets/images/task.png" 
                    alt="task"
                    class="pl-4 "
                />
                <p class="text-center mt-1 text-lg pl-1">สร้างงาน</p>
            </button>

            <div class="flex flex-col gap-4 w-full mb-20" v-if="assignments.length !== 0">
                <div 
                    v-for="item of assignments"
                    @click="onSelectAssignment(item)"
                    class="bg-[#FFFFFF] hover:border-gray-200 border border-transparent  w-full h-[130px] p-5 rounded-[15px] cursor-pointer transform hover:shadow-md hover:-translate-y-2 transition-transform duration-75"
                >
                    <div class="flex flex-col">
                        <div class="">
                            <div class="">
                                <div class="p-2 bg-[#D2E7FF] w-[135px] rounded-[15px]">
                                    <p class="text-center text-xl font-medium">{{ item.assign_name }}</p>
                                </div>
                            </div>
            
                            <div class="mt-4 flex item-center ">
                                <div class="p-1 bg-[#FFF8E3] rounded-[12px] w-[100px]">
                                    <p class="text-center text-lg">มอบหมาย</p>
                                </div>
                                <p class="text-center text-lg  mt-1 pl-10">{{ formatDate(item.assign_create) }}</p> 
                            </div>
                        </div>
    
                        <div class="flex justify-end relative pr-2">
                            <div 
                                class="bg-[#FFFFFF] w-[140px] h-[95px] rounded-[15px] absolute transform -top-[97px] border-[3px] border-[#FE6963]"
                            >
                                <div class="mt-4">
                                    <p class="text-center text-[#FE6963]">กำหนดส่ง</p>
                                    <p class="text-center mt-2 font-bold text-lg">{{ formatDate(item.assign_due) }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div 
                v-if="assignments.length === 0" 
                class="backdrop-blur-md bg-white/50 w-[700px] h-[130px] 
                p-5 rounded-[15px] flex items-center justify-center text-gray-500"
            >
                ไม่มีงานที่มอบหมาย
            </div>
        </div>
    </div>


    <div 
        v-if="showCreateAssignment"
        @click="onCloseCreateAssignment" 
        class="fixed w-full top-0 left-0 min-h-screen bg-gray-400/50"
    >
    </div>

    <div 
        v-if="showCreateAssignment"
        class="w-[500px] h-[320px] bg-white rounded-md fixed 
        top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
        "
    >
        <div class="relative">
            <div 
                class="bg-[#475A7D]  rounded-[15px] absolute w-[300px] h-[65px] 
                flex items-center justify-center
                absolute -top-[36px] left-1/2 transform -translate-x-1/2
                "
            >
                <p class="text-white text-2xl text-center">สร้างงาน</p>
            </div>
        </div>

        <form 
            class="flex flex-col p-8 gap-y-5"
            @submit.prevent="onSubmitCreateAssignment"
        >
            <input 
                type="text" 
                placeholder="หัวข้อ"
                v-model="assignmentForm.topic"
                class="p-2 px-5 rounded-xl  bg-[#DCF2F1] mt-4" 
            />

            <textarea
                placeholder="รายละเอียดงาน"
                cols=""
                rows="4"
                v-model="assignmentForm.detail"
                class="p-2 px-5 rounded-xl  bg-[#DCF2F1] resize-none"
            ></textarea>

            <div class="flex items-center gap-x-2">
                <VueDatePicker 
                    v-model="dueDateSelected" 
                    :clearable="false" 
                    no-today 
                    format="dd-MM-yyyy"
                    hide-offset-dates
                    placeholder="กำหนดส่งงาน"
                    class="!w-[160px]"
                />

                <button 
                    :disabled="assignmentForm.topic === '' || assignmentForm.detail === '' || dueDateSelected === ''"
                    type="submit" 
                    class="bg-[#676B7D] py-2 px-3 h-[36px] text-white rounded-md w-[160px] font-bold"
                >
                    สร้าง
                </button>
            </div>
        </form>
    </div>

    <div 
        v-if="showDetailAssignment"
        @click="showDetailAssignment = false" 
        class="fixed w-full top-0 left-0 min-h-screen bg-gray-400/50"
    >
    </div>

    <div 
        v-if="showDetailAssignment"
        class="lg:w-[800px] md:w-[600px] w-[400px] h-[500px] bg-white rounded-md fixed 
        top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
        "
    >
        <div class="relative">
            <div 
                class="bg-[#475A7D]  rounded-[15px] absolute w-[300px] h-[65px] 
                flex items-center justify-center
                absolute -top-[36px] left-1/2 transform -translate-x-1/2
                "
            >
                <p class="text-white text-2xl text-center">สถานะการส่งงาน</p>
            </div>
        </div>

        <div class="grid mt-10 p-5 mx-10 overflow-x-auto overflow-y-auto">
            <table class="w-full">
                <thead>
                    <tr>
                        <th class="min-w-[150px]">
                            <div class="w-full flex justify-center">
                                <div class="w-[100px] bg-[#ABCED1] p-2 rounded-xl">เลขที่</div>
                            </div>
                        </th>

                        <th class="min-w-[200px] max-w-[200px]" colspan="2">
                            <div class="w-full">
                                <div class="w-[150px] bg-[#ABCED1] p-2 rounded-xl">รายชื่อ</div>
                            </div>
                        </th>

                        <th class="w-[200px]">
                            <div class="w-full">
                                <div class="p-2 rounded-xl">สถานะ</div>
                            </div>
                        </th>

                        <th class=""></th>
                    </tr>
                </thead>

                <tbody>
                    <tr class="">
                        <td class="py-5 text-center font-bold">1</td>
                        <td class="py-5">2</td>
                        <td class="py-5">3</td>
                        <td class="py-5">4</td>
                        <td class="py-5">5</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <Loading v-if="loadingPage" />
</template>