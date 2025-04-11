import { create } from "zustand";
import Toast from "react-native-toast-message";
import { Subject, Statistics } from "./types";

const getBackendUrl = () => {
  if (__DEV__) {
    return "http://192.168.39.218:3000";
  }
  return "http://192.168.39.218:3000";
};

export interface TestsStore {
  subject: Subject[] | null;
  statistics: Statistics | null;
  loading: boolean;
  mytests: any[];
  Questions: any[];
  CheckingProccess: any[];
  WorkedOn: any | null;
  TeachersAdmins: any[];
  ChangeTeachers: any[];

  setProducts: (subject: any) => void;
  setMytests: (mytests: any) => void;
  getSubjects: () => Promise<void>;
  getMytests: (id: string) => Promise<void>;
  getTestQuestions: (id: string) => Promise<void>;
  getStatistics: () => Promise<void>;
  checkAnswers: (
    student_questionsMassive: any,
    TestID: string
  ) => Promise<void>;
  MyTestsWorkedOn: () => Promise<void>;
}

export const useTestsStore = create<TestsStore>((set) => ({
  subject: [],
  loading: false,
  mytests: [],
  Questions: [],
  statistics: null,
  CheckingProccess: [],
  WorkedOn: null,
  TeachersAdmins: [],
  ChangeTeachers: [],
  setProducts: (subject) => set({ subject }),
  setMytests: (mytests) => set({ mytests }),

  getSubjects: async () => {
    set({ loading: true });
    try {
      const res = await fetch(`${getBackendUrl()}/api/get_tests/tests`);
      console.log("Response status:", res.status);
      console.log("Response headers:", res.headers);

      const text = await res.text();
      console.log("Raw response:", text);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = JSON.parse(text);
      console.log("Parsed data:", data);

      if (data?.subjects) {
        set({ subject: data.subjects, loading: false });
      } else {
        set({ loading: false });
      }
    } catch (error: any) {
      set({ loading: false });
      console.error("Fanlarni olishda xatolik:", error);
      Toast.show({
        type: "error",
        text1: "Xatolik yuz berdi ⚠️",
        text2: error.message || "Fanlarni olishda xatolik yuz berdi",
      });
    }
  },

  getMytests: async (id) => {
    set({ loading: true });
    try {
      const res = await fetch(`${getBackendUrl()}/get_tests/getMytest/${id}`);
      const data = await res.json();

      if (data?.Mytests) {
        set({ mytests: data.Mytests, loading: false });
      } else {
        set({ loading: false });
        Toast.show({
          type: "error",
          text1: "Testlar topilmadi ⚠️",
          text2: data?.message || "Xatolik yuz berdi ⚠️",
        });
      }
    } catch (error: any) {
      set({ loading: false });
      const errorMessage = error.message || "Xatolik yuz berdi ⚠️";
      Toast.show({
        type: "error",
        text1: "Xatolik yuz berdi ⚠️",
        text2: errorMessage,
      });
    }
  },

  getTestQuestions: async (id) => {
    set({ loading: true });
    try {
      const res = await fetch(`${getBackendUrl()}/student/get/questions/${id}`);
      const data = await res.json();

      if (data) {
        set({ Questions: data, loading: false });
      } else {
        set({ loading: false });
        Toast.show({
          type: "error",
          text1: "Test savollari topilmadi ⚠️",
        });
      }
    } catch (error: any) {
      set({ loading: false });
      console.log(error.message);
      const errorMessage = error.message || "Xatolik yuz berdi ⚠️";
      Toast.show({
        type: "error",
        text1: "Xatolik yuz berdi ⚠️",
        text2: errorMessage,
      });
    }
  },

  getStatistics: async () => {
    set({ loading: true });
    try {
      const res = await fetch(`${getBackendUrl()}/api/get/Statistics`);
      console.log("Statistics response status:", res.status);
      console.log("Statistics response headers:", res.headers);

      const text = await res.text();
      console.log("Statistics raw response:", text);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = JSON.parse(text);
      console.log("Statistics parsed data:", data);

      if (data) {
        set({ statistics: data, loading: false });
      } else {
        set({ loading: false });
        Toast.show({
          type: "error",
          text1: "Statistika ma'lumotlari topilmadi ⚠️",
          text2: data?.message || "Xatolik yuz berdi ⚠️",
        });
      }
    } catch (error: any) {
      set({ loading: false });
      console.error("Statistika ma'lumotlarini olishda xatolik:", error);
      Toast.show({
        type: "error",
        text1: "Xatolik yuz berdi ⚠️",
        text2:
          error.message ||
          "Statistika ma'lumotlarini olishda xatolik yuz berdi",
      });
    }
  },

  checkAnswers: async (student_questionsMassive, TestID) => {
    set({ loading: true });
    try {
      const response = await fetch(
        `${getBackendUrl()}/student/checkAnswers/${TestID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ student_questionsMassive }),
        }
      );
      const data = await response.json();
      console.log("Response:", data);

      if (data) {
        set({ CheckingProccess: data, loading: false });
      } else {
        set({ loading: false });
        Toast.show({
          type: "error",
          text1: "Javoblarni tekshirishda xatolik yuz berdi",
          text2: "Xatolik yuz berdi ⚠️",
        });
      }
    } catch (error: any) {
      set({ loading: false });
      const errorMessage = error.message || "Xatolik yuz berdi ⚠️";
      Toast.show({
        type: "error",
        text1: "Xatolik yuz berdi ⚠️",
        text2: errorMessage,
      });
    }
  },

  MyTestsWorkedOn: async () => {
    set({ loading: true });
    try {
      const res = await fetch(
        `${getBackendUrl()}/profile/get_infos_of_profile`
      );
      const data = await res.json();

      if (data) {
        set({ WorkedOn: data, loading: false });
      } else {
        set({ loading: false });
        Toast.show({
          type: "error",
          text1: "Ma'lumotlar topilmadi ⚠️",
          text2: "Xatolik yuz berdi ⚠️",
        });
      }
    } catch (error: any) {
      set({ loading: false });
      const errorMessage = error.message || "Xatolik yuz berdi ⚠️";
      Toast.show({
        type: "error",
        text1: "Xatolik yuz berdi ⚠️",
        text2: errorMessage,
      });
    }
  },
}));
