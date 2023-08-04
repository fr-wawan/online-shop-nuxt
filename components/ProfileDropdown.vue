<template>
  <div
    class="md:flex items-center hidden gap-1"
    @click="toggleDropDown"
    v-if="token"
  >
    <template v-if="user && user.avatar">
      <img
        :src="user.avatar"
        class="rounded-full w-9 cursor-pointer object-cover"
      />
    </template>
    <AnimatedPlaceholder
      height="2.25rem"
      width="2.25rem"
      border-radius="50%"
      v-else
    />
    <Icon name="ep:arrow-down" size="20px" class="cursor-pointer" />
    <div
      class="z-10 hidden md:block bg-white absolute md:right-28 top-14 right-12 xl:right-20 xl:top-20 rounded-lg shadow w-44"
      v-if="isDropDown"
    >
      <ul class="py-2 text-sm text-gray-700">
        <li>
          <NuxtLink
            :to="{ name: 'profile' }"
            class="block px-4 py-2 hover:bg-gray-200"
            >Edit Profile</NuxtLink
          >
        </li>
        <li>
          <NuxtLink to="/order" class="block px-4 py-2 hover:bg-gray-200"
            >My Orders</NuxtLink
          >
        </li>
        <li>
          <a
            @click.prevent="handleLogout"
            class="block cursor-pointer px-4 py-2 hover:bg-gray-200"
            >Logout</a
          >
        </li>
      </ul>
    </div>
  </div>
  <div v-else class="hidden md:flex gap-5 items-center">
    <NuxtLink class="bg-blue-500 text-white p-2 px-3 rounded-md" to="/register"
      >Register</NuxtLink
    >
    <NuxtLink
      to="/login"
      class="outline outline-1 outline-blue-500 p-2 px-5 rounded-md text-blue-500"
      >Login</NuxtLink
    >
  </div>
</template>

<script setup>
const { user } = storeToRefs(useAuthStore());
const { logout, fetchUser } = useAuthStore();
fetchUser();

const token = useCookie("token");
const isDropDown = ref(false);

function toggleDropDown() {
  isDropDown.value = !isDropDown.value;

  onClickOutside(isDropDown, () => (isDropDown.value = false));
}

function handleLogout() {
  logout();

  navigateTo("/login");
}
</script>
