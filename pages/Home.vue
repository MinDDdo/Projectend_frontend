<script setup lang="ts">
import { jwtDecode } from 'jwt-decode';

const authStudent = useStore.authStudentStore();
const studentStore = useStore.studentStore();

const joinClassroomForm = reactive({
    classroomCode: 'd915e2',
    no: '1'
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
                    <p class="hover:bg-gray-200 rounded-md p-2 duration-100 cursor-pointer">เกี่ยวกับเรา</p>
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
                    class="select-none"
                />

                <div class="">
                    <div class="flex flex-col">
                        <img 
                            src="~/assets/images/inclass.png" 
                            alt="inclass" 
                            class="h-auto w-[450px] self-center select-none"
                            draggable="false"
                        />

                        <p class="text-center text-4xl mt-3 text-[#36506C]">Classroom management system</p>
                    </div>

                    <div class="flex justify-center flex-col mt-10 ml-4">
                        <form @submit.prevent="onJoinClassroom" class="flex gap-2 items-center">
                            <p class="mr-3 font-bold">สำหรับนักเรียน</p>

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

                            <button type="submit" class="p-1 bg-[#676B7D] text-white rounded-[4px] w-[100px] ml-2">
                                เข้าร่วม
                            </button>
                        </form>

                        <div class="flex mt-5 items-center">
                            <p class="mr-7 font-bold">สำหรับคุณครู</p>
                            
                            <NuxtLink
                                to="/login" 
                                type="submit" 
                                class="p-1 bg-[#676B7D] text-white rounded-[4px] 
                                w-[140px] ml-2 text-center select-none"
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