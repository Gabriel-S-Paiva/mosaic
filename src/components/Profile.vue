<script setup lang="ts">

</script>

<template>
  <div class="col-span-12 md:col-span-4 bg-white rounded-lg h-200">
    <header class="px-5 py-2 bg-primary rounded-t-lg">
      <h2 class="text-white text-xl font-bold font-['Switzer']">Profile</h2>
    </header>
    <main class="flex flex-col items-center p-6 space-y-6">
      <!-- Profile Picture -->
      <div class="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white text-3xl font-bold mt-8">
        JD
      </div>
      
      <!-- User Info -->
      <div class="text-center">
        <h2 class="text-2xl font-semibold text-dark">John Doe</h2>
        <p class="text-secondary mt-1">Productivity Expert</p>
      </div>
      
      <!-- User Stats -->
      <div class="w-full space-y-6 flex-1">
        <div class="bg-light rounded-md p-4">
          <p class="text-xs text-secondary uppercase tracking-wide text-center">Member Since</p>
          <p class="text-lg font-medium text-dark text-center mt-1">January 2024</p>
        </div>
        
        <div class="bg-light rounded-md p-4">
          <p class="text-xs text-secondary uppercase tracking-wide text-center">Current Status</p>
          <div class="flex justify-center mt-2">
            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary text-white">
              Active
            </span>
          </div>
        </div>
        
        <div class="bg-light rounded-md p-4">
          <p class="text-xs text-secondary uppercase tracking-wide text-center">Productivity Level</p>
          <div class="flex items-center justify-center mt-3">
            <div class="flex space-x-2">
              <div class="w-3 h-3 bg-primary rounded-full"></div>
              <div class="w-3 h-3 bg-primary rounded-full"></div>
              <div class="w-3 h-3 bg-primary rounded-full"></div>
              <div class="w-3 h-3 bg-primary rounded-full"></div>
              <div class="w-3 h-3 bg-secondary rounded-full opacity-50"></div>
            </div>
          </div>
          <p class="text-center text-xs text-secondary mt-2">Expert Level</p>
        </div>
      </div>
    </main>
  </div>
</template>