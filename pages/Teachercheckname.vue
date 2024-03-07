<script>

</script>

<template>
    <div class="min-h-screen bg-[#EEF5FF]">
        <div class="flex justify-between px-10">
            <div class="mt-5">
                <img src="~/assets/images/arrow.png"  alt="arrow"
                class=" pl-3 w-[75px]"
                />
            </div>
            <div class="">
                <div class="bg-white flex gap-x-5 items-center mt-3 p-1 rounded-[10px] w-[190px] ">
                    <img src="~/assets/images/T1.png" alt="T1"/>
                    <p>ใจดี มีชัย</p>
                </div>
            </div>
        </div>

        <div class="flex justify-center relative">
            <div class=" bg-[#B598CD] w-[280px] h-[55px] rounded-[15px] absolute -top-[20px]">
                <p class="text-white font-bold text-2xl text-center mt-3">เช็คชื่อ</p>
            </div>
            <div class="bg-white p-5 w-[1000px] h-[480px] rounded-[20px] ">
                <div class="mt-10 mx-10  flex justify-between  ">
                    <div class="flex gap-2">
                        <button type="button" 
                                    class=" bg-[#E5E5E5] p-2
                                            w-[170px] h-[45px] rounded-[12px]
                                            text-black flex items-center font-bold
                                            gap-x-3 justify-center ">
                                <p> เลือกวันที่ </p>
                                <img src="~/assets/images/logocalendarblack.png" alt="logocalendarblack" width="25px" height="25px"/>
                        </button>

                        <button type="button" 
                                    class=" bg-[#D9E2E4] p-2
                                            w-[170px] h-[45px] rounded-[12px]
                                            text-black flex items-center font-bold
                                            gap-x-3 justify-center ">
                                <p > กำหนดเวลา </p>
                                <img src="~/assets/images/history.png" alt="history" width="25px" height="25px"/>
                        </button>
                    </div>
                        <button type="button" 
                                class=" bg-[#676B7D] p-2
                                        w-[130px] h-[55px] rounded-[12px]
                                        text-white flex items-center font-bold
                                        gap-x-3 justify-center shadow-xl">
                                <p > สร้าง </p>
                                <img src="~/assets/images/add.png" alt="add" width="25px" height="25px"/>
                        </button> 
                </div>
                
                <table class="   w-[950px] h-[325] mt-3">
                    <thead class=" bg-[#BEDAE6] font-bold text-center text-[18px]  ">
                        <tr>
                            <td>
                             วันที่
                            </td>  

                            <td>
                             หมดเขต
                            </td> 

                            <td></td>
                            <td></td>
                        
                        </tr>
                    </thead>

                    <tbody class=" text-center  ">
                        <tr class="h-[75px]">
                            <td> 9 ก.พ. 2567 </td>
                            <td> 9 ก.พ. 2567 12.00</td>
                            <td > 
                                <button 
                                    type="button" 
                                    class=" bg-[#676B7D] w-[75px] h-[40px] p-1 rounded-[5px]  ">
                                    <img src="~/assets/images/Create.png" alt="Create" class=" w-[25px] mx-[20px]"/>
                                </button>
                            </td>
                            <td>
                                <button 
                                    type="button" 
                                    class=" bg-[#CC3636] w-[75px] h-[40px] p-1 rounded-[5px]  ">
                                    <img src="~/assets/images/Icon.png" alt="Icon" class=" w-[22px] mx-[20px]"/>
                                </button>
                            </td>
                        </tr>
                        <tr class="h-[75px]" >
                            <td> 12 ม.ค. 2567 </td>
                            <td> 13 ม.ค. 2567 12.00</td>
                            <td> 
                                <button 
                                    type="button" 
                                    class=" bg-[#676B7D] w-[75px] h-[40px] p-1 rounded-[5px]  ">
                                    <img src="~/assets/images/Create.png" alt="Create" class=" w-[25px] mx-[20px]"/>
                                </button>
                            </td>
                            <td>
                                <button 
                                    type="button" 
                                    class=" bg-[#CC3636] w-[75px] h-[40px] p-1 rounded-[5px]  ">
                                    <img src="~/assets/images/Icon.png" alt="Icon" class=" w-[22px] mx-[20px]"/>
                                </button>
                            </td>
                        </tr>
                        
                    </tbody>
                </table>
                

                
            </div>            
        </div>
    </div>
</template>