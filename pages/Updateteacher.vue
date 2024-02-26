<script>

</script>

<template>
    <div class="min-h-screen bg-[#EEF5FF]">
        <div class="flex justify-between px-10">
            <div class="mt-5">
                <img src="~/assets/images/menu.png" alt="menu" />
            </div>

            <div class="bg-white flex gap-x-5 items-center mt-3 p-1 rounded-[10px] w-[190px] ">
                <img src="~/assets/images/T1.png" alt="T1"/>
                <p>ใจดี มีชัย</p>
            </div>
        </div>

        <div class="flex justify-center relative mt-5">
            <div class="p-2 bg-[#FFFFFF] w-[530px] h-[530px] rounded-[30px] ">
                <div class="absolute left-1/2 transform -translate-x-1/2 -top-[60px]">
                    <img src="~/assets/images/T2.png" alt="T2"
                    class="w-[130px]"
                    />
                </div>

                <div class="flex justify-center mt-20">
                    <p class="mt-1 pr-5">ชื่อจริง</p>
                    <form>
                        <input 
                            type="text"
                            placeholder="ชื่อ"
                            class="pt-1 bg-[#DCF2F1] rounded-[10px] w-[300px] h-[35px] pl-5"
                        />
                    </form>
                </div>

                <div class="flex justify-center mt-7">
                    <p class="mt-1 pr-3">นามสกุล</p>
                    <form>
                        <input 
                            type="text"
                            placeholder="นามสกุล"
                            class="pt-1 bg-[#DCF2F1] rounded-[10px] w-[300px] h-[35px] pl-5"
                        />
                    </form>
                </div>

                <div class="flex justify-center mt-7">
                    <p class="mt-1 pr-6">วันเกิด</p>
                    <form>
                        <input 
                            type="date"
                            placeholder="วว/ดด/ปป"
                            class="pt-1 bg-[#DCF2F1] rounded-[10px] w-[300px] h-[35px] pl-5"
                        />
                    </form>
                </div>
                <div class="flex justify-center mt-7">
                    <p class="mt-1 pr-6">วันเกิด</p>
                    <form>
                        <input 
                            type=""
                            placeholder="วว/ดด/ปป"
                            class="pt-1 bg-[#DCF2F1] rounded-[10px] w-[300px] h-[35px] pl-5"
                        />
                    </form>
                </div>

                <div class="flex justify-center mt-7">
                    <p class="mt-1 pr-6">เบอร์</p>
                    <form>
                        <input 
                            type="text"
                            placeholder="เบอร์"
                            class="pt-1 bg-[#DCF2F1] rounded-[10px] w-[300px] h-[35px] pl-5"
                        />
                    </form>
                </div>

                <div class="flex justify-center mt-7">
                    <p class="mt-1 pr-5">ไอดีไลน์</p>
                    <form>
                        <input 
                            type="text"
                            placeholder="ไอดีไลน์"
                            class="pt-1 bg-[#DCF2F1] rounded-[10px] w-[300px] h-[35px] pl-5"
                        />
                    </form>
                </div>

                <div class="flex justify-center mt-7 gap-x-10">
                    <button class="p-1 bg-[#E5E5E5] w-[160px] h-[35px] rounded-[10px] font-bold">
                        ยกเลิก
                    </button>

                    <button class="p-1 bg-[#676B7D] w-[160px] h-[35px] rounded-[10px] text-white font-bold">
                        บันทึก
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>