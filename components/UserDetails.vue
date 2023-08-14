<template>
  <div
    class="bg-white w-11/12 mx-auto md:w-full shadow-md rounded-md p-10"
    v-if="isLoading"
  >
    <h1 class="text-xl border-b pb-3 font-semibold">User Details</h1>

    <div class="overflow-auto lg:overflow-hidden">
      <table class="border mt-5 w-full">
        <tr>
          <td class="w-52 border p-3">NO INVOICE</td>
          <td class="w-5 border text-center">:</td>
          <td class="border px-6">{{ order.invoice }}</td>
        </tr>
        <tr>
          <td class="w-52 border p-3">FULL NAME</td>
          <td class="md:w-10 w-52 p-3 border text-center">:</td>
          <td class="border px-6">
            {{ `${order.first_name} ${order.last_name}` }}
          </td>
        </tr>
        <tr>
          <td class="w-52 border p-3">PHONE NUMBER</td>
          <td class="md:w-10 w-52 p-3 border text-center">:</td>
          <td class="border px-6">{{ order.phone }}</td>
        </tr>
        <tr>
          <td class="w-52 border p-3">REGION</td>
          <td class="md:w-10 w-52 p-3 border text-center">:</td>
          <td class="border px-6">
            {{ `${order.country}, ${order.states}, ${order.city}` }}
          </td>
        </tr>

        <tr>
          <td class="w-52 border p-3">ADDRESS</td>
          <td class="md:w-10 w-52 p-3 border text-center">:</td>
          <td class="border px-6">{{ order.address }}</td>
        </tr>
        <tr>
          <td class="w-52 border p-3">DELIVERY STATUS</td>
          <td class="md:w-10 w-52 p-3 border text-center">:</td>
          <td class="border px-6">{{ useUppercase(order.status) }}</td>
        </tr>
        <tr>
          <td class="w-52 border p-3">PAYMENT STATUS</td>
          <td class="md:w-10 w-52 p-3 border text-center">:</td>
          <td class="border px-6">
            <div class="flex items-center gap-5">
              <p>{{ order.payment_method.toUpperCase() }}</p>
              <span>/</span>
              <button
                class="bg-blue-700 text-sm p-1.5 px-5 shadow rounded text-white"
                v-if="
                  order.payment_method == 'midtrans' &&
                  order.payment_status == 'pending'
                "
                @click.prevent="midtransPayment(order.snap_token)"
              >
                PAY NOW
              </button>
              <p v-else>Completed</p>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
  <CustomLoading v-else height="50vh" />
</template>

<script setup>
const { order, isLoading } = storeToRefs(useOrderStore());
const { $toast } = useNuxtApp();

function midtransPayment(snapToken) {
  window.snap.pay(snapToken, {
    onSuccess: function () {
      navigateTo("/order");
      $toast.success("Success!");
    },
    onPending: function () {
      navigateTo("/order");
      $toast.error("Pending!");
    },
    onError: function () {
      navigateTo("/order");
      $toast.error("Error!");
    },
  });
}
</script>
