<script setup lang="ts">


</script>

<style>
table, th, td {
    border: 2px solid #ffffff;
}

th, td {
  padding: 5px;
  text-align: center;
}
</style>

<template>
    <div class="h-screen bg-[#EEF5FF]">
        <div class="">
            <div class="">
                <img src="~/assets/images/arrow.png"  alt="arrow"
                class="pt-3 pl-5 w-[75px]"
                />
            </div>
        </div>

        <div class="flex justify-center relative">
            <div class="bg-[#475A7D]  rounded-[15px] w-[300px] h-[65px] absolute -top-[20px]">
                <p class="text-center text-white text-bold text-2xl mt-4">การเข้าเรียน</p>
            </div>
        </div>

        <div class="flex justify-center mt-5">
            <div class="bg-white p-5 w-[1000px] h-[450px] rounded-[20px]">
                <div class="mt-10 flex justify-center">
                    <table class="w-[850px]  ">
                        <thead>
                            <tr class=" ">
                                <th class="w-[100px] text-xl font-bold">เลขที่</th>
                                <th colspan="2" 
                                    class="text-xl font-bold ">รายชื่อ</th>
                                <th class="text-xl font-semibold">วันที่1</th>
                                <th class="text-xl font-semibold">วันที่2</th>
                                <th class="text-xl font-semibold">วันที่3</th>
                            </tr>
                        </thead>
    
                        <tbody>
                            <div class="">
                                <tr>
                                    <td class="text-center font-bold text-lg">1</td>
                                    <td class="text-center text-lg">สมศรี </td>
                                    <td class="text-center text-lg">สุขใจ</td>
                                    <td class="text-center text-lg bg-[#6EA66A]">มาเรียน</td>
                                    <td class="text-center text-lg bg-[#D14A4A]">ขาด</td>
                                    <td class="text-center text-lg bg-[#F9DC38]">ลา</td>

                                </tr>

                                <tr>
                                    <td class="text-center font-bold text-lg">2</td>
                                    <td class="text-center text-lg">สมศรี </td>
                                    <td class="text-center text-lg">สุขใจ</td>
                                    <td class="text-center text-lg bg-[#FEAD59]">สาย</td>
                                    <td class="text-center text-lg bg-[#D14A4A]">ขาด</td>
                                    <td class="text-center text-lg bg-[#D14A4A]">ขาด</td>

                                </tr>

                                <tr>
                                    <td class="text-center font-bold text-lg">3</td>
                                    <td class="text-center text-lg">สมศรี </td>
                                    <td class="text-center text-lg">สุขใจ</td>
                                    <td class="text-center text-lg bg-[#6EA66A]">มาเรียน</td>
                                    <td class="text-center text-lg bg-[#6EA66A]">มาเรียน</td>
                                    <td class="text-center text-lg bg-[#F9DC38]">ลา</td>

                                </tr>
                            </div>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="flex justify-center mt-8">
            <button class="bg-[#676B7D] w-[180px] h-[50px] flex rounded-[15px] ">
                <p class="text-center pl-10 mt-3 text-white font-bold">ดาวน์โหลด</p>
                <img src="~/assets/images/download.png" alt="download"
                class="w-[30px] mt-2 "
                />
            </button>
        </div>
        
    </div>
</template>