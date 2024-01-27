<script setup lang="ts">
interface InputProps {
    modelValue: string;
    type: string;
    placeholder?: string;
}

defineProps<InputProps>();

const emit = defineEmits<{
    'update:modelValue': [value: string],
}>();

const handleInput = (event: Event) => {
  if (event.target instanceof HTMLInputElement) {
    emit('update:modelValue', event.target.value);
  }
}
</script>

<template>
    <input
        :value="modelValue"
        @input="handleInput"
        class="p-2 px-5 rounded-xl border" 
        :type="type" 
        :placeholder="placeholder" 
    />
</template>

<style scoped>

</style>