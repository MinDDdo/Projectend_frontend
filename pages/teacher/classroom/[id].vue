<script setup lang="ts">
//@ts-ignore
import FortuneWheel from 'vue-fortune-wheel';
import 'vue-fortune-wheel/style.css'

import { useTimer } from 'vue-timer-hook';

import type { StudentGroupResponse, StudentResponse } from '~/interfaces/student.interface';
import type { ClassroomResponse } from '~/interfaces/classroom.interface';
import type { TeacherResponse } from '~/interfaces/teacher.interface';
import { filename } from 'pathe/utils';
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
} from '@headlessui/vue';
import dayjs from 'dayjs';

const route = useRoute();

const teacherStore = useStore.teacherStore();

const glob: Record<string, any> = import.meta.glob('~/assets/images/avatarstudent/*.png', { eager: true });
const images = Object.fromEntries(
    Object.entries(glob).map(([key, value]) => [filename(key), value.default])
);


const studentList = ref<StudentResponse[]>([]);
const classroom = ref<ClassroomResponse | null>(null);
const teacher = ref<TeacherResponse | null>(null);
const loadingPage = ref<boolean>(false);
const loadingTrans = ref<boolean>(false);

const openRandStudentModal = ref<boolean>(false);
const isOpen = ref<boolean>(false);
const randName = ref<string>("ยังไม่มี");

const studentGroups = ref<StudentGroupResponse[]>([]);
const selectStudentGroup = ref<StudentGroupResponse | null>(null);
const showGroupPanel = ref<boolean>(false);
const showCreateGroup = ref<boolean>(false);
const showGroupDeleteConfirm = ref<boolean>(false);
const formCreateGroup = reactive({
    group_name: '',
    group_size: 1
})

const showStopwatch = ref<boolean>(false);
const timeSetStopwatch = ref<number>(0);
const timer = ref<number>(0);
const isRunning = ref<boolean>(false);

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

const getAllStudentGroup = async () => {
    loadingTrans.value = true;

    const data = await useApi.teacherService.getAllStudentGroup(classroom.value?.id || '');

    if (!data) {
        return navigateTo('/home');
    }

    studentGroups.value = data.result.data;

    if (studentGroups.value.length > 0) {
        selectStudentGroup.value = studentGroups.value[0];
    }

    setTimeout(() => { loadingTrans.value = false; }, 200);
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
        image: classroom.value?.image || ''
    })

    if (!data) {
        return navigateTo('/home');
    }
    isOpen.value = false;
    
    await getAllStudent();
    await getClassroomById();

    setTimeout(() => { loadingPage.value = false }, 200)
}

const canvasVerify = ref<boolean>(false);
const verifyDuration = 2;
const canvasOptions = {
  btnWidth: 140,
  borderColor: '#584b43',
  borderWidth: 6,
  lineHeight: 30
}

const prizesCanvas = ref<any[]>([]);

const testRequest = (verified: any, duration:any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(verified)
    }, duration)
  })
}

const onCanvasRotateStart = (rotate: any) => {
  if (canvasVerify.value) {
    const verified = true;
    testRequest(verified, verifyDuration * 1000).then((verifiedRes) => {
      if (verifiedRes) {
        rotate();
        canvasVerify.value = false;
      } else {
        alert('Failed verification')
      }
    })
    return
  }
}


const onRotateEnd = (prize: any) => {
  randName.value = prize.value;
}

const onOpenRandStudent = () => {
    randName.value = "ยังไม่มี";

    openRandStudentModal.value = true;

    prizesCanvas.value = studentList.value.map((item, idx, arr) => {
        let probability = Math.floor(100 / arr.length);

        if (idx === arr.length-1) {
            probability += 100 % arr.length
        }

        const studentObj = {
            id: idx, 
            name: `${item.no}`, 
            value: item.firstname + ' ' + item.lastname, 
            bgColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
            color: '#ffffff', 
            probability: probability
        }

        return studentObj;
    })
}


const onOpenCreateGroup = () => {
    formCreateGroup.group_name = '';
    formCreateGroup.group_size = 1 ;

    showCreateGroup.value = true;
}


const onClickShowGroupPanel = async () => {
    await getAllStudentGroup();
    showGroupPanel.value = true;
}


const onClickStudentMenu = async () => {
    loadingTrans.value = true;

    await getAllStudent();

    setTimeout(() => { 
        loadingTrans.value = false;
        showGroupPanel.value = false;
    }, 200)
}

