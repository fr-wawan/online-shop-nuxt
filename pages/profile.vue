<template>
  <Hero class="text-center">
    <h1 class="text-5xl font-semibold">Login</h1>
    <p class="text-gray-400 mt-5 flex items-center justify-center">
      Home
      <img src="/images/greater-than.png" alt="" width="30" />
      <span class="text-white"> My Account</span>
    </p>
  </Hero>
  <div
    class="lg:grid xl:grid-cols-4 lg:grid-cols-3 gap-8 container mx-auto mt-10"
  >
    <div class="lg:col-span-1 w-7/12 lg:w-full text-center mx-auto">
      <DashboardSidebar />
    </div>

    <div class="xl:col-span-3 lg:col-span-2">
      <div class="bg-white w-11/12 mx-auto md:w-full shadow-md rounded-md p-10">
        <div>
          <h1 class="text-xl font-semibold">Profile</h1>

          <form
            method="post"
            @submit.prevent="handleUpdateProfile"
            enctype="multipart/form-data"
            v-if="isLoading"
          >
            <div class="md:flex items-center gap-5 mt-5">
              <img
                class="rounded-full w-20 h-20 object-cover"
                :src="user.avatar"
              />

              <input
                type="file"
                name="file"
                @change="onFileChange"
                id="file"
                class="block border border-gray-300 mt-3 rounded md:w-full w-full p-2.5 placeholder:text-sm placeholder:p-1 placeholder:text-gray-400"
              />
            </div>
            <div>
              <ProfileForm :validation="validation" />
            </div>

            <ProfileSubmitButton />
          </form>

          <CustomLoading height="100vh" v-else />
        </div>
      </div>

      <div
        class="bg-white w-11/12 mx-auto md:w-full shadow-md rounded-md p-10 mt-10 mb-12"
      >
        <h1 class="text-xl font-semibold">Change Password</h1>

        <form method="post" @submit.prevent="handleUpdatePassword">
          <Input
            name="password"
            label="Password*"
            placeholder="************"
            type="password"
            class="w-full"
            v-model="userPassword.password"
            :validation="validation.password"
          ></Input>
          <Input
            name="password_confirmation"
            label="Confirm Password*"
            placeholder="************"
            type="password"
            class="w-full"
            v-model="userPassword.password_confirmation"
          ></Input>

          <ProfileSubmitButton />
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from "vue-toastification";
definePageMeta({
  middleware: "auth",
});

const { fetchUser } = useAuthStore();
const { user, isLoading } = storeToRefs(useAuthStore());
const { updateProfile, updatePassword } = useProfileStore();

fetchUser();

const userPassword = reactive({
  password: "",
  password_confirmation: "",
});

const toast = useToast();
let validation = ref([]);

const imageAvatar = ref(null);

function onFileChange(e) {
  imageAvatar.value = e.target.files[0];

  if (!imageAvatar.value.type.match("image.*")) {
    e.target.value = "";
    imageAvatar.value = null;

    toast.error("Type must be a images");
  }
}

async function handleUpdateProfile() {
  let formData = new FormData();

  formData.append("avatar", imageAvatar.value);
  formData.append("first_name", user.value.first_name);
  formData.append("last_name", user.value.last_name);
  formData.append("email", user.value.email);
  formData.append("phone", user.value.phone);
  formData.append("address", user.value.address);
  formData.append("post_code", user.value.post_code);
  formData.append("country", user.value.country);
  formData.append("states", user.value.states);
  formData.append("city", user.value.city);

  await updateProfile(formData)
    .then(() => {
      toast.success("Profile Successfully Updated");
    })
    .catch((error) => {
      validation.value = error;
    });
}

async function handleUpdatePassword() {
  const error = await updatePassword(userPassword)
    .then(() => {
      toast.success("Password Successfully Updated");
    })
    .catch((error) => {
      validation.value = error;
    });
}
</script>
