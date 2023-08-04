<template>
  <div class="md:flex gap-5">
    <Input
      name="first_name"
      label="First Name*"
      placeholder="Your First Name"
      class="w-full"
      v-model="user.first_name"
      :validation="validation.first_name"
    ></Input>

    <Input
      name="last_name"
      label="Last Name*"
      placeholder="Your Last Name"
      class="w-full"
      v-model="user.last_name"
      :validation="validation.last_name"
    ></Input>
  </div>
  <Input
    name="email"
    label="Email*"
    placeholder="Your Email"
    class="w-full"
    v-model="user.email"
    :validation="validation.email"
  ></Input>
  <Input
    name="address"
    label="Address*"
    placeholder="Your Address"
    v-model="user.address"
    :validation="validation.address"
  ></Input>
  <Input
    name="phone"
    label="Contact Number*"
    placeholder="Your Contact Number"
    class="w-full"
    v-model="user.phone"
    :validation="validation.phone"
  ></Input>

  <div class="md:flex gap-5">
    <div class="my-5 w-full">
      <label for="">Country</label>

      <select
        name="country"
        id="country"
        class="w-full block border border-gray-300 mt-3 rounded l p-2.5 placeholder:text-sm placeholder:p-1 placeholder:text-gray-500"
        v-model="user.country"
        required
      >
        <option
          v-for="(country, index) in countries"
          :value="country.name"
          :key="country.id"
          :selected="country.name == user.country"
        >
          {{ country.name }}
        </option>
      </select>
      <div
        v-if="validation.country"
        class="text-red-500 mt-3"
        v-html="validation.country"
      ></div>
    </div>

    <div class="my-5 w-full">
      <label for="">States</label>
      <select
        name="states"
        id="states"
        v-model="user.states"
        @change="user.city = ''"
        class="w-full block border border-gray-300 mt-3 rounded l p-2.5 placeholder:text-sm placeholder:p-1 placeholder:text-gray-400"
      >
        <option
          v-for="state in filteredStates"
          :value="state.name"
          :key="state.id"
        >
          {{ state.name }}
        </option>
      </select>
      <div
        v-if="validation.state"
        class="text-red-500 mt-3"
        v-html="validation.state"
      ></div>
    </div>
  </div>

  <div class="md:flex gap-5">
    <Input
      name="zip_code"
      label="Zip Code*"
      placeholder="Your Zip Code"
      class="w-full"
      v-model="user.post_code"
      :validation="validation.post_code"
    ></Input>
    <div class="my-5 w-full">
      <label for="">City</label>
      <select
        name="city"
        id="city"
        v-model="user.city"
        class="w-full block border border-gray-300 mt-3 rounded l p-2.5 placeholder:text-sm placeholder:p-1 placeholder:text-gray-400"
      >
        <option
          v-for="city in filteredCities"
          :value="city.name"
          :key="city.id"
        >
          {{ city.name }}
        </option>
      </select>
      <div
        v-if="validation.city"
        class="text-red-500 mt-3"
        v-html="validation.city"
      ></div>
    </div>
  </div>
</template>

<script setup>
import countryData from "~/assets/json/data-indonesia.json";

const props = defineProps({
  validation: Object,
});

const countries = countryData;

const { user } = storeToRefs(useAuthStore());

const filteredStates = computed(() => {
  const profileCountry = user.value.country;
  if (profileCountry) {
    const country = countries.find(
      (country) => country.name === profileCountry
    );

    return country.states;
  }
  return [];
});

const filteredCities = computed(() => {
  const profileStates = user.value.states;

  if (profileStates) {
    const states = filteredStates.value.find(
      (state) => state.name == user.value.states
    );

    return states.cities;
  }
  return [];
});
</script>
