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
    <div class="h-screen">
        <Navbar logo="Login" />

        <main class="mt-24 flex flex-col max-w-[500px] mx-auto h-full just">
            <div class="flex flex-col justify-center items-center gap-y-2">
                <h1 class="text-2xl font-bold">เข้าสู่ระบบ</h1>

                <p class="text-gray-500">
                    กรอกชื่อผู้ใช้และรหัสผ่านของคุณเพื่อเข้าสู่ระบบ
                </p>
            </div>

            <form 
                class="mt-10 flex flex-col gap-y-4"
                @submit.prevent="onSubmitLogin"
            >
                <Input 
                    v-model="username" 
                    type="text" 
                    placeholder="ชื่อผู้ใช้" 
                />

                <Input 
                    v-model="password" 
                    type="password" 
                    placeholder="รหัสผ่าน" 
                />

                <p class="text-red-500" v-if="errorAlert !== ''">
                    {{ errorAlert }}
                </p>

                <button 
                    class="bg-purple-600 p-2 rounded-xl mt-5 font-bold"
                    type="submit"
                >
                    เข้าสู่ระบบ
                </button>
            </form>

            <div class="mt-8 flex gap-x-1 justify-center">
                <p>ยังไม่มีบัญชี</p>
                <p class="underline">ลงทะเบียน</p>
            </div>
        </main>
    </div>
</template>

<style scoped>
</style>