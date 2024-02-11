<script setup lang="ts">

</script>
<template>
    <div class="h-screen bg-[#EEF5FF] ">
        <div class="flex justify-between px-10  ">
            <div class="mt-3 pt-4">
                <img src="~/assets/images/menu.png" alt="menu" />
            </div>
            
            <div class="bg-white flex gap-x-5 items-center mt-3 p-1 rounded-[10px] w-[190px] ">
                <img src="~/assets/images/T1.png" alt="T1"/>
                <p>ใจดี มีชัย</p>
            </div>
            
        </div>
        <div class="mt-5 flex justify-center ">
            <div class=" flex flex-col gap-y-32 items-center
                         min-w-[550px] max-w-[550px] 
                         min-h-[560px] max-h-[560px] 
                         mt-10">
                
                <div class="flex justify-center relative">
                    <div class=" flex   bg-white min-w-[670px] max-w-[670px]
                                 min-h-[680px] max-h-[680px] rounded-[20px]  ">
                                 <div class=" flex flex-col gap-y-5 items-center 
                                 min-w-[670px] max-w-[670px]
                                 min-h-[680px] max-h-[680px] rounded-[20px]">
                
                <div class="flex justify-center relative pt-20">
                    <div class="  ">
                   
                        <img src="~/assets/images/grey.png" alt="Kid (24)" width="190" height="190" class="rounded-full"  />
                
                    </div>

                    <div class="absolute bottom-2 right-2">
                
                        <img src="~/assets/images/logoeditprofile.png" alt="logoeditprofile" width="40" height="40" class="rounded-full"  />
                
                     </div>
                </div>
                
                <form class="flex flex-col mt-8 gap-y-7 w-[500px]">
                    <input 
                        type="text" 
                        placeholder="ชื่อชั้นเรียน" 
                        class="p-2 px-5 rounded-xl  bg-[#DCF2F1]
                                h-[50px] text-[18px]" 
                    />

                   
                    <input 
                        type="text" 
                        placeholder="ชั้นเรียน" 
                        class="p-2 px-5 rounded-xl  bg-[#DCF2F1]
                            h-[50px] text-[18px]" 
                    />
                    <input 
                        type="text" 
                        placeholder="เพิ่มเติม" 
                        class="p-2 px-5 rounded-xl  bg-[#DCF2F1]
                                h-[50px] text-[18px]" 
                    />
                    <div class="flex justify-between h-[50px]  ">
                        <button 
                            type="submit" 
                            class="p-2 font-bold bg-[#E5E5E5] rounded-xl w-[240px]">
                            ยกเลิก
                        </button>
                        <button 
                            type="submit" 
                            class="p-2 text-white font-bold bg-[#676B7D] rounded-xl w-[240px]">
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