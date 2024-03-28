<script setup lang="ts">
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { jwtDecode } from 'jwt-decode';

const authStudent = useStore.authStudentStore();
const studentStore = useStore.studentStore();

const joinClassroomForm = reactive({
    classroomCode: '',
    no: ''
})

const onJoinClassroom = async () => {
    const data = await useApi.studentService.joinClassroom(
        joinClassroomForm.classroomCode,
        joinClassroomForm.no
    )

    if (!data) {
        authStudent.$reset();
        return navigateTo('/home');
    }

    if (data.detail.message === 'Not founded classroom') {
        toast.error("ไม่พบห้องเรียนรหัสนี้", {
            transition: toast.TRANSITIONS.BOUNCE,
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
        });
        return;
    }

    if (data.detail.message === 'Not founded student') {
        toast.error("ไม่พบนักเรียนเลขที่นี้", {
            transition: toast.TRANSITIONS.BOUNCE,
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
        });
        return;
    }

    authStudent.access_token = data.result.data.access_token;
    authStudent.refresh_token = data.result.data.refresh_token;

    const decode: { student_id: string, classroom_id: string } = jwtDecode(authStudent.access_token);

    studentStore.id = decode.student_id;
    studentStore.classroomId = decode.classroom_id;

    navigateTo('/student/assignment');
}
</script>

<template>
    <div class="h-screen bg-[#EEF5FF]">
        <div class="flex justify-between items-center px-10 pt-4">
                <div class="">
                    <img 
                        src="~/assets/images/logo.png" 
                        alt="logo" 
                        draggable="false"
                    />
                </div>
                
                <div class="flex gap-x-6 items-center ">
                    <NuxtLink to="/login" class="flex  gap-x-1 hover:bg-gray-200 rounded-md p-2 duration-100">
                        <p>เข้าสู่ระบบ</p>
                        <img 
                            src="~/assets/images/logologin.png" 
                            alt="logologin"  
                            width="25" 
                            height="25"
                            draggable="false"
                            class="select-none"
                        />
                    </NuxtLink>
                </div>
        </div>


        <div class=" ">
            <div class="flex justify-center mt-20 items-center gap-10">
                <img 
                    src="~/assets/images/main.png" 
                    alt="main"
                    draggable="false"
                    class="select-none lg:block hidden"
                />

                <div class="">
                    <div class="flex flex-col">
                        <img 
                            src="~/assets/images/inclass.png" 
                            alt="inclass" 
                            class="h-auto lg:w-[450px] md:w-[300px] w-[300px] self-center select-none"
                            draggable="false"
                        />

                        <p class="text-center lg:text-4xl md:text-2xl text-xl mt-3 text-[#36506C]">Classroom management system</p>
                    </div>

                    <div class="flex justify-center flex-col mt-10 ml-4">
                        <form @submit.prevent="onJoinClassroom" class="flex md:justify-start justify-center gap-2 md:flex-nowrap flex-wrap items-center">
                            <p class="mr-3 font-bold">สำหรับนักเรียน</p>

                            <div class="flex items-center gap-x-3">
                                <input
                                    type="text"
                                    placeholder="รหัสห้องเรียน"
                                    class="p-1 px-1   bg-[#FFFFFF] text-center w-[150px]"
                                    v-model="joinClassroomForm.classroomCode" 
    
                                />
    
                                <input
                                    type="text"
                                    placeholder="เลขที่"
                                    class="p-1 px-1   bg-[#FFFFFF] text-center w-[100px]"
                                    v-model="joinClassroomForm.no" 
    
                                />
    
                                <button 
                                    :disabled="joinClassroomForm.classroomCode === '' || joinClassroomForm.no === ''"
                                    type="submit" 
                                    class="p-1 bg-[#676B7D] text-white rounded-[4px] w-[100px] ml-2"
                                >
                                    เข้าร่วม
                                </button>
                            </div>
                        </form>

                        <div class="flex md:flex-row flex-col md:justify-start justify-center md:mt-5 mt-10 items-center gap-y-2">
                            <p class="md:mr-7 m-0 font-bold md:text-start text-center">สำหรับคุณครู</p>
                            
                            <NuxtLink
                                to="/login" 
                                type="submit" 
                                class="p-1 bg-[#676B7D] text-white rounded-[4px] 
                                w-[140px] md:ml-2 m-0 text-center select-none"
                            >
                                จัดการชั้นเรียน
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    </div>
</template>