<template>
  <div class="container mx-auto mt-10">
    <div class="mb-5 mx-5 md:mx-auto">
      <div class="">
        <h1 class="text-2xl mb-2 font-semibold">
          <slot />
        </h1>
      </div>
      <p class="border border-b-gray-200"></p>
    </div>
    <div class="flex flex-wrap gap-5">
      <ClientOnly>
        <Card :products="props.products" />
        <template #fallback>
          <CardSkeleton v-for="index in 4" />
        </template>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  products: {
    required: true,
  },
});
</script>
