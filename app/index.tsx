import * as NavigationBar from "expo-navigation-bar";
import * as ScreenCapture from 'expo-screen-capture';
import React, { useEffect } from "react";
import { Text, TextInput } from 'react-native';
import AppNavigator from './Navigation/AppNavigator';

// Disable font scaling globally to ignore device settings (TypeScript compatible)
interface TextWithDefaultProps extends Text {
  defaultProps?: { allowFontScaling?: boolean };
}

interface TextInputWithDefaultProps extends TextInput {
  defaultProps?: { allowFontScaling?: boolean };
}

(Text as unknown as TextWithDefaultProps).defaultProps = 
  (Text as unknown as TextWithDefaultProps).defaultProps || {};
(Text as unknown as TextWithDefaultProps).defaultProps!.allowFontScaling = false;

(TextInput as unknown as TextInputWithDefaultProps).defaultProps = 
  (TextInput as unknown as TextInputWithDefaultProps).defaultProps || {};
(TextInput as unknown as TextInputWithDefaultProps).defaultProps!.allowFontScaling = false;

export default function Index() {
  useEffect(() => {
    ScreenCapture.preventScreenCaptureAsync();
    NavigationBar.setVisibilityAsync("hidden");
  }, []);
  
  return <AppNavigator />;
}
