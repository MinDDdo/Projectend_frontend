<script setup lang="ts">
import dayjs from 'dayjs';

const teacherStore = useStore.teacherStore();

const updateForm = reactive({
    firstname: '',
    lastname: '',
    dob: '',
    gender: '',
    lineContact: '',
    phoneContact: ''
})

onMounted(async () => {
    await getTeacherById();
})

const getTeacherById = async () => {
    const data = await useApi.teacherService.getTeacherById(teacherStore.id);

    if (!data) {
        return navigateTo('/');
    }

    updateForm.firstname = data.result.data.firstname;
    updateForm.lastname = data.result.data.lastname;
    updateForm.dob = dayjs(data.result.data.dob).format('YYYY-MM-DD HH:mm:ss');
    updateForm.gender = data.result.data.gender;
    updateForm.lineContact = data.result.data.line_contact;
    updateForm.phoneContact = data.result.data.phone_contact;
}

const updateTeacher = async () => {
    const data = await useApi.teacherService.update(teacherStore.id, {
        firstname: updateForm.firstname,
        lastname: updateForm.lastname,
        dob: updateForm.dob,
        gender: updateForm.gender,
        line_contact: updateForm.lineContact,
        phone_contact: updateForm.phoneContact
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
                            v-model="updateForm.firstname"
                            class="pt-1 bg-[#DCF2F1] rounded-[10px] w-[300px] h-[35px] pl-5"
                        />
                    
                </div>

                <div class="flex justify-center mt-7">
                    <p class="mt-1 pr-3">นามสกุล</p>
                    
                        <input 
                            type="text"
                            placeholder="นามสกุล"
                            v-model="updateForm.lastname"
                            class="pt-1 bg-[#DCF2F1] rounded-[10px] w-[300px] h-[35px] pl-5"
                        />
                    
                </div>

                <div class="flex justify-center mt-7">
                    <p class="mt-1 pr-6">วันเกิด</p>
                    
                        <input 
                            type="input"
                            placeholder="วว/ดด/ปป"
                            v-model="updateForm.dob"
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
                            v-model="updateForm.phoneContact"
                            class="pt-1 bg-[#DCF2F1] rounded-[10px] w-[300px] h-[35px] pl-5"
                        />
                    
                </div>

                <div class="flex justify-center mt-7">
                    <p class="mt-1 pr-5">ไอดีไลน์</p>
                    
                        <input 
                            type="text"
                            placeholder="ไอดีไลน์"
                            v-model="updateForm.lineContact"
                            class="pt-1 bg-[#DCF2F1] rounded-[10px] w-[300px] h-[35px] pl-5"
                        />
                    
                </div>

                <div class="flex justify-center mt-7 gap-x-10">
                    <NuxtLink 
                        to="/classroomlist" 
                        class="p-1 bg-[#E5E5E5] w-[160px] h-[35px] rounded-[10px] font-bold"
                    >
                        ยกเลิก
                    </NuxtLink>

                    <button type="submit" class="p-1 bg-[#676B7D] w-[160px] h-[35px] rounded-[10px] text-white font-bold">
                        บันทึก
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>