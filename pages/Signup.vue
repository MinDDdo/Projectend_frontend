<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import type { SignupResponse } from '@/interfaces/teacher.interface';

const firstname = ref<string>('');
const lastname = ref<string>('');
const gender = ref<string>('male');
const email = ref<string>('');
const password = ref<string>('');
const dueDateSelected = ref<string>('');


const onSignup = async () => {
    const data =  await useApi.teacherService.signup({
        firstname: firstname.value,
        lastname: lastname.value,
        dob: dayjs(dueDateSelected.value).format('YYYY-MM-DD HH:mm:ss'),
        gender: gender.value,
        email: email.value,
        password: password.value
    })

    if (!data) {
        return navigateTo('/');
    }

    if (data.detail.message === 'Email is duplicate.') {
        toast.error("อีเมลนี้ถูกใช้งานไปแล้ว", {
            transition: toast.TRANSITIONS.BOUNCE,
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
        });
        return;
    }

    navigateTo('/Login')
}

</script>

<template>
    <div class="h-screen bg-[#EEF5FF]">
        <div class="flex justify-between items-center px-10 pt-4">
            <div class="">
                <img src="~/assets/images/logo.png" alt="logo" />
            </div>
            <div class="flex gap-x-6 ">
                <NuxtLink to="/login" class="flex  gap-x-1">
                    <p>เข้าสู่ระบบ</p>
                    <img src="~/assets/images/logologin.png" alt="logologin"  width="25" height="25"/>
                 </NuxtLink>
            </div>
        </div>

        <div class="mt-10 flex justify-center">
            <div class="bg-white md:w-[550px] w-[400px]  rounded-[40px] p-10">
                <h1 class="text-[24px] text-center">ลงทะเบียน</h1>
                <p class="mt-4 text-center">กรอกรายละเอียดของคุณเพื่อลงทะเบียน</p>

                <form 
                    @submit.prevent="onSignup"
                    class="flex flex-col mt-5 gap-y-5">
                    <input 
                        type="mail" 
                        placeholder="อีเมล" 
                        v-model="email"
                        class="p-2 px-5 rounded-xl  bg-[#DCF2F1]  " 
                    />

                    <div class="flex md:flex-row flex-col gap-y-5  justify-between">
                        <input 
                            type="text" 
                            placeholder="ชื่อจริง" 
                            v-model="firstname"
                            class="p-2 px-5 rounded-xl bg-[#DCF2F1] md:w-[200px] w-full" 
                        />

                         <input 
                            type="text" 
                            placeholder="นามสกุล" 
                            v-model="lastname"
                            class="p-2 px-5 rounded-xl bg-[#DCF2F1] md:w-[200px] w-full" 
                        />
                    </div>

                    <div class="flex gap-x-2">
                        <select v-model="gender" class="w-[100px] bg-[#DCF2F1] py-2 !px-3 rounded-[10px]">
                            <option value="male" :selected="gender === 'male'">ชาย</option>
                            <option value="female" :selected="gender === 'female'">หญิง</option>
                        </select>

                        <VueDatePicker 
                            v-model="dueDateSelected" 
                            :clearable="false" 
                            no-today 
                            format="dd-MM-yyyy"
                            hide-offset-dates
                            placeholder="วว/ดด/ปป"
                            class="!w-full"
                            input-class-name="!p-2 !px-5 !rounded-xl !bg-[#DCF2F1] !border-none"
                            hide-input-icon
                        />
                    </div>
                   
                    <input 
                        type="password" 
                        placeholder="รหัสผ่าน" 
                        v-model="password"
                        class="p-2 px-5 rounded-xl bg-[#DCF2F1]" 
                    />
                    
                    <div class=" flex justify-center mt-5">
                        <button 
                            :disabled="email === '' || firstname === '' || lastname === '' || gender === '' || password === ''"
                            type="submit" 
                            class="p-2 text-white font-bold bg-[#676B7D] rounded-xl w-[200px]  "
                        >
                            ลงทะเบียน
                        </button>

                    </div>
                </form>
            </div>
        </div>
    </div>
</template>