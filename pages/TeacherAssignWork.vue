<script setup lang="ts">

</script>
<template>
    <div  class="h-screen bg-[#D9D9D9] ">
        <div class="flex justify-between">     
        </div>
        <div class="mt-20 flex justify-center ">
            <div class="  ">
                
                <div class="flex justify-center relative">
                    <div class=" flex  bg-white 
                                w-[1200px] 
                                h-[550px] rounded-[30px]  ">
                       <div> <form class="flex flex-col mt-[70px] mx-[70px] ">
                        <input  type="text"  
                                placeholder="หัวข้อ"
                                class="mt-1  px-8 py-[15px] bg-[#DCF2F1] 
                                         rounded-xl w-[1050px] text-[20px] "  />
                        <textarea  rows="8" cols="33" 
                                    placeholder="รายละเอียดงาน"
                                    class="mt-5 px-7 p-2  bg-[#DCF2F1]  rounded-xl w-[1050px] text-[20px] " />    
                        </form>
                        <div class="flex mx-[70px] mt-[20px] gap-x-[15px] ">
                        
                            <button type="button" class="p-2 px-[30px] text-[#475A7D] font-bold 
                                                        border-2 border-[#475A7D] rounded-xl w-[170px] flex gap-x-[10px] "
                                                        >กำหนดส่ง 
                                                        <img src="~/assets/images/calendar.png"
                                                         alt="calendar"  width="20" height="2"/> 
                            </button>

                            <button type="button" class=" flex p-2 px-[55px] text-white font-bold 
                                                            bg-[#676B7D] rounded-xl w-[150px]"
                                                         >สร้าง</button>
                        </div>
                    </div>
               
                    </div>
                    <div class=" flex ">
                 </div>
                    <div class=" bg-[#475A7D] text-white p-3.5
                            min-w-[300px] max-w-[300px] 
                            min-h-[65px] max-h-[65px] rounded-[20px] 
                            text-[24px] px-20 absolute  -top-9
                            ">
                         <p>มอบหมายงาน</p>
                    </div>
                 </div>
            </div>
        </div>
    </div>
    
</template>