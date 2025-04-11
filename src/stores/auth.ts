import { create } from "zustand";
// import { api } from "../api/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  ID: boolean;
};

type AuthStore = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  signup: (data: SignupData, callback: () => void) => Promise<void>;
  login: (data: LoginData, callback: () => void) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;

  setToken: (token: string) => Promise<void>;
  clearError: () => void;
};

type SignupData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type LoginData = {
  email: string;
  password: string;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  signup: async ({ name, email, password, confirmPassword }, callback) => {
    set({ isLoading: true, error: null });

    if (password.length < 6) {
      set({ isLoading: false });
      throw new Error("Parol uzunligi kamida 6 bo'lsin!");
    }

    if (password !== confirmPassword) {
      set({ isLoading: false });
      throw new Error("Parol mos emas!");
    }

    try {
      const res = await fetch(`${getBackendUrl()}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Signup failed");
      }

      const data = await res.json();
      set({ user: data, isLoading: false });
      callback(); // Navigate to homepage
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || "Xatolik yuz berdi ⚠️",
      });
      throw error;
    }
  },

  login: async ({ email, password }, callback) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${getBackendUrl()}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      const { _id, name, email: userEmail, role, ID } = data;

      set({
        user: { _id, name, email: userEmail, role, ID },
        isAuthenticated: true,
        isLoading: false,
      });
      callback();
    } catch (error: any) {
      set({
        error: error.message || "Xatolik yuz berdi ⚠️",
        isLoading: false,
      });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await fetch(`${getBackendUrl()}/api/auth/logout`, {
        method: "POST",
      });
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Xatolik yuz berdi ⚠️",
        isLoading: false,
      });
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${getBackendUrl()}/api/auth/checkauth`);

      if (!response.ok) {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
        return;
      }

      const data = await response.json();
      const { _id, name, email, role, ID } = data;

      set({
        user: { _id, name, email, role, ID },
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        user: null,
        isAuthenticated: false,
        error: error.message || "Xatolik yuz berdi ⚠️",
        isLoading: false,
      });
    }
  },

  setToken: async (token: string) => {
    await AsyncStorage.setItem("token", token);
    set({ token });
  },

  clearError: () => set({ error: null }),
}));

const getBackendUrl = () => {
  if (__DEV__) {
    return "http://192.168.39.218:3000"; // Backend manzili
  }
  return "http://192.168.39.218:3000"; // Production uchun ham bir xil
};
