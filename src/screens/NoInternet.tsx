import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { FontAwesome } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const { width } = Dimensions.get("window");

type RootStackParamList = {
  Home: undefined;
};

type NoInternetProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};

const NoInternet = ({ navigation }: NoInternetProps) => {
  const [isConnected, setIsConnected] = useState<boolean>(true);

  const checkInternet = async () => {
    const netInfo = await NetInfo.fetch();
    setIsConnected(netInfo.isConnected === true);
  };

  useEffect(() => {
    checkInternet();

    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected === true);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Agar internet mavjud bo'lsa, asosiy sahifaga o'tish
  useEffect(() => {
    if (isConnected) {
      navigation.replace("Home");
    }
  }, [isConnected]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <FontAwesome name="wifi" size={80} color="#3B82F6" />
        </View>

        <Text style={styles.title}>Internet yo'q</Text>

        <Text style={styles.description}>
          Iltimos, internet aloqangizni tekshiring va qayta urinib ko'ring
        </Text>

        <TouchableOpacity style={styles.refreshButton} onPress={checkInternet}>
          <FontAwesome name="refresh" size={20} color="white" />
          <Text style={styles.refreshButtonText}>Qayta urinish</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  content: {
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  iconContainer: {
    width: 120,
    height: 120,
    backgroundColor: "#EFF6FF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 12,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#4B5563",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 24,
  },
  refreshButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3B82F6",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: "#3B82F6",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  refreshButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});

export default NoInternet;
