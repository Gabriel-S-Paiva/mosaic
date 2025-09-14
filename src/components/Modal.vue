<script setup lang="ts">
const props = defineProps ({
    title: {
        type: String,
        default: 'Modal'
    },
})
const emit = defineEmits(["close"])
</script>

<template>
    <teleport to="body">
        <div class="bg-neutral-900/60 fixed flex justify-center items-center top-0 left-0 w-full h-full">
            <div class="w-80">
                <div class="px-5 py-2 bg-primary rounded-t-lg flex justify-between">
                    <h2 class=" text-white text-xl font-bold font-['Switzer']">
                        {{props.title}}
                    </h2>
                    <div class="flex gap-4">
                        <button @click="emit('close')" class="flex items-center justify-center">
                            <span class="material-symbols-outlined text-white">close</span>
                        </button>
                    </div>
                </div>
                <div class="bg-white px-5 py-2 rounded-b-lg">
                    <slot>

                    </slot>
                </div>
            </div>
        </div>
    </teleport>
</template>