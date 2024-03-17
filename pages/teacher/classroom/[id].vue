<!-- หน้า Teacher Classroom -->

<script setup lang="ts">
import type { StudentResponse } from '~/interfaces/student.interface';
import type { ClassroomResponse } from '~/interfaces/classroom.interface';
import type { TeacherResponse } from '~/interfaces/teacher.interface';
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
} from '@headlessui/vue';

const route = useRoute();

const teacherStore = useStore.teacherStore();

const studentList = ref<StudentResponse[]>([]);
const classroom = ref<ClassroomResponse | null>(null);
const teacher = ref<TeacherResponse | null>(null);
const loadingPage = ref<boolean>(false);


const isOpen = ref<boolean>(false);

const classroomName = ref<string>('');
const grade = ref<string>('');
const subjectCode = ref<string>('');

onMounted(async () => {
    loadingPage.value = true;

    await getAllStudent();
    await getClassroomById();
    await getTeacherById();

    setTimeout(() => { loadingPage.value = false }, 200)
})

const getAllStudent = async () => {
    
    const data = await useApi.studentService.getAllStudent(route.params?.id + '');

    if (!data) {
            return navigateTo('/home');
        }
    
        studentList.value = data.result.data;
} 

const getClassroomById = async () => {

    const data = await useApi.classroomService.getClassroomById(route.params?.id + '')

    if (!data) {
        return navigateTo('/home');
    }

    classroom.value = data.result.data;
}

const getTeacherById = async () => {
    const data = await useApi.teacherService.getTeacherById(teacherStore.id);

    if (!data) {
        return navigateTo('/home');
    }

    teacher.value = data.result.data;
}

const closeModal =  () => {
    isOpen.value = false;
}

const onClickEditButton = async () => {
    isOpen.value = true;

    classroomName.value = classroom.value?.name || '';
    grade.value = classroom.value?.grade || '';
    subjectCode.value = classroom.value?.subject_code || '';
}

const onSubmitUpdateclassroom = async () => {
    loadingPage.value = true;

    const data = await useApi.classroomService.updateClassroomById(route.params?.id + '', {
        name: classroomName.value,
        subject_code: subjectCode.value,
        grade: grade.value,
        image: "aaaa"
    })

    if (!data) {
        return navigateTo('/home');
    }
    isOpen.value = false;
    
    setTimeout(() => { loadingPage.value = false }, 200)

    await getAllStudent();
    await getClassroomById();

}


</script>

