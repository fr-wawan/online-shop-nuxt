<template>
  <Hero>
    <h1 class="text-5xl text-center font-semibold">Product Details</h1>
    <p class="text-gray-400 mt-5 flex items-center justify-center">
      Home
      <img src="/images/greater-than.png" alt="" width="30" />
      <span class="text-white"> Product Details</span>
    </p>
  </Hero>

  <ClientOnly>
    <div class="text-center container mx-auto mt-20">
      <div class="md:flex justify-center gap-10">
        <div>
          <img width="500" class="border p-3" alt="" :src="product.image" />
        </div>
        <div class="md:w-5/12 mx-5 text-left">
          <h2 class="font-semibold text-2xl mb-5">{{ product.title }}</h2>
          <p
            class="font-bold text-xl mb-3 text-gray-500 border-b pb-3 border-b-gray-200"
          >
            {{ useFormatPrice(product.price) }}/KG
          </p>
          <p
            class="border-b pb-3 border-b-gray-200"
            v-html="product.description"
          ></p>
          <div class="flex items-center md:gap-5 mt-5">
            <Quantity
              v-model="quantity"
              @incrementQuantity="quantity++"
              @decrementQuantity="quantity--"
              :quantity="quantity"
            />

            <AddToCart :product="product" :quantity="quantity" />
          </div>
        </div>
      </div>
    </div>
    <template #fallback>
      <CustomLoading />
    </template>
  </ClientOnly>
</template>

<script setup>
const { getDetailsProduct } = useProductStore();
const { product } = storeToRefs(useProductStore());
const route = useRoute();
getDetailsProduct(route.params.slug);

let quantity = ref(1);
</script>
