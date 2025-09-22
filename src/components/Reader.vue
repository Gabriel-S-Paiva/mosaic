<script setup lang="ts">


import {ref} from "vue";

const noUpload = ref(true);
const pdfURL = ref<string>("");

const handleFileChange = (event: Event):void => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if(file){
    pdfURL.value = URL.createObjectURL(file);
    noUpload.value = false;
  }
}
</script>

<template>
  <div class="w-full h-full bg-white rounded-2xl overflow-hidden flex flex-col">
    <!-- Header -->
    <div class="px-4 py-3 bg-primary rounded-t-2xl flex justify-between items-center">
      <h3 class="text-white text-lg font-bold font-['Switzer']">
        PDF Reader
      </h3>
      <div class="flex gap-2">
        <!-- File Upload Button -->
        <input
            type="file"
            accept="application/pdf"
            @change="handleFileChange"
            class="hidden"
            id="pdf-upload"
        />
        <label
            for="pdf-upload"
            class="cursor-pointer flex items-center justify-center w-8 h-8 bg-white/20 hover:bg-white/30 rounded transition-colors"
            title="Upload PDF"
        >
          <span class="material-symbols-outlined text-white text-sm">upload_file</span>
        </label>
      </div>
    </div>

    <!-- Content Area -->
    <div class="flex-1 p-4 overflow-auto">
      <!-- Empty State -->
      <div v-if="noUpload" class="text-center p-8 text-gray-500">
        <span class="material-symbols-outlined text-6xl mb-4 block text-gray-300">picture_as_pdf</span>
        <p class="text-lg font-medium mb-2">No PDF loaded</p>
        <p class="text-sm">Click the upload button to select a PDF file</p>
      </div>
      <!-- PDF Viewer -->
      <div v-else class="flex flex-col h-full items-center">
        <iframe
            :src="pdfURL"
            class="border border-gray-200 rounded-lg shadow-sm w-full h-full"
        ></iframe>
      </div>
    </div>
  </div>
</template>