<script setup>

  import { ref, onMounted, watch} from 'vue';

  import Header from './components/Header.vue';
  import TaskInputContainer from './components/TaskInputContainer.vue';
  import TodoListContainer from './components/TodoListContainer.vue';
  import Modal from './components/Modal.vue';

  //reactive variables
  const tasks = ref([]);
  const showModal = ref(false);
  const taskToUpdate = ref({});


  // get the savedTasks from localStorage at onMounted lifecycle hook.
  onMounted(() => {
    const savedTasks = localStorage.getItem('tasks');
    if(savedTasks) {
      tasks.value = JSON.parse(savedTasks);
    }
  });


  // add task to tasks array
  const addTaskToArray = (newtask) => {
    const newTask = {
      taskId: Date.now(),
      taskName: newtask,
      isEditMode: false
    }
    tasks.value.push(newTask);
  }


  // edit-task emit handler
  const getTaskToUpdate = (emittedTask) => {

    // change the isEditMode value of orignal task object.
    emittedTask.isEditMode = true;

    // update the reactive variables
    taskToUpdate.value = emittedTask;
    showModal.value = true;
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
    />
  <Modal 
      :taskToUpdate="taskToUpdate"
      :showModal="showModal"
      @close-modal="showModal = false"
    />
</template>