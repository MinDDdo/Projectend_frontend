<template>
    <div class="flex justify-between p-5">
        <h1 class="font-bold">{{ logo }}</h1>

        <ul class="flex gap-x-10">
            <li>เกี่ยวกับเรา</li>
            <li>เข้าสู่ระบบ</li>
        </ul>
    </div>
</template>

<script setup lang="ts">
interface NavbarProps {
    logo: string;
}

defineProps<NavbarProps>();
</script>

<style scoped>

</style>