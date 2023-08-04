<template>
  <div class="custom-loading-indicator">
    <div class="spinner"></div>
    <p>Loading...</p>
  </div>
</template>

<script setup>
defineProps({
  height: {
    type: String,
  },
});
</script>

<style scoped>
.custom-loading-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: v-bind(height);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
