<script setup lang="ts">
const storeTeacher = useStore.teacherStore();
const classroomName = ref<string>('');
const grade = ref<string>('');
const subjectCode = ref<string>('');

const onSubmitCreateclassroom = async () => {
    const data = await useApi.classroomService.createClassroom({ 
        name: classroomName.value,
        owner: storeTeacher.id,
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
<div 
        class="fixed bg-gray-400 bg-opacity-50 h-screen w-full z-[99999] top-0 right-0 left-0" 
       
    >
    </div>

    <div 
        class="fixed bg-white rounded-[20px]  min-w-[900px] min-h-[700px] z-[999999] 
        top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 " 
       
    >
        <div class="overflow-y-scroll h-[450px] w-[700px] mt-[80px] mx-[100px] grid grid-cols-5 gap-1" >
            <img src="~/assets/images/avatarSubject/Sj_1.png" alt="Sj_1" class=" rounded-lg"  />
            <img src="~/assets/images/avatarSubject/Sj_2.png" alt="Sj_2" class=" rounded-lg"  />
            <img src="~/assets/images/avatarSubject/Sj_3.png" alt="Sj_3" class=" rounded-lg"  />
            <img src="~/assets/images/avatarSubject/Sj_4.png" alt="Sj_4" class=" rounded-lg"  />
            <img src="~/assets/images/avatarSubject/Sj_5.png" alt="Sj_5" class=" rounded-lg"  />
            <img src="~/assets/images/avatarSubject/Sj_6.png" alt="Sj_6" class=" rounded-lg"  />
            <img src="~/assets/images/avatarSubject/Sj_7.png" alt="Sj_7" class=" rounded-lg"  />
            
            
           
        </div>
        <div class=" grid justify-items-center pt-5" >
            <button type="submit" class="p-2 bg-[#676B7D] w-[150px] h-[50px] rounded-[10px] text-white font-bold">
                        บันทึก
            </button>
        </div>
      
    </div>
</template>