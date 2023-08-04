interface StoreCart {
  id: number;
  quantity: number;
}

interface UpdateCart {
  id: number;
  quantity: number;
}

interface DeleteCart {
  id: number;
}

export const useCartStore = defineStore("cartStore", () => {
  const token = useCookie("token");
  const carts: any = ref([]);
  const count = ref<number | undefined>(0);
  const isLoading = ref(false);

  function getCart() {
    useApiFetch()
      .get("/cart", {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })
      .then((response) => {
        carts.value = response.data.data;
        count.value = response.data.count;
        isLoading.value = true;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function storeCart(formData: StoreCart) {
    try {
      useApiFetch().post(
        "/cart",
        {
          id: formData.id,
          quantity: formData.quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        }
      );
      const store = useCartStore();

      store.getCart();
    } catch (error: any) {
      throw error.response.data;
    }
  }

  async function updateCart(formData: UpdateCart) {
    try {
      const response = await useApiFetch().put(
        `/cart/${formData.id}`,
        {
          quantity: formData.quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        }
      );

      const store = useCartStore();

      store.getCart();

      return response;
    } catch (error: any) {
      throw error.response.data;
    }
  }

  async function deleteCart(cart: DeleteCart) {
    try {
      const response = await useApiFetch().delete(`/cart/${cart.id}`, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });
      const store = useCartStore();

      store.getCart();

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  const cartTotal = computed(() => {
    return carts.value
      .reduce((acc: number, cart: any) => {
        return cart.quantity * cart.product.price + acc;
      }, 0)
      .toFixed(2);
  });

  return {
    getCart,
    carts,
    count,
    storeCart,
    updateCart,
    cartTotal,
    isLoading,
    deleteCart,
  };
});
