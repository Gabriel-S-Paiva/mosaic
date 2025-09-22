<script setup lang="ts">

</script>

<template>
  <div class="col-span-12 md:col-span-8 bg-white rounded-lg h-full">
    <header class="px-5 py-2 bg-primary rounded-t-lg">
      <h2 class="text-white text-xl font-bold font-['Switzer']">Usage Statistics</h2>
    </header>
    <main class="space-y-6 p-6 flex flex-col">
      <!-- Header -->
      <div class="border-b border-secondary border-opacity-20 pb-4">
        <h3 class="text-2xl font-semibold text-dark">Productivity Dashboard</h3>
        <p class="text-secondary mt-1">Track your progress and achievements</p>
      </div>
      
      <!-- Stats Grid -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Pomodoros Today -->
        <div class="bg-light rounded-md p-4 text-center">
          <div class="text-3xl font-bold text-primary mb-2">8</div>
          <div class="text-xs text-secondary uppercase tracking-wide">Pomodoros Today</div>
        </div>
        
        <!-- Tasks Completed -->
        <div class="bg-light rounded-md p-4 text-center">
          <div class="text-3xl font-bold text-primary mb-2">12</div>
          <div class="text-xs text-secondary uppercase tracking-wide">Tasks Done</div>
        </div>
        
        <!-- Focus Time -->
        <div class="bg-light rounded-md p-4 text-center">
          <div class="text-3xl font-bold text-primary mb-2">3.5h</div>
          <div class="text-xs text-secondary uppercase tracking-wide">Focus Time</div>
        </div>
        
        <!-- Current Streak -->
        <div class="bg-light rounded-md p-4 text-center">
          <div class="text-3xl font-bold text-primary mb-2">5</div>
          <div class="text-xs text-secondary uppercase tracking-wide">Day Streak</div>
        </div>
      </div>
      
      <!-- Weekly Progress -->
      <div class="space-y-4 flex-1">
        <h4 class="text-lg font-medium text-dark">Weekly Progress</h4>
        
        <!-- Pomodoro Progress -->
        <div class="bg-light rounded-md p-4 space-y-3">
          <div class="flex justify-between text-sm">
            <span class="text-secondary">Pomodoros Completed</span>
            <span class="text-dark font-medium">32/35</span>
          </div>
          <div class="w-full bg-secondary bg-opacity-20 rounded-full h-3">
            <div class="bg-primary h-3 rounded-full transition-all duration-300" style="width: 91%"></div>
          </div>
        </div>
        
        <!-- Task Progress -->
        <div class="bg-light rounded-md p-4 space-y-3">
          <div class="flex justify-between text-sm">
            <span class="text-secondary">Weekly Tasks</span>
            <span class="text-dark font-medium">18/20</span>
          </div>
          <div class="w-full bg-secondary bg-opacity-20 rounded-full h-3">
            <div class="bg-primary h-3 rounded-full transition-all duration-300" style="width: 90%"></div>
          </div>
        </div>
        
        <!-- Achievement Section -->
        <div class="bg-light rounded-md p-4">
          <h5 class="text-sm font-medium text-dark mb-3">Recent Achievements</h5>
          <div class="space-y-2">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">🏆</div>
              <span class="text-sm text-secondary">Completed 5-day streak</span>
            </div>
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">🎯</div>
              <span class="text-sm text-secondary">Focus master - 3+ hours daily</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Quick Actions -->
      <div class="grid grid-cols-3 gap-3 pt-4 mt-10 border-t border-secondary border-opacity-20">
        <button class="bg-primary hover:bg-primary hover:opacity-90 text-white text-sm font-medium py-3 px-4 rounded-md transition-all duration-200">
          Start Session
        </button>
        <button class="bg-secondary hover:bg-secondary hover:opacity-90 text-white text-sm font-medium py-3 px-4 rounded-md transition-all duration-200">
          Add Task
        </button>
        <button class="bg-dark hover:bg-dark hover:opacity-90 text-white text-sm font-medium py-3 px-4 rounded-md transition-all duration-200">
          View Report
        </button>
      </div>
    </main>
  </div>
</template>