<script setup lang="ts">

</script>

<template>
    <div class="min-h-screen bg-[#EEF5FF] relative">
        <div class="flex justify-between px-10 ">
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
        
        
        <div class="flex justify-center ">
            <div class="bg-white p-2 w-[700px] h-[550px] rounded-[20px] relative">
                <div class="flex justify-center absolute -top-[30px] transform  left-1/2 -translate-x-1/2">
                    <div class="bg-[#BE96C6] p-3 rounded-[15px] w-[250px]">
                        <p class="text-center text-2xl font-bold text-white">รายชื่อนักเรียน</p>
                    </div>
                </div>
                <div class="flex justify-center mt-14">
                    <table class="w-[600px] ">
                        <thead>
                            <tr>
                                <th >
                                    <div class="flex justify-center">
                                        <div class="bg-[#BEDAE6] p-2 w-[120px] rounded-[15px]">เลขที่</div>
                                    </div>
                                </th>
                                <th >
                                    <div class="flex justify-center">
                                        <div class="bg-[#BEDAE6] p-2 w-[120px] rounded-[15px]">ชื่อจริง</div>
                                    </div>
                                </th>
                                <th >
                                    <div class="flex justify-center">
                                        <div class="bg-[#BEDAE6] p-2 w-[120px] rounded-[15px]">นามสกุล</div>
                                    </div>
                                </th>
                                
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td class="text-center font-bold pt-7">1</td>
                                <td class="text-center  pt-7">สมศรี</td>
                                <td class="text-center  pt-7">สุขใจ</td>
                            </tr>

                            <tr>
                                <td class="text-center  font-bold pt-3">2</td>
                                <td class="text-center pt-3">ดวงพร</td>
                                <td class="text-center pt-3">เจริญ</td>
                            </tr>

                            <tr>
                                <td class="text-center  font-bold pt-3">3</td>
                                <td class="text-center pt-3">นเรศ</td>
                                <td class="text-center pt-3">คำเอี่ยม</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="flex flex-col gap-y-5 absolute right-[120px] top-1/2 transform -translate-y-1/2">
                <div class="bg-[#D9E2E4] w-[180px] rounded-[15px] flex flex-col items-center p-3 h-[90px]">
                    <img src="~/assets/images/person1.png" 
                    alt="person1"
                    class="w-[40px]"
                    />
                    <p class="font-bold ">เพิ่มรายชื่อนักเรียน</p>
                </div>

                <div class="bg-[#AAD2D9] w-[180px] rounded-[15px] flex flex-col items-center p-3 h-[90px]">
                    <img src="~/assets/images/excel.png" 
                    alt="excel"
                    class="w-[25px] pt-1"
                    />
                    <p class="font-bold pt-1">นำเข้าจาก Excel</p>
                </div>
            </div>
        </div>
    </div>
</template>