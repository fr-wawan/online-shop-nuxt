<template>
  <div class="bg-white rounded shadow-md p-10">
    <div>
      <h1 class="text-xl font-semibold">Billing Details</h1>
      <div class="md:flex gap-5">
        <Input
          name="first_name"
          label="First Name*"
          placeholder="Your First Name"
          class="w-full"
          v-model="user.first_name"
        ></Input>

        <Input
          name="last_name"
          label="Last Name*"
          placeholder="Your Last Name"
          class="w-full"
          v-model="user.last_name"
        ></Input>
      </div>
      <Input
        name="address"
        label="Address*"
        placeholder="Your Address"
        v-model="user.address"
        class="w-full"
      ></Input>
      <div class="md:flex gap-5">
        <div class="my-5 w-full">
          <label for="">Country</label>

          <select
            v-model="user.country"
            name="country"
            id="country"
            class="w-full block border border-gray-300 mt-3 rounded l p-2.5 placeholder:text-sm placeholder:p-1 placeholder:text-gray-500"
            required
          >
            <option
              v-for="(country, index) in countries"
              :value="country.name"
              :selected="country.name == user.country"
            >
              {{ country.name }}
            </option>
          </select>
        </div>

        <div class="my-5 w-full">
          <label for="">States</label>
          <select
            name="states"
            id="states"
            v-model="user.states"
            class="w-full block border border-gray-300 mt-3 rounded l p-2.5 placeholder:text-sm placeholder:p-1 placeholder:text-gray-400"
          >
            <option v-for="state in filteredStates" :value="state.name">
              {{ state.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="my-5 w-full">
        <label for="">City</label>
        <select
          name="city"
          id="city"
          v-model="user.city"
          class="w-full block border border-gray-300 mt-3 rounded l p-2.5 placeholder:text-sm placeholder:p-1 placeholder:text-gray-400"
        >
          <option v-for="city in filteredCities" :value="city.name">
            {{ city.name }}
          </option>
        </select>
      </div>
      <Input
        name="zip_code"
        label="Zip Code*"
        placeholder="Your Zip Code"
        class="w-full"
        v-model="user.post_code"
      ></Input>

      <div class="my-9">
        <h3 class="text-lg" for="user_notes">Additional Information</h3>
        <textarea
          name="user_notes"
          class="block border border-gray-300 mt-3 rounded md:w-full w-full p-2.5 placeholder:text-sm placeholder:p-1 placeholder:text-gray-400"
          id="user_notes"
          cols="30"
          rows="10"
          placeholder="Order Notes (Optional)"
          v-model="user_notes"
          @input="$emit('getNotes', user_notes)"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script setup>
import countryData from "~/assets/json/data-indonesia.json";

const props = defineProps({
  validation: Object,
});

const countries = countryData;
const user_notes = ref("");

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
