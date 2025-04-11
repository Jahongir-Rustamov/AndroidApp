import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAuthStore } from "../stores/auth";
import InputField from "../components/InputField";
import { authStyles } from "../styles/authStyles";
import Toast from "react-native-toast-message";

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Signup: undefined;
  Contact: undefined;
  MyTests: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Login = () => {
  const [authInfo, setAuthInfo] = useState({
    email: "",
    password: "",
  });
  const navigation = useNavigation<NavigationProp>();
  const { login, isLoading } = useAuthStore();

  const showToast = (type: "success" | "error", text: string) => {
    Toast.show({
      type,
      text1: type === "success" ? "✅ Muvaffaqiyatli" : "❌ Xatolik",
      text2: text,
      position: "top",
      topOffset: 110,
      visibilityTime: 4000,
      autoHide: true,
      props: {
        closeButton: true,
        closeButtonStyle: {
          backgroundColor: type === "success" ? "#059669" : "#DC2626",
          padding: 8,
          borderRadius: 4,
        },
        closeButtonText: "✕",
        closeButtonTextStyle: {
          color: "white",
          fontSize: 14,
        },
      },
    });
  };

  const validateInputs = () => {
    if (!authInfo.email.trim()) {
      showToast("error", "‼️ Iltimos, emailingizni kiriting");
      return false;
    }
    if (!authInfo.email.includes("@")) {
      showToast("error", "‼️ Noto'g'ri email format");
      return false;
    }
    if (!authInfo.password.trim()) {
      showToast("error", "‼️ Iltimos, parolingizni kiriting");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateInputs()) return;

    try {
      await login(authInfo, () => {
        showToast("success", "✅ Muvaffaqiyatli tizimga kirdingiz");
        navigation.navigate("Home");
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        showToast("error", error.message);
      } else {
        showToast("error", "An unexpected error occurred");
      }
    }
  };

  const handleChange = (field: string) => (text: string) =>
    setAuthInfo((prev) => ({ ...prev, [field]: text }));

  const inputs = [
    {
      label: "Email:",
      icon: "envelope",
      placeholder: "example@gmail.com",
      field: "email",
      keyboardType: "email-address" as const,
      autoCapitalize: "none" as const,
    },
    {
      label: "Parol:",
      icon: "lock",
      placeholder: "******",
      field: "password",
      secureTextEntry: true,
    },
  ];

  return (
    <ScrollView
      style={authStyles.container}
      contentContainerStyle={authStyles.contentContainer}
    >
      <View style={authStyles.formContainer}>
        <Text style={authStyles.title}>Kirish</Text>
        <Text style={authStyles.subtitle}>
          Elektron pochta manzilingiz va parolingizni kiriting
        </Text>

        {inputs.map((input) => (
          <InputField
            key={input.field}
            {...input}
            value={authInfo[input.field as keyof typeof authInfo]}
            onChangeText={handleChange(input.field)}
          />
        ))}

        <TouchableOpacity
          style={[authStyles.button, isLoading && authStyles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={authStyles.buttonText}>Kirish</Text>
          )}
        </TouchableOpacity>

        <View style={authStyles.loginContainer}>
          <Text style={authStyles.loginText}>Hisobingiz yo'qmi? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={authStyles.loginLink}>
              Ro'yxatdan o'tish{" "}
              <FontAwesome5 name="arrow-right" size={13} color="#059669" />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;
