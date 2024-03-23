<script lang="ts" setup>
import type { AssignmentResponse, AssignmentHandinStatus } from '~/interfaces/assignment.interface';
import type { TeacherResponse } from '~/interfaces/teacher.interface';
import VueDatePicker from '@vuepic/vue-datepicker';
import dayjs from 'dayjs';
import 'dayjs/locale/th';

const route = useRoute();

const teacherStore = useStore.teacherStore();

const teacher = ref<TeacherResponse | null>(null);
const loadingPage = ref<boolean>(false);
const loadingAssignment = ref<boolean>(false);
const assignments = ref<AssignmentResponse[]>([]);
const selectAssignment = ref<AssignmentResponse | null>(null);
const checkStatus = ref<AssignmentHandinStatus[]>([]);

const dueDateSelected = ref<string>('');
const assignmentForm = reactive({
    topic: '',
    detail: ''
});

const assignmentUpdateForm = reactive({
    topic: '',
    detail: ''
})


const showCreateAssignment = ref<boolean>(false);
const showDetailAssignment = ref<boolean>(false);
const showDialogConfirmDelete = ref<boolean>(false);
const showDialogUpdatAssignment = ref<boolean>(false);

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

    console.log(data.result.data);

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
    loadingAssignment.value = true;
    selectAssignment.value = assign;

    await getAssigmentById(assign.id);

    setTimeout(() => {
        loadingAssignment.value = false;
        showDetailAssignment.value = true;
    }, 200);
}

const getAssigmentById = async (id: string) => {
    const data = await useApi.assignmentService.getAssignmentById(id);

    if (!data) {
        return navigateTo('/home');
    }

    checkStatus.value =  data.result.data.student;
}

const onCheckAssign = async (student: AssignmentHandinStatus) => {
    checkStatus.value = checkStatus.value.map((item) => {
        if (item.no === student.no) {
            item.handin = !item.handin;

            useApi.assignmentService.checkAssignment(
                selectAssignment.value?.id || '',
                {
                    no: item.no,
                    checked: item.handin
                }
            ).then(async (res) => {
                const response = res as null;

                if (!response) {
                    return navigateTo('/home');
                } 
            })
        }

        return item;
    })
}

const onCloseAssignmenDetail = () => {
    checkStatus.value = [];
    showDetailAssignment.value = false;
}

const onOpenDialogConfirmDelete = (assignment: AssignmentResponse) => {
    showDialogConfirmDelete.value = true;
    selectAssignment.value = assignment;
}

const onOpenDialogEditAssignment = (assignment: AssignmentResponse) => {
    assignmentUpdateForm.topic = assignment.assign_name;
    assignmentUpdateForm.detail = assignment.assign_detail;
    dueDateSelected.value = dayjs(assignment.assign_due).format("YYYY-MM-DD");

    showDialogUpdatAssignment.value = true;
    selectAssignment.value = assignment;
}

const onCloseDialogEditAssignment = () => {
    showDialogUpdatAssignment.value = false;
    dueDateSelected.value = '';
}

const onSubmitUpdateAssigment = async () => {
    loadingPage.value = true;
    showDialogUpdatAssignment.value = false;

    const data = await useApi.assignmentService.updateAssignmentById(selectAssignment.value?.id || "",
    {
        assign_name: assignmentUpdateForm.topic,
        assign_detail: assignmentUpdateForm.detail,
        assign_due: dayjs(dueDateSelected.value).format('YYYY-MM-DD HH:mm:ss')
    })

    dueDateSelected.value = '';

    if (!data) {
        return navigateTo('/home');
    }

    await getAssignmentAll();

    setTimeout(() => { loadingPage.value = false }, 200);
}

