<script setup lang="ts">
interface ModalProps {
    show: boolean;
    title: string;
}

defineProps<ModalProps>();

const emit = defineEmits<{
    'update:show': [value: boolean];
    'onConfirm': []
}>();

const onClose = () => {
    emit('update:show', false);
}

const onConfirm = () => {
    emit('onConfirm');
}
</script>

<template> 
    <div 
        class="fixed bg-gray-400 bg-opacity-50 h-screen w-full z-[99999] top-0 right-0 left-0" 
        @click="onClose"
        v-if="show"
    >
    </div>

    <div 
        class="fixed bg-white rounded-md  min-w-[400px] min-h-[150px] z-[999999] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-8 py-5" 
        @click="onClose"
        v-if="show"
    >
        <div class="text-lg">ต้องการที่จะลบ{{title}}นี้หรือไม่?</div>

        <div class="flex justify-center gap-x-5 items-center mt-8">
            <button
                type="button" 
                class="bg-gray-100 text-black border-none px-2 py-2 rounded-md w-[120px]"
                @click="onClose"
            >
                ยกเลิก
            </button>

            <button
                type="button" 
                class="bg-[#7071E8] text-white border-none px-2 py-2 rounded-md w-[120px]"
                @click="onConfirm"
            >
                ยืนยัน
            </button>
        </div>
    </div>
</template>
