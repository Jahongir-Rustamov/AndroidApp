import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  Linking,
  Platform,
  findNodeHandle,
} from "react-native";
import { useTestsStore } from "../stores";
import { SubjectCard } from "../components/SubjectCard";
import Icon from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import Toast from "react-native-toast-message";

const { width } = Dimensions.get("window");

// StatCard komponenti
interface StatCardProps {
  label: string;
  value: string;
  icon: string;
  color: string;
  description: string;
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  color,
  description,
}) => (
  <View style={[styles.statCard, { backgroundColor: "white" }]}>
    <View style={[styles.statIcon, { backgroundColor: color }]}>
      <Text style={styles.statIconText}>{icon}</Text>
    </View>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
    <Text style={styles.statDescription}>{description}</Text>
  </View>
);

// FeatureCard komponenti
interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  color: string;
  features: string[];
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  color,
  features,
}) => (
  <View style={styles.featureCard}>
    <View style={[styles.featureIcon, { backgroundColor: color }]}>
      <Text style={styles.featureIconText}>{icon}</Text>
    </View>
    <Text style={styles.featureTitle}>{title}</Text>
    <Text style={styles.featureDescription}>{description}</Text>
    {features.map((item, index) => (
      <View key={index} style={styles.featureItem}>
        <Icon name="check" size={16} color="#10B981" />
        <Text style={styles.featureItemText}>{item}</Text>
      </View>
    ))}
  </View>
);

const SquarePattern = () => {
  const squareSize = 20;
  const rows = Math.ceil(Dimensions.get("window").height / squareSize);
  const cols = Math.ceil(Dimensions.get("window").width / squareSize);

  const squares = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      squares.push(
        <View
          key={`${i}-${j}`}
          style={{
            position: "absolute",
            top: i * squareSize,
            left: j * squareSize,
            width: squareSize - 2,
            height: squareSize - 2,
            borderWidth: 0.5,
            borderColor: "rgba(255, 255, 255, 0.1)",
          }}
        />
      );
    }
  }

  return <View style={styles.patternContainer}>{squares}</View>;
};

