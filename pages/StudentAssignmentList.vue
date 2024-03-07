<script lang="ts" setup>
import type { StudentResponse } from '~/interfaces/student.interface';
import type {ClassroomResponse } from '~/interfaces/classroom.interface';
import type { AssigntmentStudentResponse} from '~/interfaces/assignment.interface';

const studentStore = useStore.studentStore();


onMounted(async () => {
    await getStudentById();
    await getClassroomById();
    await getAssignmentByStudentId();
    
})

const student = ref<StudentResponse | null>(null);
const classroom = ref<ClassroomResponse | null>(null);
const assignment = ref<AssigntmentStudentResponse[]> ([]);

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
const getAssignmentByStudentId = async () => {
    const data = await useApi.assignmentService.studentCheckStatusAssignment(
        {
            no: student.value?.no || 0,
            classroom_id: classroom.value?.id || ""
        }
        
    )
    if(!data) {
        return navigateTo('/home');
    }
    assignment.value = data.result.data;
    
}


</script>

<template>
    <div class="h-screen bg-[#EEF5FF]">
        <div class="flex justify-between items-center px-10 pt-4">
            <div class=""  @click="studentLogout" >
                <img src="~/assets/images/logohome.png" alt="logohome" width="40" height="40"  />
            </div>
            
        </div>

        <div class="mt- flex justify-center ">
            <div class=" flex flex-col gap-y-4 items-center w-[500px] h-[410px]">
                <h1 class="text-[30px] text-center font-bold">{{ classroom?.name }}</h1>
                <div class="flex justify-center relative">
                    <div class="  ">
                        <img src="~/assets/images/Kid (24).png" 
                        alt="Kid (24)" 
                        width="190" 
                        height="190" 
                        class="rounded-full"  
                        />
                    </div>

                    <div class="absolute bottom-2 right-2">
                        <img src="~/assets/images/logoeditprofile.png" 
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
                    to="/StudentAssignmentList"
                    type="button" 
                    class="p-3 px-20  text-white font-bold bg-[#636363] rounded-md ">
                            
                        <div class="flex  gap-x-1">
                            <img src="~/assets/images/logofolder.png" 
                                alt="logofolderr" 
                                width="24" 
                                height="24"  
                            />
                            <p> ดูสถานะงาน  </p>       
                         </div>                  
                
                </NuxtLink>
                
                <NuxtLink
                    to="/StudentAttendance"
                    type="button" 
                    class="p-2 px-[20px] text-white font-bold bg-[#676B7D] rounded-md ">
                         <div class="flex  gap-x-1">
                    
                            <img src="~/assets/images/logocalendar.png" alt="logocalendar" width="20" height="20"  />
                            <p>การเข้าเรียน   </p>    
                        </div>                
                </NuxtLink>
            </div>
        </div>
        
        <div class=" flex justify-center mt-[30px]">
            <div class = "grid  grid-cols-2 gap-x-[60px]  gap-y-12 " >

                <div 
                    v-for=" item of assignment "
                    class = " flex justify-between px-7 pt-10 bg-white w-[405px] h-[140px] rounded-[20px]  " >
                    <div class="flex-col space-y-3  ">
                        <p class=" flex font-bold text-[20px]  ">{{ item.assign_name }}</p>
                        <div class="flex gap-x-5" >
                            <p class=" flex text-[18px] ">กำหนดส่ง</p>
                        
                            <p class="  flex text-[#D04848] text-[18px] "> 30 ธ.ค. 2566</p>
                        </div>
                    </div>
                    <div class="bg-[#CC3636] text-white text-center min-w-[85px] max-w-[80px] min-h-[75px] max-h-[75px] rounded-[20px] ">
                        <p class="text-[18px]  pt-5"> ยังไม่ส่ง</p>
                    </div>
                </div>

                
                

            </div>
        </div>
    </div>
</template>