<template>
  <div class="md:flex w-10/12 mx-auto gap-10">
    <button
      class="p-3 hover:outline outline-1 hover:outline-blue-700 hover:bg-white hover:text-blue-700 transition-all duration-300 ease-in-out bg-blue-700 w-full mt-5 text-white rounded"
      @click.prevent="submitTransaction('cod')"
    >
      Place Order | COD
    </button>
    <button
      class="p-3 bg-red-500 hover:outline outline-1 hover:outline-red-500 hover:text-red-500 transition-all duration-300 ease-in-out hover:bg-white w-full mt-5 text-white rounded"
      @click.prevent="submitTransaction('midtrans')"
    >
      Pay With Gopay, DANA, OVO, etc
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  notes: String,
});

const { carts, cartTotal } = storeToRefs(useCartStore());
const { getCart } = useCartStore();

const { user } = storeToRefs(useAuthStore());
const { fetchUser } = useAuthStore();

const { storeOrder } = useOrderStore();

getCart();
fetchUser();

const mappedCarts = computed(() => {
  return carts.value.map((cart) => {
    return {
      id: cart.product.id,
      quantity: cart.quantity,
      price: cart.product.id,
    };
  });
});

async function submitTransaction(paymentMethod) {
  let formData = new FormData();

  formData.append("first_name", user.value.first_name);
  formData.append("last_name", user.value.last_name);
  formData.append("phone", user.value.phone);
  formData.append("post_code", user.value.post_code);
  formData.append("address", user.value.address);
  formData.append("country", user.value.country);
  formData.append("states", user.value.states);
  formData.append("city", user.value.city);
  formData.append("user_notes", props.notes);
  formData.append("paymentMethod", paymentMethod);

  mappedCarts.value.forEach((cart) => {
    formData.append("productIds[]", cart.id);
    formData.append("quantity[]", cart.quantity);
  });

  formData.append("total", cartTotal.value);

  await storeOrder(formData, paymentMethod).then((response) => {
    navigateTo(`/order/${response.invoice}`);
  });
}
</script>
