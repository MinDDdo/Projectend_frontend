<!-- หน้า Teacher Assignment -->

<script lang="ts" setup>
import type { AssignmentResponse,AssignmentCreateDto } from '~/interfaces/assignment.interface';
import VueDatePicker from '@vuepic/vue-datepicker';
import dayjs from 'dayjs';
import 'dayjs/locale/th';

const route = useRoute();


const assignments = ref<AssignmentResponse[]>([]);
const dueDateSelected = ref<string>('');
const assignmentForm = reactive({
    topic: '',
    detail: ''
});



const showCreateAssignment = ref<boolean>(false);

onMounted(async () => {
    await getAssignmentAll();
})

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
        return navigateTo('/');
    }

    // Clear form
    assignmentForm.topic = '';
    assignmentForm.detail = '';
}

</script>

<template>
    <div class="h-screen bg-[#EEF5FF] relative">
        <div class="">
            <div class="">
                <img 
                    src="~/assets/images/arrow.png"  
                    alt="arrow"
                    class="pt-3 pl-5 w-[75px]"
                />
            </div>
        </div>

        <div class="flex justify-center ">
            <div class="bg-[#475A7D]  rounded-[15px] w-[300px] h-[65px] ">
                <p class="text-center text-white text-bold text-2xl mt-4">งานที่หมอบหมาย</p>
            </div>
        </div>

        <div class="mt-5 px-[420px] relative min-h-[50px]">
            <button 
                type="button" 
                class="
                bg-[#FFFFFF] rounded-[15px] p-2 w-[160px] flex item-center absolute transform
                transition-transform duration-100 hover:-translate-y-1 hover:shadow-sm
                "
                @click="showCreateAssignment = true"
            >
                <img 
                    src="~/assets/images/task.png" 
                    alt="task"
                    class="pl-4 "
                />
                <p class="text-center mt-1 text-lg pl-1">สร้างงาน</p>
            </button>
        </div>

        <div class="flex justify-center mt-8">
            <div class="" v-if="assignments.length !== 0">
                <div 
                    v-for="item of assignments"
                    class="bg-[#FFFFFF] w-[700px] h-[130px] p-5 rounded-[15px]"
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
                    type="submit" 
                    class="bg-[#676B7D] py-2 px-3 h-[36px] text-white rounded-md w-[160px] font-bold"
                >
                    สร้าง
                </button>
            </div>
        </form>
    </div>
</template>