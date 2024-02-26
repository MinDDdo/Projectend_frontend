<script setup lang="ts">

const classroomName = ref<string>('');
const grade = ref<string>('');
const subjectCode = ref<string>('');

const onSubmitCreateclassroom = async () => {
    const data = await useApi.classroomService.createClassroom({ 
        name: classroomName.value,
        owner: "65c0f97b48f2c8d8846a2251",
        subject_code: subjectCode.value,
        grade: grade.value,
        image: "aaaa"
    })

    if (!data) {
        return navigateTo('/');
    }
    
    classroomName.value = ""
    grade.value = ""
    subjectCode.value = ""

    navigateTo('/classroomlist')
}

</script>
<template>
    <div class="h-screen bg-[#EEF5FF] ">
        <div class="flex justify-between px-10 ">
            <div class="mt-5">
                <img src="~/assets/images/menu.png" alt="menu" />
            </div>
            
            <div class="bg-white flex gap-x-5 items-center mt-3 p-1 rounded-[10px] w-[190px] ">
                <img src="~/assets/images/T1.png" alt="T1"/>
                <p>ใจดี มีชัย</p>
            </div>
        </div>
        <div class="mt-5 flex justify-center ">
            <div class="  ">
                
                <div class="flex justify-center relative">
                    <div class=" flex  bg-white 
                                w-[600px] 
                                h-[570px] rounded-[20px]  ">
                                <div class=" flex flex-col gap-y-5 items-center 
                                 w-[600px] 
                                 h-[570px] rounded-[20px]">
                
                        <div class="flex justify-center relative pt-10">
                    <div class="  ">
                   
                        <img src="~/assets/images/grey.png" alt="grey" width="160" height="160" class="rounded-full"  />
                
                    </div>

                    <div class="absolute bottom-2 right-2">
                
                        <img src="~/assets/images/logoeditprofile.png" alt="logoeditprofile" width="30" height="40" class="rounded-full"  />
                
                     </div>
                </div>
                
                <form 
                    @submit.prevent="onSubmitCreateclassroom"
                    class="flex flex-col mt-8 gap-y-7 w-[500px]">
                    
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
                        <button 
                            type="submit" 
                            class="p-2 font-bold bg-[#E5E5E5] rounded-xl w-[210px]">
                            ยกเลิก
                        </button>
                        <button 
                            type="submit" 
                            class="p-2 text-white font-bold bg-[#676B7D] rounded-xl w-[210px]">
                            สร้าง
                        </button>
                    </div>
                </form>
            </div>
                                    
            </div>
                <div class="absolute  -top-9
                    bg-[#7071E8] text-white p-2
                    min-w-[300px] max-w-[300px] 
                    min-h-[65px] max-h-[65px] rounded-[20px] 
                    text-[26px] px-20
                ">
                    <p>สร้างชั้นเรียน</p>
                </div>
            </div>
            
        </div>
    </div>
</div>
    
</template>