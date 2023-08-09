<template>
  <Hero>
    <h1 class="text-5xl font-semibold">All Products</h1>
    <p class="text-gray-400 mt-5 flex items-center justify-center">
      Home
      <img src="/images/greater-than.png" alt="" width="30" />
      <span class="text-white"> Shop</span>
    </p>
  </Hero>

  <div class="flex flex-col-reverse md:flex-row container mx-auto gap-2">
    <div class="container mx-auto mt-20">
      <div class="mb-5 mx-auto w-10/12 md:w-[97%]">
        <div class="">
          <h1 class="text-2xl mb-2 font-semibold">All Products</h1>
        </div>
        <p class="border border-b-gray-200"></p>
      </div>
      <div class="flex flex-wrap gap-5">
        <ClientOnly>
          <Card :products="products" />
          <template #fallback>
            <CardSkeleton v-for="index in 4" />
          </template>
        </ClientOnly>
      </div>

      <Pagination
        :current-page="currentPage"
        :total-pages="totalPages"
        :go-to-page="goToPage"
        class="mb-32"
      />
    </div>

    <ShopFilter />
  </div>
</template>

<script setup>
const { products, currentPage, totalPages } = storeToRefs(useProductStore());
const { getProduct } = useProductStore();
const { categories } = storeToRefs(useCategoryStore());
const { getProductByFilter } = useProductStore();
const { getCategory } = useCategoryStore();
getProduct();
getCategory();

function goToPage(page) {
  getProduct(page);
}
</script>
