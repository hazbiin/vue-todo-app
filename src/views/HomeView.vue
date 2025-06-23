<script setup lang="ts">
  import { ref, onMounted, watch} from 'vue';

  import TaskInputContainer from '@/components/TaskInputContainer.vue';
  import TodoListContainer from '@/components/TodoListContainer.vue';
  import Modal from '@/components/Modal.vue';
  import NotificationContainer from '@/components/NotificationContainer.vue';

  
  // defined types
  type TaskObj = {
    taskId: number;
    taskName: string;
    isEditMode: boolean;
  }
  type MessageObj = {
    id:number;
    text: string;
  }

  // constants
  const NOTIFICATION_POP_OUT_TIME = 5000;

  //reactive variables
  const tasks = ref<TaskObj[]>([]);
  const notificationMessages = ref<MessageObj[]>([]);

  // get the savedTasks from localStorage at onMounted lifecycle hook.
  onMounted(() => {
    const savedTasks:string | null = localStorage.getItem('tasks');
    if(savedTasks) {
      tasks.value = JSON.parse(savedTasks);
    }
  });

  // notification message handler
  const showNotification = (message :string):void => {
    notificationMessages.value.push({id: Date.now(), text: message});
    
    setTimeout(() => {
      notificationMessages.value.shift();
    }, NOTIFICATION_POP_OUT_TIME);
  };

  // add task to tasks array
  const addTaskToArray = (newtask:string ): void => {
    const newTask: TaskObj = {
      taskId: Date.now(),
      taskName: newtask,
      isEditMode: false
    }
    tasks.value.push(newTask);
    showNotification('Task Added Successfully');
  }

  // delete-task emit handler
  const getTaskToDelete = (index: number): void => {
    tasks.value.splice(index, 1);
    showNotification('Task Deleted Successfully');
  }

  // watch() updates the localStorage when tasks array changes.
  watch(tasks, (updatedTasks: TaskObj[]) => {
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }, { deep: true });

</script>

<template>
  <TaskInputContainer @add-new-task="addTaskToArray"/>
  <TodoListContainer
    :tasks="tasks"
    @delete-task="getTaskToDelete"
    />
  <NotificationContainer
      v-if="notificationMessages.length > 0"
      :notificationMessages
    />
</template>