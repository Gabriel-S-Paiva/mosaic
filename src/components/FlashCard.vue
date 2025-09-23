<script setup lang="ts">
  import { ref, computed } from 'vue'
  import Modal from "./Modal.vue";

  interface Card {
    front: string;
    back: string;
  }
  const newCard = ref({
    front: "",
    back: "",
  } as Card);
  const cards = ref([

  ]as Card[]);
  const flipped = ref(false)
  const showModal = ref(false)
  const currentCardIndex = ref(0)

  const addCard = () => {
    if (!newCard.value.front.trim() || !newCard.value.back.trim()) return
    cards.value.push({ ...newCard.value });
    newCard.value = {front:"", back:""};
    showModal.value = false;
  }
  const progressCard = () => {
    if (!cards.value.length) return
    flipped.value = !flipped.value
    if (!flipped.value){
      currentCardIndex.value = currentCardIndex.value >= cards.value.length - 1
          ? 0
          : currentCardIndex.value + 1
    }
  }
  const currentCard = computed(() => cards.value[currentCardIndex.value] ?? {
    front: "No Card Available?",
    back: "Let's Create Some!"
  })
</script>

<template>
  <div class="h-full flex flex-col justify-between">
    <div class="px-5 py-2 bg-primary rounded-t-lg flex justify-between">
      <h2 class=" text-white text-xl font-bold font-['Switzer']">
        Flash Cards
      </h2>
    </div>
    <div class="relative h-40 perspective mx-5">
      <!-- Card wrapper -->
      <div
          class="absolute w-full h-full transition-transform duration-500 preserve-3d"
          :class="{ 'rotate-y-180': flipped }"
          @click="progressCard"
      >
        <!-- Front -->
        <div class="absolute w-full h-full flex items-center justify-center backface-hidden bg-white rounded shadow">
          {{ currentCard.front }}
        </div>
        <!-- Back -->
        <div class="absolute w-full h-full flex items-center justify-center backface-hidden bg-primary text-white rounded shadow rotate-y-180">
          {{ currentCard.back }}
        </div>
      </div>
    </div>
    <button @click="showModal = true" class=" h-10 mb-2 mx-5 rounded bg-primary text-white text-base font-bold font-['Switzer']">New Flashcard
    </button>
  </div>
  <Modal v-if="showModal" @close="showModal = false" :title="'Add Card'" >
    <div class="p-4 space-y-4 w-full">
      <!-- Front field -->
      <div>
        <label class="text-xs text-secondary uppercase tracking-wide">Front</label>
        <textarea
          v-model="newCard.front"
          class="w-full mt-2 p-3 rounded-r rounded-bl bg-light text-dark resize-none"
          rows="3"
          placeholder="Write the question here..."
        ></textarea>
      </div>

      <!-- Back field -->
      <div>
        <label class="text-xs text-secondary uppercase tracking-wide">Back</label>
        <textarea
          v-model="newCard.back"
          class="w-full mt-2 p-3 rounded-r rounded-bl bg-light text-dark resize-none"
          rows="3"
          placeholder="Write the answer or explanation here..."
        ></textarea>
      </div>

      <!-- Meta inputs for future improvement-->
<!--      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="text-xs text-secondary uppercase tracking-wide">Tags</label>
          <input
            class="w-full mt-2 p-2 rounded-r rounded-bl bg-light text-dark"
            placeholder="e.g. javascript, vue"
          />
        </div>
        <div>
          <label class="text-xs text-secondary uppercase tracking-wide">Difficulty</label>
          <select class="w-full mt-2 p-2 rounded-r rounded-bl bg-light text-dark">
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>
      </div>-->

      <!-- Actions (UI only) -->
      <div class="flex justify-end space-x-3 pt-2">
        <button @click="showModal = false" class="px-4 py-2 bg-light text-secondary rounded-r rounded-bl">Cancel</button>
        <button @click="addCard" class="px-4 py-2 bg-primary text-white rounded-r rounded-bl">Create</button>
      </div>
    </div>
  </Modal>
</template>

<style scoped>
.perspective {
  perspective: 1000px;
}
.preserve-3d {
  transform-style: preserve-3d;
}
.backface-hidden {
  backface-visibility: hidden;
}
.rotate-y-180 {
  transform: rotateY(180deg);
}
</style>