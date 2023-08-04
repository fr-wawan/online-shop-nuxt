interface UserLogin {
  email: string;
  password: string;
}

interface UserRegister {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export const useAuthStore = defineStore("authStore", () => {
  const token: any = useCookie("token", {
    expires: new Date(Date.now() + 600 * 60 * 1000),
  });
  const user = ref(null);
  const isLoading = ref(false);

  async function fetchUser() {
    const response = await useApiFetch()
      .get("/profile", {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })
      .then((response) => {
        user.value = response.data.data;
        isLoading.value = true;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function login(userData: UserLogin) {
    try {
      const response = await useApiFetch().post("/login", {
        email: userData.email,
        password: userData.password,
      });

      token.value = response.data.token;

      return response;
    } catch (error: any) {
      throw error.response.data;
    }
  }

  async function register(userData: UserRegister) {
    try {
      const response = await useApiFetch().post("/register", {
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        password: userData.password,
        password_confirmation: userData.password_confirmation,
      });

      token.value = response.data.token;

      return response;
    } catch (error: any) {
      throw error.response.data;
    }
  }

  function logout() {
    token.value = null;
  }

  return { token, login, register, logout, fetchUser, user, isLoading };
});
