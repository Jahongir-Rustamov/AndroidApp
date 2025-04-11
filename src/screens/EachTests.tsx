import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTestsStore } from "../stores";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { LinearGradient } from "expo-linear-gradient";
import Toast from "react-native-toast-message";

const { width } = Dimensions.get("window");

type RootStackParamList = {
  TestQuestions: { testId: string; testTitle: string };
  Subject: { name: string; id: string };
  [key: string]: any;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day}.${month}.${year} ${hours}:${minutes}`;
};

const EachTests = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const params = route.params as RootStackParamList["Subject"];
  const { name, id } = params || { name: "Default Name", id: "default-id" };

  const { mytests, getMytests, loading, getTestQuestions } = useTestsStore();
  const [currentPage, setCurrentPage] = useState(1);
  const testsPerPage = 5;

  useEffect(() => {
    getMytests(id);
  }, [getMytests, id]);

  const tests = mytests
    ? [...mytests].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    : [];

  const indexOfLastTest = currentPage * testsPerPage;
  const indexOfFirstTest = indexOfLastTest - testsPerPage;
  const currentTests = tests.slice(indexOfFirstTest, indexOfLastTest);
  const totalPages = Math.ceil(tests.length / testsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0e0da2" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Fan nomi */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{name}</Text>
        <View style={styles.titleUnderline} />
      </View>

      {/* Testlar ro'yxati */}
      <View style={styles.testsContainer}>
        {tests.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconContainer}>
              <FontAwesome5 name="inbox" size={48} color="#8B5CF6" />
            </View>
            <Text style={styles.emptyTitle}>Hozircha testlar yo'q</Text>
            <Text style={styles.emptyText}>
              Bu fanda hali testlar qo'shilmagan
            </Text>
          </View>
        ) : (
          currentTests.map((test) => (
            <TouchableOpacity
              key={test._id}
              style={styles.testCard}
              onPress={() => {
                getTestQuestions(test._id);
                navigation.navigate("TestQuestions", {
                  testId: test._id,
                  testTitle: test.title,
                });
              }}
            >
              <LinearGradient
                colors={["#8B5CF6", "#EC4899"]}
                style={styles.testCardGradient}
              >
                <View style={styles.testContent}>
                  <View style={styles.testHeader}>
                    <View style={styles.testIconContainer}>
                      <FontAwesome5
                        name="file-alt"
                        size={24}
                        color="#8B5CF6"
                        style={styles.testIcon}
                      />
                    </View>
                    <View style={styles.testInfo}>
                      <Text style={styles.testTitle}>{test.title}</Text>
                      <View style={styles.testMeta}>
                        <View style={styles.metaItem}>
                          <Text style={styles.metaText}>
                            {test.questionsMassive.length} ta savol
                          </Text>
                        </View>
                        <View style={styles.metaItem}>
                          <FontAwesome5
                            name="clock"
                            size={12}
                            color="#6B7280"
                          />
                          <Text style={styles.metaText}>
                            {formatDate(test.createdAt)}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={styles.startButton}>
                    <Text style={styles.startButtonText}>Boshlash</Text>
                    <FontAwesome5
                      name="chevron-right"
                      size={12}
                      color="white"
                    />
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))
        )}
      </View>

      {/* Pagination */}
      {tests.length > 5 && (
        <View style={styles.pagination}>
          <TouchableOpacity
            onPress={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            style={[
              styles.pageButton,
              currentPage === 1 && styles.disabledButton,
            ]}
          >
            <Text style={styles.pageButtonText}>❮</Text>
          </TouchableOpacity>

          {pageNumbers
            .filter((num) => {
              if (currentPage <= 3) return num <= 5;
              if (currentPage >= totalPages - 2) return num >= totalPages - 4;
              return num >= currentPage - 2 && num <= currentPage + 2;
            })
            .map((number) => (
              <TouchableOpacity
                key={number}
                onPress={() => setCurrentPage(number)}
                style={[
                  styles.pageButton,
                  currentPage === number && styles.activePageButton,
                ]}
              >
                <Text
                  style={[
                    styles.pageButtonText,
                    currentPage === number && styles.activePageButtonText,
                  ]}
                >
                  {number}
                </Text>
              </TouchableOpacity>
            ))}

          <TouchableOpacity
            onPress={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
            style={[
              styles.pageButton,
              currentPage === totalPages && styles.disabledButton,
            ]}
          >
            <Text style={styles.pageButtonText}>❯</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    alignItems: "center",
    marginVertical: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1F2937",
    textAlign: "center",
  },
  titleUnderline: {
    width: 80,
    height: 4,
    backgroundColor: "#8B5CF6",
    borderRadius: 2,
    marginTop: 8,
  },
  testsContainer: {
    padding: 16,
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 48,
  },
  emptyIconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#F3E8FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
  },
  testCard: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: "hidden",
  },
  testCardGradient: {
    padding: 1,
    borderRadius: 16,
  },
  testContent: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
  },
  testHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  testIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#F3E8FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  testIcon: {
    color: "#8B5CF6",
  },
  testInfo: {
    flex: 1,
  },
  testTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 8,
  },
  testMeta: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: "#6B7280",
  },
  startButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8B5CF6",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 8,
  },
  startButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 24,
    gap: 8,
  },
  pageButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  pageButtonText: {
    fontSize: 16,
    color: "#6B7280",
  },
  activePageButton: {
    backgroundColor: "#8B5CF6",
    borderColor: "#8B5CF6",
  },
  activePageButtonText: {
    color: "white",
  },
  disabledButton: {
    backgroundColor: "#F3F4F6",
    borderColor: "#E5E7EB",
  },
});

export default EachTests;
