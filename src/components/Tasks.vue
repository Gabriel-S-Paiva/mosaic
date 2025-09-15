<script setup lang="ts">
// Imports of Components and vue built in function
import { ref, onMounted } from 'vue'
import Modal from './Modal.vue'

// Declaration of typescripts interfaces
interface Task {
  id: number;
  title: string;
  description: string;
  finished:boolean;
  time: number;
  estimatedTime: number;
}

// Declaration of variables w/placholder data
const settingsModal = ref(false)
const addTaskModal = ref(false)
const editTaskModal = ref(false)
const currentTask = ref<Task>({
  id: 0,
  title:'No Task Found',
  description:'This is just a placholder. Lets create a new task',
  finished:false,
  time:0,
  estimatedTime:1
})
const tasks = ref([
  {
    id: 1,
    title: 'Task 1',
    description:'Make tasks work',
    finished:true,
    time:1,
    estimatedTime:4
  },
  {
    id: 2,
    title: 'Task 2',
    description:'Improve tasks functionality',
    finished:false,
    time:1,
    estimatedTime:4
  },
  {
    id: 3,
    title: 'Task 3',
    description:'Make tasks work',
    finished:false,
    time:2,
    estimatedTime:6
  }
] as Task[])
const taskToEdit = ref<Task >({
  id: -1,
  title:'',
  description:'',
  finished:false,
  time:0,
  estimatedTime:1
});

// Declaration of functions
const openSettings = () => {
  settingsModal.value = true;
}
const openAddTask = () => {
  addTaskModal.value = true;
}
const openEditTask = (task: Task) => {
  taskToEdit.value = {...task}
  editTaskModal.value = true;
}
const selectTask = (task: Task) => {
  currentTask.value = task;
}
const getNextId = () => {
  return tasks.value.length > 0 ?
  Math.max(...tasks.value.map((task) => task.id)) :
  1;
}
// Exception because the function needs to be declared first for this to work
const newTask = ref<Task>({
  id: getNextId(),
  title:'',
  description:'',
  finished:false,
  time:0,
  estimatedTime:1
} as Task)
const getNextTask = () => {
  currentTask.value = tasks.value.find(task => !task.finished) || {
    id: 0,
    title: 'No Task Found',
    description: 'This is just a placeholder. Lets create a new task.',
    finished: false,
    time: 0,
    estimatedTime: 1,
  }
}
const addTask = () => {
  tasks.value.push({ ...newTask.value })
  newTask.value = {
    id: getNextId(),
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
    id: 0,
    title:'',
    description:'',
    finished:false,
    time:0,
    estimatedTime:1
  }
  addTaskModal.value = false
}
const completeTask = (task: Task) => {
  const index = tasks.value.findIndex(t => t.id == task.id)
  if(index!==-1){
    tasks.value[index].finished = true;
  }
  getNextTask();
}
const deleteTask = (task: Task) => {
  const index = tasks.value.findIndex(t => t.id == task.id)
  if(index!==-1){
    tasks.value.splice(index,1)
  }
  getNextTask();
}
const editTask = (updatedTask:Task) => {
  const index = tasks.value.findIndex(t => t.id == updatedTask.id)
  if(index!==-1){
    tasks.value.splice(index,1, updatedTask)
  }
  editTaskModal.value = false;
}
const pomodoroCompleted = () => {
  currentTask.value.time++;
}
defineExpose({pomodoroCompleted})
// Run only at the start
onMounted(() => {
  getNextTask();
})
</script>
<template>
  <div class="px-5 py-2 bg-primary rounded-t-lg flex justify-between">
    <h2 class=" text-white text-xl font-bold font-['Switzer']">
        Tasks
    </h2>
    <div class="flex gap-4">
        <button @click="openSettings" clasS="flex items-center justify-center">
            <span class="material-symbols-outlined text-white">apps</span>
        </button>
    </div>
  </div>
  <div class="px-5 py-2">
