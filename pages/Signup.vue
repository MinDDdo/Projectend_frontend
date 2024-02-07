<script >
</script>

<template>
    <div class="h-screen bg-[#EEF5FF]">
        <div class="flex justify-between items-center px-10 pt-4">
            <div class="">
                <img src="~/assets/images/logo.png" alt="logo" />
            </div>
            <div class="flex gap-x-6 ">
                <p>เกี่ยวกับเรา</p>
                <div class="flex  gap-x-1">
                    <p>เข้าสู่ระบบ</p>
                    <img src="~/assets/images/logologin.png" alt="logologin"  width="25" height="25"/>
                 </div>
            </div>
        </div>

        <div class="mt-10 flex justify-center">
            <div class="bg-white min-w-[550px] max-w-[550px] min-h-[560px] max-h-[560px] rounded-[40px] p-10">
                <h1 class="text-[24px] text-center">ลงทะเบียน</h1>
                <p class="mt-4 text-center">กรอกรายละเอียดของคุณเพื่อลงทะเบียน</p>

                <form class="flex flex-col mt-8 gap-y-7">
                    <input 
                        type="text" 
                        placeholder="อีเมล" 
                        class="p-2 px-5 rounded-xl  bg-[#DCF2F1]" 
                    />
                    <div class="flex justify-between">
                        <input 
                        type="text" 
                        placeholder="ชื่อจริง" 
                        class="p-2 px-5 rounded-xl bg-[#DCF2F1]" 
                        />

                         <input 
                        type="text" 
                        placeholder="นามสกุล" 
                        class="p-2 px-5 rounded-xl bg-[#DCF2F1]" 
                        />

                    </div>
                   
                    <input 
                        type="password" 
                        placeholder="รหัสผ่าน" 
                        class="p-2 px-5 rounded-xl bg-[#DCF2F1]" 
                    />
                    <input 
                        type="password" 
                        placeholder="ยืนยันรหัสผ่าน" 
                        class="p-2 px-5 rounded-xl bg-[#DCF2F1]" 
                    />
                    <button type="submit" class="p-2 text-white font-bold bg-[#676B7D] rounded-xl">ลงทะเบียน</button>
                </form>

                
            </div>
        </div>
    </div>
</template>