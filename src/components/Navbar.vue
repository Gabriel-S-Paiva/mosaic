<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
    <nav class="h-15 bg-primary rounded-b-lg flex justify-between items-center p-5 mx-10 mb-4">
        <RouterLink to="/" class="flex items-center gap-3">
            <img src="/icon.svg" alt="Mosaic Logo" class="h-8 w-8">
            <p class="justify-start text-white text-3xl font-bold font-['Nippo']">Mosaic</p>
        </RouterLink>
        <RouterLink to="/profile" class="flex items-center gap-4">
            <p class="justify-start text-white text-xl font-bold font-['Switzer']">Username</p>
            <span class="material-symbols-outlined text-white">account_circle</span>
        </RouterLink>
    </nav>
</template>