const onSubmitDeleteStudentGroup = async () => {
    loadingTrans.value = true;

    const data = await useApi.teacherService.deleteStudentGroupById(selectStudentGroup.value?.id || '');

    if (!data) {
        return navigateTo('/home');
    }

    await getAllStudentGroup();

    setTimeout(() => { 
        loadingTrans.value = false;
    }, 200)
}

const onSubmitCreateGroup = async () => {
    showCreateGroup.value = false;
    loadingTrans.value = true;
    
    const data = await useApi.teacherService.createStudentGroup(route.params?.id + '', {
        group_name: formCreateGroup.group_name,
        group_size: formCreateGroup.group_size
    })

    if (!data) {
        return navigateTo('/home');
    }

    await getAllStudentGroup();
    
    setTimeout(() => { 
        loadingTrans.value = false;
    }, 200)
}


watch(timeSetStopwatch, (newVal, _) => {
    timer.value  = newVal * 60 * 1000;
})

const displayMinutes = computed(() => {
  return Math.floor(timer.value / (60 * 1000));
});

const displaySeconds = computed(() => {
  return Math.floor((timer.value % (60 * 1000)) / 1000);
});

const startStopwatch = () => {
    isRunning.value = true;
    updateTimer();
};

const stopStopwatch = () => {
  isRunning.value = false;
};

const updateTimer = () => {
  if (isRunning.value) {
    timer.value -= 1000; // Decrement by 1 second
    if (timer.value <= 0) {
      // If time is up, stop the stopwatch
      stopStopwatch();
    } else {
      setTimeout(updateTimer, 1000);
    }
  }
};

