<template>
  <div>
    <button
      class="bg-white transition-all hover:text-white hover:bg-blue-500 border border-blue-500 p-2 text-blue-500 rounded-md mx-3 my-3 px-4 text-sm md:px-10 md:text-base"
      @click.prevent="addToCart(props.product)"
    >
      Add To Cart
    </button>
  </div>
</template>
<script setup>
import { useToast } from "vue-toastification";
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const { token } = storeToRefs(useAuthStore());
const { storeCart } = useCartStore();
const toast = useToast();

async function addToCart(product) {
  if (token.value) {
    let formData = {
      id: product.id,
      quantity: props.quantity,
    };

    await storeCart(formData)
      .then(() => {
        toast.success("Success");
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    navigateTo({ name: "login" });
  }
}
</script>
