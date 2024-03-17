<script setup lang="ts">
import type { ClassroomResponse } from '~/interfaces/classroom.interface';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import type { TeacherResponse } from '~/interfaces/teacher.interface';
import { filename } from 'pathe/utils';


const teacherStore = useStore.teacherStore();

const classroomList = ref<ClassroomResponse[]>([]);
const classroomIdSelected = ref<string>('');
const showModalConfirm = ref<boolean>(false);
const teacher = ref<TeacherResponse | null>(null);
const loadingPage = ref<boolean>(false);

const glob: Record<string, any> = import.meta.glob('~/assets/images/avatarSubject/*.png', { eager: true });
const images = Object.fromEntries(
    Object.entries(glob).map(([key, value]) => [filename(key), value.default])
);


onMounted(async () => {
    loadingPage.value = true;

    await getAllClassroom();
    await getTeacherById();

    setTimeout(() => { loadingPage.value = false }, 200)
})

const getAllClassroom = async () => {
    const data = await useApi.classroomService.getAllClassroom(teacherStore.id);

    if (!data) {
        return navigateTo('/home');
    }

    classroomList.value = data.result.data;
}

const getTeacherById = async () => {
    const data = await useApi.teacherService.getTeacherById(teacherStore.id);

    if (!data) {
        return navigateTo('/home');
    }

    teacher.value = data.result.data;
}

const onClickDeleteClassroom = async (classroomId: string) => {
    classroomIdSelected.value = classroomId;
    showModalConfirm.value = true;
}


const onConfirmDelete = async () => {
    loadingPage.value = true;
    
    const data = await useApi.classroomService.deleteClassroomById(classroomIdSelected.value);
    showModalConfirm.value = false;

    if (!data) {
        return navigateTo('/home');
    }

    await getAllClassroom();

    setTimeout(() => { loadingPage.value = false }, 200)
}

const onLogout = () => {
    teacherStore.$reset()

    navigateTo("/home");
}
</script>

<template>
    <div class="min-h-screen bg-[#EEF5FF]">
        
        <div class="flex justify-between items-center px-10 pt-5">
            <div class="p-3 hover:bg-gray-200 duration-100 rounded-md cursor-pointer">
                <Icon 
                    @click="onLogout"
                    name="ion:arrow-back-outline" 
                    class="text-2xl" 
                />
            </div>

            <TeacherCard 
                :image="teacher?.image || ''" 
                :name="`${teacher?.firstname} ${teacher?.lastname}`" 
            />
        </div>

        <div class="flex  flex-col mt-8">
            <div class="self-center">
                <p class="text-3xl font-bold text-[#5C7AEA] flex items-end gap-x-3 ">
                    มาร่วม 
                    <span class="text-[#3D56B2] text-4xl font-bold">
                        สร้าง
                    </span>
                    ห้องเรียนกับเรา
                </p>
            </div>
            <p class=" text-3xl font-bold text-[#5C7AEA] text-center mt-2">ที่นี่คุณจะได้เรียนรู้สิ่งใหม่ๆ</p>
        </div>

        <div class="flex justify-center mt-9">
            <NuxtLink to="/teacher/classroom/create" class="bg-[#8EACCD] p-2 w-[250px] rounded-[15px] flex justify-center items-center">
                <p class=" text-white text-xl">สร้างชั้นเรียน</p>
                <img src="~/assets/images/add.png" :draggable="false" alt="add" class="ml-1 w-[20px] h-auto" />
            </NuxtLink>
        </div>

        <div class="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 justify-center mx-10 pb-24 mt-20 gap-8">

            <div 
                v-for="item of classroomList"
                class="bg-[#FFFFFF]  p-2 rounded-[15px] lg:h-[300px] md:h-[280px] h-[280px] relative flex flex-col"
            >


                <div class="absolute right-1">
                    <Menu as="div" class="relative inline-block text-left">
                        <div>
                            <MenuButton
                            class="h-fit inline-flex w-full justify-center 
                            rounded-md  px-4 py-2 text-sm font-medium 
                            text-white  focus:outline-none 
                            focus-visible:ring-2 focus-visible:ring-white/75"
                            >
                                <img src="~/assets/images/dot.png" alt="dot"
                                class="absolute cursor-pointer h-[40px]" 
                                />

                            </MenuButton>
                        </div>

                        <transition
                            enter-active-class="transition duration-100 ease-out"
                            enter-from-class="transform scale-95 opacity-0"
                            enter-to-class="transform scale-100 opacity-100"
                            leave-active-class="transition duration-75 ease-in"
                            leave-from-class="transform scale-100 opacity-100"
                            leave-to-class="transform scale-95 opacity-0"
                        >
                            <MenuItems
                            class="absolute right-0 mt-2 w-[120px] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
                            >
                            <div class="px-1 py-1">
                                <MenuItem v-slot="{ active }">
                                <NuxtLink :to="'/teacher/classroom/edit/' + item.id"
                                    :class="[
                                    active ? 'bg-[#7071E8] text-white' : 'text-gray-900',
                                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                    ]"
                                >
                                    
                                    <Icon name="ion:edit" class="mr-3  text-sm" />
                                    Edit
                                </NuxtLink>
                                </MenuItem>
                            </div>
                            
                            <div class="px-1 py-1">
                                <MenuItem v-slot="{ active }">
                                <button
                                    :class="[
                                    active ? 'bg-[#7071E8] text-white' : 'text-gray-900',
                                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                    ]"
                                    @click="onClickDeleteClassroom (item.id)"
                                >
                                    <Icon name="ion:ios-trash" class="mr-3  text-sm" />
                                    Delete
                                </button>
                                </MenuItem>
                            </div>
                            </MenuItems>
                        </transition>
                        </Menu>
                </div>

                <div class="flex justify-center mt-5">
                    <img
                        :src="images[`${item.image}`]" 
                        draggable="false"
                        alt="classroom image"
                        width="100"
                        height="100"
                        class="!rounded-full !object-cover border-2 
                        lg:w-[100px] lg:h-[100px] w-[90px] h-[90px] "  
                    />
                </div>

                <p class="mt-3 text-center text-2xl font-bold text-[#C82586]">{{ item.name }}</p>
                <p class="text-center text-lg mt-2">{{ item.grade }}</p>

                <button 
                    type="button" 
                    class="flex justify-center cursor-pointer"
                >
                    <NuxtLink :to="'/teacher/classroom/'+ item.id" class="bg-[#7071E8] p-2 w-[180px] rounded-[15px] mt-3">
                        <p class="text-center text-white text-lg ">เข้าชั้นเรียน</p>
                    </NuxtLink>
                </button>
            </div>

        </div>

    </div>

    <Modal v-model:show="showModalConfirm" @on-confirm="onConfirmDelete" />
    <Loading v-if="loadingPage" />
</template>