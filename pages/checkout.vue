<template>
  <div class="mt-36 container mx-auto">
    <div
      v-if="
        isLoading &&
        !user.address &&
        !user.phone &&
        !user.country &&
        !user.states &&
        !user.city &&
        !user.post_code
      "
    >
      <Modal link="/profile">Please Complete The Profile First</Modal>
    </div>

    <div v-if="isLoading && !carts.length > 0">
      <Modal link="/">You dont have any items in your Cart</Modal>
    </div>
    <div
      class="flex flex-col-reverse md:flex-row justify-center gap-10"
      v-if="isLoading"
    >
      <div class="w-full">
        <CheckoutForm @getNotes="notes = $event" />
      </div>
      <div class="w-full">
        <OrderSummary />
        <SubmitTransaction :notes="notes" />
      </div>
    </div>

    <CustomLoading v-else height="50vh" />
  </div>
</template>
<script setup>
const { user, isLoading } = storeToRefs(useAuthStore());
const { carts } = storeToRefs(useCartStore());
const { getCart } = useCartStore();
const { fetchUser } = useAuthStore();

fetchUser();
getCart();

let notes = ref("");
</script>
