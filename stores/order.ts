export const useOrderStore = defineStore("orderStore", () => {
  const orders = ref([]);
  const order = ref({});
  const token = useCookie("token");
  const isLoading = ref(false);
  const isLoadingDetails = ref(false);

  function getOrder() {
    useApiFetch()
      .get("/transaction", {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })
      .then((response) => {
        orders.value = response.data.data;
        isLoading.value = true;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function detailsOrder(invoice: string) {
    useApiFetch()
      .get(`/transaction/${invoice}`, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })
      .then((response) => {
        order.value = response.data.data;
        isLoadingDetails.value = true;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function storeOrder(formData: any, paymentMethod: string) {
    try {
      const response = await useApiFetch().post(
        `/transaction/${paymentMethod}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        }
      );

      const store = useCartStore();
      store.getCart();

      return response.data.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }
  return {
    getOrder,
    detailsOrder,
    storeOrder,
    orders,
    order,
    isLoading,
    isLoadingDetails,
  };
});
