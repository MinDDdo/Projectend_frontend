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
            <div class="">
                <img src="~/assets/images/logoback.png" alt="logohome" width="40" height="40"  />
            </div>
            
        </div>

        <div 
        v-for=" item of assignment "
        class="mt-1 flex justify-center ">
            <div class=" flex flex-col gap-y-24 items-center min-w-[550px] max-w-[550px] min-h-[560px] max-h-[560px]">
                <h1 class="text-[28px] text-center">{{item.assign_name}}</h1>
                <div class="flex justify-center relative">
                    
                    <div class=" flex   bg-white w-[530px] h-[450px] rounded-[20px]  ">
                        
                            <ul class="w-[325px]  h-[250px] 
                                px-10 pt-20 space-y-3  ">
                         <li>
                            <diV class="flex justify-between">
                    <div class="flex ">
                        

                        <div class="flex ">
                                 <p class="text-[20px]">กำหนดส่ง</p>
                    
                        </div>
                    </div>
                            <div class="flex ">
                                <p class=" text-[#D04848]">30 ธ.ค. 2566</p>
                                
                            </div>
                            </diV>
                                </li>
                                <li>
                                    <diV class="flex justify-between">
                            <div class="flex gap-5 ">
                                

                                <div class="flex  ">
                                        <p class="text-[20px]">สถานะ</p>
                            
                                </div>
                            </div>
                                <div class="flex bg-[#CC3636] text-white 
                                                text-center min-w-[80px] max-w-[80px] 
                                                min-h-[30px] max-h-[30px] rounded-[5px] ">
                                                <p class=" text-[16px] pt-0.5 px-3">ยังไม่ส่ง</p>
                                </div>
                            </diV>
                                </li>
                                <li>
                            <diV class="flex justify-between">
                             <div class="flex gap-5 ">   
                                <p class="text-[20px]">รายละเอียดงาน</p>
                             </div>
                                
                            </diV>
                                </li>
                         <div class="  border border-[#818181] 
                                    w-[450px] 
                                    h-[200px] 
                                    rounded-[20px] ">
                               <p class="break-all pt-2 px-3 ">
                                {{item.assign_detail}}
                               </p>
                            
                         </div>

                         
                    </ul>
                        
                        
                
                    </div>

                    <div class="absolute  -top-20">
                
                        <img src="~/assets/images/Kid (24).png" alt="logoeditprofile" width="150" height="150" class="rounded-full"  />
                
                     </div>
                </div>
                

            </div>
        </div>

    </div>
</template>
