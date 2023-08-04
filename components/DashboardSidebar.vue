<template>
  <div class="mx-auto">
    <DashboardTab link="/profile">
      <Icon name="ic:sharp-dashboard" size="24px" />
      Profile
    </DashboardTab>

    <DashboardTab link="/order">
      <Icon name="maki:shop" size="24px" />
      Order
    </DashboardTab>

    <a
      class="p-4 flex justify-center text-lg gap-2 mb-5 items-center bg-white shadow-lg cursor-pointer text-gray-500"
      @click="handleLogout"
    >
      <Icon name="material-symbols:logout" size="24px" />
      Logout
    </a>
  </div>
</template>

<script setup>
const { logout } = useAuthStore();
function handleLogout() {
  logout();

  navigateTo("/login");
}
</script>
