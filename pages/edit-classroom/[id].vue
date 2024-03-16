<script lang="ts" setup>
import type { ClassroomResponse } from '~/interfaces/classroom.interface';
import { filename } from 'pathe/utils';
import type { TeacherResponse } from '~/interfaces/teacher.interface';

const route = useRoute();

const teacherStore = useStore.teacherStore()
const teacher = ref<TeacherResponse | null>(null);
const classroomName = ref<string>('');
const grade = ref<string>('');
const subjectCode = ref<string>('');
const selectClassroom = ref<string>('');

onMounted(async () => {
    await getClassroomById();
    await getTeacherById();
})

const glob: Record<string, any> = import.meta.glob('~/assets/images/avatarSubject/*.png', { eager: true });
const images = Object.fromEntries(
    Object.entries(glob).map(([key, value]) => [filename(key), value.default])
);

const onSubmitUpdateclassroom = async () => {
    const data = await useApi.classroomService.updateClassroomById(route.params?.id + '', {
        name: classroomName.value,
        subject_code: subjectCode.value,
        grade: grade.value,
        image: selectClassroom.value
    })

    if (!data) {
        return navigateTo('/home');
    }

    const router = useRouter();
    router.back()
}

const getTeacherById = async () => {
    const data = await useApi.teacherService.getTeacherById(teacherStore.id);

    if (!data) {
        return navigateTo('/home');
    }

    teacher.value = data.result.data;
}


const getClassroomById = async () => {

    const data = await useApi.classroomService.getClassroomById(route.params?.id + '')

    if (!data) {
        return navigateTo('/home');
    } 
    
    classroomName.value = data.result.data.name;
    grade.value = data.result.data.grade;
    subjectCode.value = data.result.data.subject_code;
}

</script>

<template>
<div class="h-screen bg-[#EEF5FF] ">
        <div class="flex justify-between px-10 items-center pt-5">
            <div class="p-3 hover:bg-gray-200 duration-100 rounded-md cursor-pointer">
                <Icon 
                    @click="$router.back()"
                    name="ion:arrow-back-outline" 
                    class="text-2xl" 
                />
            </div>
            
            <teacher-card :image="teacher?.image || ''" :name="`${teacher?.firstname} ${teacher?.lastname}`" />
        </div>


        <form 
            @submit.prevent="onSubmitUpdateclassroom"
            class="flex flex-col mt-8 gap-y-7 w-[500px]">
            
            <input 
                type="text" 
                placeholder="ชื่อชั้นเรียน" 
                v-model="classroomName"
                class="p-2 px-5 rounded-xl  bg-[#DCF2F1]h-[50px] text-[18px]" 
            />

            <input 
                type="text" 
                placeholder="ชั้นเรียน" 
                v-model="grade"
                class="p-2 px-5 rounded-xl  bg-[#DCF2F1]h-[50px] text-[18px]" 
            />

            <input 
                type="text" 
                placeholder="รหัสวิชา" 
                v-model="subjectCode"
                class="p-2 px-5 rounded-xl  bg-[#DCF2F1] h-[50px] text-[18px]" 
            />

            <div class="flex justify-between h-[50px]  ">
                <button 
                    @click="$router.back()"
                    type="button" 
                    class="p-2 font-bold bg-[#E5E5E5] rounded-xl w-[210px]"
                >
                    ยกเลิก
                </button>

                <button 
                    type="submit" 
                    class="p-2 text-white font-bold bg-[#676B7D] rounded-xl w-[210px]"
                >
                    สร้าง
                </button>
            </div>
        </form>                
</div>

</template>
