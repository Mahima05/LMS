
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system/legacy';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator, Animated,
  BackHandler,
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';
// ✅ Import universal components
import { useNotification } from '@/app/Components/NotificationContext';
import Pdf from 'react-native-pdf';
import BottomNavigation from '../../Components/BottomNavigation';
import CustomDrawer from '../../Components/CustomDrawer';
import Header from '../../Components/Header';
import { useBottomNav } from '../../Components/useBottomNav';
import { useDrawer } from '../../Components/useDrawer';


const { width } = Dimensions.get('window');

const UserManualScreen = ({ navigation }) => {

  const { openNotification } = useNotification();

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('Dashboard');
        return true;
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );

      return () => subscription.remove();
    }, [navigation])
  );

  const [localPdfUri, setLocalPdfUri] = useState(null);
  const [pdfLoading, setPdfLoading] = useState(true);
  const [pdfError, setPdfError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const remoteUrl =
      'https://media-abisaio-images.s3.ap-south-2.amazonaws.com/LMS_Media/Master/UserManual/6381c53d_End%20User%20Manual.pdf';
    const localFilename = 'UserManual.pdf';
    const localPath = `${FileSystem.documentDirectory}${localFilename}`;

    const ensurePdf = async () => {
      try {
        setPdfLoading(true);
        setPdfError(null);

        const fileInfo = await FileSystem.getInfoAsync(localPath);
        if (fileInfo.exists) {
          if (!isMounted) return;
          setLocalPdfUri(fileInfo.uri);
          setPdfLoading(false);
          return;
        }

        const { uri } = await FileSystem.downloadAsync(remoteUrl, localPath);
        if (!isMounted) return;
        setLocalPdfUri(uri);
        setPdfLoading(false);
      } catch (err) {
        console.error('PDF download error', err);
        if (!isMounted) return;
        setPdfError('Failed to load User Manual');
        setPdfLoading(false);
      }
    };

    ensurePdf();

    return () => {
      isMounted = false;
    };
  }, []);

  // ✅ Use the drawer hook - User Manual is at index 7
  const {
    drawerVisible,
    selectedMenuItem,
    drawerSlideAnim,
    overlayOpacity,
    menuItemAnims,
    toggleDrawer,
    handleMenuItemPress,
  } = useDrawer(7);

  // ✅ Use the bottom nav hook
  const {
    selectedTab,
    tabScaleAnims,
    rotateAnims,
    handleTabPress
  } = useBottomNav('Dashboard');

  // Animation values for PAGE CONTENT only
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Initial animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    // Pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />

      <View style={styles.mainContent}>
        {/* ✅ Universal Header Component */}
        <Header title="User Manual" onMenuPress={toggleDrawer} onNotificationPress={openNotification} />

        {/* PDF Content */}
        <ScrollView
          style={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            style={[
              styles.contentContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <View style={styles.pdfContainer}>
              {pdfLoading ? (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#7B68EE" />
    <Text allowFontScaling={false} style={styles.loadingText}>Loading User Manual...</Text>
  </View>
) : pdfError ? (
  <View style={styles.errorContainer}>
    <Ionicons name="alert-circle-outline" size={64} color="#ff4757" />
    <Text allowFontScaling={false} style={styles.errorText}>{pdfError}</Text>
  </View>
) : (
  <Pdf
    source={{ uri: localPdfUri }}
    style={styles.pdfViewer}
    trustAllCerts={true}
    onLoadComplete={(pages) => console.log(`PDF loaded with ${pages} pages`)}
    onError={(e) => console.log('PDF Error:', e)}
  />
)}

            </View>
          </Animated.View>

          <View style={{ height: 100 }} />
        </ScrollView>
      </View>

      {/* ✅ Universal Bottom Navigation Component */}
      <BottomNavigation
        selectedTab={selectedTab}
        tabScaleAnims={tabScaleAnims}
        rotateAnims={rotateAnims}
        handleTabPress={handleTabPress}
        navigation={navigation}
      />

      {/* ✅ Universal Drawer Component */}
      <CustomDrawer
        drawerVisible={drawerVisible}
        drawerSlideAnim={drawerSlideAnim}
        overlayOpacity={overlayOpacity}
        menuItemAnims={menuItemAnims}
        selectedMenuItem={selectedMenuItem}
        handleMenuItemPress={(index) => handleMenuItemPress(index, navigation)}
        toggleDrawer={toggleDrawer}
        navigation={navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pdfViewer: {
  width: '100%',
  height: Dimensions.get('window').height - 220, // fits between header & bottom nav
  borderRadius: 12,
  backgroundColor: '#fff'
},

  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  mainContent: {
    flex: 1,
  },
  scrollContent: {
    flex: 1,
    backgroundColor: '#f4f7fe',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  contentContainer: {
    padding: 20,
  },
  pdfContainer: {
    minHeight: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    marginTop: 16,
    color: '#666',
    fontSize: 16,
  },
  errorContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  errorText: {
    color: '#ff4757',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  retryButton: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
  },
  retryGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  retryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  successContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(123, 104, 238, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D2D2D',
    marginBottom: 12,
  },
  successSubtitle: {
    fontSize: 15,
    color: '#8B7AA3',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  openButton: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#7B68EE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    marginBottom: 16,
  },
  openGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  openText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 14,
    color: '#8B7AA3',
    textAlign: 'center',
  },
});

export default UserManualScreen;

