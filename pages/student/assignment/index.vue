<script lang="ts" setup>
import type { StudentResponse } from '~/interfaces/student.interface';
import type {ClassroomResponse } from '~/interfaces/classroom.interface';
import { studentAvatar } from '~/assets/static/studentAvatar';
import { filename } from 'pathe/utils';
import type { AssigntmentStudentResponse } from '~/interfaces/assignment.interface';
import dayjs from 'dayjs';
import 'dayjs/locale/th';

const glob: Record<string, any> = import.meta.glob('~/assets/images/avatarstudent/*.png', { eager: true });
const images = Object.fromEntries(
  Object.entries(glob).map(([key, value]) => [filename(key), value.default])
);

const studentStore = useStore.studentStore();

const loadingPage = ref<boolean>(false);

onMounted(async () => {
    loadingPage.value = true;
    await getStudentById();
    await getClassroomById();
    await getAssignmentByStudent();
    setTimeout(() => { loadingPage.value = false }, 300)
})

const student = ref<StudentResponse | null>(null);
const classroom = ref<ClassroomResponse | null>(null);
const assignments = ref<AssigntmentStudentResponse[]>([]);
const selectAssignment = ref<AssigntmentStudentResponse | null>(null);

const showModalChangeAvatar = ref<boolean>(false);
const showDetailAssignment = ref<boolean>(false);
const selectAvatarProfile = ref<string>('');

const getStudentById = async () => {
    const data = await useApi.studentService.getStudentById(
        studentStore.classroomId,
        studentStore.id
    );

    if (!data) {
        return navigateTo('/home');
    }

    selectAvatarProfile.value = data.result.data.image;
    student.value = data.result.data;
}

const getClassroomById = async () => {
    const data = await useApi.studentService.getClassroomById(
        studentStore.classroomId
    );
    
    if(!data) {
        return navigateTo('/home');
    }
    
    classroom.value = data.result.data;
}

const getAssignmentByStudent = async () => {
    const data = await useApi.studentService.studentCheckStatusAssignment(
        {
            no: student.value?.no || 0,
            classroom_id: classroom.value?.id || ""
        }
    );

    if(!data) {
        return navigateTo('/home');
    }
    
    assignments.value = data.result.data;
}

const studentLogout = async () => {
    studentStore.$reset()

    navigateTo('/home');
}

const onOpenSelectAvatarProfile = () => {
    showModalChangeAvatar.value = true;
    selectAvatarProfile.value = student.value?.image || '';
}

const onSelectAvatarProfile = (name: string) => {
    selectAvatarProfile.value = name;
}

const onSubmitChangeAvatar = async () => {
    loadingPage.value = true;

    showModalChangeAvatar.value = false;

    const data = await useApi.studentService.updateStudent(studentStore.id, {
        image: selectAvatarProfile.value
    })

    selectAvatarProfile.value = '';

    if (!data) {
        return navigateTo('/home');
    } 

    await getStudentById();

    setTimeout(() => { loadingPage.value = false }, 300)
}

const onClickAssignment = (assignment: AssigntmentStudentResponse) => {
    showDetailAssignment.value = true;

    selectAssignment.value = assignment;
    // navigateTo(`/student/assignment/${id}`);
}
</script>

