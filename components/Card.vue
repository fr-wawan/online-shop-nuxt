<template>
  <div
    class="flex flex-col xl:mb-10 md:mb-5 mb-2 bg-white p-5 text-center rounded shadow-md flex-grow-0 shrink-0 md:basis-[23rem] mx-auto basis-[17rem] md:mx-auto"
    v-for="product in props.products"
    :key="product.id"
  >
    <NuxtLink :to="`/product/${product.slug}`">
      <img :src="product.image" class="mx-auto rounded-lg" alt="" />

      <h3 class="font-bold mt-5 mb-3">{{ product.title }}</h3>
      <p class="font-bold text-xl mb-3">
        {{ useFormatPrice(product.price) }}/KG
      </p>
      <AddToCart :product="product" :quantity="quantity" />
    </NuxtLink>
  </div>
</template>

<script setup>
const props = defineProps({
  products: Array,
});

const quantity = ref(1);
</script>
