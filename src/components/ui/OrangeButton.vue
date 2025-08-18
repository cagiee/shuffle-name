<script lang="ts" setup>
// ↓↓↓ External variables
const $props = defineProps();
const $emit = defineEmits();

// ↓↓↓ Other variables
</script>

<template>
  <button><slot /></button>
</template>

<style lang="scss" scoped>
button {
  font-family: "montserrat";
  font-size: 2em;
  padding: 6px 48px;
  text-transform: uppercase;
  font-weight: 900;
  color: #8d0602;
  background-color: #ffb32e;
  border: 5.6px solid #8d0602;
  border-radius: 999px;
  box-shadow: 0 0 32px #ffb32e77;
  cursor: pointer;
}
</style>
