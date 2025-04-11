import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Dimensions,
  Animated,
  Easing,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAuthStore } from "../stores/auth";

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Signup: undefined;
  Contact: undefined;
  MyTests: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const { width } = Dimensions.get("window");

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigation = useNavigation<NavigationProp>();
  const { user, logout } = useAuthStore();
  const slideAnim = useRef(new Animated.Value(-width * 0.8)).current;

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: -width * 0.8,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      setIsMenuOpen(false);
    });
  };

  const openMenu = () => {
    setIsMenuOpen(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const handleLogout = async () => {
    try {
      await logout();
      closeMenu();
      navigation.navigate("Login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const menuItems = [
    {
      icon: "home",
      text: "Bosh sahifa",
      onPress: () => navigation.navigate("Home"),
    },
    {
      icon: "headset",
      text: "Bog'lanish",
      onPress: () => navigation.navigate("Contact"),
    },
    {
      icon: "clipboard-list",
      text: "Mening Testlarim",
      onPress: () => navigation.navigate("MyTests"),
    },
  ];

  return (
    <View style={styles.container}>
      {/* Main Navbar */}
      <View style={styles.navbar}>
        {/* Menu Button */}
        <TouchableOpacity onPress={openMenu}>
          <FontAwesome5 name="bars" size={22} color="#002A5E" />
        </TouchableOpacity>

        {/* Logo */}
        <TouchableOpacity
          style={styles.logoContainer}
          onPress={() => navigation.navigate("Home")}
        >
          <View style={styles.logoBox}>
            <Text style={styles.logoText}>SM</Text>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>SMART-EXAM</Text>
            <Text style={styles.subtitle}>Online Test Platform</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Side Menu Modal */}
      <Modal visible={isMenuOpen} transparent={true} animationType="none">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={closeMenu}
        >
          <Animated.View
            style={[
              styles.sideMenu,
              {
                transform: [{ translateX: slideAnim }],
              },
            ]}
          >
            <View style={styles.menuHeader}>
              <Text style={styles.menuTitle}>Menu</Text>
              <TouchableOpacity style={styles.closeButton} onPress={closeMenu}>
                <FontAwesome5 name="times" size={24} color="#1E40AF" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.menuItems}>
              {menuItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.menuItem}
                  onPress={() => {
                    item.onPress();
                    closeMenu();
                  }}
                >
                  <FontAwesome5 name={item.icon} size={20} color="#1E40AF" />
                  <Text style={styles.menuItemText}>{item.text}</Text>
                </TouchableOpacity>
              ))}

              {!user ? (
                <View style={styles.authButtons}>
                  <TouchableOpacity
                    style={[styles.authButton, styles.signupButton]}
                    onPress={() => {
                      navigation.navigate("Signup");
                      closeMenu();
                    }}
                  >
                    <Text style={styles.authButtonText}>Ro'yxatdan O'tish</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.authButton, styles.authLoginButton]}
                    onPress={() => {
                      navigation.navigate("Login");
                      closeMenu();
                    }}
                  >
                    <Text style={styles.authButtonText}>Kirish</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={[styles.menuItem, styles.logoutButton]}
                  onPress={handleLogout}
                >
                  <FontAwesome5 name="sign-out-alt" size={20} color="#DC2626" />
                  <Text style={[styles.menuItemText, styles.logoutText]}>
                    Chiqish
                  </Text>
                </TouchableOpacity>
              )}
            </ScrollView>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    elevation: 4, // Android uchun shadow effect

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    paddingTop: 44,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoBox: {
    width: 40,
    height: 40,
    backgroundColor: "#1E40AF",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  titleContainer: {
    marginLeft: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "900",
    color: "#1E3A8A",
  },
  subtitle: {
    fontSize: 9,
    color: "blue",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  sideMenu: {
    width: width * 0.8,
    height: "100%",
    backgroundColor: "white",
    position: "absolute",
    left: 0,
    top: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E40AF",
  },
  closeButton: {
    padding: 8,
  },
  menuItems: {
    flex: 1,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  menuItemText: {
    marginLeft: 16,
    fontSize: 16,
    color: "#1F2937",
  },
  authButtons: {
    padding: 16,
    gap: 8,
  },
  authButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  signupButton: {
    backgroundColor: "#F97316",
  },
  authLoginButton: {
    backgroundColor: "#3B82F6",
  },
  authButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#FEE2E2",
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  logoutText: {
    color: "#DC2626",
    fontWeight: "600",
  },
});

export default Navbar;
