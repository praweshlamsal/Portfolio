import api from "@/utils/lib/axiosInstance";

interface AuthResponse {
  user: {
    id: string;
    email: string;
    name?: string;
  };
}

// Register User
export const registerUser = async (email: string, password: string, name?: string) => {
  try {
    const { data } = await api.post<AuthResponse>("/auth/signup", { email, password, name });
    return data;
  } catch (error) {
    throw error;
  }
};

// Get Logged-in User
export const getUserProfile = async () => {
  try {
    const { data } = await api.get<AuthResponse>("/auth/profile");
    return data;
  } catch (error) {
    throw error;
  }
};
