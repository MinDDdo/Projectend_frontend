<script setup lang="ts">

</script>

<template>
    <div class="h-screen bg-[#EEF5FF]">
        <div class="flex justify-between px-10 ">
            <div class="mt-5">
                <img src="~/assets/images/menu.png" alt="menu" />
            </div>
            
            <div class="bg-white flex gap-x-5 items-center mt-3 p-1 rounded-[10px] w-[190px] ">
                <img src="~/assets/images/T1.png" alt="T1"/>
                <p>ใจดี มีชัย</p>
            </div>
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
            <div class="bg-[#8EACCD] p-2 w-[250px] rounded-[15px]">
                <div class="flex justify-center items-center">
                    <p class=" text-white text-xl">สร้างชั้นเรียน</p>
                    <img src="~/assets/images/add.png" alt="add" class="ml-1" />
                </div>
            </div>
        </div>

        <div class="flex mx-10 mt-20">
            <div class="bg-[#FFFFFF] p-2 w-[350px] h-[300px] rounded-[15px] relative ">
                <div class="flex justify-end">
                    <img src="~/assets/images/dot.png" alt="dot"
                    class="absolute" 
                    />
                </div>

                <div class="flex justify-center mt-1">
                    <img src="~/assets/images/subject1.png" alt="subject1"/>
                </div>

                <p class="text-center text-2xl font-bold text-[#C82586]">การงาน </p>
                <p class="text-center text-lg mt-2">ป.6/2</p>

                <div class="flex justify-center">
                    <div class="bg-[#7071E8] p-2 w-[180px] rounded-[15px] mt-3  ">
                        <p class="text-center text-white text-lg ">เข้าชั้นเรียน</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>