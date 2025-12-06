// app/layout.tsx
import * as ScreenCapture from "expo-screen-capture";
import React, { useEffect } from "react";
import { NotificationProvider } from "../app/Components/NotificationContext";
import AppNavigator from "../app/Navigation/AppNavigator";
import NotificationModal from "./Components/NotificationModal";


export default function RootLayout() {
  useEffect(() => {
    ScreenCapture.preventScreenCaptureAsync();
  }, []);

  return (
    <NotificationProvider>
      <AppNavigator />
      <NotificationModal />
    </NotificationProvider>
  );
}
