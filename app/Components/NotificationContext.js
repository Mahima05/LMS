import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useRef, useState } from "react";
import { Animated } from "react-native";

export const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const scaleAnim = useRef(new Animated.Value(0)).current;

  const openNotification = async () => {
    setVisible(true);
    setLoading(true);
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start();

    try {
      const employeeID = await AsyncStorage.getItem("employeeID");
      const res = await fetch(
        `https://lms-api-qa.abisaio.com/api/v1/Notification/GetUserNotifications?employeeId=${employeeID}`
      );
      const json = await res.json();
      
      // Filter only unread notifications (isRead === false)
      if (json?.data) {
        const unreadNotifications = json.data.filter(item => item.isRead === false);
        setNotifications(unreadNotifications);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const closeNotification = () => {
    Animated.timing(scaleAnim, { toValue: 0, duration: 150, useNativeDriver: true })
      .start(() => setVisible(false));
  };

  const markAsRead = async (notificationId) => {
    try {
      const token = await AsyncStorage.getItem("token");
      
      await fetch(
        `https://lms-api-qa.abisaio.com/api/v1/Notification/MarkNotificationAsRead?notificationId=${notificationId}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Remove the notification from the list after marking as read
      setNotifications(prev => prev.filter(item => item.id !== notificationId));
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  return (
    <NotificationContext.Provider value={{ 
      openNotification, 
      closeNotification, 
      markAsRead,
      visible, 
      notifications, 
      loading,
      scaleAnim 
    }}>
      {children}
    </NotificationContext.Provider>
  );
};
