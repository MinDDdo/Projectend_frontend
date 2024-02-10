<script setup lang="ts">
definePageMeta({
    middleware: ['auth']
});

const testAPI = async () => {
    const data = await useApi.classroomService.getAllClassroom('65c0f97b48f2c8d8846a2251');

    if (!data) {
        return navigateTo('/');
    }

    console.log(data);
}
</script>

<template>
    <div>
        <Navbar logo="Dashboard" />

        <button class="p-2 bg-blue-600 text-white" @click="testAPI">send API</button>
    </div>
</template>

<style scoped>

</style>