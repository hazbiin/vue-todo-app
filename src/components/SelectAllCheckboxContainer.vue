<script setup lang="ts">
    import { defineEmits } from 'vue';
    
    const props = defineProps<{
        isAllChecked: boolean;
    }>();

    const emits = defineEmits<{
        (e: 'all-select', value: boolean): void;
    }>();

    const handleChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        emits('all-select', target.checked);
    }
</script>

<template>
    <div class="select-all-container">
        <div class="select-all-container-contents">
            <input type="checkbox" id="select-all-checkbox" @change="handleChange" :checked="isAllChecked"/>
            <label for="select-all-checkbox">0 completed</label>
        </div>
    </div>
</template>

<style scoped>
.select-all-container{
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    padding: 18px;
    border-radius: 15px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}
.select-all-container-contents{
    padding: 14px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 15px;
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    backdrop-filter: blur(10px);
    font-size: 17px;
    display: flex;
    align-items: center;
    gap: 10px;
}
</style>