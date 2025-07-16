<script setup lang="ts">
    import { defineProps, defineEmits } from 'vue';

    import type { DirtyCheckButtonType } from '@/types';

    const props = defineProps<DirtyCheckButtonType>();
    const emits = defineEmits<{
        (e: 'button-click'):void
    }>();
</script>

<template>
    <button :disabled="isDisabled" @click="emits('button-click')" class="confirm-button">
        <slot></slot>
    </button>
</template>

<style scoped>
    .confirm-button{
        margin-top: 15px;
        padding: 12px 15px;
        background:#552275c0 ;
        opacity: 0.9;
        color: white;
        border-radius: 12px;
        font-size: 16px;
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