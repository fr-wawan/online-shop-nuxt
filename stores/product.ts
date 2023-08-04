export const useProductStore = defineStore("productStore", () => {
  const products = ref([]);
  const popularProducts = ref([]);
  const nextExists = ref<boolean>(false);
  const nextPage = ref<number>(0);
  const product = ref({});
  const currentPage = ref(1);
  const totalPages = ref(1);

  function getProduct(page: number = 1) {
    useApiFetch()
      .get(`/product/newest?page=${page}`)
      .then((response) => {
        products.value = response.data.data.data;

        currentPage.value = response.data.data.current_page;
        totalPages.value = response.data.data.last_page;

        if (response.data.data.current_page < response.data.data.last_page) {
          nextExists.value = true;
          nextPage.value = response.data.data.current_page + 1;
        } else {
          nextExists.value = false;
        }
      })
      .catch((error) => console.log(error));
  }

  function getPopularProduct() {
    useApiFetch()
      .get("/product")
      .then((response) => {
        popularProducts.value = response.data.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getDetailsProduct(slug: string) {
    useApiFetch()
      .get(`/product/${slug}`)
      .then((response) => {
        product.value = response.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function searchProduct(querySearch: string = "") {
    const response = await useApiFetch()
      .get(`/product/newest?q=${querySearch}`)
      .then((response) => {
        products.value = response.data.data.data;

        if (response.data.data.current_page < response.data.data.last_page) {
          nextExists.value = true;
          nextPage.value = response.data.data.current_page + 1;
        } else {
          nextExists.value = false;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getProductByFilter(category_id: number) {
    useApiFetch()
      .get(`/product/newest?category_id=${category_id}`)
      .then((response) => {
        products.value = response.data.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return {
    getProduct,
    products,
    nextExists,
    nextPage,
    getPopularProduct,
    popularProducts,
    searchProduct,
    getProductByFilter,
    getDetailsProduct,
    product,
    currentPage,
    totalPages,
  };
});
