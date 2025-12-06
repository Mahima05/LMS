// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import React, { useEffect, useState } from "react";
// import CalendarScreen from "../Screens/Calendar/CalendarScreen";
// import CertificateScreen from "../Screens/Certificate/CertificateScreen";
// import ActionviewScreen from "../Screens/Courses/ActionviewScreen";
// import CoursesScreen from "../Screens/Courses/CoursesScreen";
// import DashboardScreen from "../Screens/Dashboard/DashboardScreen";

// import CourseDetailsScreen from "../Screens/ELearning/CourseDetailsScreen";
// import SCORMPlayerScreen from "../Screens/ELearning/ScormPlayerScreen";

// import LearningJourneyMap from "../Screens/Dashboard/LearningJourneyMap";
// import MicroLearningScreen from "../Screens/Dashboard/MicroLearningScreen";
// import EAssessmentScreen from "../Screens/ELearning/ELearningAssessment";
// import EFeedbackScreen from "../Screens/ELearning/ELearningFeedback";
// import ELearningScreen from "../Screens/ELearning/ELearningScreen";
// import Exploremore from "../Screens/LearningHub/Exploremore";
// import LearningHubScreen from "../Screens/LearningHub/LearningHubScreen";
// import LjmapScreen from "../Screens/Ljmap";
// import LoginScreen from "../Screens/Login/LoginScreen";
// import AssessmentScreen from "../Screens/TrainingSession/AssessmentScreen";
// import FeedbackScreen from "../Screens/TrainingSession/Feedback";
// import TrainingDetailsScreen from "../Screens/TrainingSession/TrainingDetailsScreen";
// import TrainingSession from "../Screens/TrainingSession/TrainingSessionScreen";
// import VirtualTraining from "../Screens/TrainingSession/VirtualTrainingScreen";
// import PDFViewer from "../Screens/UserManual/PDFViewer";
// import UserManualScreen from "../Screens/UserManual/UserManualScreen";
// import SplashScreen from "../Screens/Splash";


// const Stack = createNativeStackNavigator();

// export default function AppNavigator() {

//   const [initialRoute, setInitialRoute] = useState<string | null>(null);


//   useEffect(() => {
//     const checkLogin = async () => {
//       const token = await AsyncStorage.getItem("token");

//       if (token && token !== "") {
//         setInitialRoute("Dashboard");
//       } else {
//         setInitialRoute("Login");
//       }
//     };

//     checkLogin();
//   }, []);

//   // Show nothing until token check completes
//   if (initialRoute === null) return null;

//   return (
//     <Stack.Navigator
//       initialRouteName={initialRoute}
//       screenOptions={{ headerShown: false }}
//     >
//       <Stack.Screen name="Login" component={LoginScreen} />
//       <Stack.Screen name="Dashboard" component={DashboardScreen} />
//       <Stack.Screen name="LearningJourneyMap" component={LearningJourneyMap} />
//       <Stack.Screen name="MicroLearning" component={MicroLearningScreen} />
//       <Stack.Screen name="LearningHub" component={LearningHubScreen} />
//       <Stack.Screen name="Courses" component={CoursesScreen} />
//       <Stack.Screen name="TrainingSession" component={TrainingSession} />
//       <Stack.Screen name="Calendar" component={CalendarScreen} />
//       <Stack.Screen name="ELearning" component={ELearningScreen} />

//       <Stack.Screen name="Certificate" component={CertificateScreen} />
//       <Stack.Screen name="UserManual" component={UserManualScreen} />
//       <Stack.Screen name="Exploremore" component={Exploremore} />
//       <Stack.Screen name="ActionviewScreen" component={ActionviewScreen} />
//       <Stack.Screen name="TrainingDetails" component={TrainingDetailsScreen} />
//       <Stack.Screen name="VirtualTraining" component={VirtualTraining} />
//       <Stack.Screen name="Assessment" component={AssessmentScreen} />
//       <Stack.Screen name="Feedback" component={FeedbackScreen} />

//       <Stack.Screen name="EAssessment" component={EAssessmentScreen} />
//       <Stack.Screen name="EFeedback" component={EFeedbackScreen} />
//       <Stack.Screen name="PDFViewer" component={PDFViewer} />

//       <Stack.Screen name="CourseDetails" component={CourseDetailsScreen} />
//       <Stack.Screen name="SCORMPlayer" component={SCORMPlayerScreen} />
//       <Stack.Screen name="LjmapScreen" component={LjmapScreen} />
//       <Stack.Screen name="Splash" component={SplashScreen} />


