import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
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

const Signup = () => {
  const [authInfo, setAuthInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigation = useNavigation<NavigationProp>();
  const { signup, isLoading } = useAuthStore();

  const showToast = (type: "success" | "error", text: string) => {
    Toast.show({
      type,
      text1: type === "success" ? "✅ Muvaffaqiyatli" : "❌ Xatolik",
      text2: text,
      position: "top",
      topOffset: 50,
      visibilityTime: 3000,
      autoHide: true,
    });
  };

  const validateInputs = () => {
    if (!authInfo.name.trim()) {
      showToast("error", "‼️ Iltimos, ismingizni kiriting");
      return false;
    }
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
    if (!authInfo.confirmPassword.trim()) {
      showToast("error", "‼️ Iltimos, parolni tasdiqlang");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateInputs()) return;

    try {
      await signup(authInfo, () => {
        showToast("success", "✅ Muvaffaqiyatli ro'yxatdan o'tdingiz");
        navigation.navigate("Home");
      });
    } catch (error: any) {
      showToast("error", error.message || "Xatolik yuz berdi");
    }
  };

  const handleChange = (field: keyof typeof authInfo) => (text: string) =>
    setAuthInfo((prev) => ({ ...prev, [field]: text }));

  const inputs = [
    {
      label: "To'liq ism:",
      icon: "user",
      placeholder: "Ismingiz",
      field: "name",
    },
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
    {
      label: "Parolni tasdiqlang:",
      icon: "lock",
      placeholder: "******",
      field: "confirmPassword",
      secureTextEntry: true,
    },
  ];

  return (
    <ScrollView
      style={authStyles.container}
      contentContainerStyle={authStyles.contentContainer}
    >
      <View style={authStyles.formContainer}>
        <Text style={authStyles.title}>Ro'yxatdan o'tish</Text>
        <Text style={authStyles.subtitle}>
          Email, to'liq ism va parolingizni kiriting
        </Text>

        {inputs.map((input) => (
          <InputField
            key={input.field}
            label={input.label}
            icon={input.icon}
            placeholder={input.placeholder}
            value={authInfo[input.field as keyof typeof authInfo]}
            onChangeText={handleChange(input.field as keyof typeof authInfo)}
            keyboardType={input.keyboardType}
            autoCapitalize={input.autoCapitalize}
            secureTextEntry={input.secureTextEntry}
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
            <Text style={authStyles.buttonText}>Ro'yxatdan o'tish</Text>
          )}
        </TouchableOpacity>

        <View style={authStyles.loginContainer}>
          <Text style={authStyles.loginText}>Hisobingiz bormi? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={authStyles.loginLink}>
              Kirish{" "}
              <FontAwesome5 name="arrow-right" size={13} color="#059669" />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Signup;
