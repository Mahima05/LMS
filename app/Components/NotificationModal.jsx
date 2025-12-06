import { Animated, FlatList, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { useNotification } from "../Components/NotificationContext";

const formatTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffHours = Math.floor((now - date) / (1000 * 60 * 60));

  if (diffHours < 24) return `${diffHours}h ago`;

  return date.toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }).replace(",", "");
};

export default function NotificationModal() {
  const { visible, closeNotification, notifications, scaleAnim } = useNotification();

  return (
    <Modal transparent visible={visible} animationType="fade">
      <TouchableWithoutFeedback onPress={closeNotification}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      <Animated.View style={[styles.modalBox, { transform: [{ scale: scaleAnim }] }]}>
        <Text style={styles.modalTitle}>Notifications</Text>

        <FlatList
          data={notifications}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={{ paddingVertical: 10 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.module}>{item.module}</Text>
              <Text style={styles.text}>{item.text}</Text>
              <Text style={styles.time}>{formatTime(item.createdOn)}</Text>
            </View>
          )}
        />

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
    position: "absolute", top: "20%", left: "5%", right: "5%",
    backgroundColor: "#1a1a2e", padding: 20, borderRadius: 15, maxHeight: "70%"
  },
  modalTitle: { fontSize: 20, fontWeight: "bold", color: "#fff", marginBottom: 10 },
  card: { backgroundColor: "#24243e", padding: 12, borderRadius: 10, marginBottom: 10 },
  module: { color: "#00acee", fontWeight: "bold", fontSize: 14 },
  text: { color: "#fff", marginVertical: 3 },
  time: { color: "#ccc", fontSize: 12 },
  closeBtn: { marginTop: 10, backgroundColor: "#e94560", paddingVertical: 10, alignItems: "center", borderRadius: 10 }
});
