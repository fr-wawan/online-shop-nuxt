<template>
  <div class="mb-32">
    <Hero class="text-center">
      <h1 class="text-5xl font-semibold">Login</h1>
      <p class="text-gray-400 mt-5 flex items-center justify-center">
        Home
        <img src="/images/greater-than.png" alt="" width="30" />
        <span class="text-white"> My Account</span>
      </p>
    </Hero>

    <div class="md:justify-center md:gap-10 mt-20 md:flex text-center">
      <div class="mb-16">
        <div class="">
          <NuxtLink
            to="/register"
            class="rounded shadow transition-all duration-300 ease-in-out hover:bg-blue-500 p-5 hover:text-white font-medium hover:rounded text-xl px-16 text-gray-500"
            active-class="text-white bg-blue-500
         shadow-md rounded"
          >
            Register
          </NuxtLink>
        </div>
      </div>
      <div>
        <div class="">
          <NuxtLink
            to="/login"
            class="rounded shadow transition-all duration-300 ease-in-out hover:bg-blue-500 p-5 hover:text-white font-medium hover:rounded text-xl px-16"
            active-class="text-white bg-blue-500
         shadow-md rounded"
          >
            Login
          </NuxtLink>
        </div>
      </div>
    </div>

    <div
      class="bg-white shadow-md p-5 rounded-md mx-5 md:mx-auto md:w-10/12 xl:w-4/12 mt-14 xl:mt-0"
    >
      <h1 class="text-center text-3xl font-semibold my-3 mb-10">
        Login Your Account
      </h1>
      <form @submit.prevent="handleLogin">
        <Input
          name="email"
          label="Email*"
          placeholder="Your Email"
          type="email"
          v-model="userData.email"
          :validation="validation.email"
        />

        <div v-if="validation.message" class="text-red-500 mt-3">
          Invalid Credentials!
        </div>

        <Input
          name="password"
          label="Password*"
          placeholder="Your Password"
          type="password"
          v-model="userData.password"
          :validation="validation.password"
        />

        <button
          class="w-full bg-blue-500 p-4 text-white font-semibold rounded mb-10 mt-3"
        >
          SIGN IN
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "guest",
});
const { login } = useAuthStore();

let userData = reactive({
  email: "",
  password: "",
});

const toast = useToast();

let validation = ref([]);

async function handleLogin() {
  await login(userData)
    .then(() => {
      toast.success("Successfully login");
      navigateTo("/profile");
    })
    .catch((error) => {
      validation.value = error;
      userData.password = "";
    });

  //   if (!error.value) {
  //     navigateTo("/profile");
  //   } else {
  //     validation.value = error.value.data;
  //     userData.password = "";
  //   }
}
</script>
