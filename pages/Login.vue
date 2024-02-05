<script setup lang="ts">
const username = ref<string>('');
const password = ref<string>('');
const errorAlert = ref<string>('');

const onSubmitLogin = async () => {
    const data =  await useApi.authenService.login({ email: username.value, password: password.value });

    console.log(data);
}
</script>

<template>
    <div class="h-screen bg-[#EEF5FF]">
        <div class="flex justify-between items-center px-10 pt-4">
            <div class="">
                <img src="~/assets/images/logo.png" alt="logo" />
            </div>

            <p>เกี่ยวกับเรา</p>
        </div>

        <div class="mt-10 flex justify-center">
            <div class="bg-white min-w-[550px] max-w-[550px] min-h-[420px] max-h-[420px] rounded-[40px] p-10">
                <h1 class="text-[24px] text-center">เข้าสู่ระบบ</h1>
                <p class="mt-4 text-center">กรอกชื่อผู้ใช้และรหัสผ่านของคุณเพื่อเข้าสู่ระบบ</p>

                <form class="flex flex-col mt-8 gap-y-7">
                    <input 
                        type="text" 
                        placeholder="อีเมล" 
                        class="p-2 px-5 rounded-xl  bg-[#DCF2F1]" 
                    />

                    <input 
                        type="password" 
                        placeholder="รหัสผ่าน" 
                        class="p-2 px-5 rounded-xl bg-[#DCF2F1]" 
                    />

                    <button type="submit" class="p-2 text-white font-bold bg-[#676B7D] rounded-xl">เข้าสู่ระบบ</button>
                </form>

                <p class="mt-8 text-center">
                    ยังไม่มีบัญชี? <span class="underline">ลงทะเบียน</span> 
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>