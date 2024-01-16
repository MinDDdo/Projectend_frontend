<script lang="ts" setup>
const name = "mind";
const fruit = [ 'apple','banana','melon']
</script>



<template>
  <div class="text-red-500">
    Hello World{{ name }}
    <div v-for="item of fruit">{{ item }}</div>
  </div>
</template>
