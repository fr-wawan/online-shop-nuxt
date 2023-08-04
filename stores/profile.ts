interface userUpdate {
  value: {
    first_name: string;
    last_name: string;
    email: string;
    address: string;
    country: string;
    phone: string;
    states: string;
    post_code: string;
    city: string;
  };
}

interface passwordUpdate {
  password: string;
  password_confirmation: string;
}

export const useProfileStore = defineStore("profileStore", () => {
  const token: any = useCookie("token", {
    expires: new Date(Date.now() + 600 * 60 * 1000),
  });

  async function updateProfile(formData: any) {
    try {
      await useApiFetch().post("/profile", formData, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });
    } catch (error: any) {
      throw error.response.data;
    }
  }

  async function updatePassword(user: any) {
    try {
      await useApiFetch().post("/profile/password", user, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });
    } catch (error: any) {
      throw error.response.data;
    }
  }

  return { updateProfile, updatePassword };
});
