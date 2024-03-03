<script lang="ts" setup>
import type { StudentResponse } from '~/interfaces/student.interface';

onMounted(async () => {
    await getStudentById();
})

const student = ref<StudentResponse | null>(null);

const getStudentById = async () => {
    const data = await useApi.studentService.getStudentById(
        '65c7aaf2889566d65f6a3451',
        '65da00509d7993180f4cc1ba'
    );

    if (!data) {
        return navigateTo('/');
    }

    student.value = data.result.data;
}
</script>

<template>
    <div class="h-screen bg-[#EEF5FF]">
        <div class="flex justify-between items-center px-10 pt-4">
            <div class="">
                <img src="~/assets/images/logohome.png" alt="logohome" width="40" height="40"  />
            </div>
            
        </div>

        <div class="mt-5 flex justify-center ">
            <div class=" flex flex-col gap-y-5 items-center min-w-[550px] max-w-[550px] min-h-[560px] max-h-[560px]">
                <h1 class="text-[30px] text-center"><b>ภาษาไทย</b></h1>

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
                        <p>ดูสถานะงาน </p>       
                    </div>                  
                </NuxtLink>
                
                <button type="button" class="p-2 px-12 text-white font-bold bg-[#676B7D] rounded-md ">
                    <div class="flex  gap-x-1">
                    
                        <img src="~/assets/images/logocalendar.png" alt="logocalendar" width="24" height="24"  />
                        <p>ดูสถานะงาน   </p>    
                    </div>                
                </button>
            </div>
        </div>

    </div>
</template>