<script setup lang="ts">
import { ref, onUnmounted } from 'vue';
import * as pdfjsLib from 'pdfjs-dist';

// Set the workerSrc for pdf.js
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

// Reactive variables
const pdfFile = ref<File | null>(null);
const pdfUrl = ref<string | null>(null);
const pdfError = ref<string | null>(null);
const currentPage = ref(1);
const totalPages = ref(0);
const isLoading = ref(false);
const scale = ref(1.2);

// Function to handle file selection
const handleFileChange = async (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    
    if (file && file.type === 'application/pdf') {
        pdfFile.value = file;
        pdfError.value = null;
        currentPage.value = 1;

        // Revoke previous URL if it exists
        if (pdfUrl.value) {
            URL.revokeObjectURL(pdfUrl.value);
        }

        // Create a URL for the selected file
        pdfUrl.value = URL.createObjectURL(file);

        // Render the first page of the PDF
        await renderPdf(pdfUrl.value, currentPage.value);
    } else {
        pdfError.value = 'Please select a valid PDF file.';
    }
};

// Function to render a specific page of the PDF
const renderPdf = async (url: string, pageNumber: number) => {
    const canvas = document.getElementById('pdf-canvas') as HTMLCanvasElement;
    const context = canvas?.getContext('2d');

    if (!canvas || !context) {
        pdfError.value = 'Failed to get canvas context.';
        return;
    }

    try {
        isLoading.value = true;
        const pdf = await pdfjsLib.getDocument(url).promise;
        totalPages.value = pdf.numPages;

        const page = await pdf.getPage(pageNumber);
        const viewport = page.getViewport({ scale: scale.value });
        
        // Set canvas dimensions
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        // Clear the canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        const renderContext = {
            canvasContext: context,
            viewport: viewport
        } as any;

        await page.render(renderContext).promise;
    } catch (error) {
        pdfError.value = 'Failed to load the PDF.';
        console.error('PDF render error:', error);
    } finally {
        isLoading.value = false;
    }
};

// Navigation functions
const nextPage = async () => {
    if (currentPage.value < totalPages.value && pdfUrl.value) {
        currentPage.value++;
        await renderPdf(pdfUrl.value, currentPage.value);
    }
};

const prevPage = async () => {
    if (currentPage.value > 1 && pdfUrl.value) {
        currentPage.value--;
        await renderPdf(pdfUrl.value, currentPage.value);
    }
};

// Zoom functions
const zoomIn = async () => {
    if (scale.value < 3 && pdfUrl.value) {
        scale.value += 0.2;
        await renderPdf(pdfUrl.value, currentPage.value);
    }
};

const zoomOut = async () => {
    if (scale.value > 0.5 && pdfUrl.value) {
        scale.value -= 0.2;
        await renderPdf(pdfUrl.value, currentPage.value);
    }
};

const resetZoom = async () => {
    if (pdfUrl.value) {
        scale.value = 1.2;
        await renderPdf(pdfUrl.value, currentPage.value);
    }
};

// Cleanup on unmount
onUnmounted(() => {
    if (pdfUrl.value) {
        URL.revokeObjectURL(pdfUrl.value);
    }
});
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

                <!-- Zoom Controls -->
                <button
                    v-if="pdfUrl"
                    @click="zoomOut"
                    :disabled="scale <= 0.5"
                    class="flex items-center justify-center w-8 h-8 bg-white/20 hover:bg-white/30 rounded transition-colors disabled:opacity-50"
                    title="Zoom Out"
                >
                    <span class="material-symbols-outlined text-white text-sm">zoom_out</span>
                </button>
                
                <button
                    v-if="pdfUrl"
                    @click="resetZoom"
                    class="flex items-center justify-center w-8 h-8 bg-white/20 hover:bg-white/30 rounded transition-colors"
                    title="Reset Zoom"
                >
                    <span class="material-symbols-outlined text-white text-sm">fit_screen</span>
                </button>
                
                <button
                    v-if="pdfUrl"
                    @click="zoomIn"
                    :disabled="scale >= 3"
                    class="flex items-center justify-center w-8 h-8 bg-white/20 hover:bg-white/30 rounded transition-colors disabled:opacity-50"
                    title="Zoom In"
                >
                    <span class="material-symbols-outlined text-white text-sm">zoom_in</span>
                </button>
            </div>
        </div>

        <!-- Content Area -->
        <div class="flex-1 p-4 overflow-auto">
            <!-- Error Message -->
            <div v-if="pdfError" class="text-red-500 text-center p-4 bg-red-50 rounded-lg mb-4">
                <span class="material-symbols-outlined mr-2">error</span>
                {{ pdfError }}
            </div>

            <!-- Loading Indicator -->
            <div v-if="isLoading" class="text-center p-8">
                <div class="inline-flex items-center">
                    <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mr-3"></div>
                    <span class="text-primary font-medium">Loading PDF...</span>
                </div>
            </div>

            <!-- Empty State -->
            <div v-if="!pdfUrl && !pdfError && !isLoading" class="text-center p-8 text-gray-500">
                <span class="material-symbols-outlined text-6xl mb-4 block text-gray-300">picture_as_pdf</span>
                <p class="text-lg font-medium mb-2">No PDF loaded</p>
                <p class="text-sm">Click the upload button to select a PDF file</p>
            </div>

            <!-- PDF Viewer -->
            <div v-if="pdfUrl && !isLoading" class="flex flex-col items-center">
                <canvas 
                    id="pdf-canvas" 
                    class="border border-gray-200 rounded-lg shadow-sm max-w-full"
                ></canvas>

                <!-- Navigation Controls -->
                <div v-if="totalPages > 1" class="flex items-center gap-4 mt-4 p-3 bg-gray-50 rounded-lg">
                    <button
                        @click="prevPage"
                        :disabled="currentPage === 1"
                        class="flex items-center justify-center w-10 h-10 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                        title="Previous Page"
                    >
                        <span class="material-symbols-outlined">chevron_left</span>
                    </button>
                    
                    <div class="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <span>Page</span>
                        <span class="bg-white px-2 py-1 rounded border">{{ currentPage }}</span>
                        <span>of</span>
                        <span>{{ totalPages }}</span>
                    </div>
                    
                    <button
                        @click="nextPage"
                        :disabled="currentPage === totalPages"
                        class="flex items-center justify-center w-10 h-10 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                        title="Next Page"
                    >
                        <span class="material-symbols-outlined">chevron_right</span>
                    </button>
                </div>

                <!-- Zoom Level Indicator -->
                <div v-if="pdfUrl" class="mt-2 text-xs text-gray-500">
                    Zoom: {{ Math.round(scale * 100) }}%
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
#pdf-canvas {
    max-height: 70vh;
}
</style>