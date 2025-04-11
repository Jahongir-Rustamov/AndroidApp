import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, StyleSheet, StatusBar } from "react-native";
import Toast from "react-native-toast-message";
import { useAuthStore } from "./src/stores/auth";

import Navbar from "./src/components/Navbar";
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/Login";
import SignupScreen from "./src/screens/SignUp";
import ContactScreen from "./src/screens/Contact";
import MyTestsScreen from "./src/screens/MyTests";
import NoInternet from "./src/screens/NoInternet";
import EachTests from "./src/screens/EachTests";
import LoadingScreen from "@/components/LoadingScreen";

const Stack = createNativeStackNavigator();

type RootStackParamList = {
  Subject: { name: string; id: string };
  [key: string]: any;
};

const App = () => {
  const { user, isAuthenticated, checkAuth, isLoading, error } = useAuthStore();

  React.useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isLoading) return <LoadingScreen />;

  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor="#ffffff"
        barStyle="dark-content"
        translucent={true}
      />

      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          contentStyle: { marginTop: 100 },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen name="Contact" component={ContactScreen} />
        <Stack.Screen name="MyTests" component={MyTestsScreen} />
        <Stack.Screen name="NoInternet" component={NoInternet} />
        <Stack.Screen
          name="Subject"
          component={EachTests}
          initialParams={{ name: "Default Name", id: "default-id" }}
          options={({ route }) => ({
            title:
              (route.params as RootStackParamList["Subject"])?.name ||
              "Subject",
          })}
        />
      </Stack.Navigator>

      <Navbar />
      <Toast />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default App;
