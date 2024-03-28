<script setup lang="ts">
import type { TeacherResponse } from '~/interfaces/teacher.interface';
import type { StudentResponse } from '~/interfaces/student.interface';

const route = useRoute();
const teacherStore = useStore.teacherStore();

const teacher = ref<TeacherResponse | null>(null);
const loadingPage = ref<boolean>(false);
const studentList = ref<StudentResponse[]>([]);
const selectStudent = ref<StudentResponse | null>(null);
const showCreateStudent = ref<boolean>(false);
const showUpdateStudent = ref<boolean>(false);
const showUploadStudent = ref<boolean>(false);
const showConfirmDeleteStudent = ref<boolean>(false);

const studentCreate = reactive({
    firstname: '',
    lastname: '',
    no: 0
});

const studentUpdate = reactive({
    firstname: '',
    lastname: ''
})


onMounted(async () => {
    loadingPage.value = true;

    await getTeacherById();
    await getAllStudent();

    setTimeout(() => { loadingPage.value = false }, 200);
});

const getTeacherById = async () => {
    const data = await useApi.teacherService.getTeacherById(teacherStore.id);

    if (!data) {
        return navigateTo('/home');
    }

    teacher.value = data.result.data;
}

const getAllStudent = async () => {
    const data = await useApi.studentService.getAllStudent(route.params?.id + '');

    if (!data) {
        return navigateTo('/home');
    }

    studentList.value = data.result.data;
} 

const onCloseModalCreateStudent = () => {
    studentCreate.firstname =  '';
    studentCreate.lastname =  '';
    studentCreate.no =  0;

    showCreateStudent.value = false;
}

const onSubmitCreateStudent = async () => {
    showCreateStudent.value = false;
    loadingPage.value = true;

    const data = await useApi.studentService.createStudent(route.params?.id + '', {
        firstname: studentCreate.firstname,
        lastname: studentCreate.lastname,
        no: studentCreate.no,
        image: 'S_1'
    });

    studentCreate.firstname =  '';
    studentCreate.lastname =  '';
    studentCreate.no =  0;

    if (!data) {
        return navigateTo('/home');
    }

    await getAllStudent();

    setTimeout(() => { loadingPage.value = false }, 200);
}

const handleOnChangeUpload = async (event: InputEvent) => {
    const fileInput = event.target as HTMLInputElement;
    
    if (fileInput.files && fileInput.files.length > 0) {
        loadingPage.value = true;
        const file = fileInput.files[0];
        const data = await useApi.teacherService.uploadStudent(route.params?.id + '', file);

        if (!data) {
            return navigateTo('/home');
        }

        await getAllStudent();

        setTimeout(() => { loadingPage.value = false }, 200);
    }
}

const onOpenConfirmDelete = (student: StudentResponse) => {
    showConfirmDeleteStudent.value = true;
    selectStudent.value = student;
}

const onSubmitDeleteStudent = async () => {
    loadingPage.value = true;

    const data = await useApi.studentService.deleteStudentById(selectStudent.value?.id || "");

    if (!data) {
        return navigateTo('/home');
    }

    await getAllStudent();

    setTimeout(() => { loadingPage.value = false }, 200);
}

const onOpenUpdateStudent = (student: StudentResponse) => {
    selectStudent.value = student;

    studentUpdate.firstname = selectStudent.value.firstname;
    studentUpdate.lastname = selectStudent.value.lastname;

    showUpdateStudent.value = true;
}

const onSubmitUpdateStudent = async () => {
    showUpdateStudent.value = false;
    loadingPage.value = true;

    const data = await useApi.teacherService.updateStudent(selectStudent.value?.id || "", {
        firstname: studentUpdate.firstname,
        lastname: studentUpdate.lastname,
    })

    if (!data) {
        return navigateTo('/home');
    }

    await getAllStudent();

    setTimeout(() => { loadingPage.value = false }, 200);
}
</script>

