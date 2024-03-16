<script lang="ts" setup>
import type { StudentAttendanceResponse, StudentResponse } from '~/interfaces/student.interface';
import type {ClassroomResponse } from '~/interfaces/classroom.interface';
import { studentAvatar } from '~/assets/static/studentAvatar';
import { filename } from 'pathe/utils';


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
    await getAttendanceByStudent();

    setTimeout(() => { loadingPage.value = false }, 300)
})

const student = ref<StudentResponse | null>(null);
const classroom = ref<ClassroomResponse | null>(null);
const studentAttendance = ref<StudentAttendanceResponse | null>(null);

const showModalChangeAvatar = ref<boolean>(false);
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

const getAttendanceByStudent = async () => {
    const data = await useApi.studentService.studentCheckStatusAttendance({ 
        no: student.value?.no || 0,
        classroom_id: student.value?.classroom_id || ""
    })

    if(!data) {
        return navigateTo('/home');
    }

    studentAttendance.value = data.result.data;
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
</script>

<template>
    <div class="h-screen bg-[#EEF5FF]">
        <div class="flex justify-between items-center px-10 pt-4">
            <div class="" @click="studentLogout">
                <img src="~/assets/images/logohome.png" alt="logohome" width="40" height="40"  />
            </div>
            
        </div>

        <div class="mt-5 flex justify-center ">
            <div class=" flex flex-col gap-y-5 items-center min-w-[550px] max-w-[550px] min-h-[480px] max-h-[480px]">
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
                    type="button" 
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

        <div class="flex justify-center items-center">
            <div class="bg-white rounded-md p-10 w-[400px] flex flex-col gap-y-5">
                <div class="flex items-center justify-center">
                    <div class="flex items-center gap-x-10 w-[100px]">
                        <div class="bg-[#5D9C59] h-[25px] w-[25px] rounded-sm"></div>
                        <p class="font-bold">มา</p>
                    </div>
                    <p class="text-[#187498] w-[100px] text-center">{{ studentAttendance?.present }}</p>
                    <p class="font-bold text-center">ครั้ง</p>
                </div>

                <div class="flex items-center justify-center">
                    <div class="flex items-center gap-x-10 w-[100px]">
                        <div class="bg-[#CC3636] h-[25px] w-[25px] rounded-sm"></div>
                        <p class="font-bold">ขาด</p>
                    </div>
                    <p class="text-[#187498] w-[100px] text-center">{{ studentAttendance?.absent }}</p>
                    <p class="font-bold text-center">ครั้ง</p>
                </div>

                <div class="flex items-center justify-center">
                    <div class="flex items-center gap-x-10 w-[100px]">
                        <div class="bg-[#F9D923] h-[25px] w-[25px] rounded-sm"></div>
                        <p class="font-bold">ลา</p>
                    </div>
                    <p class="text-[#187498] w-[100px] text-center">{{ studentAttendance?.leave }}</p>
                    <p class="font-bold text-center">ครั้ง</p>
                </div>

                <div class="flex items-center justify-center">
                    <div class="flex items-center gap-x-10 w-[100px]">
                        <div class="bg-[#FFA447] h-[25px] w-[25px] rounded-sm"></div>
                        <p class="font-bold">สาย</p>
                    </div>
                    <p class="text-[#187498] w-[100px] text-center">{{ studentAttendance?.late }}</p>
                    <p class="font-bold text-center">ครั้ง</p>
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

    <Loading v-if="loadingPage" />
</template>