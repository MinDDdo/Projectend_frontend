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
                                w-[900px] 
                                h-[525px] rounded-[30px] " >
                                
                                <table class=" 
                                              w-[800px] h-[450px]
                                              mx-[50Px] mt-[50Px]
                                              text-[18px]  " >
                                        <thead>
                                            <tr class="  h-[40px]  " >

                                            <th class=" w-[40px]  " >
                                                <div class=" bg-[#BEDAE6] text-black 
                                                              text-center font-bold 
                                                             w-[100px] h-[40px] 
                                                              rounded-[15px]  ">
                                                    <p class="  pt-1 ">เลขที่</p>
                                                </div>
                                            </th>
                                            <th  class="  w-[200px]" colspan="2">
                                            <div class="flex    px-[90px]">
                                                <div class=" bg-[#BEDAE6] text-black 
                                                              text-center font-bold 
                                                             w-[100px] h-[40px] 
                                                              rounded-[15px]  ">
                                                    <p class="  pt-1 ">รายชื่อ</p>
                                                </div>
                                            </div>
                                            </th>
                                            <th class="  " >
                                                <div class=" text-black 
                                                             font-bold 
                                                            ">
                                                    <p class="  pt-1 ">สถานะ</p>
                                                </div>
                                            </th>
                                            <th class=" " >
                                                
                                                <button type="button" 
                                                        class="  text-white font-bold 
                                                                bg-[#676B7D] rounded-xl  w-[150px] h-[40px] "
                                                 >เลือกทั้งหมด
                                                </button>
                                            </th>
                                            </tr>
                                        </thead>
                                              
                                        <tbody class=""  >
                                        <tr class=" ">
                                            <td class=" font-bold text-center    ">
                                                1
                                            </td> 
                                            <td class=" px-[20px] ">
                                            สมศรี
                                            </td>
                                            <td class="  " >
                                            สุขใจ
                                            </td>
                                            <td class="  " > 
                                                <div class="flex justify-center ">
                                                <div class="flex bg-[#6EA66A] text-white 
                                                            text-center w-[90px] h-[35px]
                                                             rounded-[10px] ">
                                                        <p class=" text-[15px] pt-1 px-4">ตรวจแล้ว</p>
                                                </div></div>
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
                                        </tr>
                                        <tr class=" ">
                                            <td class=" font-bold text-center    ">
                                                2
                                            </td> 
                                            <td class=" px-[20px] ">
                                            ดวงพร
                                            </td>
                                            <td class="  " >
                                            เจริญ
                                            </td>
                                            <td class="  " > 
                                                <div class="flex justify-center ">
                                                <div class="flex bg-[#6EA66A] text-white 
                                                            text-center w-[90px] h-[35px]
                                                             rounded-[10px] ">
                                                        <p class=" text-[15px] pt-1 px-4">ตรวจแล้ว</p>
                                                </div></div>
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
                                        </tr>
                                        <tr class=" ">
                                            <td class=" font-bold text-center    ">
                                                3
                                            </td> 
                                            <td class="px-[20px]  ">
                                            นเรศ
                                            </td>
                                            <td class="  " >
                                            คำเอี่ยม
                                            </td>
                                            <td class="  " > 
                                                <div class="flex justify-center ">
                                                <div class="flex bg-[#CC3636] text-white 
                                                            text-center w-[90px] h-[35px]
                                                             rounded-[10px] ">
                                                        <p class=" text-[16px] pt-1 px-4">ยังไม่ส่ง</p>
                                                </div></div>
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
                                        </tr>
                                        <tr class=" ">
                                            <td class=" font-bold text-center    ">
                                                4
                                            </td> 
                                            <td class=" px-[20px] ">
                                            วีรชัย
                                            </td>
                                            <td class="  " >
                                            ปิติทัศน์
                                            </td>
                                            <td class="  " > 
                                                <div class="flex justify-center ">
                                                <div class="flex bg-[#CC3636] text-white 
                                                            text-center w-[90px] h-[35px]
                                                             rounded-[10px] ">
                                                        <p class=" text-[16px] pt-1 px-4">ยังไม่ส่ง</p>
                                                </div></div>
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
                                        </tr>
                                        <tr class=" ">
                                            <td class=" font-bold text-center    ">
                                                5
                                            </td> 
                                            <td class=" px-[20px] ">
                                                ทรัพย์ธนิดา
                                            </td>
                                            <td class="  " >
                                                จุลพัฒน์
                                            </td>
                                            <td class="  " > 
                                                <div class="flex justify-center ">
                                                <div class="flex bg-[#CC3636] text-white 
                                                            text-center w-[90px] h-[35px]
                                                             rounded-[10px] ">
                                                        <p class=" text-[16px] pt-1 px-4">ยังไม่ส่ง</p>
                                                </div></div>
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
                                        </tr>
                                        <tr class=" ">
                                            <td class=" font-bold text-center    ">
                                                6
                                            </td> 
                                            <td class=" px-[20px] ">
                                                กิตติ
                                            </td>
                                            <td class="  " >
                                                รัตนกิจโกศล
                                            </td>
                                            <td class="  " > 
                                                <div class="flex justify-center ">
                                                <div class="flex bg-[#6EA66A] text-white 
                                                            text-center w-[90px] h-[35px]
                                                             rounded-[10px] ">
                                                        <p class=" text-[15px] pt-1 px-4">ตรวจแล้ว</p>
                                                </div></div>
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
                                        </tr>
                                        <tr class=" ">
                                            <td class=" font-bold text-center    ">
                                                7
                                            </td> 
                                            <td class=" px-[20px] ">
                                                ณัท
                                            </td>
                                            <td class="  " >
                                                สันติวงษ์
                                            </td>
                                            <td class="  " > 
                                                <div class="flex justify-center ">
                                                <div class="flex bg-[#CC3636] text-white 
                                                            text-center w-[90px] h-[35px]
                                                             rounded-[10px] ">
                                                        <p class=" text-[16px] pt-1 px-4">ยังไม่ส่ง</p>
                                                </div></div>
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
                                        </tr>
                                        <tr class=" ">
                                            <td class=" font-bold text-center    ">
                                                8
                                            </td> 
                                            <td class=" px-[20px] ">
                                                ปภาดา
                                            </td>
                                            <td class="  " >
                                                ประสานวงศ์
                                            </td>
                                            <td class="  " > 
                                                <div class="flex justify-center ">
                                                <div class="flex bg-[#6EA66A] text-white 
                                                            text-center w-[90px] h-[35px]
                                                             rounded-[10px] ">
                                                        <p class=" text-[15px] pt-1 px-4">ตรวจแล้ว</p>
                                                </div></div>
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
                                        </tr>
                                        
                                        
                                        
                                        </tbody>
                                       
                                        
                                        
                                       
                                        
                                        
                                </table>
                               

               
                    </div>
                    <div class=" flex ">
                 </div>
                    <div class=" bg-[#475A7D] text-white p-3.5
                           w-[280px] 
                            h-[65px]  rounded-[20px] 
                            text-[24px] px-[55px] absolute  -top-9
                            ">
                         <p>สถานะการส่งงาน</p>
                    </div>
                 </div>
            </div>
        </div>
        <div class="flex  justify-center pt-[20px]">
            <div>
            <button type="submit" class=" flex p-2 px-[40px] pt-[10px] text-white font-bold 
                                           bg-[#676B7D] rounded-xl w-[150px]"
            >ตรวจงาน
            </button>
            </div>
        </div>
    </div>
    
</template>