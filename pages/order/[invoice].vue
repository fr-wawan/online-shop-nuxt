<template>
  <div>
    <Hero>
      <h1 class="text-5xl font-semibold">My Order</h1>
      <p class="text-gray-400 mt-5 flex items-center justify-center">
        Home
        <img src="/images/greater-than.png" alt="" width="30" />
        <span class="text-white">Details Order</span>
      </p>
    </Hero>

    <div
      class="lg:grid xl:grid-cols-4 lg:grid-cols-3 gap-8 container mx-auto mt-10"
    >
      <div class="lg:col-span-1 w-7/12 lg:w-full text-center mx-auto">
        <DashboardSidebar />
      </div>

      <div class="xl:col-span-3 lg:col-span-2" v-if="isLoadingDetails">
        <UserDetails />
        <OrderedItems />
      </div>

      <div class="xl:col-span-3 lg:col-span-2" v-else>
        <CustomLoading height="50vh" />
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const { detailsOrder } = useOrderStore();
const { isLoadingDetails } = storeToRefs(useOrderStore());
detailsOrder(route.params.invoice);
</script>
