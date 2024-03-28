<script setup lang="ts">
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { jwtDecode } from 'jwt-decode';

const email = ref<string>('');
const password = ref<string>('');

const authStore = useStore.authStore();
const teacherStore = useStore.teacherStore();

const onSubmitLogin = async () => {
    const data =  await useApi.authenService.login({ email: email.value, password: password.value });

    if (!data) {
        return console.error('Something went wrong');
    }

    if (data.detail.message === 'Invalid email or password') {
        toast.error("อีเมลหรือรหัสผ่านไม่ถูกต้อง", {
            transition: toast.TRANSITIONS.BOUNCE,
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
        });
        return;
    } 

    authStore.access_token = data.result.data.access_token;
    authStore.refresh_token = data.result.data.refresh_token;

    const decode: { id: string } = jwtDecode(authStore.access_token);

    teacherStore.id = decode.id;

    await navigateTo('/teacher/classroom');
}
</script>

<template>
    <div class="h-screen bg-[#EEF5FF]">
        <div class="flex justify-between items-center px-10 pt-4">
            <div class="">
                <img src="~/assets/images/logo.png" alt="logo" />
            </div>
        </div>

        <div class="mt-16 flex justify-center">
            <div class="bg-white md:w-[550px] w-[400px] rounded-[40px] p-10">
                <h1 class="text-[24px] text-center">เข้าสู่ระบบ</h1>
                <p class="mt-4 text-center">กรอกชื่อผู้ใช้และรหัสผ่านของคุณเพื่อเข้าสู่ระบบ</p>

                <form 
                    @submit.prevent="onSubmitLogin"
                    class="flex flex-col mt-8 gap-y-7"
                >
                    <input 
                        type="text" 
                        placeholder="อีเมล"
                        v-model="email" 
                        class="p-2 px-5 rounded-xl  bg-[#DCF2F1]" 
                    />

                    <input 
                        type="password" 
                        placeholder="รหัสผ่าน"
                        v-model="password" 
                        class="p-2 px-5 rounded-xl bg-[#DCF2F1]" 
                    />

                    <button 
                        :disabled="email === '' || password === ''"
                        type="submit" 
                        class="p-2 text-white font-bold bg-[#676B7D] rounded-xl mt-10"
                    >
                        เข้าสู่ระบบ
                    </button>
                </form>

                <p class="mt-8 text-center">
                    ยังไม่มีบัญชี? <NuxtLink to="/signup" class="underline">ลงทะเบียน</NuxtLink> 
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>