<script setup lang="ts">

  import { ref, onMounted, watch} from 'vue';

  import Header from './components/Header.vue';
  import TaskInputContainer from './components/TaskInputContainer.vue';
  import TodoListContainer from './components/TodoListContainer.vue';
  import Modal from './components/Modal.vue';
  import NotificationContainer from './components/NotificationContainer.vue';

  
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
  const NOTIFICATION_POP_OUT_TIME:number = 5000;

  //reactive variables
  const tasks = ref<TaskObj[]>([]);
  const showModal = ref<boolean>(false);
  const taskToUpdate = ref<TaskObj>({} as TaskObj);
  const notificationMessages = ref<MessageObj[]>([]);


  // get the savedTasks from localStorage at onMounted lifecycle hook.
  onMounted(():void => {
    const savedTasks:string | null = localStorage.getItem('tasks');
    if(savedTasks) {
      tasks.value = JSON.parse(savedTasks);
    }
  });


  // notification message handler
  const showNotification = (message :string):void => {
    notificationMessages.value.push({id: Date.now(), text: message});
    
    setTimeout(():void => {
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


  // edit-task emit handler
  const getTaskToUpdate = (emittedTask: TaskObj): void => {

    // change the isEditMode value of orignal task object.
    emittedTask.isEditMode = true;

    // update the reactive variables
    taskToUpdate.value = emittedTask;
    showModal.value = true;
  }


  // delete-task emit handler
  const getTaskToDelete = (index: number): void => {
    tasks.value.splice(index, 1);
    showNotification('Task Deleted Successfully');
  }


  // close-modal emit handler
  const closeModal = (): void => {
    showModal.value = false;
  }


  // watch() updates the localStorage when tasks array changes.
  watch(tasks, (updatedTasks: TaskObj[]) => {
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }, { deep: true });

</script>


<template>
  <Header/>
  <TaskInputContainer @add-new-task="addTaskToArray"/>
  <TodoListContainer
    :tasks="tasks"
    @edit-task="getTaskToUpdate"
    @delete-task="getTaskToDelete"
    />
  <Modal
      v-if="showModal"
      :taskToUpdate="taskToUpdate"
      @close-modal="closeModal"
      @show-notification="showNotification"
    />
  <NotificationContainer
      v-if="notificationMessages.length > 0"
      :notificationMessages
    />
</template>