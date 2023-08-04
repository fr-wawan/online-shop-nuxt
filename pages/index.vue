<template>
  <div class="">
    <div class="">
      <HeroIndex />
    </div>
    <div class="mx-5">
      <input
        name="search"
        placeholder="Search Product..."
        v-model="search"
        @keyup="searchQuery"
        class="block border border-gray-300 my-20 rounded md:w-full container mx-auto p-2.5 placeholder:text-sm placeholder:p-1 placeholder:text-gray-400"
      />
    </div>

    <div v-if="!search">
      <ListProduct :products="popularProducts">Top Rated Products</ListProduct>

      <ListProduct :products="products">Newest Products</ListProduct>

      <div class="text-center mt-4 mb-4" v-show="nextExists">
        <a
          @click="loadMore"
          class="bg-blue-500 text-white text-lg p-4 px-10 rounded cursor-pointer"
          >Load More</a
        >
      </div>
    </div>
    <div v-else>
      <div v-if="products.length > 0">
        <ListProduct :products="products">Search Product</ListProduct>
        <div class="text-center mt-4 mb-4" v-show="nextExists">
          <a
            @click="loadMore"
            class="bg-blue-500 text-white text-lg p-4 px-10 rounded cursor-pointer"
            >Load More</a
          >
        </div>
      </div>
      <div v-else class="text-center mb-52">
        <h1 class="font-semibold text-xl">Product Not Found</h1>
      </div>
    </div>
  </div>
</template>

<script setup>
const { getProduct, getPopularProduct, searchProduct } = useProductStore();
getProduct();
getPopularProduct();

const { products, nextExists, popularProducts } = storeToRefs(
  useProductStore()
);

let search = ref("");

const query = async (search) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const response = await searchProduct(search.value);
  } catch (error) {
    console.error(error);
  }
};

let timeOutId;

async function searchQuery() {
  clearTimeout(timeOutId);

  await new Promise((resolve) => {
    timeOutId = setTimeout(resolve, 300);
  });

  await query(search);
}
</script>
