<script setup lang="ts">
import { ref } from 'vue'
import Modal from './Modal.vue'

const settingsModal = ref(false)
const addTaskModal = ref(false)
const tasks = [
  {
    title: 'Task 1',
    description:'Make tasks work',
    finished:false,
    time:1,
    estimatedTime:4
  },
  {
    title: 'Task 2',
    description:String,
    finished:Boolean,
    time:Number,
    investedTime:Number
  },
  {
    title: 'Task 3',
    description:String,
    finished:Boolean,
    time:Number,
    investedTime:Number
  }
]
const newTask = {
  title:null,
  description:null,
  finished:false,
  time:0,
  estimatedTime:1
}
const openSettings = () => {
  settingsModal.value = true;
}
const openAddTask = () => {
  addTaskModal.value = true;
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
    <h3 class="text-base font-bold font-['Switzer'] py-1">
      {{ tasks[0].title }}
    </h3>
    <p class="text-sm font-normal font-['Switzer']">
      {{ tasks[0].description }}
    </p>
    <div class="p-5 relative">
      <!--  Progress Bar -->
    </div>
    <div>
        <ul>
          <li  v-for="task in tasks">
            {{ task.title }}
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
        <label for="time" class="text-sm font-bold text-primary font-['Switzer']">Expected Duration (hours):</label>
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
          @click="$emit('close')"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="px-4 py-2 text-sm font-bold text-white bg-primary rounded"
        >
          Save Task
        </button>
      </div>
    </form>
  </Modal>
</template>