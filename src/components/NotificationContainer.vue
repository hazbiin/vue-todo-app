<script setup lang="ts">
   
   import { defineProps } from 'vue';

    type Props = {
        notificationMessages: {id: number, text: string}[]
    }
    const props = defineProps<Props>();

</script>

<template>
    <TransitionGroup tag="ul" name="notification-list" class="notification-container" >
        <li v-for="message in notificationMessages" :key="message.id" class="notification">
            {{ message.text }}
        </li>
    </TransitionGroup>
</template>

<style scoped>
    .notification-container{
        position: fixed;
        bottom: 20px;
        right:  20px;
        display: flex;
        flex-direction: column-reverse;
        align-items: center;
        gap: 10px;
        width: 400px;
        overflow-y: scroll;
        height: 100vh;
    }
    .notification-container::-webkit-scrollbar{
        display: none;
    }
    .notification{
        width: 100%;
        text-align: center;
        font-weight: bold;
        font-size: 17px;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(20px);
        padding: 18px;
        border-radius: 15px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }
    .notification-list-enter-active,
    .notification-list-leave-active {
        transition: all 0.5s ease;
    }
    .notification-list-enter-from,
    .notification-list-leave-to {
        opacity: 0;
        transform: translateX(30px);
    }
</style>