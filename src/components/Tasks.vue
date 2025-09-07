<script setup lang="ts">
import { ref } from 'vue'
import Modal from './Modal.vue'

const settingsModal = ref(false)
const addTaskModal = ref(false)
const tasks = ref([
  {
    title: 'Task 1',
    description:'Make tasks work',
    finished:false,
    time:1,
    estimatedTime:4
  },
  {
    title: 'Task 2',
    description:'Make tasks work',
    finished:false,
    time:1,
    estimatedTime:4
  },
  {
    title: 'Task 3',
    description:'Make tasks work',
    finished:false,
    time:1,
    estimatedTime:4
  }
])
let newTask = ref({
  title:'',
  description:'',
  finished:false,
  time:0,
  estimatedTime:1
})
const openSettings = () => {
  settingsModal.value = true;
}
const openAddTask = () => {
  addTaskModal.value = true;
}
const addTask = () => {
  tasks.value.push({ ...newTask.value })
  newTask.value = {
    title:'',
    description:'',
    finished:false,
    time:0,
    estimatedTime:1
  }
  addTaskModal.value = false
}
const cancelTask = () => {
  newTask.value = {
    title:'',
    description:'',
    finished:false,
    time:0,
    estimatedTime:1
  }
  addTaskModal.value = false
}
</script>
<template>
  <div class="px-5 py-2 bg-primary rounded-t-lg flex justify-between">
    <h2 class=" text-white text-xl font-bold font-['Switzer']">
        Tasks
    </h2>
    <div class="flex gap-4">
        <button @click="openSettings">
            <span class="material-symbols-outlined text-white">settings</span>
        </button>
    </div>
  </div>
  <div class="px-5 py-2">
    <div v-if="tasks.length > 0" class="mb-4">
      <h3 class="text-lg font-bold font-['Switzer'] text-primary py-1">
        {{ tasks[0].title }}
      </h3>
      <p class="text-sm font-normal font-['Switzer'] text-gray-600">
        {{ tasks[0].description }}
      </p>
      <div class="pt-5 relative">
        <!-- Progress Bar -->
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div
            class="bg-primary h-2 rounded-full"
            :style="{ width: `${(tasks[0].time / tasks[0].estimatedTime) * 100}%` }"
          ></div>
        </div>
        <p class="text-sm text-gray-500 mt-1">
          {{ tasks[0].time }} / {{ tasks[0].estimatedTime }} Pomodoros completed
        </p>
      </div>
    </div>

    <!-- No Tasks Message -->
    <div v-else class="text-center text-gray-500">
      <p>No tasks available. Add a new task to get started!</p>
    </div>

    <!-- Task List -->
    <div class="mb-4">
      <h4 class="text-base font-bold font-['Switzer'] text-primary mb-2">Task List</h4>
      <ul class="space-y-2">
        <li
          v-for="(task, index) in tasks"
          :key="index"
          class="p-3 bg-white rounded shadow hover:bg-gray-100 cursor-pointer"
        >
          <h5 class="text-sm font-bold font-['Switzer'] text-primary">
            {{ task.title }}
          </h5>
          <p class="text-xs text-gray-500">
            {{ task.description }}
          </p>
        </li>
      </ul>
    </div>
    <button class="w-full h-10 mb-2 rounded bg-primary text-white text-base font-bold font-['Switzer']" @click="openAddTask">+Add Task</button>
  </div>
  <Modal v-if="settingsModal" :title="'Tasks'" @close="settingsModal = false">

  </Modal>
  <Modal v-if="addTaskModal" :title="'Task'" @close="addTaskModal = false">
        <form class="flex flex-col gap-4 p-4">
      <div class="flex flex-col gap-1">
        <label for="title" class="text-sm font-bold text-primary font-['Switzer']">Title:</label>
        <input
          id="title"
          type="text"
          v-model="newTask.title"
          class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter task title"
        />
      </div>
      <div class="flex flex-col gap-1">
        <label for="description" class="text-sm font-bold text-primary font-['Switzer']">Description:</label>
        <input
          id="description"
          type="text"
          v-model="newTask.description"
          class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter task description"
        />
      </div>
      <div class="flex flex-col gap-1">
        <label for="time" class="text-sm font-bold text-primary font-['Switzer']">Expected duration (Pomodoros):</label>
        <input
          id="time"
          type="number"
          v-model="newTask.estimatedTime"
          class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter estimated time"
        />
      </div>
      <div class="flex justify-end gap-4">
        <button
          type="button"
          class="px-4 py-2 text-sm font-bold text-white bg-gray-400 rounded hover:bg-gray-500"
          @click="cancelTask"
        >
          Cancel
        </button>
        <button
          type="button"
          class="px-4 py-2 text-sm font-bold text-white bg-primary rounded"
          @click="addTask"
        >
          Save Task
        </button>
      </div>
    </form>
  </Modal>
</template>