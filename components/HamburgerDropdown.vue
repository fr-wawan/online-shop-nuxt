<template>
  <div class="md:hidden">
    <div @click="toggleDropDown" class="cursor-pointer">
      <img src="/images/hamburger.png" alt="" width="20" />
    </div>
  </div>
  <div
    v-if="isDropDown"
    class="bg-white md:hidden absolute w-full left-0 top-14"
  >
    <div class="gap-4 flex flex-col shadow-xl p-5 text-center">
      <NuxtLink to="/" active-class="text-blue-500">Home</NuxtLink>

      <NuxtLink to="/shop" active-class="text-blue-500">Shop</NuxtLink>
      <NuxtLink to="/about" active-class="text-blue-500">About</NuxtLink>
      <NuxtLink to="/contact" active-class="text-blue-500" class="border-b pb-3"
        >Contact</NuxtLink
      >

      <NuxtLink
        v-if="token"
        to="/profile"
        active-class="text-blue-500"
        class="bg-gray-800 flex justify-center gap-3 p-3 text-white rounded-lg"
      >
        <Icon name="ic:sharp-dashboard" size="24px" />
        Profile</NuxtLink
      >
      <div v-else class="flex gap-5 items-center justify-center">
        <NuxtLink
          class="bg-blue-500 text-white p-2 px-3 rounded-md"
          to="/register"
          >Register</NuxtLink
        >
        <NuxtLink
          to="/login"
          class="outline outline-1 outline-blue-500 p-2 px-5 rounded-md text-blue-500"
          >Login</NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<script setup>
const isDropDown = ref(false);
const token = useCookie("token");

function toggleDropDown() {
  isDropDown.value = !isDropDown.value;
}

function closeDropDown() {
  isDropDown.value = false;
}
</script>
