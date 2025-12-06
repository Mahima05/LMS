import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useRef, useState } from "react";
import { Animated } from "react-native";

export const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const scaleAnim = useRef(new Animated.Value(0)).current;

  const openNotification = async () => {
    setVisible(true);
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start();

    const employeeID = await AsyncStorage.getItem("employeeID");
    const res = await fetch(
      `https://lms-api-qa.abisaio.com/api/v1/Notification/GetUserNotifications?employeeId=${employeeID}`
    );
    const json = await res.json();
    if (json?.data) setNotifications(json.data);
  };

  const closeNotification = () => {
    Animated.timing(scaleAnim, { toValue: 0, duration: 150, useNativeDriver: true })
      .start(() => setVisible(false));
  };

  return (
    <NotificationContext.Provider value={{ openNotification, closeNotification, visible, notifications, scaleAnim }}>
      {children}
    </NotificationContext.Provider>
  );
};
