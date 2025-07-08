<script setup lang="ts">
    import { defineProps, defineEmits } from 'vue';
    import type { ConfirmCheckedButtonType } from '@/types';

    const props = defineProps<ConfirmCheckedButtonType>();

    const emits = defineEmits<{
        (e: 'confirm-checked-state'): void
    }>();

</script>

<template>
    <button :disabled="disabled" @click="emits('confirm-checked-state')" class="confirm-button">
        <slot></slot>
    </button>
</template>

<style scoped>
    .confirm-button{
        margin-top: 15px;
        padding: 10px 13px;
        background:#552275c0 ;
        opacity: 0.9;
        color: white;
        border-radius: 12px;
        font-size: 14px;
        font-weight: bold;
        letter-spacing: 1px;
        box-shadow: 0 1px 10px rgba(255, 255, 255, 0.2);
    }
    .confirm-button:active {
        transform: scale(0.99);
    }
    .confirm-button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
</style>