<template>
    <div class="min-h-screen bg-[#EEF5FF] ">
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

        <div class="flex justify-center relative">
            <div class="bg-[#475A7D] p-3 w-[260px] mt-5 rounded-[15px] absolute left-1/2 transform -translate-x-1/2 -top-[30px]">
                <p class="font-bold text-2xl text-white text-center">{{ classroom?.name}}</p>
            </div>
        </div>

        <div class="flex justify-center mt-5">
            <div class="bg-[#FFFFFF] p-4 w-[600px] h-[190px] rounded-[15px]">
                <div class="flex justify-end">
                    <div 
                        @click="onClickEditButton" 
                        class="flex gap-x-2 hover:bg-gray-200 p-2 rounded-md duration w-[90px] justify-center cursor-pointer"
                    >
                        <p class="">แก้ไข</p>
                        <img src="~/assets/images/setting.png" alt="setting"/>
                    </div>
                </div>

                <div class="flex ">
                    <div class="flex flex-col w-1/2 items-center mt-3">
                        <p class="self-cente font-bold ">รหัสห้องเรียน</p>
                        <div class="mt-2">
                            <div class="bg-[#FF90BC] p-3 w-[200px] rounded-[15px]">
                                <p class="text-center font-bold text-white">{{ classroom?.code}}</p>
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-col items-center justify-center w-1/2 mt-7">
                        <div class="bg-[#FFF8E3] p-1 w-[100px] h-[35px] rounded-[8px]">
                            <p class="text-center font-medium">{{ classroom?.subject_code}}</p>
                        </div>
                        <div class="bg-[#D2E0FB] p-1 rounded-[8px] w-[80px] h-[30px] mt-3">
                            <p class="text-center ">{{ classroom?.grade }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex justify-center gap-x-5 mt-10">
            <NuxtLink 
                to="/home" 
                class="bg-[#DCFAFB] p-5 w-[150px] rounded-[20px] flex flex-col items-center shadow-md"
            >
                <!-- <img src="~/assets/images/home1.png" 
                alt="home1"
                class="w-[45px] "
                /> -->
                <p class="text-center pt-1">หน้าหลัก</p>
            </NuxtLink>

            <NuxtLink 
                :to="`/teacher/assignment/${classroom?.id}`"  
                class="bg-[#DCFAFB] p-5 w-[150px] rounded-[20px] flex flex-col items-center shadow-md"
            >
                <!-- <img 
                    src="~/assets/images/assignment1.png" 
                    alt="assgnment1"
                    class="w-[40px] "
                /> -->
                
                <p class="text-center pt-1">งานที่มอบหมาย</p>
            </NuxtLink>

            <NuxtLink to="/attendance" class="bg-[#DCFAFB] p-5 w-[150px] rounded-[20px] flex flex-col items-center shadow-md">
                <!-- <img src="~/assets/images/hand1.png" 
                alt="hsnd1"
                class="w-[45px] "
                /> -->
                <p class="text-center pt-1">การเข้าเรียน</p>
            </NuxtLink>


        </div>

        <div class="flex justify-center mt-5">
            <NuxtLink to="/studentlist" class="bg-[#BE96C6] p-2 w-[170px] rounded-[20px] shadow-md">
                <div class="flex justify-center items-center">
                    <p class=" text-white mt-1">รายชื่อ</p>
                    <img src="~/assets/images/person.png" alt="person" class="ml-1 w-[35px]" />
                </div>
            </NuxtLink>

            <div class="flex justify-center ml-3">
                <NuxtLink to="/teachercheckassignment" class="bg-[#C7AFDC] p-2 w-[170px] rounded-[20px] shadow-md">
                    <div class="flex justify-center items-center">
                        <p class=" text-white mt-1 ml-2">เช็คชื่อ</p>
                        <img src="~/assets/images/hand.png" alt="hand" class=" mt-1 ml-1 w-[30px]" />
                    </div>
                </NuxtLink>
            </div>

            
            <div class="flex justify-center ml-3">
                <div class="bg-[#B78DC9] p-2 w-[170px] rounded-[20px] shadow-md">
                    <div class="flex justify-center items-center">
                        <p class="text-white mt-1">สุ่มชื่อ</p>
                        <img src="~/assets/images/random.png" alt="random" class="mt-1 ml-1 w-[30px]"/>
                    </div>
                </div>
            </div>

            <div class="flex justify-center ml-3">
                <div class="bg-[#C897BC] p-2 w-[170px] rounded-[20px] shadow-md">
                    <div class="flex justify-center items-center">
                        <p class="text-white mt-2">จัดกลุ่ม</p>
                        <img src="~/assets/images/group.png" alt="group" class="mt-1 w-[45px] pl-1"/>
                    </div>
                </div>
            </div>
            
            <div class="flex justify-center ml-3">
                <div class="bg-[#9181A9] p-2 w-[170px] rounded-[20px] shadow-md">
                    <div class="flex justify-center items-center">
                        <p class="text-white mt-1">จับเวลา</p>
                        <img src="~/assets/images/time.png" alt="time" class="mt-1 ml-1 w-[30px]"/>
                    </div>
                </div>
            </div>

           
        </div>

        <div class="flex justify-center">
            <div class="mt-5">
                <p class="font-bold text-2xl">นักเรียน</p>
            </div>
        </div>

        <div class="grid grid-cols-4 justify-center mx-10 pb-24 mt-20 gap-8 ">
            <div 
                v-for="item of studentList"
                class="bg-[#FFFFFF] w-[280px] h-[230px] relative rounded-[20px] flex justify-end items-center flex-col mt-10"
            >
                <img src="~/assets/images/avatarstudent/student1.png" 
                    alt="student1" 
                    class="absolute left-1/2 transform -translate-x-1/2 -top-[70px] w-[130px]"
                />
    
                <p class="bg-[#FFF8E3] p-2 rounded-full min-w-[100px] text-center text-lg font-bold">เลขที่ {{ item.no }}</p>

                <p class=" text-lg font-bold mt-7 mb-10 flex gap-x-3">
                    <p>{{ item.firstname }}</p>
                    <p>{{ item.lastname }} </p>
                </p>
            </div>
        </div>
    </div>

    <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
            
            <form 
                    @submit.prevent="onSubmitUpdateclassroom"
                    class="flex flex-col mt-8 gap-y-7 w-[400px]">
                    
                    <input 
                        type="text" 
                        placeholder="ชื่อชั้นเรียน" 
                        v-model="classroomName"
                        class="p-2 px-5 rounded-xl  bg-[#DCF2F1]
                                h-[50px] text-[18px]" 
                    />

                    <input 
                        type="text" 
                        placeholder="ชั้นเรียน" 
                        v-model="grade"
                        class="p-2 px-5 rounded-xl  bg-[#DCF2F1]
                            h-[50px] text-[18px]" 
                    />
                    <input 
                        type="text" 
                        placeholder="รหัสวิชา" 
                        v-model="subjectCode"
                        class="p-2 px-5 rounded-xl  bg-[#DCF2F1]
                                h-[50px] text-[18px]" 
                    />
                    <div class="flex justify-between h-[50px]  ">
                        <button @click="isOpen = false"
                            type="button" 
                            class="p-1 font-bold bg-[#E5E5E5] rounded-xl w-[190px]">
                            ยกเลิก
                        </button>

                        <button 
                            type="submit" 
                            class="p-1 text-white font-bold bg-[#676B7D] rounded-xl w-[190px]">
                            แก้ไข
                        </button>
                    </div>
                </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

  <Loading v-if="loadingPage" />
</template>

<style scoped>

</style>