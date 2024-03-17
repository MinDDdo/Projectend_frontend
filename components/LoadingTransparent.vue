<template>
    <div class="fixed top-0 left-0 min-h-screen w-full bg-black bg-opacity-50 z-[99999999]">
        <div class="flex justify-center items-center h-screen">
            <div class="loader"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.loader {
  width: 50px;
  padding: 8px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #475A7D;
  --_m: 
    conic-gradient(#0000 10%,#000),
    linear-gradient(#000 0 0) content-box;
  -webkit-mask: var(--_m);
          mask: var(--_m);
  -webkit-mask-composite: source-out;
          mask-composite: subtract;
  animation: l3 1s infinite linear;
}
@keyframes l3 {to{transform: rotate(1turn)}}
</style>