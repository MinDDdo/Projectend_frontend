<script setup lang="ts">

</script>
<template>
    <div  class="h-screen bg-[#EEF5FF] ">
        <div class="flex justify-between px-10 ">
            <div class="mt-3">
                <img src="~/assets/images/Arrow_alt_left.png" alt="Arrow_alt_left" />
            </div>
            
            <div class="bg-white flex gap-x-5 items-center mt-3 p-1 rounded-[10px] w-[180px] h-[55px]">
                <img src="~/assets/images/T1.png" alt="T1" width="50px" height="50px"/>
                <p>ใจดี มีชัย</p>
            </div>
        </div>

        <div class="mt-1 flex justify-center ">
            <div class="  ">
                
                <div class="flex  justify-center relative">
                    <div class=" flex  flex-col bg-white 
                                w-[1200px] 
                                h-[550px] rounded-[30px] " >
                    <div class="flex justify-between mt-[50px] mx-[70px]">
                        <div class="">
                            <button type="button" 
                                    class=" bg-[#E5E5E5] p-6 
                                            w-[170px] h-[50px] rounded-[12px]
                                            text-black flex items-center font-bold
                                            gap-x-3">
                                <p> เลือกวันที่ </p>
                                <img src="~/assets/images/logocalendarblack.png" alt="T1" width="35px" height="35px"/>
                            </button>
                        </div>
                        <div class="">
                            <button type="button" 
                                    class=" bg-[#6DA569] p-5
                                            w-[px] h-[10px] rounded-[12px]
                                            text-white flex items-center font-bold
                                            ">
                                <p> บันทึก </p>
                               
                            </button>
                        </div>
                    </div>
                    <div class="mx-[70Px] mt-[10Px]">
                                <table class=" 
                                              w-[1100px] h-[400px]
                                              
                                              text-[18px]  " >
                                        <thead>
                                            <tr class="   " >

                                            <th class="w-[100px] " >
                                                <div class="flex mx-[px]">
                                                <div class=" bg-[#BEDAE6] text-black 
                                                              text-center font-bold 
                                                             w-[100px] h-[40px] 
                                                              rounded-[15px]  ">
                                                    <p class="  pt-1  ">เลขที่</p>
                                                </div>
                                                </div>
                                            </th>
                                            <th  class=" " colspan="2">
                                            <div class="flex  ml-[150px]">
                                                <div class=" bg-[#ABCED1] text-black 
                                                              text-center font-bold 
                                                             w-[120px] h-[40px] 
                                                              rounded-[15px]  ">
                                                    <p class="  pt-1 ">รายชื่อ</p>
                                                </div>
                                            </div>
                                            </th>
                                            <th class=" w-[120px]  " >
                                                <div class=" text-black 
                                                             font-bold 
                                                            ">
                                                    <p class="  pt-1 ">มา</p>
                                                </div>
                                            </th>
                                            <th class=" w-[120px]  " >
                                                <div class=" text-black 
                                                             font-bold 
                                                            ">
                                                    <p class="  pt-1 ">ขาด</p>
                                                </div>
                                            </th>
                                            <th class="w-[120px] " >
                                                <div class=" text-black 
                                                             font-bold 
                                                            ">
                                                    <p class="  pt-1 ">ลา</p>
                                                </div>
                                            </th>
                                            <th class=" w-[120px] " >
                                                <div class=" text-black 
                                                             font-bold 
                                                            ">
                                                    <p class="  pt-1 ">สาย</p>
                                                </div>
                                            </th>

                                            
                                            </tr>
                                        </thead>
                                              
                                        <tbody class=" h-[20px]"  >
                                        <tr class=" ">
                                            <td class=" font-bold text-center   ">
                                                1
                                            </td> 
                                            <td class=" px-[40px] ">
                                            สมศรี
                                            </td>
                                            <td class="  " >
                                            สุขใจ
                                            </td>
                                           
                                            <td class="  " >
                                                <div class="flex justify-center ">
                                                <input checked id="green-checkbox" 
                                                style="width: 30px; height: 30PX;
                                                 accent-color:#6DA569;
                                                 "
                                                 type="checkbox" value="" 
                                                 
                                                 >  
                                                </div>  
                                                 
                                            </td>
                                            <td class="  " >
                                                <div class="flex justify-center ">
                                                <input checked id="green-checkbox" 
                                                style="width: 30px; height: 30PX;
                                                 accent-color:#D14A4A;
                                                 "
                                                 type="checkbox" value="" 
                                                 
                                                 >  
                                                </div>  
                                                 
                                            </td>
                                            <td class="  " >
                                                <div class="flex justify-center ">
                                                <input checked id="green-checkbox" 
                                                style="width: 30px; height: 30PX;
                                                 accent-color:#F9DC38;
                                                 "
                                                 type="checkbox" value="" 
                                                 
                                                 >  
                                                </div>  
                                                 
                                            </td>
                                            <td class="  " >
                                                <div class="flex justify-center ">
                                                <input checked id="green-checkbox" 
                                                style="width: 30px; height: 30PX;
                                                 accent-color:#FEAD59;
                                                 "
                                                 type="checkbox" value="" 
                                                 
                                                 >  
                                                </div>  
                                                 
                                            </td>
                                        </tr>
                                        <tr class=" ">
                                            <td class=" font-bold text-center    ">
                                                2
                                            </td> 
                                            <td class=" px-[40px] ">
                                            ดวงพร
                                            </td>
                                            <td class="  " >
                                            เจริญ
                                            </td>
                                            
                                            <td class="  " >
                                                <div class="flex justify-center ">
                                                <input checked id="green-checkbox" 
                                                style="width: 30px; height: 30PX;
                                                 accent-color:#6DA569;
                                                 "
                                                 type="checkbox" value="" 
                                                 
                                                 >  
                                                </div>  
                                                 
                                            </td>
                                            <td class="  " >
                                                <div class="flex justify-center ">
                                                <input checked id="green-checkbox" 
                                                style="width: 30px; height: 30PX;
                                                 accent-color:#D14A4A;
                                                 "
                                                 type="checkbox" value="" 
                                                 
                                                 >  
                                                </div>  
                                                 
                                            </td>
                                            <td class="  " >
                                                <div class="flex justify-center ">
                                                <input checked id="green-checkbox" 
                                                style="width: 30px; height: 30PX;
                                                 accent-color:#F9DC38;
                                                 "
                                                 type="checkbox" value="" 
                                                 
                                                 >  
                                                </div>  
                                                 
                                            </td>
                                            <td class="  " >
                                                <div class="flex justify-center ">
                                                <input checked id="green-checkbox" 
                                                style="width: 30px; height: 30PX;
                                                 accent-color:#FEAD59;
                                                 "
                                                 type="checkbox" value="" 
                                                 
                                                 >  
                                                </div>  
                                                 
                                            </td>
                                        </tr>
                                        <tr class=" ">
                                            <td class=" font-bold text-center    ">
                                                3
                                            </td> 
                                            <td class="px-[40px]  ">
                                            นเรศ
                                            </td>
                                            <td class="  " >
                                            คำเอี่ยม
                                            </td>
                                            
                                            <td class="  " >
                                                <div class="flex justify-center ">
                                                <input checked id="green-checkbox" 
                                                style="width: 30px; height: 30PX;
                                                 accent-color:#6DA569;
                                                 "
                                                 type="checkbox" value="" 
                                                 
                                                 >  
                                                </div>  
                                                 
                                            </td>
                                            <td class="  " >
                                                <div class="flex justify-center ">
                                                <input checked id="green-checkbox" 
                                                style="width: 30px; height: 30PX;
                                                 accent-color:#D14A4A;
                                                 "
                                                 type="checkbox" value="" 
                                                 
                                                 >  
                                                </div>  
                                                 
                                            </td>
                                            <td class="  " >
                                                <div class="flex justify-center ">
                                                <input checked id="green-checkbox" 
                                                style="width: 30px; height: 30PX;
                                                 accent-color:#F9DC38;
                                                 "
                                                 type="checkbox" value="" 
                                                 
                                                 >  
                                                </div>  
                                                 
                                            </td>
                                            <td class="  " >
                                                <div class="flex justify-center ">
                                                <input checked id="green-checkbox" 
                                                style="width: 30px; height: 30PX;
                                                 accent-color:#FEAD59;
                                                 "
                                                 type="checkbox" value="" 
                                                 
                                                 >  
                                                </div>  
                                                 
                                            </td>
                                        </tr>
                                        <tr class=" ">
                                            <td class=" font-bold text-center    ">
                                                4
                                            </td> 
                                            <td class=" px-[40px] ">
                                            วีรชัย
                                            </td>
                                            <td class="  " >
                                            ปิติทัศน์
                                            </td>
                                            <td class="  " >
                                                <div class="flex justify-center ">
                                                <input checked id="green-checkbox" 
                                                style="width: 30px; height: 30PX;
                                                 accent-color:#6DA569;
                                                 "
                                                 type="checkbox" value="" 
                                                 
                                                 >  
                                                </div>  
                                                 
                                            </td>
                                            <td class="  " >
                                                <div class="flex justify-center ">
                                                <input checked id="green-checkbox" 
                                                style="width: 30px; height: 30PX;
                                                 accent-color:#D14A4A;
                                                 "
                                                 type="checkbox" value="" 
                                                 
                                                 >  
                                                </div>  
                                                 
                                            </td>
                                            <td class="  " >
                                                <div class="flex justify-center ">
                                                <input checked id="green-checkbox" 
                                                style="width: 30px; height: 30PX;
                                                 accent-color:#F9DC38;
                                                 "
                                                 type="checkbox" value="" 
                                                 
                                                 >  
                                                </div>  
                                                 
                                            </td>
                                            <td class="  " >
                                                <div class="flex justify-center ">
                                                <input checked id="green-checkbox" 
                                                style="width: 30px; height: 30PX;
                                                 accent-color:#FEAD59;
                                                 "
                                                 type="checkbox" value="" 
                                                 
                                                 >  
                                                </div>  
                                                 
                                            </td>
                                        </tr>
                                        <tr class=" ">
                                            <td class=" font-bold text-center    ">
                                                5
                                            </td> 
                                            <td class="px-[40px] ">
                                                ทรัพย์ธนิดา
                                            </td>
                                            <td class="  " >
                                                จุลพัฒน์
                                            </td>
                                           
                                            <td class="  " >
                                                <div class="flex justify-center ">
                                                <input checked id="green-checkbox" 
                                                style="width: 30px; height: 30PX;
                                                 accent-color:#6DA569;
                                                 "
                                                 type="checkbox" value="" 
                                                 
                                                 >  
                                                </div>  
                                                 
                                            </td>
                                            <td class="  " >
                                                <div class="flex justify-center ">
                                                <input checked id="green-checkbox" 
                                                style="width: 30px; height: 30PX;
                                                 accent-color:#D14A4A;
                                                 "
                                                 type="checkbox" value="" 
                                                 
                                                 >  
                                                </div>  
                                                 
                                            </td>
                                            <td class="  " >
                                                <div class="flex justify-center ">
                                                <input checked id="green-checkbox" 
                                                style="width: 30px; height: 30PX;
                                                 accent-color:#F9DC38;
                                                 "
                                                 type="checkbox" value="" 
                                                 
                                                 >  
                                                </div>  
                                                 
                                            </td>
                                            <td class="  " >
                                                <div class="flex justify-center ">
                                                <input checked id="green-checkbox" 
                                                style="width: 30px; height: 30PX;
                                                 accent-color:#FEAD59;
                                                 "
                                                 type="checkbox" value="" 
                                                 
                                                 >  
                                                </div>  
                                                 
                                            </td>
                                        </tr>
                                       
                                        
                                        
                                        
                                        </tbody>
                                       
                                        
                                        
                                       
                                        
                                        
                                </table>
                               
                    </div>
               
                    </div>
                    <div class=" flex ">
                 </div>
                    <div class=" bg-[#C7AFDC] text-white p-3.5
                            w-[280px] 
                            h-[65px]  rounded-[20px] 
                            text-[24px] text-center absolute  -top-9
                            ">
                         <p>เช็คชื่อ</p>
                    </div>
                 </div>
            </div>
        </div>
        
    </div>
    
</template>