<template>
  <div>
    <Hero>
      <h1 class="text-5xl font-semibold">My Order</h1>
      <p class="text-gray-400 mt-5 flex items-center justify-center">
        Home
        <img src="/images/greater-than.png" alt="" width="30" />
        <span class="text-white">Order</span>
      </p>
    </Hero>

    <div
      class="lg:grid xl:grid-cols-4 lg:grid-cols-3 gap-8 container mx-auto mt-10"
    >
      <div class="lg:col-span-1 w-7/12 lg:w-full text-center mx-auto">
        <DashboardSidebar />
      </div>

      <div class="xl:col-span-3 lg:col-span-2">
        <div class="" v-if="isLoading">
          <Table
            :headers="[
              'Order ID',
              'Order Date',
              'Payment Method',
              'Payment Status',
              'Order Status',
              'Total',
              'Actions',
            ]"
          >
            <tr
              class="text-center text-gray-500 border"
              v-for="order in orders"
            >
              <td class="p-3 border-r">
                {{ order.invoice }}
              </td>
              <td class="p-3 border-r">
                {{ order.order_placed_at }}
              </td>
              <td class="p-3 border-r">
                {{ order.payment_method.toUpperCase() }}
              </td>
              <td class="p-3 border-r">
                {{ useUppercase(order.payment_status) }}
              </td>
              <td class="p-3 border-r">
                {{ useUppercase(order.status) }}
              </td>
              <td class="p-3 border-r">
                {{ useFormatPrice(order.total) }}
              </td>
              <td class="p-6 flex justify-center items-center">
                <NuxtLink :to="`/order/${order.invoice}`">
                  <EyeIcon />
                </NuxtLink>
              </td>
            </tr>
          </Table>
        </div>

        <CustomLoading height="50vh" v-else />
      </div>
    </div>
  </div>
</template>

<script setup>
const { orders, isLoading } = storeToRefs(useOrderStore());
const { getOrder } = useOrderStore();
getOrder();
</script>
