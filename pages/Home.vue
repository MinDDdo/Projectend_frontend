<script setup lang="ts">

</script>

<template>
    <div class="h-screen bg-[#EEF5FF]">
        <div class="flex justify-between items-center px-10 pt-4">
                <div class="">
                    <img src="~/assets/images/logo.png" alt="logo" />
                </div>
                <div class="flex gap-x-6 items-center ">
                    <p>เกี่ยวกับเรา</p>
                    <div class="flex  gap-x-1">
                        <p>เข้าสู่ระบบ</p>
                        <img src="~/assets/images/logologin.png" alt="logologin"  width="25" height="25"/>
                    </div>
                </div>
        </div>


        <div class=" ">
            <div class="flex justify-center mt-20 items-center gap-10">
                <img src="~/assets/images/main.png" alt="main"/>
                <div class="">
                    <div class="flex flex-col">
                        <img src="~/assets/images/inclass.png" alt="inclass" class=" h-auto w-[450px] self-center"/>
                        <p class="text-center text-4xl mt-3 text-[#36506C]">Classroom management system</p>
                    </div>

                    <div class="flex justify-center flex-col mt-10 ml-4">
                        <div class="flex gap-2 items-center ">
                            <p class="mr-3 font-bold">สำหรับนักเรียน</p>
                            <input
                                type="text"
                                placeholder="รหัสห้องเรียน"
                                class="p-1 px-1   bg-[#FFFFFF] text-center w-[150px]" 
    
                            />
                            <input
                                type="text"
                                placeholder="เลขที่"
                                class="p-1 px-1   bg-[#FFFFFF] text-center w-[100px]" 
    
                            />
                            <button type="submit" class="p-1 bg-[#676B7D] text-white rounded-[4px] w-[100px] ml-2">เข้าร่วม</button>
                        </div>

                        <div class="flex mt-5 items-center">
                            <p class="mr-7 font-bold">สำหรับคุณครู</p>
                            <button type="submit" class="p-1 bg-[#676B7D] text-white rounded-[4px] w-[140px] ml-2">จัดการชั้นเรียน</button>
                        </div>
                    </div>
                </div>
            </div>
        </div> 

    </div>
</template>

<style scoped>

</style>