//     </Stack.Navigator>
//   );
// }

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";

import CalendarScreen from "../Screens/Calendar/CalendarScreen";
import CertificateScreen from "../Screens/Certificate/CertificateScreen";
import ActionviewScreen from "../Screens/Courses/ActionviewScreen";
import CoursesScreen from "../Screens/Courses/CoursesScreen";
import DashboardScreen from "../Screens/Dashboard/DashboardScreen";

import CourseDetailsScreen from "../Screens/ELearning/CourseDetailsScreen";
import SCORMPlayerScreen from "../Screens/ELearning/ScormPlayerScreen";


import LjmapScreen from "../Screens/Dashboard/Ljmap";
import MicroLearningScreen from "../Screens/Dashboard/MicroLearningScreen";
import EAssessmentScreen from "../Screens/ELearning/ELearningAssessment";
import EFeedbackScreen from "../Screens/ELearning/ELearningFeedback";
import ELearningScreen from "../Screens/ELearning/ELearningScreen";
import Exploremore from "../Screens/LearningHub/Exploremore";
import LearningHubScreen from "../Screens/LearningHub/LearningHubScreen";
import LoginScreen from "../Screens/Login/LoginScreen";
import SplashScreen from "../Screens/Splash";
import AssessmentScreen from "../Screens/TrainingSession/AssessmentScreen";
import FeedbackScreen from "../Screens/TrainingSession/Feedback";
import TrainingDetailsScreen from "../Screens/TrainingSession/TrainingDetailsScreen";
import TrainingSession from "../Screens/TrainingSession/TrainingSessionScreen";
import VirtualTraining from "../Screens/TrainingSession/VirtualTrainingScreen";
import PDFViewer from "../Screens/UserManual/PDFViewer";
import UserManualScreen from "../Screens/UserManual/UserManualScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  // Show Splash first
  useEffect(() => {
    const timer = setTimeout(() => {
      checkLogin();
    }, 2000); // 2 seconds splash

    return () => clearTimeout(timer);
  }, []);

  // Check if user is logged in
  const checkLogin = async () => {
    const token = await AsyncStorage.getItem("token");

    if (token && token !== "") {
      setInitialRoute("Dashboard");
    } else {
      setInitialRoute("Login");
    }

    setIsSplashVisible(false);
  };

  // Handle splash finish
  const handleSplashFinish = () => {
    setIsSplashVisible(false);
  };

  // Show Splash screen
  if (isSplashVisible) {
    return <SplashScreen onFinish={handleSplashFinish} navigation={LoginScreen} />;
  }

  // Wait until initialRoute is set
  if (!initialRoute) return null;

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{ headerShown: false }}
      
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />

      <Stack.Screen name="MicroLearning" component={MicroLearningScreen} />
      <Stack.Screen name="LearningHub" component={LearningHubScreen} />
      <Stack.Screen name="Courses" component={CoursesScreen} />
      <Stack.Screen name="TrainingSession" component={TrainingSession} />
      <Stack.Screen name="Calendar" component={CalendarScreen} />
      <Stack.Screen name="ELearning" component={ELearningScreen} />

      <Stack.Screen name="Certificate" component={CertificateScreen} />
      <Stack.Screen name="UserManual" component={UserManualScreen} />
      <Stack.Screen name="Exploremore" component={Exploremore} />
      <Stack.Screen name="ActionviewScreen" component={ActionviewScreen} />
      <Stack.Screen name="TrainingDetails" component={TrainingDetailsScreen} />
      <Stack.Screen name="VirtualTraining" component={VirtualTraining} />
      <Stack.Screen name="Assessment" component={AssessmentScreen} />
      <Stack.Screen name="Feedback" component={FeedbackScreen} />

      <Stack.Screen name="EAssessment" component={EAssessmentScreen} />
      <Stack.Screen name="EFeedback" component={EFeedbackScreen} />
      <Stack.Screen name="PDFViewer" component={PDFViewer} />

      <Stack.Screen name="CourseDetails" component={CourseDetailsScreen} />
      <Stack.Screen name="SCORMPlayer" component={SCORMPlayerScreen} />
      <Stack.Screen name="LjmapScreen" component={LjmapScreen} />
    </Stack.Navigator>
  );
}