const onCloseTimer = () => {
    showStopwatch.value = false;
    timeSetStopwatch.value = 0;
    stopStopwatch();
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

        <div class="flex justify-center relative lg:mt-0 mt-10">
            <div class="bg-[#475A7D] p-3 w-[260px] mt-5 rounded-[15px] absolute left-1/2 transform -translate-x-1/2 -top-[30px]">
                <p class="font-bold text-2xl text-white text-center">{{ classroom?.name}}</p>
            </div>
        </div>

        <div class="flex justify-center mt-5">
            <div class="bg-[#FFFFFF] p-4 md:w-[600px] w-[490px] h-[190px] rounded-[15px]">
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
                            <div class="bg-[#FF90BC] p-3 w-[200px] rounded-[15px] relative">
                                <p class="text-center text-2xl font-bold text-white">{{ classroom?.code}}</p>

                                <img
                                    src="~/assets/images/omelette.png" 
                                    alt="omelette" 
                                    class="absolute -right-[10px] -top-[10px] w-[30px] h-auto" 
                                    :draggable="false"
                                />

                                <img
                                    src="~/assets/images/puzzle.png" 
                                    alt="omelette" 
                                    class="absolute -right-[5px] -bottom-[10px] w-[30px] h-auto" 
                                    :draggable="false"
                                />

                                <img
                                    src="~/assets/images/duck.png" 
                                    alt="omelette" 
                                    class="absolute left-[5px] bottom-0 w-[30px] h-auto" 
                                    :draggable="false"
                                />
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-col items-center justify-center w-1/2 mt-7">
                        <div class="bg-[#FFF8E3] p-1 w-[100px] h-[35px] rounded-[8px]">
                            <p class="text-center font-medium">{{ classroom?.subject_code}}</p>
                        </div>
                        <div class="bg-[#D2E0FB] p-1 rounded-[8px] w-[100px] h-[35px] mt-3">
                            <p class="text-center ">{{ classroom?.grade }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex justify-center gap-x-5 mt-10">
            <NuxtLink 
                to="/teacher/classroom" 
                class="bg-[#DCFAFB] p-5 w-[150px] rounded-[20px] flex flex-col items-center shadow-md"
            >
                <img src="~/assets/images/home.png" 
                alt="home"
                class="w-[45px] "
                />
                <p class="text-center pt-1">หน้าหลัก</p>
            </NuxtLink>

            <NuxtLink 
                :to="`/teacher/assignment/${classroom?.id}`"  
                class="bg-[#DCFAFB] p-5 w-[150px] rounded-[20px] flex flex-col items-center shadow-md"
            >
                <img 
                    src="~/assets/images/assignment.png" 
                    alt="assgnment"
                    class="w-[40px] "
                />
                
                <p class="text-center pt-1">งานที่มอบหมาย</p>
            </NuxtLink>

            <NuxtLink :to="`/teacher/attendance/${classroom?.id}`" class="bg-[#DCFAFB] p-5 w-[150px] rounded-[20px] flex flex-col items-center shadow-md">
                <img src="~/assets/images/hand.png" 
                alt="hand"
                class="w-[45px] "
                />
                <p class="text-center pt-1">การเข้าเรียน</p>
            </NuxtLink>


        </div>

        <div class="flex justify-center gap-4 lg:flex-nowrap flex-wrap mt-5">
            <NuxtLink :to="`/teacher/classroom/student/list-${classroom?.id}`" class="bg-[#BE96C6] p-2 w-[170px] rounded-[20px] shadow-md">
                <div class="flex justify-center items-center">
                    <p class=" text-white mt-1">รายชื่อ</p>
                    <img src="~/assets/images/person.png" alt="person" class="ml-1 w-[35px]" />
                </div>
            </NuxtLink>

            <div class="flex justify-center">
                <NuxtLink 
                    :to="studentList.length !== 0 ? `/teacher/classroom/student/check-${classroom?.id}` : $route.fullPath" 
                    class=" p-2 w-[170px] rounded-[20px] shadow-md"
                    :class="{
                        'bg-[#C7AFDC] text-white': studentList.length !== 0,
                        'bg-gray-200 text-gray-500 cursor-default': studentList.length === 0,
                    }"
                >
                    <div class="flex justify-center items-center">
                        <p class="mt-1 ml-2">เช็คชื่อ</p>
                        <img src="~/assets/images/hand.png" alt="hand" class=" mt-1 ml-1 w-[30px]" />
                    </div>
                </NuxtLink>
            </div>

            
            <div class="flex justify-center">
                <button
                    :disabled="studentList.length === 0" 
                    @click="onOpenRandStudent"
                    class="bg-[#B78DC9] p-2 w-[170px] rounded-[20px] text-white shadow-md disabled:bg-gray-200 disabled:text-gray-500"
                >
                    <div class="flex justify-center items-center">
                        <p class="mt-1">สุ่มชื่อ</p>
                        <img src="~/assets/images/random.png" alt="random" class="mt-1 ml-1 w-[30px]"/>
                    </div>
                </button>
            </div>

            <div class="flex justify-center">
                <button 
                    :disabled="studentList.length === 0" 
                    @click="onClickShowGroupPanel"
                    class="bg-[#C897BC] p-2 w-[170px] rounded-[20px] text-white shadow-md disabled:bg-gray-200 disabled:text-gray-500"
                >
                    <div class="flex justify-center items-center">
                        <p class="">จัดกลุ่ม</p>
                        <img src="~/assets/images/group.png" alt="group" class="w-[45px] pl-1"/>
                    </div>
                </button>
            </div>
            
            <div class="flex justify-center">
                <div class="bg-[#9181A9] p-2 w-[170px] rounded-[20px] shadow-md cursor-pointer" @click="showStopwatch = true">
                    <div class="flex justify-center items-center">
                        <p class="text-white mt-1">จับเวลา</p>
                        <img src="~/assets/images/time.png" alt="time" class="mt-1 ml-1 w-[30px]"/>
                    </div>
                </div>
            </div>

           
        </div>

        <div class="flex justify-center" v-if="!showGroupPanel">
            <div class="mt-14 flex gap-x-3">
                <p class="font-bold text-2xl">นักเรียน</p>
            </div>
        </div>

        <div class="flex justify-center" v-if="showGroupPanel">
            <div class="mt-14 flex items-center gap-x-8">
                <p 
                    @click="onClickStudentMenu"
                    class="font-bold text-xl underline cursor-pointer self-end"
                >
                    นักเรียน
                </p>

                <p 
                    class="font-bold text-2xl underline self-end"
                >
                    การจัดกลุ่ม
                </p>
            </div>
        </div>

        <div 
            v-if="!showGroupPanel && studentList.length === 0" 
            class="rounded-md border text-center text-gray-500 xl:w-[1280px] lg:w-[900px] md:w-[600px]  w-full mx-auto p-5 bg-white/50 mt-5"
        >
            ไม่ข้อมูลของนักเรียนห้องนี้
        </div>

        <div 
            v-if="!showGroupPanel && studentList.length !== 0"
            class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-center  xl:w-[1280px] lg:w-[900px] md:w-[600px]  w-full mx-auto  pb-24 mt-20 lg:gap-x-8 md:gap-x-5 gap-x-2 gap-y-12 "
        >
            <div 
                v-for="item of studentList"
                class="bg-[#FFFFFF] w-[280px] h-[230px] relative rounded-[20px] flex justify-end items-center flex-col mt-10 justify-self-center"
            >
                <img 
                    :src="images[`${item.image}`]" 
                    alt="student" 
                    :draggable="false"
                    class="absolute rounded-full left-1/2 transform -translate-x-1/2 -top-[70px] w-[130px]"
                />
    
                <p class="bg-[#FFF8E3] p-2 rounded-full min-w-[100px] text-center text-lg font-bold">เลขที่ {{ item.no }}</p>

                <p class=" text-lg font-bold mt-7 mb-10 flex gap-x-3">
                    <p>{{ item.firstname }}</p>
                    <p>{{ item.lastname }} </p>
                </p>
            </div>
        </div>


        <div
            v-if="showGroupPanel" 
            class="flex xl:w-[1200px] lg:w-[870px] md:w-[500px] w-full mx-auto mt-5"
        >
            <button 
                @click="onOpenCreateGroup"
                type="button" 
                class="flex items-center text-white bg-[#676B7D] w-fit px-5 py-2 rounded-xl text-lg gap-x-1 mt-8 "
            >
                สร้างกลุ่ม
                <Icon name="ion:plus-round" class="" />
            </button>
        </div>

        <div
            v-if="showGroupPanel" 
            class="flex xl:w-[1200px] lg:w-[870px] md:w-[500px] w-full mx-auto mt-14"
        >
            <div class="flex items-center gap-3 lg:flex-nowrap flex-wrap" v-if="studentGroups.length !== 0">
                <div 
                    v-for="item of studentGroups"
                    @click="selectStudentGroup = item"
                    class="rounded-xl py-3 px-5 bg-white cursor-pointer select-none font-medium "
                    :class="{
                        'bg-white text-black': selectStudentGroup !== item,
                        'bg-[#697997] text-white': selectStudentGroup === item
                    }"
                >
                    {{ item.group_name }}
                </div>
            </div>

            <div v-else class="rounded-md border text-center text-gray-500 w-full p-5 bg-white/50">ไม่ข้อมูลกลุ่มของนักเรียน</div>
        </div>

        <div
            v-if="showGroupPanel && studentGroups.length !== 0 && selectStudentGroup !== null" 
            class="flex justify-end xl:w-[1200px] lg:w-[870px] md:w-[500px] w-full mx-auto mt-2"
        >
            <div 
                @click="showGroupDeleteConfirm = true"
                class="flex gap-x-2 items-center text-red-500 hover:bg-gray-200 py-2 px-3 rounded-md  cursor-pointer duration-75"
            >
                <Icon name="ion:md-trash" class="" />
                ลบกลุ่ม
            </div>
        </div>

        <div 
            v-if="showGroupPanel && studentGroups.length !== 0"
            class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-center  xl:w-[1280px] lg:w-[900px] md:w-[600px]  w-full mx-auto  pb-24 mt-1 lg:gap-x-8 md:gap-x-5 gap-1 "
        >
            <div 
                v-for="item, idx of selectStudentGroup?.data"
                class="bg-[#FFFFFF] w-[280px] min-h-[150px] relative rounded-[20px] flex-col mt-10 justify-self-center p-5"
            >
                <div class="flex w-full justify-center ">
                    <div class="py-2 px-3 text-xl bg-[#FF90BC] w-[120px] text-center font-bold rounded-md text-white">
                        กลุ่มที่ {{ idx + 1 }}
                    </div>
                </div>

                <div class="flex flex-col gap-2 mt-5 mx-4">
                    <div v-for="student of item" class="flex gap-x-1">
                        <div class="w-[70px] font-semibold mr-2">{{ student.no }}</div>
                        <div class="w-[150px]">{{ student.firstname }}</div>
                        <div class="w-[150px]">{{ student.lastname }}</div>
                    </div>
                </div>
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

            <div class="flex justify-center">
                <div class="bg-[#7071E8] p-3 rounded-2xl w-[240px]">
                    <p class="text-xl text-white text-center">แก้ไขชั้นเรียน</p>
                </div>
            </div>
            
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

    <div 
        v-if="openRandStudentModal"
        @click="openRandStudentModal = false" 
        class="fixed w-full top-0 left-0 min-h-screen bg-gray-400/50"
    >
    </div>

    <div 
        v-if="showCreateGroup"
        @click="showCreateGroup = false" 
        class="fixed w-full top-0 left-0 min-h-screen bg-gray-400/50"
    >
    </div>

    <div 
        v-if="showStopwatch"
        @click="onCloseTimer" 
        class="fixed w-full top-0 left-0 min-h-screen bg-gray-400/50"
    >
    </div>

    <div 
        v-if="openRandStudentModal" 
        class="bg-white rounded-md fixed 
        top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-10
        "
    >
        <div class="flex flex-col gap-y-5 relative">
            <div class="flex items-center gap-x-3 justify-center p-3 rounded-md bg-[#475A7D]">
                <p class="text-xl text-white">ผู้โชคดี: </p>
                <p class="text-xl font-bold text-white">{{ randName }}</p>
            </div>

            <FortuneWheel
                class="w-[450px]"
                :verify="canvasVerify"
                :canvas="canvasOptions"
                :prizes="prizesCanvas"
                @rotateStart="onCanvasRotateStart"
                @rotateEnd="onRotateEnd"
            />
        </div>
    </div>

    <div 
        v-if="showCreateGroup"
        class="w-[400px] h-fit bg-white rounded-md fixed 
        top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
        "
    >
        <div class="relative">
            <div 
                class="bg-[#BE96C6]  rounded-[15px] absolute w-[200px] h-[50px] 
                flex items-center justify-center
                absolute -top-[30px] left-1/2 transform -translate-x-1/2
                "
            >
                <p class="text-white text-2xl text-center">การจัดกลุ่ม</p>
            </div>
        </div>

        <form 
            class="flex flex-col p-8 gap-y-3 mt-5"
            @submit.prevent="onSubmitCreateGroup"
        >
            <input 
                type="text" 
                placeholder="ชื่องาน/ชื่อกิจกรรม"
                v-model="formCreateGroup.group_name"
                class="p-2 px-5 rounded-xl  bg-[#DCF2F1] mt-4" 
            />

            <input 
                type="number" 
                placeholder="จำนวนคนต่อกลุ่ม"
                :min="1"
                v-model="formCreateGroup.group_size"
                class="p-2 px-5 rounded-xl  bg-[#DCF2F1] mt-4" 
            />

            <div class="flex justify-center mt-8">
                <button 
                    :disabled="formCreateGroup.group_name === ''"
                    type="submit" 
                    class="bg-[#676B7D] py-2 px-3 h-[36px] text-white rounded-md w-[160px] font-bold flex items-center justify-center cursur-pointor"
                >
                    สร้าง
                    <Icon name="ion:plus-round" class="" />
                </button>
            </div>
        </form>
    </div>

    <div 
        v-if="showStopwatch" 
        class=" fixed 
        top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
        "
    >
        <div class="flex flex-col justify-center items-center h-[300px] w-[560px] bg-white rounded-md">
            <div class="flex gap-x-2 items-center">
                <p class="">ระหว่าง</p>

                <input 
                    :readonly="isRunning"
                    type="number" 
                    placeholder="00"
                    :min="0"
                    :max="60"
                    required
                    v-model="timeSetStopwatch"
                    class="p-1 px-1 rounded-md  w-[50px] no-spinner text-center border"  
                />

                <p class="">นาที</p>
            </div>

            <div class="flex items-center w-full justify-center mt-5">
                <div class="font-bold p-5 rounded-md bg-[#29292E] text-white text-white font-robo text-[64px]">
                    {{ displayMinutes < 10 ? `0${displayMinutes}` : displayMinutes }}
                </div>
    
                <div class="font-bold font-robo text-[64px] text-[#676B7D]">:</div>
    
                <div class="font-bold p-5 rounded-md bg-[#29292E] text-white text-white font-robo text-[64px]">
                    {{ displaySeconds < 10 ? `0${displaySeconds}` : displaySeconds }}
                </div>
            </div>

            <button 
                :disabled="isRunning || timeSetStopwatch < 1"
                class="flex items-center text-white bg-[#9181A9] py-2 px-3 rounded-md w-[200px] justify-center font-bold mt-5 gap-x-2" 
                @click="startStopwatch"
            >
                <Icon name="ion:ios-play" class="" />
                เริ่ม
            </button>
        </div>
    </div>



  <Loading v-if="loadingPage" />
  <LoadingTransparent v-if="loadingTrans" />
  <Modal v-model:show="showGroupDeleteConfirm" title="กลุ่ม" @on-confirm="onSubmitDeleteStudentGroup" />
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap');

.font-robo {
    font-family: "Roboto Mono", sans-serif;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>