<template>
    <div class="min-h-screen bg-[#EEF5FF] relative">
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


        <div class="flex justify-center mt-10">
            <div class=" bg-white p-3 rounded-[20px] relative w-fit"> 
                <div class="bg-[#BE96C6] p-3 rounded-[15px] w-[250px] absolute transform left-1/2 -top-[1px] -translate-y-1/2 -translate-x-1/2">
                    <p class="text-center text-2xl font-bold text-white">รายชื่อนักเรียน</p>
                </div>
                
                <div class="grid overflow-y-auto overflow-x-auto mt-14 lg:min-w-[700px] lg:max-w-[700px] md:max-w-[690px] max-w-[calc(100vw-100px)] max-h-[600px]">
                    <table class="w-full">
                        <thead class="bg-white sticky top-0">
                            <tr class="">
                                <th class="min-w-[70px]">
                                    <div class="flex justify-center">
                                        <div class="bg-[#BEDAE6] p-2 w-[120px] rounded-[15px]">เลขที่</div>
                                    </div>
                                </th>
    
                                <th class="min-w-[180px]">
                                    <div class="flex justify-center">
                                        <div class="bg-[#BEDAE6] p-2 w-[170px] rounded-[15px]">ชื่อจริง</div>
                                    </div>
                                </th>
    
                                <th class="min-w-[180px]">
                                    <div class="flex justify-center">
                                        <div class="bg-[#BEDAE6] p-2 w-[170px] rounded-[15px]">นามสกุล</div>
                                    </div>
                                </th>

                                <th class="min-w-[100px]">
                                </th>
                            </tr>
                        </thead>
    
                        <tbody>
                            <tr v-for="student of studentList">
                                <td class="text-center font-bold pt-7">{{ student.no }}</td>
                                <td class="pl-4 text-start  pt-7">{{ student.firstname }}</td>
                                <td class="pl-4 text-start  pt-7">{{ student.lastname }}</td>

                                <td class="pl-4 text-start  pt-7">
                                    <div class="flex items-center gap-x-3 p-2">
                                        <Icon 
                                            name="ion:edit" 
                                            class="text-gray-500 hover:text-blue-600 h-[18px] w-[18px] cursor-pointer" 
                                            @click="onOpenUpdateStudent(student)"
                                        />

                                        <div class="h-3 w-[0.5px] bg-gray-300"></div>

                                        <Icon 
                                            name="ion:md-trash" 
                                            class="text-gray-500 hover:text-red-500 h-[18px] w-[18px] cursor-pointer" 
                                            @click="onOpenConfirmDelete(student)"
                                        />
                                    </div>
                                </td>
                            </tr>

                            <tr v-if="studentList.length === 0">
                                <td colspan="4" class="pl-4  pt-7 text-center">
                                    <div class="text-center py-5 w-full text-gray-500 rounded-xl border">
                                        ไม่มีข้อมูลนักเรียน
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="absolute transform lg:right-[50px] lg:top-1/2 lg:-translate-y-1/2 lg:mt-0 mt-10 flex lg:flex-col gap-5">
            <div 
                @click="showCreateStudent = true"
                class="flex items-center lg:flex-col lg:w-[200px] w-[250px] lg:h-[120px] h-[50px] bg-[#D9E2E4] rounded-xl p-3 gap-3 cursor-pointer"
            >
                <img src="~/assets/images/person-add.png" draggable="false" class="lg:w-[50px] w-[40px] h-auto select-none"/>
                <p class="font-bold text-lg select-none">เพิ่มรายชื่อนักเรียน</p>
            </div>

            <div class="flex items-center lg:flex-col lg:w-[200px] w-[250px] lg:h-[120px] h-[50px] bg-[#AAD2D9] rounded-xl p-4 gap-3 cursor-pointer relative">
                <input 
                    type="file" 
                    @change="handleOnChangeUpload($event as InputEvent)"  
                    class="cursor-pointer absolute block opacity-0 w-full h-full  z-50" 
                />

                <img 
                    src="~/assets/images/excel.png" 
                    draggable="false" 
                    class="lg:w-[30px] w-[20px] h-auto select-none"
                />
                <p class="font-bold text-lg select-none">นำเข้าจาก Excel</p>
            </div>
        </div>
    </div>

    <div 
        v-if="showCreateStudent"
        @click="onCloseModalCreateStudent" 
        class="fixed w-full top-0 left-0 min-h-screen bg-gray-400/50"
    >
    </div>

    <div 
        v-if="showUpdateStudent"
        @click="showUpdateStudent = false" 
        class="fixed w-full top-0 left-0 min-h-screen bg-gray-400/50"
    >
    </div>


    <div 
        v-if="showCreateStudent"
        class="md:w-[500px] w-[490px] h-[320px] bg-white rounded-md fixed 
        top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
        "
    >
        <div class="relative">
            <div 
                class="bg-[#BE96C6]  rounded-[15px] absolute w-[300px] h-[65px] 
                flex items-center justify-center
                absolute -top-[36px] left-1/2 transform -translate-x-1/2
                "
            >
                <p class="text-white text-2xl text-center">เพิ่มรายชื่อนักเรียน</p>
            </div>
        </div>

        <form 
            class="flex flex-col p-8 gap-y-3"
            @submit.prevent="onSubmitCreateStudent"
        >
            <input 
                type="text" 
                placeholder="ชื่อ"
                v-model="studentCreate.firstname"
                class="p-2 px-5 rounded-xl  bg-[#DCF2F1] mt-4" 
            />

            <input 
                type="text" 
                placeholder="นามสกุล"
                v-model="studentCreate.lastname"
                class="p-2 px-5 rounded-xl  bg-[#DCF2F1] mt-4" 
            />

            <input 
                type="number" 
                placeholder="เลขที่"
                min="0"
                v-model="studentCreate.no"
                class="p-2 px-5 rounded-xl  bg-[#DCF2F1] mt-4" 
            />

            <div class="flex justify-between mt-3">
                <button 
                    @click="onCloseModalCreateStudent"
                    type="button" 
                    class="bg-[#E5E5E5] py-2 px-3 h-[36px] text-black rounded-md w-[160px] font-bold"
                >
                    ยกเลิก
                </button>

                <button 
                    :disabled="studentCreate.firstname === '' || studentCreate.lastname === '' || studentCreate.no === 0"
                    type="submit" 
                    class="bg-[#676B7D] py-2 px-3 h-[36px] text-white rounded-md w-[160px] font-bold"
                >
                    สร้าง
                </button>
            </div>
        </form>
    </div>

    <div 
        v-if="showUpdateStudent"
        class="md:w-[500px] w-[490px] h-fit bg-white rounded-md fixed 
        top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
        "
    >
        <div class="relative">
            <div 
                class="bg-[#BE96C6]  rounded-[15px] absolute w-[300px] h-[65px] 
                flex items-center justify-center
                absolute -top-[36px] left-1/2 transform -translate-x-1/2
                "
            >
                <p class="text-white text-2xl text-center">แก้ไขรายชื่อนักเรียน</p>
            </div>
        </div>

        <form 
            class="flex flex-col p-8 gap-y-3"
            @submit.prevent="onSubmitUpdateStudent"
        >
            <input 
                type="text" 
                placeholder="ชื่อ"
                v-model="studentUpdate.firstname"
                class="p-2 px-5 rounded-xl  bg-[#DCF2F1] mt-4" 
            />

            <input 
                type="text" 
                placeholder="นามสกุล"
                v-model="studentUpdate.lastname"
                class="p-2 px-5 rounded-xl  bg-[#DCF2F1] mt-4" 
            />

            <div class="flex justify-between mt-3">
                <button 
                    @click="showUpdateStudent = false"
                    type="button" 
                    class="bg-[#E5E5E5] py-2 px-3 h-[36px] text-black rounded-md w-[160px] font-bold"
                >
                    ยกเลิก
                </button>

                <button 
                    :disabled="studentUpdate.firstname === selectStudent?.firstname && studentUpdate.lastname === selectStudent?.lastname"
                    type="submit" 
                    class="bg-[#676B7D] py-2 px-3 h-[36px] text-white rounded-md w-[160px] font-bold"
                >
                    แก้ไข
                </button>
            </div>
        </form>
    </div>

    <Loading v-if="loadingPage" />

    <Modal v-model:show="showConfirmDeleteStudent" title="นักเรียน" @on-confirm="onSubmitDeleteStudent" />
</template>