<script setup>

  import { ref, onMounted, watch} from 'vue';

  import Header from './components/Header.vue';
  import TaskInputContainer from './components/TaskInputContainer.vue';
  import TodoListContainer from './components/TodoListContainer.vue';
  import Modal from './components/Modal.vue';
  import NotificationContainer from './components/NotificationContainer.vue';

  //reactive variables
  const tasks = ref([]);
  const showModal = ref(false);
  const taskToUpdate = ref({});
  const notificationMessages = ref([]);


  // get the savedTasks from localStorage at onMounted lifecycle hook.
  onMounted(() => {
    const savedTasks = localStorage.getItem('tasks');
    if(savedTasks) {
      tasks.value = JSON.parse(savedTasks);
    }
  });


  // notification message handler
  const showNotification = (message) => {
    notificationMessages.value.push({id: Date.now(), text: message});

    setTimeout(() => {
      notificationMessages.value.shift();
    }, 5000);
  };


  // add task to tasks array
  const addTaskToArray = (newtask) => {
    const newTask = {
      taskId: Date.now(),
      taskName: newtask,
      isEditMode: false
    }
    tasks.value.push(newTask);
    showNotification('Task Added Successfully');
  }


  // edit-task emit handler
  const getTaskToUpdate = (emittedTask) => {

    // change the isEditMode value of orignal task object.
    emittedTask.isEditMode = true;

    // update the reactive variables
    taskToUpdate.value = emittedTask;
    showModal.value = true;
  }


  // delete-task emit handler
  const getTaskToDelete = (index) => {
    tasks.value.splice(index, 1);
    showNotification('Task Deleted Successfully');
  }


  // close-modal emit handler
  const closeModal = () => {
    showModal.value = false;
  }


  // watch() updates the localStorage when tasks array changes.
  watch(tasks, (updatedTasks) => {
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