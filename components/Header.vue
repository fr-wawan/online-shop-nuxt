<template>
  <div class="overflow-x-auto">
    <header class="bg-white py-4 shadow-lg fixed top-0 left-0 right-0 z-10">
      <nav
        class="flex justify-around xl:justify-between xl:mx-20 md:mx-10 md:p-5 items-center"
      >
        <NuxtLink
          to="/"
          class="md:text-lg xl:text-xl text-blue-500 font-bold text-lg"
          >GROCERY SHOP</NuxtLink
        >
        <div class="w-6/12 gap-4 hidden md:flex justify-center min-w-fit">
          <NuxtLink to="/" active-class="text-blue-500">Home</NuxtLink>

          <NuxtLink to="/shop" active-class="text-blue-500">Shop</NuxtLink>
          <NuxtLink to="/about" active-class="text-blue-500">About</NuxtLink>
          <NuxtLink to="/contact" active-class="text-blue-500"
            >Contact</NuxtLink
          >
        </div>

        <div class="flex items-center gap-5">
          <NuxtLink to="/">
            <!-- <SearchIcon /> -->
          </NuxtLink>

          <NuxtLink to="/cart" class="flex items-center relative">
            <CartIcon />
            <span
              class="item-count bg-red-500 text-white font-bold text-xs w-5 h-5 flex items-center justify-center rounded-full absolute md:right-0 -right-1 -top-2 md:-top-2"
              v-if="typeof count == 'number' && count > 0"
              >{{ count }}</span
            >
          </NuxtLink>

          <HamburgerDropdown />
          <ProfileDropdown />
        </div>
      </nav>
    </header>
  </div>
</template>

<script setup>
const { getCart } = useCartStore();
const { count } = storeToRefs(useCartStore());
getCart();
</script>
