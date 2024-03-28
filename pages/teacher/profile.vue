<script lang="ts" setup>
import type { TeacherResponse } from '~/interfaces/teacher.interface';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import { filename } from 'pathe/utils';
import { teacherAvatar } from '~/assets/static/teacherAvatar';

const glob: Record<string, any> = import.meta.glob('~/assets/images/avatarTeacher/*.png', { eager: true });
const images = Object.fromEntries(
    Object.entries(glob).map(([key, value]) => [filename(key), value.default])
);
    
const teacherStore = useStore.teacherStore();
const loadingPage = ref<boolean>(false);
const teacher = ref<TeacherResponse | null>(null);
const selectAvatarProfile = ref<string>('');
const showModalChangeAvatar = ref<boolean>(false);


onMounted(async () => {
    loadingPage.value = true

    await getTeacherById();

    setTimeout(() => { loadingPage.value = false }, 300)
})

const formatDate = (date: string) => {
    return dayjs(date).locale('th').format('DD MMM YYYY');
}

const getTeacherById = async () => {
    const data = await useApi.teacherService.getTeacherById(teacherStore.id);

    if (!data) {
        return navigateTo('/home');
    }

    teacher.value = data.result.data
}

const onOpenSelectAvatarProfile = () => {
    showModalChangeAvatar.value = true;
    selectAvatarProfile.value = teacher.value?.image || '';
}

const onSelectAvatarProfile = (name: string) => {
    selectAvatarProfile.value = name;
}

const onSubmitChangeAvatar = async () => {
    loadingPage.value = true;

    showModalChangeAvatar.value = false;

    const data = await useApi.teacherService.update(teacherStore.id, {
        image: selectAvatarProfile.value
    })

    selectAvatarProfile.value = '';

    if (!data) {
        return navigateTo('/home');
    } 

    await getTeacherById();

    setTimeout(() => { loadingPage.value = false }, 300)
}
</script>

<template>
    <div class="h-screen bg-[#EEF5FF] relative">
        <div class="absolute top-10 left-10 p-3 hover:bg-gray-200 duration-100 rounded-md cursor-pointer">
            <Icon 
                @click="$router.back()"
                name="ion:arrow-back-outline" 
                class="text-2xl" 
            />
        </div>

        <div class="pt-5 flex justify-center ">
            <div 
                class=" flex flex-col gap-y-5  mt-20 items-center min-w-[550px] max-w-[550px] min-h-[560px] max-h-[560px]"> 
                <div class="flex justify-center relative">
                    <img 
                        v-if="teacher?.image !== ''"
                        :src="images[`${teacher?.image}`]" 
                        alt="Teacher profile"
                        draggable="false"
                        class="w-[120px] h-auto rounded-full"
                    />

                    <div class="absolute bottom-1 right-1 cursor-pointer">
                        <img 
                            @click="onOpenSelectAvatarProfile"
                            src="~/assets/images/logoeditprofile.png" 
                            alt="logoeditprofile" 
                            width="30" 
                            height="30" 
                            draggable="false"
                            class="rounded-full select-none"
                        />
                    </div>
                </div>
                <p class="text-[25px] text-center font-bold">{{teacher?.firstname}} {{teacher?.lastname}}</p>
        
                <div class="p-10 bg-white w-[350px] h-[240px] rounded-[30px] ">
                    <div class="flex justify-center  ">
                        <p class="w-[90px]  font-bold text-lg pl-4 self-end leading-none">วันเกิด</p>
                        <p class="w-[150px] pl-4 self-end leading-none">{{ formatDate(teacher?.dob || "") }}</p>
                    </div>
        
                    <div class="flex justify-center pt-7">
                        <p class="w-[90px] font-bold text-lg pl-4 leading-none self-end">เพศ</p>
                        <p class="w-[150px] pl-4 leading-none self-end">{{teacher?.gender === "male" ? "ชาย" : "หญิง" }}</p>
                    </div>
        
                    <div class="flex justify-center pt-7">
                        <p class="w-[90px] font-bold text-lg pl-4 leading-none self-end">เบอร์</p>
                        <p class="w-[150px] pl-4 leading-none self-end">{{teacher?.phone_contact}}</p>
                    </div>
        
                    <div class="flex justify-center pt-7">
                        <p class="w-[90px] font-bold text-lg pl-4 leading-none self-end">ไลน์</p>
                        <p class="w-[150px] pl-4 leading-none self-end">{{teacher?.line_contact}}</p>
                    </div>
                </div>

                <NuxtLink 
                    to="/teacher/edit"  
                    class="bg-white w-[140px] p-3 flex justify-center rounded-[30px] shadow-md"
                >
                    <p>แก้ไข</p>
                    
                    <img src="~/assets/images/settings.png" 
                        alt="settings"
                        class="w-[30px] pl-2 "
                    />
                </NuxtLink>


            </div>
        </div>
    </div>

    <div 
        v-if="showModalChangeAvatar"
        @click="showModalChangeAvatar = false"
        class="fixed bg-gray-400 bg-opacity-50 h-screen w-full z-[99999] top-0 right-0 left-0" 
    ></div>

    <div 
        v-if="showModalChangeAvatar"
        class="fixed bg-white rounded-[20px]  lg:w-[600px] md:min-w-[500px] w-full z-[999999] 
        top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-10" 
    >
        <div class="overflow-y-scroll overflow-x-hidden w-full lg:h-[400px] w-full h-[400px]  grid lg:grid-cols-5 md:grid-cols-4 grid-cols-3 p-5 gap-2" >
            <img
                v-for="item, idx of teacherAvatar"
                :src="images[`${item.name}`]" 
                :alt="idx + ''" 
                draggable="false"
                class="rounded-lg cursor-pointer transition-transform duration-100 border-2 "  
                :class="{
                    'border-[#475A7D] shadow-sm': item.name === selectAvatarProfile,
                    'border-transparent': item.name !== selectAvatarProfile
                }"
                @click="onSelectAvatarProfile(item.name)"
            />
        </div>
        
        <div class=" grid justify-items-center pt-5" >
            <button 
                :disabled="selectAvatarProfile === '' || selectAvatarProfile === teacher?.image"
                @click="onSubmitChangeAvatar"
                type="submit" 
                class="p-2 bg-[#676B7D] w-[150px] h-[50px] rounded-[10px] text-white font-bold"
            >
                บันทึก
            </button>
        </div>
    </div>

    <Loading v-if="loadingPage" />
</template>