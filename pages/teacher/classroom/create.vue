<script setup lang="ts">
import type { TeacherResponse } from '~/interfaces/teacher.interface';
import { filename } from 'pathe/utils';
import { subjectAvatar } from '~/assets/static/subjectAvatar';

const teacherStore = useStore.teacherStore();

const teacher = ref<TeacherResponse | null>(null);
const classroomName = ref<string>('');
const grade = ref<string>('');
const subjectCode = ref<string>('');
const selectAvatarClassroom = ref<string>('Sj_1');
const showModalChangeAvatar = ref<boolean>(false);
const loadingPage = ref<boolean>(false);


const glob: Record<string, any> = import.meta.glob('~/assets/images/avatarSubject/*.png', { eager: true });
const images = Object.fromEntries(
    Object.entries(glob).map(([key, value]) => [filename(key), value.default])
);

onMounted(async () => {
    loadingPage.value = true;

    await getTeacherById();

    setTimeout(() => { loadingPage.value = false }, 200);
})

const onSubmitCreateClassroom = async () => {
    const data = await useApi.classroomService.createClassroom({ 
        name: classroomName.value,
        owner: teacherStore.id,
        subject_code: subjectCode.value,
        grade: grade.value,
        image: selectAvatarClassroom.value
    })

    if (!data) {
        return navigateTo('/home');
    }

    const router = useRouter();
    router.back();
}

const getTeacherById = async () => {
    const data = await useApi.teacherService.getTeacherById(teacherStore.id);

    if (!data) {
        return navigateTo('/home');
    }

    teacher.value = data.result.data;
}

const onCloseSelectAvatarProfile = () => {
    showModalChangeAvatar.value = false;
    selectAvatarClassroom.value = "Sj_1";
}
</script>

<template>
    <div class="h-screen bg-[#EEF5FF]">
        <div class="flex justify-between px-10 items-center pt-5">
            <div class="p-3 hover:bg-gray-200 duration-100 rounded-md cursor-pointer">
                <Icon 
                    @click="$router.back()"
                    name="ion:arrow-back-outline" 
                    class="text-2xl" 
                />
            </div>
            
            <teacher-card 
                :image="teacher?.image || ''" 
                :name="`${teacher?.firstname} ${teacher?.lastname}`" 
            />
        </div>

        <div class="flex justify-center">
            <form 
                @submit.prevent="onSubmitCreateClassroom"
                class="flex flex-col lg:mt-8 mt-14 gap-y-7 lg:w-[500px] md:w-[450px] w-full bg-white rounded-2xl p-10 relative "
            >
                <div class="bg-[#7071E8] p-3 rounded-2xl w-[240px] absolute left-1/2 -top-[30px] transform -translate-x-1/2">
                    <p class="text-xl text-white text-center">สร้างชั้นเรียน</p>
                </div>

                <div class="flex justify-center">
                    <div class="relative">
                        <img 
                            :src="images[`${selectAvatarClassroom}`]" 
                            alt="Subject profile"
                            draggable="false"
                            class="w-[120px] h-auto rounded-full"
                        />
    
                        <div class="absolute bottom-1 right-1  cursor-pointer">
                            <img 
                                @click="showModalChangeAvatar = true"
                                src="~/assets/images/logoeditprofile.png" 
                                alt="logoeditprofile" 
                                width="30" 
                                height="30" 
                                draggable="false"
                                class="rounded-full select-none"
                            />
                        </div>
                    </div>
                </div>

                <input 
                    type="text" 
                    placeholder="ชื่อชั้นเรียน" 
                    v-model="classroomName"
                    class="p-3 px-5 rounded-xl bg-[#DCF2F1] h-[50px] text-[18px]" 
                />

                <input 
                    type="text" 
                    placeholder="ชั้นเรียน" 
                    v-model="grade"
                    class="p-3 px-5 rounded-xl bg-[#DCF2F1] h-[50px] text-[18px]" 
                />
        
                <input 
                    type="text" 
                    placeholder="รหัสวิชา" 
                    v-model="subjectCode"
                    class="p-3 px-5 rounded-xl bg-[#DCF2F1] h-[50px] text-[18px]" 
                />

                <div class="flex justify-between h-[40px] mt-5 gap-x-5">
                    <button 
                        @click="$router.back()"
                        type="button" 
                        class="p-2 bg-[#E5E5E5] rounded-xl w-[210px]"
                    >
                        ยกเลิก
                    </button>

                    <button 
                        type="submit" 
                        class="p-2 text-white bg-[#676B7D] rounded-xl w-[210px]"
                        :disabled="classroomName === '' || subjectCode === '' || grade === ''"
                    >
                        สร้าง
                    </button>
                </div>
            </form>                
        </div>
    </div>

    <div 
        v-if="showModalChangeAvatar"
        @click="onCloseSelectAvatarProfile"
        class="fixed bg-gray-400 bg-opacity-50 h-screen w-full z-[99999] top-0 right-0 left-0" 
    ></div>

    <div 
        v-if="showModalChangeAvatar"
        class="fixed bg-white rounded-[20px]  lg:w-[600px] md:min-w-[500px] w-full z-[999999] 
        top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-10" 
    >
        <div class="overflow-y-scroll overflow-x-hidden w-full lg:h-[400px] w-full h-[400px]  grid lg:grid-cols-5 md:grid-cols-4 grid-cols-3 p-5 gap-2" >
            <img
                v-for="item, idx of subjectAvatar"
                :src="images[`${item.path}`]" 
                :alt="idx + ''" 
                draggable="false"
                class="rounded-lg cursor-pointer transition-transform duration-100 border-2 lg:w-[120px] w-[120px]  h-auto object-cover"  
                :class="{
                    'border-[#475A7D] shadow-sm': item.path === selectAvatarClassroom,
                    'border-transparent': item.path !== selectAvatarClassroom
                }"
                @click="selectAvatarClassroom = item.path"
            />
        </div>
        
        <div class=" grid justify-items-center pt-5" >
            <button 
                @click="showModalChangeAvatar = false"
                type="submit" 
                class="p-2 bg-[#676B7D] w-[150px] h-[50px] rounded-[10px] text-white font-bold"
            >
                บันทึก
            </button>
        </div>
    </div>

    <Loading v-if="loadingPage" />
</template>