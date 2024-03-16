<script setup lang="ts">
    import { filename } from 'pathe/utils';

    defineProps<{
        image: string;
        name: string;
    }>();

    const glob: Record<string, any> = import.meta.glob('~/assets/images/avatarTeacher/*.png', { eager: true });
    const images = Object.fromEntries(
        Object.entries(glob).map(([key, value]) => [filename(key), value.default])
    );
</script>

<template>
    <NuxtLink to="/teacher/profile"  class="bg-white flex gap-x-5 items-center mt-3 p-2 rounded-[10px] w-[190px]">
        <img 
            v-if="image !== ''"
            :src="images[`${image}`]" 
            alt="Teacher profile"
            draggable="false"
            class="w-[35px] h-auto rounded-md"
        />

        <img 
            v-if="image === ''"
            src="~/assets/images/avatarstudent/unknow-avatar.png"
            alt="profile" 
            draggable="false"
            class="w-[35px] h-auto rounded-md" 
        />

        <p class="font-medium">{{ name }}</p>
    </NuxtLink>
</template>


<style scoped>

</style>