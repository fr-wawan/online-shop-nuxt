<template>
  <div class="mb-32">
    <Hero class="text-center">
      <h1 class="text-5xl font-semibold">Cart</h1>
      <p class="text-gray-400 mt-5 flex items-center justify-center">
        Home
        <img src="/images/greater-than.png" alt="" width="30" />
        <span class="text-white"> Cart</span>
      </p>
    </Hero>

    <div class="mt-5 w-full">
      <div class="rounded-lg mx-auto bg p-10 container" v-if="isLoading">
        <Table
          :headers="[
            'Delete',
            'Image',
            'Products Name',
            'Price',
            'Quantity',
            'Sub Total',
          ]"
        >
          <tr class="text-gray-500" v-for="cart in carts" :key="cart.id">
            <td class="p-3">
              <div class="flex justify-center items-center">
                <a @click="handleDeleteCart(cart)" class="cursor-pointer">
                  <DeleteIcon />
                </a>
              </div>
            </td>
            <td class="p-3 text-center border">
              <img
                :src="cart.product.image"
                class="mx-auto rounded-lg w-14"
                alt=""
              />
            </td>
            <td class="p-3 text-center border">
              {{ cart.product.title }}
            </td>
            <td class="p-3 text-center border">
              {{ useFormatPrice(cart.product.price) }}
            </td>
            <td class="p-3 border">
              <div class="flex justify-center">
                <QuantityCart :cart="cart" />
              </div>
            </td>
            <td class="p-3 border text-center">
              {{ useFormatPrice(cart.product.price * cart.quantity) }}
            </td>
          </tr>
        </Table>
        <div class="text-center p-5 border border-t-0 text-gray-500 text-xl">
          <h3>Cart Total : {{ useFormatPrice(cartTotal) }}</h3>
        </div>

        <div
          class="my-5 flex text-sm md:text-base md:gap-5 justify-end flex-col md:flex-row"
        >
          <NuxtLink
            to="/"
            class="text-blue-500 rounded-md p-4 px-5 text-center md:text-left"
          >
            Continue Shopping
          </NuxtLink>
          <NuxtLink
            v-if="carts.length > 0"
            to="/checkout"
            class="bg-blue-500 hover:outline-1 outline hover: hover:outline-blue-500 hover:text-blue-500 hover:bg-white transition-all duration-300 ease-in-out rounded-md text-white p-4 px-5 text-center md:text-left"
          >
            Proceed To Checkout
          </NuxtLink>
        </div>
      </div>
      <CustomLoading height="30vh" v-else />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});
const { getCart, deleteCart } = useCartStore();
const { carts, cartTotal, isLoading } = storeToRefs(useCartStore());
getCart();

const { $toast } = useNuxtApp();
async function handleDeleteCart(cart) {
  try {
    await deleteCart(cart);

    $toast.success("Removed From Cart");
  } catch (error) {
    console.log(error);
  }
}
</script>
