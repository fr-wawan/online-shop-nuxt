export const useCategoryStore = defineStore("categoryStore", () => {
  const categories = ref([]);

  function getCategory() {
    useApiFetch()
      .get("/category")
      .then((response) => {
        categories.value = response.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return { categories, getCategory };
});