const HomeScreen = () => {
  const { subject, getSubjects, statistics, getStatistics } = useTestsStore();
  const scrollViewRef = React.useRef<ScrollView>(null);
  const subjectsSectionRef = React.useRef<View>(null);
  const featuresSectionRef = React.useRef<View>(null);

  useEffect(() => {
    getSubjects();
    getStatistics();
  }, [getSubjects, getStatistics]);

  const scrollToSection = (ref: React.RefObject<View>) => {
    const node = findNodeHandle(ref.current);
    if (node) {
      ref.current?.measureInWindow((x, y, width, height) => {
        scrollViewRef.current?.scrollTo({
          y: y,
          animated: true,
        });
      });
    }
  };

  const scrollToTests = () => {
    scrollToSection(subjectsSectionRef);
  };

  const scrollToFeatures = () => {
    scrollToSection(featuresSectionRef);
  };

  const openTelegram = () => {
    Linking.openURL("https://t.me/Registan_LC");
  };

  const handleSubjectPress = (subject: any) => {
    // Navigate to subject details or tests
    Toast.show({
      type: "info",
      text1: `${subject.name} tanlandi`,
      text2: "Testlar yuklanmoqda...",
    });
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero Section */}
      <LinearGradient
        colors={["#1e3a8a", "#1e40af"]}
        style={styles.heroSection}
      >
        <SquarePattern />
        <View style={styles.heroContent}>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>
              🎓 O'zbekistonning eng yaxshi online test platformasi
            </Text>
          </View>
          <Text style={styles.heroTitle}>
            Registon O'quv Markazi bilan
            <Text style={styles.heroTitleHighlight}> kelajakka qadam</Text>
          </Text>
          <Text style={styles.heroSubtitle}>
            Zamonaviy ta'lim platformasi orqali bilimlaringizni mustahkamlang va
            o'z sohanggizda eng yaxshi mutaxassis bo'ling
          </Text>
          <View style={styles.heroButtons}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={scrollToTests}
            >
              <Text style={styles.primaryButtonText}>Testni boshlash</Text>
              <Icon
                name="arrow-right"
                size={18}
                color="white"
                style={styles.arrowIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={scrollToFeatures}
            >
              <Text style={styles.secondaryButtonText}>Ko'proq ma'lumot</Text>
              <Icon
                name="chevron-down"
                size={16}
                color="rgba(255, 255, 255, 0.8)"
              />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      {/* Stats Section */}
      <View style={styles.statsSection}>
        <StatCard
          label="Jami Fanlar"
          value={`${statistics?.SubjectsCount || 0}+`}
          icon="📚"
          color="#E3F2FD"
          description="Turli xil fanlardan testlar"
        />
        <StatCard
          label="Testlar"
          value={`${statistics?.TestsCount || 0}+`}
          icon="📝"
          color="#F3E5F5"
          description="Sifatli va ishonchli testlar"
        />
        <StatCard
          label="O'quvchilar"
          value={`${statistics?.StudentCount || 0}+`}
          icon="👨‍🎓"
          color="#E8F5E9"
          description="Faol o'quvchilar"
        />
        <StatCard
          label="O'qituvchilar"
          value={`${statistics?.TeacherCount || 0}+`}
          icon="👨‍🏫"
          color="#FCE4EC"
          description="Tajribali o'qituvchilar"
        />
      </View>

      {/* Subjects Section */}
      <View ref={subjectsSectionRef} style={styles.subjectsSection}>
        <View style={styles.sectionHeader}>
          <View style={styles.headerLine} />
          <Text style={styles.sectionTitle}>SINOV TEST TO'PLAMLARI</Text>
          <View style={styles.headerLine} />
        </View>

        <View style={styles.subjectsGrid}>
          {subject && subject.length > 0 ? (
            subject.map((item) => (
              <SubjectCard
                key={item._id}
                subject={item}
                onPress={handleSubjectPress}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Icon name="info-circle" size={24} color="#9CA3AF" />
              <Text style={styles.emptyStateText}>
                Hozircha Hech Qanday Fan Yo'q
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Features Section */}
      <View ref={featuresSectionRef} style={styles.featuresSection}>
        <View style={styles.sectionHeader}>
          <View style={styles.headerLine} />
          <Text style={styles.sectionTitle}>BIZNING AFZALLIKLARIMIZ</Text>
          <View style={styles.headerLine} />
        </View>

        <View style={styles.featuresGrid}>
          <FeatureCard
            title="Aniq Natijalar"
            description="Test natijalarini tezkor va aniq baholash tizimi"
            icon="🎯"
            color="#3B82F6"
            features={[
              "Real vaqt rejimida",
              "Xatolar tahlili",
              "Progress monitoring",
            ]}
          />
          <FeatureCard
            title="Tezkor Javob"
            description="Har bir test uchun tezkor javob va tushuntirish"
            icon="⚡"
            color="#8B5CF6"
            features={[
              "Tushuntirishlar",
              "Video yechimlar",
              "Qo'shimcha ma'lumotlar",
            ]}
          />
          <FeatureCard
            title="Qulay Interfeys"
            description="Foydalanuvchilar uchun qulay va sodda interfeys"
            icon="💻"
            color="#10B981"
            features={["Zamonaviy dizayn", "Mobil versiya", "Oson navigatsiya"]}
          />
        </View>
      </View>

      {/* CTA Section */}
      <LinearGradient colors={["#1e3a8a", "#312e81"]} style={styles.ctaSection}>
        <View style={styles.ctaContent}>
          <View style={styles.ctaIcon}>
            <Text style={styles.ctaIconText}>🚀</Text>
          </View>
          <Text style={styles.ctaTitle}>
            Hoziroq testlarni yechishni boshlang!
          </Text>
          <Text style={styles.ctaSubtitle}>
            Registon o'quv markazi bilan bilimlaringizni mustahkamlang
          </Text>
          <TouchableOpacity style={styles.ctaButton} onPress={scrollToTests}>
            <Text style={styles.ctaButtonText}>Testni boshlash</Text>
            <Icon
              name="chevron-up"
              size={16}
              color="rgba(255, 255, 255, 0.8)"
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Footer */}
      <LinearGradient colors={["#172554", "#1e1b4b"]} style={styles.footer}>
        <View style={styles.footerContent}>
          <Text style={styles.footerLogo}>Registon LC</Text>
          <TouchableOpacity
            style={styles.telegramButton}
            onPress={openTelegram}
          >
            <Icon name="telegram" size={20} color="white" />
            <Text style={styles.telegramText}>
              Registon O'quv Markazi Yangiliklari
            </Text>
          </TouchableOpacity>
          <View style={styles.socialLinks}>
            <TouchableOpacity style={styles.socialButton}>
              <Icon name="instagram" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Icon name="youtube" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.footerBottom}>
          <Text style={styles.copyright}>
            © {new Date().getFullYear()} Registon O'quv Markazi
          </Text>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  heroSection: {
    padding: 17,
    paddingTop: Platform.OS === "android" ? 50 : 40,
    paddingBottom: 50,
    position: "relative",
    overflow: "hidden",
  },
  heroContent: {
    alignItems: "center",
    position: "relative",
    zIndex: 1,
  },
  heroBadge: {
    backgroundColor: "rgba(59, 130, 246, 0.3)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 16,
  },
  heroBadgeText: {
    color: "#BFDBFE",
    fontSize: 13,
    textAlign: "center",
  },
  heroTitle: {
    fontSize: 23,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 12,
  },
  heroTitleHighlight: {
    color: "#60A5FA",
  },
  heroSubtitle: {
    fontSize: 12,
    color: "#BFDBFE",
    textAlign: "center",
    marginBottom: 20,
  },
  heroButtons: {
    width: "100%",
    paddingHorizontal: 28,
    gap: 10,
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2196f3",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonIcon: {
    marginRight: 8,
  },
  arrowIcon: {
    marginLeft: 8,
  },
  primaryButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  secondaryButtonText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
    marginRight: 8,
  },
  statsSection: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 16,
    gap: 16,
  },
  statCard: {
    flex: 1,
    minWidth: width / 2 - 24,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  statIconText: {
    fontSize: 20,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 4,
  },
  statDescription: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
  },
  subjectsSection: {
    padding: 16,
    backgroundColor: "white",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  headerLine: {
    height: 1,
    backgroundColor: "#D1D5DB",
    flex: 1,
    maxWidth: 100,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
    marginHorizontal: 16,
  },
  subjectsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  emptyState: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 8,
  },
  emptyStateText: {
    fontSize: 13,
    color: "#6B7280",
  },
  featuresSection: {
    padding: 16,
  },
  featuresGrid: {
    gap: 16,
  },
  featureCard: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  featureIconText: {
    fontSize: 18,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    color: "#4B5563",
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  featureItemText: {
    fontSize: 12,
    color: "#4B5563",
  },
  ctaSection: {
    padding: 24,
    margin: 16,
    borderRadius: 16,
  },
  ctaContent: {
    alignItems: "center",
  },
  ctaIcon: {
    backgroundColor: "rgba(59, 130, 246, 0.3)",
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  ctaIconText: {
    fontSize: 28,
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 8,
  },
  ctaSubtitle: {
    fontSize: 14,
    color: "#BFDBFE",
    textAlign: "center",
    marginBottom: 20,
  },
  ctaButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2563EB",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  ctaButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  footer: {
    padding: 24,
  },
  footerContent: {
    alignItems: "center",
    gap: 16,
  },
  footerLogo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  telegramButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    gap: 8,
  },
  telegramText: {
    color: "white",
    fontSize: 14,
  },
  socialLinks: {
    flexDirection: "row",
    gap: 16,
  },
  socialButton: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  footerBottom: {
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  copyright: {
    color: "rgba(255, 255, 255, 0.7)",
    textAlign: "center",
    fontSize: 12,
  },
  patternContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.5,
  },
});

export default HomeScreen;
