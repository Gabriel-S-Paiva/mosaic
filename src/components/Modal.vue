<script setup lang="ts">
import { ref } from 'vue';

const showModal = ref(false);
</script>

<template>
    <div v-if="showModal" class="bg-neutral-900/60 z-999 fixed w-full h-full">
        <div class="">
            <h2>title</h2>
            <div>
                <p>
                    content
                </p>
            </div>
        </div>
    </div>
</template>