<script lang="ts" setup>
// External variables

// ↓↓↓ External variables
const $props = defineProps({
  type: {
    type: String as () => "button" | "submit" | "reset",
    default: "button",
  },
  variant: {
    type: String as () => "primary" | "secondary" | "outlined",
    default: "primary",
  },
  size: {
    type: String as () => "sm" | "md" | "lg",
    default: "md",
  },
});
const $emit = defineEmits();

// ↓↓↓ Other variables
</script>

<template>
  <button
    class="btn"
    :class="`btn-${variant}`"
    :type="$props.type"
    :style="`font-size: ${
      $props.size === 'sm' ? '12px' : $props.size === 'md' ? '14px' : '21px'
    };padding: ${
      $props.size === 'sm'
        ? '4px 8px'
        : $props.size === 'md'
        ? '8px 16px'
        : '12px 24px'
    };`"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &-primary {
    background-color: var(--primary-color, #007bff);
    color: white;
  }

  &-secondary {
    background-color: var(--secondary-color, #6c757d);
    color: white;
  }

  &-outlined {
    background-color: transparent;
    border: 1px solid #6c757d;
    color: #6c757d;
  }

  &-error {
    background-color: #dc3545 !important;
    color: white;
    border: none;
  }
}
</style>