<div v-if="tasks.length > 0" class="mb-4">
  <h3 class="text-lg font-bold font-['Switzer'] text-primary py-1">
    {{ currentTask.title }}
  </h3>
  <p class="text-sm font-normal font-['Switzer'] text-gray-600">
    {{ currentTask.description }}
  </p>
  <div class="pt-5 relative">
    <!-- Progress Bar -->
    <div class="w-full bg-gray-200 rounded-full h-2">
      <div
        class="bg-primary h-2 rounded-full"
        :style="{ width: `${Math.min((currentTask.time / currentTask.estimatedTime) * 100, 100)}%` }"
      ></div>
    </div>
    <p class="text-sm text-gray-500 mt-1">
      {{ currentTask.time }} / {{ currentTask.estimatedTime }} Pomodoros completed
    </p>
  </div>
  <div class="flex justify-end gap-4 mt-4">
    <button
      class="p-2 w-full border rounded-xl border-primary flex items-center justify-center"
      @click="completeTask(currentTask)"
      aria-label="Complete Task"
    >
      <span class="material-symbols-outlined text-primary hover:text-green-600 text-lg">check_circle</span>
    </button>
    <button
      class="p-2 w-full border rounded-xl border-red-500 flex items-center justify-center"
      @click="deleteTask(currentTask)"
      aria-label="Delete Task"
    >
      <span class="material-symbols-outlined text-red-500 hover:text-red-600 text-lg">delete</span>
    </button>
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
          v-for="(task, index) in tasks.filter(t => !t.finished)"
          :key="index"
          class="p-3 bg-white rounded shadow hover:bg-gray-100 cursor-pointer flex justify-between items-center"
        >
          <!-- Task Details -->
          <div class="flex-1" @click="selectTask(task)">
            <h5 class="text-sm font-bold font-['Switzer'] text-primary">
              {{ task.title }}
            </h5>
            <p class="text-xs text-gray-500">
              {{ task.description }}
            </p>
          </div>
        </li>
      </ul>
    </div>
    <button class="w-full h-10 mb-2 rounded bg-primary text-white text-base font-bold font-['Switzer']" @click="openAddTask">+Add Task</button>
  </div>
  <Modal v-if="settingsModal" :title="'Task Manager'" @close="settingsModal = false">
    <div class="flex flex-col gap-4 p-4">
    <!-- Statistics Section -->
    <div class="bg-gray-100 p-4 rounded-lg shadow">
      <h3 class="text-lg font-bold font-['Switzer'] text-primary mb-2">Statistics</h3>
      <p class="text-sm text-gray-600">Total Tasks: {{ tasks.length }}</p>
      <p class="text-sm text-gray-600">Completed Tasks: {{ tasks.filter(task => task.finished).length }}</p>
      <p class="text-sm text-gray-600">In Progress: {{ tasks.filter(task => !task.finished).length }}</p>
    </div>

    <!-- Tasks in Progress Section -->
    <div class="bg-gray-100 p-4 rounded-lg shadow">
      <h3 class="text-lg font-bold font-['Switzer'] text-primary mb-2">Tasks in Progress</h3>
      <ul class="space-y-2">
        <li
          v-for="(task, index) in tasks.filter(task => !task.finished)"
          :key="index"
          class="p-3 bg-white rounded shadow flex justify-between items-center"
        >
          <div>
            <h5 class="text-sm font-bold font-['Switzer'] text-primary">{{ task.title }}</h5>
            <p class="text-xs text-gray-500">{{ task.description }}</p>
          </div>
          <div class="flex gap-2">
            <button
              class="p-2 border rounded-full border-blue-500 flex items-center justify-center"
              @click="openEditTask(task)"
              aria-label="Edit Task"
            >
              <span class="material-symbols-outlined text-blue-500 hover:text-blue-600 text-lg">edit</span>
            </button>
            <button
              class="p-2 border rounded-full border-red-500 flex items-center justify-center"
              @click="deleteTask(task)"
              aria-label="Delete Task"
            >
              <span class="material-symbols-outlined text-red-500 hover:text-red-600 text-lg">delete</span>
            </button>
          </div>
        </li>
      </ul>
    </div>

    <!-- Completed Tasks Section -->
    <div class="bg-gray-100 p-4 rounded-lg shadow">
      <h3 class="text-lg font-bold font-['Switzer'] text-primary mb-2">Completed Tasks</h3>
      <ul class="space-y-2">
        <li
          v-for="(task, index) in tasks.filter(task => task.finished)"
          :key="index"
          class="p-3 bg-white rounded shadow flex justify-between items-center"
        >
          <div>
            <h5 class="text-sm font-bold font-['Switzer'] text-primary">{{ task.title }}</h5>
            <p class="text-xs text-gray-500">{{ task.description }}</p>
          </div>
          <div class="flex gap-2">
            <button
              class="p-2 border rounded-full border-red-500 flex items-center justify-center"
              @click="deleteTask(task)"
              aria-label="Delete Task"
            >
              <span class="material-symbols-outlined text-red-500 hover:text-red-600 text-lg">delete</span>
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
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
  <Modal v-if="editTaskModal" :title="'Edit Task'" @close="editTaskModal = false">
      <form class="flex flex-col gap-4 p-4">
        <!-- Title Input -->
        <div class="flex flex-col gap-1">
          <label for="edit-title" class="text-sm font-bold text-primary font-['Switzer']">Title:</label>
          <input
            id="edit-title"
            type="text"
            v-model="taskToEdit.title"
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter task title"
          />
        </div>

        <!-- Description Input -->
        <div class="flex flex-col gap-1">
          <label for="edit-description" class="text-sm font-bold text-primary font-['Switzer']">Description:</label>
          <input
            id="edit-description"
            type="text"
            v-model="taskToEdit.description"
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter task description"
          />
        </div>

        <!-- Estimated Time Input -->
        <div class="flex flex-col gap-1">
          <label for="edit-time" class="text-sm font-bold text-primary font-['Switzer']">Expected duration (Pomodoros):</label>
          <input
            id="edit-time"
            type="number"
            v-model="taskToEdit.estimatedTime"
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter estimated time"
          />
        </div>

        <!-- Modal Buttons -->
        <div class="flex justify-end gap-4">
          <button
            type="button"
            class="px-4 py-2 text-sm font-bold text-white bg-gray-400 rounded hover:bg-gray-500"
            @click="editTaskModal = false"
          >
            Cancel
          </button>
          <button
            type="button"
            class="px-4 py-2 text-sm font-bold text-white bg-primary rounded"
            @click="editTask(taskToEdit)"
          >
            Save Changes
          </button>
        </div>
      </form>
  </Modal>
</template>