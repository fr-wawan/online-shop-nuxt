<template>
  <div
    class="bg-white w-11/12 mb-32 mt-5 mx-auto md:w-full shadow-md rounded-md p-10"
  >
    <h1 class="text-xl border-b pb-3 font-semibold">Ordered Items</h1>

    <div v-for="product in order.product" class="border-b pb-5">
      <div class="flex flex-col md:flex-row justify-between items-center mt-5">
        <img :src="product.image" class="rounded-lg w-20" alt="" />
        <h3 class="md:text-lg my-3 font-semibold">{{ product.title }}</h3>

        <p class="">Quantity : {{ product.pivot.quantity }}</p>
        <p class="flex gap-2 items-center">
          {{ useFormatPrice(product.price) }} <span>x</span>
          {{ product.pivot.quantity }}
        </p>

        <p class="text font-semibold text-gray-500 text-lg">
          {{ useFormatPrice(product.pivot.quantity * product.price) }}
        </p>
      </div>
    </div>

    <div class="mt-7 flex flex-col md:flex-row justify-between items-center">
      <p class="font-semibold mb-5">Order Notes : {{ order.user_notes }}</p>
      <h3 class="font-semibold text-xl">
        Total : {{ useFormatPrice(order.total) }}
      </h3>
    </div>
  </div>
</template>

<script setup>
const { order, isLoading } = storeToRefs(useOrderStore());
</script>
