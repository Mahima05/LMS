import * as NavigationBar from "expo-navigation-bar";
import React, { useEffect } from "react";
import { NotificationProvider } from "../app/Components/NotificationContext";
import AppNavigator from "../app/Navigation/AppNavigator";



export default function RootLayout() {
  useEffect(() => {
    //ScreenCapture.preventScreenCaptureAsync();
    NavigationBar.setVisibilityAsync("hidden"); // Hide navigation bar globally
  }, []);

  return (
    <NotificationProvider>
      <AppNavigator />
    </NotificationProvider>
  );
}