<template>
    <div class="min-h-screen bg-[#EEF5FF]">
        <div class="flex justify-between items-center px-10 pt-4">
            <div class="" @click="studentLogout">
                <img src="~/assets/images/logohome.png" alt="logohome" width="40" height="40"  />
            </div>
            
        </div>

        <div class="mt-5 flex justify-center ">
            <div class=" flex flex-col gap-y-5 items-center min-w-[550px] max-w-[550px] min-h-[540px] max-h-[540px]">
                <h1 class="text-[30px] text-center font-bold">{{ classroom?.name }}</h1>

                <div class="flex justify-center relative">
                    <div>
                        
                        <img 
                            v-if="!student?.image"
                            src="~/assets/images/avatarstudent/unknow-avatar.png"
                            alt="profile" 
                            width="190" 
                            height="190" 
                            draggable="false"
                            class="rounded-full select-none"
                        />

                        <img 
                            v-if="student?.image"
                            :src="images[`${student?.image}`]"
                            alt="profile" 
                            width="190" 
                            height="190" 
                            draggable="false"
                            class="rounded-full select-none"
                        />

                    </div>

                    <div class="absolute bottom-2 right-2 cursor-pointer">
                        <img 
                            @click="onOpenSelectAvatarProfile"
                            src="~/assets/images/logoeditprofile.png" 
                            alt="logoeditprofile" 
                            width="40" 
                            height="40" 
                            draggable="false"
                            class="rounded-full select-none"
                        />
                     </div>
                </div>

                <div class="" >
                    <div class="flex gap-x-5">
                        <h1 class="text-[24px] font-bold">{{ student?.firstname }}</h1>
                        <h1 class="text-[24px] font-bold">{{ student?.lastname }}</h1>
                    </div>
                </div>

                <NuxtLink
                    to="/student/assignment"
                    class="p-2 px-12 text-white font-bold bg-[#676B7D] rounded-md"
                > 
                    <div class="flex  gap-x-1">
                        <img src="~/assets/images/logofolder.png" alt="logofolderr" width="24" height="24"  />
                        <p>ดูสถานะงาน</p>       
                    </div>                  
                </NuxtLink>
                
                <NuxtLink
                    to="/student/attendance"
                    type="button" 
                     class="p-2 px-12 text-white font-bold bg-[#676B7D] rounded-md "
                >
                    <div class="flex  gap-x-1">
                    
                        <img src="~/assets/images/logocalendar.png" alt="logocalendar" width="24" height="24"  />
                        <p>การเข้าเรียน</p>    
                    </div>                
                </NuxtLink>
            </div>
        </div>

        <div class="flex mx-10 justify-center">
            <div class="grid  grid-cols-2 gap-x-10  gap-y-10 mx-10 mb-10" >
                <div 
                    v-for=" item of assignments"
                    class = "flex justify-center items-center gap-x-8 px-7 bg-white w-[405px] h-[140px] rounded-[20px] cursor-pointer hover:shadow-md transform hover:-translate-y-[10px] duration-100 transition:shadow"
                    @click="onClickAssignment(item)" 
                >
                    <div class="flex-col space-y-3">
                        <p class="flex font-bold text-[20px]">{{ item.assign_name }}</p>

                        <div class="flex gap-x-5" >
                            <p class="flex text-[18px]">กำหนดส่ง</p>
                        
                            <p class="flex text-[#D04848] text-[18px] ">
                                {{ dayjs(item.assign_due).locale('th').format('DD MMM YYYY') }}
                            </p>
                        </div>
                    </div>

                    <div 
                        class="text-white text-center min-w-[85px] max-w-[80px] min-h-[75px] max-h-[75px] rounded-[20px]
                        flex items-center justify-center"
                        :class="{
                            'bg-[#CC3636]': !item.handin_detail.handin,
                            'bg-[#5D9C59]': item.handin_detail.handin,
                        }"
                    >
                        <p class="text-[18px]">{{ (item.handin_detail.handin) ? "ส่งแล้ว" : "ยังไม่ส่ง" }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div 
        v-if="showModalChangeAvatar"
        @click="showModalChangeAvatar = false"
        class="fixed bg-gray-400 bg-opacity-50 h-screen w-full z-[99999] top-0 right-0 left-0" 
    ></div>

    <div 
        v-if="showModalChangeAvatar"
        class="fixed bg-white rounded-[20px]  min-w-[900px] min-h-[650px] z-[999999] 
        top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 " 
    >
        <div class="overflow-y-scroll overflow-x-hidden min-h-[450px] min-w-[700px] 
        max-h-[450px] max-w-[700px] mt-[80px] mx-[100px] grid grid-cols-5 gap-1" >
            <img
                v-for="item, idx of studentAvatar"
                :src="images[`${item.name}`]" 
                :alt="idx + ''" 
                draggable="false"
                class="rounded-lg cursor-pointer transition-transform duration-100 border-2 "  
                :class="{
                    'border-[#475A7D] shadow-sm': item.name === selectAvatarProfile,
                    'border-transparent': item.name !== selectAvatarProfile
                }"
                @click="onSelectAvatarProfile(item.name)"
            />
        </div>
        
        <div class=" grid justify-items-center pt-5" >
            <button 
                :disabled="selectAvatarProfile === '' || selectAvatarProfile === student?.image"
                @click="onSubmitChangeAvatar"
                type="submit" 
                class="p-2 bg-[#676B7D] w-[150px] h-[50px] rounded-[10px] text-white font-bold"
            >
                บันทึก
            </button>
        </div>
    </div>


    <div 
        v-if="showDetailAssignment"
        @click="showDetailAssignment = false"
        class="fixed bg-gray-400 bg-opacity-50 h-screen w-full z-[99999] top-0 right-0 left-0" 
    ></div>

    <div 
        v-if="showDetailAssignment"
        class="fixed bg-white rounded-[20px]  min-w-[500px] min-h-[300px] z-[999999] 
        top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" 
    >
        <div class="relative">
            <div 
                class="bg-[#475A7D]  rounded-[15px] absolute w-[300px] h-[65px] 
                flex items-center justify-center
                absolute -top-[36px] left-1/2 transform -translate-x-1/2
                "
            >
                <p class="text-white text-2xl text-center font-bold">{{ selectAssignment?.assign_name }}</p>
            </div>
        </div>

        <div class="flex flex-col gap-y-6 w-full p-10">
            <div class="flex gap-x-2 items-center mt-8">
                <div class="min-w-[80px]">กำหนดส่ง</div>
                
                <div class="font-semibold text-[#CC3636]">
                    {{ dayjs(selectAssignment?.assign_due).locale('th').format('DD MMM YYYY') }}
                </div>
            </div>

            <div class="flex gap-x-2 items-center">
                <div class="min-w-[80px]">สถานะ</div>

                <div 
                    class="font-semibold text-white p-2 rounded-md leading-none"
                    :class="{
                        'bg-[#CC3636]': !selectAssignment?.handin_detail.handin,
                        'bg-[#5D9C59]': selectAssignment?.handin_detail.handin,
                    }"
                >
                    {{ (selectAssignment?.handin_detail.handin) ? "ส่งแล้ว" : "ยังไม่ส่ง" }}
                </div>
            </div>

            <div class="flex flex-col gap-x-2">
                <div class="min-w-[100px]">รายละเอียดงาน</div>
                
                <div 
                    class="p-2 rounded-md border min-h-[120px] max-h-[120px] 
                    overflow-y-auto max-w-[450px] mt-2 break-words"
                >
                    {{ selectAssignment?.assign_detail }}
                </div>
            </div>
        </div>
    </div>

    <Loading v-if="loadingPage" />
</template>


<style scope>
.router-link-active {
    @apply bg-[#636363] p-3 px-14
}
</style>