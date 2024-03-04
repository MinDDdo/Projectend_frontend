<script setup lang="ts">

import type { SignupResponse } from '@/interfaces/teacher.interface';

const firstname = ref<string>('');
const lastname = ref<string>('');
const dob = ref<string>('');
const gender = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');

const onSignup = async () => {
    const data =  await useApi.teacherService.signup({
        firstname: firstname.value,
        lastname: lastname.value,
        dob: dob.value,
        gender: gender.value,
        email: email.value,
        password: password.value
    })
    console.log(data)

    if (!data) {
            return navigateTo('/');
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
                <p>เกี่ยวกับเรา</p>
                <div class="flex  gap-x-1">
                    <p>เข้าสู่ระบบ</p>
                    <img src="~/assets/images/logologin.png" alt="logologin"  width="25" height="25"/>
                 </div>
            </div>
        </div>

        <div class="mt-10 flex justify-center">
            <div class="bg-white w-[500px] h-[520px]  rounded-[40px] p-10">
                <h1 class="text-[24px] text-center">ลงทะเบียน</h1>
                <p class="mt-4 text-center">กรอกรายละเอียดของคุณเพื่อลงทะเบียน</p>

                <form 
                    @submit.prevent="onSignup"
                    class="flex flex-col mt-5 gap-y-5">
                    <input 
                        type="text" 
                        placeholder="อีเมล" 
                        v-model="email"
                        class="p-2 px-5 rounded-xl  bg-[#DCF2F1]  " 
                    />

                    <div class="flex justify-between">
                        <input 
                            type="text" 
                            placeholder="ชื่อจริง" 
                            v-model="firstname"
                            class="p-2 px-5 rounded-xl bg-[#DCF2F1] w-[200px]" 
                        />

                         <input 
                            type="text" 
                            placeholder="นามสกุล" 
                            v-model="lastname"
                            class="p-2 px-5 rounded-xl bg-[#DCF2F1] w-[200px]" 
                        />
                    </div>
                   
                    <input 
                        type="date" 
                        placeholder="วันเกิด" 
                        v-model="dob"
                        class="p-2 px-5 rounded-xl bg-[#DCF2F1]" 
                    />
                    <input 
                        type="text" 
                        placeholder="เพศ" 
                        v-model="gender"
                        class="p-2 px-5 rounded-xl bg-[#DCF2F1]" 
                    />
                    <input 
                        type="password" 
                        placeholder="รหัสผ่าน" 
                        v-model="password"
                        class="p-2 px-5 rounded-xl bg-[#DCF2F1]" 
                    />
                    
                    <div class=" flex justify-center">
                        <button type="submit" class="p-2 text-white font-bold bg-[#676B7D] rounded-xl w-[200px]  ">
                            ลงทะเบียน
                        </button>

                    </div>
                </form>

                
            </div>
        </div>
    </div>
</template>