import { useNavigation } from "@react-navigation/native";
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { useNotification } from "../Components/NotificationContext";

const formatTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffHours = Math.floor((now - date) / (1000 * 60 * 60));

  if (diffHours < 24) return `${diffHours}h ago`;

  return date.toLocaleString("en-GB", { 
    day: "2-digit", 
    month: "short", 
    year: "numeric", 
    hour: "2-digit", 
    minute: "2-digit" 
  }).replace(",", "");
};

export default function NotificationModal() {
  const navigation = useNavigation();
  const { visible, closeNotification, notifications, loading, scaleAnim, markAsRead } = useNotification();

  const handleNotificationClick = async (item) => {
    // Mark notification as read
    await markAsRead(item.id);

    closeNotification();

    if (!item.redirectUrl) return;

    const parts = item.redirectUrl.split("/");
    const type = parts[1];
    const id = parts[2];

    if (type === "training-details") {
      navigation.navigate("TrainingDetails", {
        trainingSessionId: id,
        employeeID: item.employeeId,
        from: "TrainingSession"
      });
    }

    if (type === "course-details") {
      navigation.navigate("CourseDetails", {
        courseId: id,
        employeeID: item.employeeId,
        from: "ELearning"
      });
    }
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <TouchableWithoutFeedback onPress={closeNotification}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      <Animated.View style={[styles.modalBox, { transform: [{ scale: scaleAnim }] }]}>
        <Text style={styles.modalTitle}>Notifications</Text>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#00acee" />
            <Text style={styles.loadingText}>Loading notifications...</Text>
          </View>
        ) : notifications.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No new notifications</Text>
          </View>
        ) : (
          <FlatList
            data={notifications}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={{ paddingVertical: 10 }}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleNotificationClick(item)}>
                <View style={styles.card}>
                  <Text style={styles.module}>{item.module}</Text>
                  <Text style={styles.text}>{item.text}</Text>
                  <Text style={styles.time}>{formatTime(item.createdOn)}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}

        <TouchableOpacity onPress={closeNotification} style={styles.closeBtn}>
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Close</Text>
        </TouchableOpacity>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)" },
  modalBox: {
    position: "absolute", 
    top: "20%", 
    left: "5%", 
    right: "5%",
    backgroundColor: "#1a1a2e", 
    padding: 20, 
    borderRadius: 15, 
    maxHeight: "70%"
  },
  modalTitle: { 
    fontSize: 20, 
    fontWeight: "bold", 
    color: "#fff", 
    marginBottom: 10 
  },
  card: { 
    backgroundColor: "#24243e", 
    padding: 12, 
    borderRadius: 10, 
    marginBottom: 10 
  },
  module: { 
    color: "#00acee", 
    fontWeight: "bold", 
    fontSize: 14 
  },
  text: { 
    color: "#fff", 
    marginVertical: 3 
  },
  time: { 
    color: "#ccc", 
    fontSize: 12 
  },
  closeBtn: { 
    marginTop: 10, 
    backgroundColor: "#e94560", 
    paddingVertical: 10, 
    alignItems: "center", 
    borderRadius: 10 
  },
  loadingContainer: {
    paddingVertical: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  loadingText: {
    color: "#fff",
    marginTop: 10,
    fontSize: 14
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  emptyText: {
    color: "#ccc",
    fontSize: 16
  }
});
