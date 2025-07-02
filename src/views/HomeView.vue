<script setup lang="ts">

  import TaskInputContainer from '@/components/TaskInputContainer.vue';
  import TodoListContainer from '@/components/TodoListContainer.vue';
  import NotificationContainer from '@/components/NotificationContainer.vue';
  import useNotification from '@/composables/useNotification';

  // composable variables
  const { notificationMessages } = useNotification();

</script>

<template>
  <TaskInputContainer/>
  <TodoListContainer/>
  <NotificationContainer
      v-if="notificationMessages.length > 0"
      :notificationMessages
    />
</template>
