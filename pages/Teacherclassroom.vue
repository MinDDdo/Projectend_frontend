<script setup lang="ts">

import type { StudentResponse } from '~/interfaces/student.interface';

const studentList = ref<StudentResponse[]>([]);

onMounted(async () => {
    await getAllStudent();
})

const getAllStudent = async () => {
    
    const data = await useApi.studentService.getAllStudent('65c50290b5b53b7488e65981');

    if (!data) {
            return navigateTo('/');
        }
    
        studentList.value = data.result.data;
} 

</script>

<template>
    <div class="min-h-screen bg-[#EEF5FF] ">
        <div class="flex justify-between px-10 ">
            <div class="mt-3">
                <img src="~/assets/images/menu.png" alt="menu" />
            </div>
            
            <div class="bg-white flex gap-x-5 items-center mt-3 p-1 rounded-[10px] w-[190px] ">
                <img src="~/assets/images/T1.png" alt="T1"/>
                <p>ใจดี มีชัย</p>
            </div>
        </div>

        <div class="flex justify-center relative">
            <div class="bg-[#475A7D] p-3 w-[260px] mt-5 rounded-[15px] absolute left-1/2 transform -translate-x-1/2 -top-[30px]">
                <p class="font-bold text-2xl text-white text-center">ภาษาไทย</p>
            </div>
        </div>

        <div class="flex justify-center mt-5">
            <div class="bg-[#FFFFFF] p-4 w-[600px] h-[190px] rounded-[15px]">
                <div class="flex justify-end">
                    <p class="pr-2">แก้ไข</p>
                    <img src="~/assets/images/setting.png" alt="setting"/>
                </div>

                <div class="flex ">
                    <div class="flex flex-col w-1/2 items-center mt-3">
                        <p class="self-cente font-bold ">รหัสห้องเรียน</p>
                        <div class="mt-2">
                            <div class="bg-[#FF90BC] p-3 w-[200px] rounded-[15px]">
                                <p class="text-center font-bold text-white">004266</p>
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-col items-center justify-center w-1/2 mt-7">
                        <div class="bg-[#FFF8E3] p-1 w-[100px] h-[35px] rounded-[8px]">
                            <p class="text-center font-medium">n22101</p>
                        </div>
                        <div class="bg-[#D2E0FB] p-1 rounded-[8px] w-[80px] h-[30px] mt-3">
                            <p class="text-center ">ป.5/2</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex justify-center mt-5">
            <div class="bg-[#BE96C6] p-2 w-[170px] rounded-[20px]">
                <div class="flex justify-center items-center">
                    <p class=" text-white">รายชื่อ</p>
                    <img src="~/assets/images/person.png" alt="person" class="ml-1" />
                </div>
            </div>

            <div class="flex justify-center ml-3">
                <div class="bg-[#C7AFDC] p-2 w-[170px] rounded-[20px]">
                    <div class="flex justify-center items-center">
                        <p class=" text-white mt-1">เช็คชื่อ</p>
                        <img src="~/assets/images/hand.png" alt="hand" class=" mt-1 ml-1" />
                    </div>
                </div>
            </div>

            <div class="flex justify-center ml-3">
                <div class="bg-[#B598CD] p-2 w-[170px] rounded-[20px]">
                    <div class="flex justify-center items-center">
                        <p class="text-white mt-2">เช็คชื่อด้วย</p>
                        <img src="~/assets/images/qr.png" alt="qr" class="mt-1"/>
                    </div>
                </div>
            </div>

            <div class="flex justify-center ml-3">
                <div class="bg-[#B78DC9] p-2 w-[170px] rounded-[20px]">
                    <div class="flex justify-center items-center">
                        <p class="text-white mt-1">สุ่มชื่อ</p>
                        <img src="~/assets/images/random.png" alt="random" class="mt-1 ml-1"/>
                    </div>
                </div>
            </div>

            <div class="flex justify-center ml-3">
                <div class="bg-[#9181A9] p-2 w-[170px] rounded-[20px]">
                    <div class="flex justify-center items-center">
                        <p class="text-white mt-2">จับเวลา</p>
                        <img src="~/assets/images/time.png" alt="time" class="mt-1 ml-1"/>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex justify-center">
            <div class="mt-5">
                <p class="font-bold text-2xl">นักเรียน</p>
            </div>
        </div>

        <div class="grid grid-cols-4 justify-center mx-10 pb-24 mt-20 gap-8 ">
            <div 
                v-for="item of studentList"
                class="bg-[#FFFFFF] w-[280px] h-[230px] relative rounded-[20px] flex justify-end items-center flex-col mt-10">
                <img src="~/assets/images/avatarstudent/student1.png" 
                    alt="student1" 
                    class="absolute left-1/2 transform -translate-x-1/2 -top-[70px] w-[130px]"
                />
    
                <p class="bg-[#FFF8E3] p-2 rounded-full min-w-[100px] text-center text-lg font-bold">เลขที่ {{ item.no }}</p>
                <p class=" text-lg font-bold mt-7 mb-10">{{ item.firstname }}{{ item.lastname }} </p>
            </div>
        </div>

    </div>
</template>

<style scoped>

</style>