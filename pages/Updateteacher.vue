<script setup lang="ts">

import type { TeacherResponse } from '@/interfaces/teacher.interface'
import dayjs from 'dayjs';

const teacher = ref<TeacherResponse | null>(null);

const firstname = ref<string>('');
const lastname = ref<string>('');
const dob = ref<string>('');
const gender = ref<string>('');
const lineContact = ref<string>('');
const phoneContact = ref<string>('');

onMounted(async () => {
    await getTeacherById();
})

const getTeacherById = async () => {
    const data = await useApi.teacherService.getTeacherById('65c0f97b48f2c8d8846a2251')

    if (!data) {
            return navigateTo('/');
        }

        firstname.value = data.result.data.firstname;
        lastname.value = data.result.data.lastname;
        dob.value = dayjs(data.result.data.dob).format('YYYY-MM-DD HH:mm:ss');
        gender.value = data.result.data.gender;
        lineContact.value = data.result.data.line_contact;
        phoneContact.value = data.result.data.phone_contact;
        console.log(data.result.data)
        
}

const updateTeacher = async () => {
    const data = await useApi.teacherService.update('65c0f97b48f2c8d8846a2251', {
        firstname: firstname.value,
        lastname: lastname.value,
        dob: dob.value,
        gender: gender.value,
        line_contact: lineContact.value,
        phone_contact: phoneContact.value

    })

    if (!data) {
            return navigateTo('/');
        }

        navigateTo('/classroomlist')
}

</script>

<template>
    <div class="min-h-screen bg-[#EEF5FF]">
        <div class="flex justify-between px-10">
            <div class="mt-5">
                <img src="~/assets/images/menu.png" alt="menu" />
            </div>

            <div class="bg-white flex gap-x-5 items-center mt-3 p-1 rounded-[10px] w-[190px] ">
                <img src="~/assets/images/T1.png" alt="T1"/>
                <p>ใจดี มีชัย</p>
            </div>
        </div>

        <div class="flex justify-center relative mt-5">
            <form 
                @submit.prevent="updateTeacher"
                class="p-2 bg-[#FFFFFF] w-[530px] h-[530px] rounded-[30px] ">
                <div class="absolute left-1/2 transform -translate-x-1/2 -top-[60px]">
                    <img src="~/assets/images/T2.png" alt="T2"
                    class="w-[130px]"
                    />
                </div>

                <div class="flex justify-center mt-20">
                    <p class="mt-1 pr-5">ชื่อจริง</p>
                    
                        <input 
                            type="text"
                            placeholder="ชื่อ"
                            v-model="firstname"
                            class="pt-1 bg-[#DCF2F1] rounded-[10px] w-[300px] h-[35px] pl-5"
                        />
                    
                </div>

                <div class="flex justify-center mt-7">
                    <p class="mt-1 pr-3">นามสกุล</p>
                    
                        <input 
                            type="text"
                            placeholder="นามสกุล"
                            v-model="lastname"
                            class="pt-1 bg-[#DCF2F1] rounded-[10px] w-[300px] h-[35px] pl-5"
                        />
                    
                </div>

                <div class="flex justify-center mt-7">
                    <p class="mt-1 pr-6">วันเกิด</p>
                    
                        <input 
                            type="input"
                            placeholder="วว/ดด/ปป"
                            v-model="dob"
                            class="pt-1 bg-[#DCF2F1] rounded-[10px] w-[300px] h-[35px] pl-5"
                        />
                    
                </div>
                <div class="flex justify-center mt-7">
                    <p class="mt-1 pr-6">วันเกิด</p>
                    
                        <input 
                            type=""
                            placeholder="วว/ดด/ปป"
                            
                            class="pt-1 bg-[#DCF2F1] rounded-[10px] w-[300px] h-[35px] pl-5"
                        />
                    
                </div>

                <div class="flex justify-center mt-7">
                    <p class="mt-1 pr-6">เบอร์</p>
                    
                        <input 
                            type="text"
                            placeholder="เบอร์"
                            v-model="phoneContact"
                            class="pt-1 bg-[#DCF2F1] rounded-[10px] w-[300px] h-[35px] pl-5"
                        />
                    
                </div>

                <div class="flex justify-center mt-7">
                    <p class="mt-1 pr-5">ไอดีไลน์</p>
                    
                        <input 
                            type="text"
                            placeholder="ไอดีไลน์"
                            v-model="lineContact"
                            class="pt-1 bg-[#DCF2F1] rounded-[10px] w-[300px] h-[35px] pl-5"
                        />
                    
                </div>

                <div class="flex justify-center mt-7 gap-x-10">
                    <button class="p-1 bg-[#E5E5E5] w-[160px] h-[35px] rounded-[10px] font-bold">
                        ยกเลิก
                    </button>

                    <button type="submit" class="p-1 bg-[#676B7D] w-[160px] h-[35px] rounded-[10px] text-white font-bold">
                        บันทึก
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>