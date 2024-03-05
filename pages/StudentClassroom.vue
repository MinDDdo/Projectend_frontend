<script lang="ts" setup>
import type { StudentResponse } from '~/interfaces/student.interface';
import type {ClassroomResponse } from '~/interfaces/classroom.interface';

const studentStore = useStore.studentStore();


onMounted(async () => {
    await getStudentById();
    await getClassroomById();
    
})

const student = ref<StudentResponse | null>(null);
const classroom = ref<ClassroomResponse | null>(null);

const getStudentById = async () => {
    const data = await useApi.studentService.getStudentById(
        studentStore.classroomId,
        studentStore.id
    );

    if (!data) {
        return navigateTo('/home');
    }

    student.value = data.result.data;
}
const getClassroomById = async () => {
    const data = await useApi.classroomService.getClassroomById(
        studentStore.classroomId
    );
    
    if(!data) {
        return navigateTo('/home');
    }
    
    classroom.value = data.result.data;
}

const studentLogout = async () => {
    studentStore.$reset()


    navigateTo('/home');
}


</script>

<template>
    <div class="h-screen bg-[#EEF5FF]">
        <div class="flex justify-between items-center px-10 pt-4">
            <div class="" @click="studentLogout">
                <img src="~/assets/images/logohome.png" alt="logohome" width="40" height="40"  />
            </div>
            
        </div>

        <div class="mt-5 flex justify-center ">
            <div class=" flex flex-col gap-y-5 items-center min-w-[550px] max-w-[550px] min-h-[560px] max-h-[560px]">
                <h1 class="text-[30px] text-center font-bold">{{ classroom?.name }}</h1>

                <div class="flex justify-center relative">
                    <div>
                        <img 
                            src="~/assets/images/Kid (24).png" 
                            alt="Kid (24)" 
                            width="190" 
                            height="190" 
                            class="rounded-full"
                        />
                    </div>

                    <div class="absolute bottom-2 right-2">
                        <img 
                            src="~/assets/images/logoeditprofile.png" 
                            alt="logoeditprofile" 
                            width="40" 
                            height="40" 
                            class="rounded-full"
                        />
                     </div>
                </div>

                <div class="" >
                    <div class="flex gap-x-5">
                        <h1 class="text-[24px] font-bold">{{ student?.firstname }}</h1>
                        <h1 class="text-[24px] font-bold">{{ student?.lastname }}</h1>
                    </div>
                </div>

                <NuxtLink
                    to="/studentassignmentlist"
                    type="button" 
                    class="p-2 px-12 text-white font-bold bg-[#676B7D] rounded-md"
                > 
                    <div class="flex  gap-x-1">
                        <img src="~/assets/images/logofolder.png" alt="logofolderr" width="24" height="24"  />
                        <p>ดูสถานะงาน</p>       
                    </div>                  
                </NuxtLink>
                
                <NuxtLink
                    to="/StudentAttendance"
                    type="button" 
                     class="p-2 px-12 text-white font-bold bg-[#676B7D] rounded-md "
                >
                    <div class="flex  gap-x-1">
                    
                        <img src="~/assets/images/logocalendar.png" alt="logocalendar" width="24" height="24"  />
                        <p>การเข้าเรียน</p>    
                    </div>                
                </NuxtLink>
            </div>
        </div>

    </div>
</template>