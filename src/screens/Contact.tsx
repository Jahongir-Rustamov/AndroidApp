import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Dimensions,
} from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const Contact = () => {
  const openMap = () => {
    const url = "https://www.google.com/maps?q=41.550987,60.629753";
    Linking.openURL(url);
  };

  const openLink = (url) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Biz bilan bog'lanish</Text>
        <View style={styles.headerLine} />
      </View>

      <View style={styles.content}>
        {/* Contact Information */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Biz bilan bog'lanish</Text>
          <Text style={styles.cardDescription}>
            O'z bilim va tajribangizni o'quvchilar bilan baham ko'rishni
            istaysizmi? Bizning platformamizda o'z faningizni yuritish uchun
            reseptionlarimiz bilan bog'laning
          </Text>

          {/* Phone */}
          <TouchableOpacity
            style={styles.contactItem}
            onPress={() => Linking.openURL("tel:+998997654321")}
          >
            <View style={styles.iconContainer}>
              <FontAwesome name="phone" size={20} color="#2563eb" />
            </View>
            <View style={styles.contactTextContainer}>
              <Text style={styles.contactLabel}>Telefon raqam</Text>
              <Text style={styles.contactValue}>+998 99 765 43 21</Text>
            </View>
          </TouchableOpacity>

          {/* Telegram */}
          <TouchableOpacity
            style={styles.contactItem}
            onPress={() => openLink("https://t.me/registon_admin")}
          >
            <View style={styles.iconContainer}>
              <FontAwesome name="telegram" size={20} color="#2563eb" />
            </View>
            <View style={styles.contactTextContainer}>
              <Text style={styles.contactLabel}>
                Reseption bilan bog'lanish
              </Text>
              <Text style={styles.contactValue}>@registon_admin</Text>
            </View>
          </TouchableOpacity>

          {/* Address */}
          <View style={styles.contactItem}>
            <View style={styles.iconContainer}>
              <FontAwesome name="map-marker" size={20} color="#2563eb" />
            </View>
            <View style={styles.contactTextContainer}>
              <Text style={styles.contactLabel}>Bizning manzil</Text>
              <Text style={styles.contactValue}>
                Urganch shahri, Al-Xorazmiy ko'chasi, 15-uy
              </Text>
            </View>
          </View>
        </View>

        {/* Working Hours */}
        <View style={styles.card}>
          <View style={styles.workingHoursHeader}>
            <View style={styles.iconContainer}>
              <FontAwesome name="clock-o" size={20} color="#2563eb" />
            </View>
            <Text style={styles.workingHoursTitle}>Ish vaqtlari</Text>
          </View>

          <View style={styles.workingHoursContent}>
            <View style={styles.workingHoursRow}>
              <Text style={styles.workingHoursDay}>Dushanba - Juma</Text>
              <Text style={styles.workingHoursTime}>8:00 - 18:00</Text>
            </View>
            <View style={styles.workingHoursRow}>
              <Text style={styles.workingHoursDay}>Shanba</Text>
              <Text style={styles.workingHoursTime}>9:00 - 15:00</Text>
            </View>
            <View style={styles.workingHoursRow}>
              <Text style={styles.workingHoursDay}>Yakshanba</Text>
              <Text style={styles.workingHoursTime}>Yopiq</Text>
            </View>
          </View>
        </View>

        {/* Map */}
        <TouchableOpacity style={styles.mapCard} onPress={openMap}>
          <View style={styles.mapPlaceholder}>
            <MaterialIcons name="map" size={40} color="#2563eb" />
            <Text style={styles.mapText}>Xaritani ko'rish uchun bosing</Text>
          </View>
        </TouchableOpacity>

        {/* Social Media */}
        <View style={styles.card}>
          <Text style={styles.socialTitle}>
            Bizni ijtimoiy tarmoqlarda kuzating
          </Text>
          <View style={styles.socialGrid}>
            <View style={{ flexDirection: "row", gap: 12 }}>
              <TouchableOpacity
                style={[styles.socialButton, { backgroundColor: "#EFF6FF" }]}
                onPress={() => openLink("https://t.me/registonuz")}
              >
                <FontAwesome name="telegram" size={24} color="#2563eb" />
                <Text style={styles.socialText}>Telegram</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.socialButton, { backgroundColor: "#FDF2F8" }]}
                onPress={() => openLink("https://instagram.com/registon.uz")}
              >
                <FontAwesome name="instagram" size={24} color="#DB2777" />
                <Text style={styles.socialText}>Instagram</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row", gap: 12 }}>
              <TouchableOpacity
                style={[styles.socialButton, { backgroundColor: "#EEF2FF" }]}
                onPress={() => openLink("https://facebook.com/registon")}
              >
                <FontAwesome name="facebook" size={24} color="#4F46E5" />
                <Text style={styles.socialText}>Facebook</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.socialButton, { backgroundColor: "#FEF2F2" }]}
                onPress={() => openLink("https://youtube.com/registonuz")}
              >
                <FontAwesome name="youtube" size={24} color="#DC2626" />
                <Text style={styles.socialText}>YouTube</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    backgroundColor: "#3B82F6",
    padding: 22,
    alignItems: "center",
    marginTop: -2,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    fontStyle: "italic",
  },
  headerLine: {
    width: 60,
    height: 2,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    marginTop: 10,
    borderRadius: 1,
  },
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 13,
    color: "#4B5563",
    marginBottom: 24,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: "#EFF6FF",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  contactTextContainer: {
    marginLeft: 12,
  },
  contactLabel: {
    fontSize: 12,
    color: "#6B7280",
  },
  contactValue: {
    fontSize: 14,
    color: "#1F2934",
  },
  workingHoursHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  workingHoursTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1F2937",
    marginLeft: 12,
  },
  workingHoursContent: {
    marginLeft: 52,
  },
  workingHoursRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  workingHoursDay: {
    fontSize: 14,
    color: "#4B5563",
  },
  workingHoursTime: {
    fontSize: 14,
    color: "#1F2937",
  },
  mapCard: {
    backgroundColor: "white",
    borderRadius: 16,
    height: 200,
    marginBottom: 16,
    overflow: "hidden",
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
  },
  mapText: {
    marginTop: 8,
    fontSize: 14,
    color: "#4B5563",
  },
  socialTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 16,
  },
  socialGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  socialButton: {
    width: (width - 56) / 2,
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
  },
  socialText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#1F2937",
  },
});

export default Contact;
