import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTestsStore } from "../stores/index";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Subject: { name: string; id: string };
};

type ColorKey = keyof typeof colors;

const colors = {
  blue: "#1e40af",
  purple: "#6b21a8",
  green: "#166534",
  pink: "#9d174d",
  indigo: "#3730a3",
  teal: "#0f766e",
  red: "#991b1b",
  yellow: "#854d0e",
  orange: "#9a3412",
  cyan: "#0e7490",
  lime: "#3f6212",
  amber: "#92400e",
  emerald: "#065f46",
  rose: "#9f1239",
  fuchsia: "#86198f",
  violet: "#5b21b6",
  slate: "#1e293b",
  stone: "#44403c",
  sky: "#0369a1",
} as const;

const lightColors = {
  blue: "#dbeafe",
  purple: "#f3e8ff",
  green: "#dcfce7",
  pink: "#fce7f3",
  indigo: "#e0e7ff",
  teal: "#ccfbf1",
  red: "#fee2e2",
  yellow: "#fef9c3",
  orange: "#ffedd5",
  cyan: "#cffafe",
  lime: "#ecfccb",
  amber: "#fef3c7",
  emerald: "#d1fae5",
  rose: "#ffe4e6",
  fuchsia: "#fae8ff",
  violet: "#ede9fe",
  slate: "#f1f5f9",
  stone: "#fafaf9",
  sky: "#e0f2fe",
} as const;

type SubjectCardProps = {
  subject: {
    _id: string;
    name: string;
    teacherName: string;
    testsCount: number;
  };
};

const SubjectCard: React.FC<SubjectCardProps> = ({ subject }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { getMytests } = useTestsStore();

  const randomColorKey = Object.keys(colors)[
    Math.floor(Math.random() * Object.keys(colors).length)
  ] as ColorKey;
  const bgColor = colors[randomColorKey];
  const lightColor = lightColors[randomColorKey];

  const handlePress = () => {
    getMytests(subject._id);
    navigation.navigate("Subject", {
      id: subject._id,
      name: subject.name,
    });
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.container, { backgroundColor: bgColor }]}
    >
      {/* Teacher Badge */}
      <View style={[styles.teacherBadge, { backgroundColor: lightColor }]}>
        <FontAwesome5 name="chalkboard-teacher" size={14} color={bgColor} />
        <Text style={[styles.teacherName, { color: bgColor }]}>
          {subject.teacherName.charAt(0).toUpperCase() +
            subject.teacherName.slice(1).toLowerCase()}
        </Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{subject.name}</Text>
        <Text style={styles.subtitle}>Testlar soni: {subject.testsCount}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 120,
    width: "100%",
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  teacherBadge: {
    position: "absolute",
    top: 5,
    right: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    gap: 4,
  },
  teacherName: {
    fontSize: 12,
    fontWeight: "600",
  },
  content: {
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 2,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
  },
});

export { SubjectCard };
