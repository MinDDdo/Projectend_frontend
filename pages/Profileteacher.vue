<script lang="ts" setup>

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
                
                <div class="flex justify-center relative">
                    <div>
                        <img 
                        src="~/assets/images/T2.png" 
                        alt="T2" 
                        width="150" 
                        height="150" 
                        class="rounded-full"
                        />
                    </div>
                    
                    <div class="absolute bottom-2 right-2">
                        <img 
                        src="~/assets/images/logoeditprofile.png" 
                        alt="logoeditprofile" 
                        width="40" 
                        class="rounded-full"
                        height="40" 
                        />
                    </div>
                </div>
                <p class="text-[25px] text-center font-bold">ใจดี มีชัย</p>
        
                <div class="p-10 bg-white w-[350px] h-[240px] rounded-[30px] ">
                    <div class="flex justify-center  ">
                        <p class="w-[90px]  font-bold text-lg pl-4 self-end leading-none">วันเกิด</p>
                        <p class="w-[150px] pl-4 self-end leading-none">9 กันยายน 2537</p>
                    </div>
        
                    <div class="flex justify-center pt-7">
                        <p class="w-[90px] font-bold text-lg pl-4 leading-none self-end">เพศ</p>
                        <p class="w-[150px] pl-4 leading-none self-end">หญิง</p>
                    </div>
        
                    <div class="flex justify-center pt-7">
                        <p class="w-[90px] font-bold text-lg pl-4 leading-none self-end">เบอร์</p>
                        <p class="w-[150px] pl-4 leading-none self-end">0812345678</p>
                    </div>
        
                    <div class="flex justify-center pt-7">
                        <p class="w-[90px] font-bold text-lg pl-4 leading-none self-end">ไลน์</p>
                        <p class="w-[150px] pl-4 leading-none self-end">ใจดี2537</p>
                    </div>
                </div>

                <button class="bg-white w-[140px] p-3 flex justify-center rounded-[30px]">
                    <p>แก้ไข</p>
                    <img src="~/assets/images/settings.png" 
                        alt="settings"
                        class="w-[30px] pl-2 "
                    />
                </button>


            </div>
        </div>
    </div>
</template>