const onSubmitDeleteAssignment = async () => {
    loadingPage.value = true;
    showDialogConfirmDelete.value = false;

    const data = await useApi.assignmentService.deleteAssignmentById(selectAssignment.value?.id || "");

    if (!data) {
        return navigateTo('/home');
    }

    await getAssignmentAll();
    setTimeout(() => { loadingPage.value = false }, 200);
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
                <p class="text-center text-white text-bold text-2xl mt-4">งานที่มอบหมาย</p>
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
                    class="bg-[#FFFFFF]   w-full h-[130px] p-5 rounded-[15px] cursor-pointer transform hover:shadow-md duration-75 relative"
                >
                    <div class="flex flex-col" @click="onSelectAssignment(item)">
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

                    <div class="absolute -right-[90px] top-1/2 transform -translate-y-1/2 bg-white rounded-md">
                        <div class="flex items-center gap-x-3 p-2">
                            <Icon 
                                name="ion:edit" 
                                class="text-gray-500 hover:text-blue-600 h-[18px] w-[18px]" 
                                @click="onOpenDialogEditAssignment(item)"
                            />

                            <div class="h-3 w-[0.5px] bg-gray-300"></div>

                            <Icon 
                                name="ion:md-trash" 
                                class="text-gray-500 hover:text-red-500 h-[18px] w-[18px]" 
                                @click="onOpenDialogConfirmDelete(item)"
                            />
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
        v-if="showDialogUpdatAssignment"
        @click="onCloseDialogEditAssignment" 
        class="fixed w-full top-0 left-0 min-h-screen bg-gray-400/50"
    >
    </div>

    <div 
        v-if="showDialogConfirmDelete"
        @click="showDialogConfirmDelete = false" 
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
        v-if="showDialogUpdatAssignment"
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
                <p class="text-white text-2xl text-center">แก้ไขงาน</p>
            </div>
        </div>

        <form 
            class="flex flex-col p-8 gap-y-5"
            @submit.prevent="onSubmitUpdateAssigment"
        >
            <input 
                type="text" 
                placeholder="หัวข้อ"
                v-model="assignmentUpdateForm.topic"
                class="p-2 px-5 rounded-xl  bg-[#DCF2F1] mt-4" 
            />

            <textarea
                placeholder="รายละเอียดงาน"
                cols=""
                rows="4"
                v-model="assignmentUpdateForm.detail"
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
                    type="submit" 
                    class="bg-[#676B7D] py-2 px-3 h-[36px] text-white rounded-md w-[160px] font-bold"
                >
                    แก้ไข
                </button>
            </div>
        </form>
    </div>

    <div 
        v-if="showDetailAssignment"
        @click="onCloseAssignmenDetail" 
        class="fixed w-full top-0 left-0 min-h-screen bg-gray-400/50"
    >
    </div>

    <div 
        v-if="showDetailAssignment"
        class="lg:w-[800px] md:w-[600px] w-[400px] bg-white rounded-md fixed 
        top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
        "
    >
        <div class="relative">
            <div 
                class="bg-[#475A7D]  rounded-[15px] absolute h-[65px] px-4 
                flex  items-center justify-center gap-x-2
                absolute -top-[36px] left-1/2 transform -translate-x-1/2
                "
            >
                <p class="text-white text-2xl text-center">สถานะการส่งงาน:</p>
                <p class="text-white text-2xl center font-bold">{{ selectAssignment?.assign_name }}</p>
            </div>
        </div>

        <div class="grid mt-10 mx-10 mb-10 overflow-x-auto overflow-y-auto h-[500px]">
            <table class="w-full">
                <thead class="bg-white sticky -top-1">
                    <tr class="">
                        <th class="min-w-[120px] py-2">
                            <div class="w-full flex justify-center">
                                <div class="w-[100px] bg-[#ABCED1] p-2 rounded-xl">เลขที่</div>
                            </div>
                        </th>

                        <th class="min-w-[200px] max-w-[200px]" colspan="2">
                            <div class="w-full flex justify-center">
                                <div class="w-[200px] bg-[#ABCED1] p-2 rounded-xl">รายชื่อ</div>
                            </div>
                        </th>

                        <th class="w-[120px]">
                            <div class="w-full">
                                <div class="p-2 rounded-xl">สถานะ</div>
                            </div>
                        </th>

                        <th class="w-[100px]"></th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="item, idx of checkStatus" class="">
                        <td class="py-2 text-center font-bold">{{ idx + 1 }}</td>

                        <td class="py-2">{{ item.firstname }}</td>

                        <td class="py-2">{{ item.lastname }}</td>

                        <td class="py-2">
                            <div class="flex justify-center">
                                <div class="rounded-xl p-2 w-[100px] text-center" 
                                    :class="{
                                        'bg-[#6EA66A]': item.handin,
                                        'bg-[#CC3636]': !item.handin
                                    }"
                                >
                                    <p class="text-white">
                                        {{ item.handin ? 'ตรวจแล้ว' : 'ยังไม่ส่ง' }}
                                    </p>
                                </div>
                            </div>
                        </td>

                        <td class="py-2">
                            <div class="flex justify-center">
                                <div 
                                    @click="onCheckAssign(item)"
                                    class="border-2 rounded-md h-[30px] w-[30px] cursor-pointer flex items-center justify-center"
                                    :class="{
                                        'border-transparent bg-[#6EA66A]': item.handin,
                                        'border-black': !item.handin
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

    <Loading v-if="loadingPage" />
    <LoadingTransparent v-if="loadingAssignment" />
    <Modal v-model:show="showDialogConfirmDelete" title="งานที่มอบหมาย" @on-confirm="onSubmitDeleteAssignment" />
</template>