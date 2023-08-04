import axios from "axios";

export default defineNuxtPlugin(async () => {
  return {
    provide: {
      axios: axios,
    },
  };
});
