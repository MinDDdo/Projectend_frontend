<script setup lang="ts">
import dayjs from 'dayjs';
import type { TeacherResponse } from '~/interfaces/teacher.interface';
import { filename } from 'pathe/utils';
import VueDatePicker from '@vuepic/vue-datepicker';

const loadingPage = ref<boolean>(false);
const teacherStore = useStore.teacherStore();

const updateForm = reactive({
    firstname: '',
    lastname: '',
    dob: '',
    gender: '',
    lineContact: '',
    phoneContact: ''
})

const glob: Record<string, any> = import.meta.glob('~/assets/images/avatarTeacher/*.png', { eager: true });
const images = Object.fromEntries(
    Object.entries(glob).map(([key, value]) => [filename(key), value.default])
);

onMounted(async () => {
    loadingPage.value = true

    await getTeacherById();

    setTimeout(() => { loadingPage.value = false }, 300)
})

const teacher = ref<TeacherResponse | null>(null);

const getTeacherById = async () => {
    const data = await useApi.teacherService.getTeacherById(teacherStore.id);

    if (!data) {
        return navigateTo('/');
    }

    teacher.value = data.result.data;

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
        return navigateTo('/home');
    }

    const router = useRouter()
    router.back()
}

</script>

<template>
    <div class="min-h-screen bg-[#EEF5FF] relative">
        <div class="absolute top-10 left-10 p-3 hover:bg-gray-200 duration-100 rounded-md cursor-pointer">
            <Icon 
                @click="$router.back()"
                name="ion:arrow-back-outline" 
                class="text-2xl" 
            />
        </div>

        <div class="flex justify-center  pt-24">
            <form 
                @submit.prevent="updateTeacher"
                class="p-2 bg-[#FFFFFF] w-[530px] pb-10 rounded-[30px] relative mt-20"
            >
                <img 
                    v-if="teacher?.image !== ''"
                    :src="images[`${teacher?.image}`]" 
                    alt="Teacher profile"
                    draggable="false"
                    class="w-[120px] h-auto rounded-full absolute transform left-1/2 -top-[70px] -translate-x-1/2"
                />

                <div class="flex justify-center mt-20 gap-x-[20px]">
                    <p class="w-[70px] self-center leading-none">ชื่อจริง</p>
                        <input 
                            type="text"
                            placeholder="ชื่อ"
                            v-model="updateForm.firstname"
                            class="py-2 bg-[#DCF2F1] rounded-[10px] w-[300px] pl-5"
                        />
                    
                </div>

                <div class="flex justify-center mt-7 gap-x-5">
                    <p class="w-[70px] self-center leading-none">นามสกุล</p>

                    <input 
                        type="text"
                        placeholder="นามสกุล"
                        v-model="updateForm.lastname"
                        class="py-2 bg-[#DCF2F1] rounded-[10px] w-[300px] pl-5"
                    /> 
                </div>

                <div class="flex justify-center mt-7 gap-x-5">
                    <p class="w-[70px] self-center leading-none">วันเกิด</p>
                    
                    <VueDatePicker 
                        v-model="updateForm.dob" 
                        :clearable="false" 
                        no-today 
                        format="dd-MM-yyyy"
                        hide-offset-dates
                        placeholder="กำหนดส่งงาน"
                        class="!w-[300px]"
                        input-class-name="!rounded-[10px] !bg-[#DCF2F1] !border-transparent !py-2"
                    /> 
                </div> 

                <div class="flex justify-center mt-7 gap-x-5">
                   <p class=" w-[70px] self-center leading-none">เพศ</p>

                   <div class="w-[300px]">
                       <select v-model="updateForm.gender" class="w-[100px] bg-[#DCF2F1] py-2 !px-3 rounded-[10px]">
                           <option value="male" :selected="updateForm.gender === 'male'">ชาย</option>
                           <option value="female" :selected="updateForm.gender === 'female'">หญิง</option>
                       </select>
                   </div>
                </div>

                <div class="flex justify-center mt-7 gap-x-5">
                    <p class="w-[70px] self-center leading-none">เบอร์</p>
                    
                    <input 
                        type="text"
                        placeholder="เบอร์"
                        v-model="updateForm.phoneContact"
                        class="py-2 bg-[#DCF2F1] rounded-[10px] w-[300px] pl-5"
                    />
                </div>

                <div class="flex justify-center mt-7 gap-x-5">
                    <p class="w-[70px] self-center leading-none">ไอดีไลน์</p>
                    
                        <input 
                            type="text"
                            placeholder="ไอดีไลน์"
                            v-model="updateForm.lineContact"
                            class="py-2 bg-[#DCF2F1] rounded-[10px] w-[300px] pl-5"
                        />
                    
                </div>

                <div class="flex justify-center mt-7 gap-x-10">
                    <div 
                        @click="$router.back()"
                        class="p-1 bg-[#E5E5E5] w-[160px] h-[35px] rounded-[10px] font-bold text-center cursor-pointer"
                    >
                        ยกเลิก
                    </div>

                    <button 
                        type="submit" 
                        class="p-1 bg-[#676B7D] w-[160px] h-[35px] rounded-[10px] text-white font-bold"
                    >
                        บันทึก
                    </button>
                </div>
            </form>
        </div>
    </div>

    <Loading v-if="loadingPage" />
</template>