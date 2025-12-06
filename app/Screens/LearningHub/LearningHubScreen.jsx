import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  BackHandler,
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
// ✅ Import universal components
import { useNotification } from '@/app/Components/NotificationContext';
import BottomNavigation from '../../Components/BottomNavigation';
import CustomDrawer from '../../Components/CustomDrawer';
import Header from '../../Components/Header';
import { useBottomNav } from '../../Components/useBottomNav';
import { useDrawer } from '../../Components/useDrawer';

const { width, height } = Dimensions.get('window');

const LearningHubScreen = ({ navigation }) => {

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

  // ✅ Use the drawer hook - Learning Hub is at index 1
  const {
    drawerVisible,
    selectedMenuItem,
    drawerSlideAnim,
    overlayOpacity,
    menuItemAnims,
    toggleDrawer,
    handleMenuItemPress,
  } = useDrawer(1);

  // ✅ Use the bottom nav hook
  const {
    selectedTab,
    tabScaleAnims,
    rotateAnims,
    handleTabPress
  } = useBottomNav('Dashboard');

  // Learning Hub Categories
  const categories = [
    {
      title: 'Corporate Essentials',
      subtitle: 'Essential resources for corporate training and team productivity enhancement.',
      icon: 'briefcase',
      iconType: 'FontAwesome5',
      gradient: ['#4F46E5', '#3B82F6'],
      bgPattern: '💼',
    },
    {
      title: 'Empowerment Centre',
      subtitle: 'Unlock your potential with skill development and empowerment resources.',
      icon: 'user-graduate',
      iconType: 'FontAwesome5',
      gradient: ['#6366F1', '#8B5CF6'],
      bgPattern: '🎯',
    },
    {
      title: 'Health & Wellness',
      subtitle: 'Prioritize your health and well-being with tips and resources for a balanced life.',
      icon: 'heart',
      iconType: 'FontAwesome5',
      gradient: ['#EC4899', '#F472B6'],
      bgPattern: '❤️',
    },
    {
      title: 'Environment & Sustainability',
      subtitle: 'Learn and contribute to a sustainable future with environmental initiatives.',
      icon: 'leaf',
      iconType: 'FontAwesome5',
      gradient: ['#10B981', '#34D399'],
      bgPattern: '🌿',
    },
    {
      title: 'Book Review',
      subtitle: 'Explore in-depth reviews and recommendations for books worth reading.',
      icon: 'book',
      iconType: 'FontAwesome5',
      gradient: ['#F59E0B', '#FBBF24'],
      bgPattern: '📘',
    },
    {
      title: 'Month Calendar',
      subtitle: 'Stay organized and never miss a date with our comprehensive monthly calendar.',
      icon: 'calendar-alt',
      iconType: 'FontAwesome5',
      gradient: ['#3B82F6', '#60A5FA'],
      bgPattern: '📅',
    },
    {
      title: 'Digital and Traditional',
      subtitle: 'Explore the perfect blend of digital innovations and traditional techniques.',
      icon: 'chalkboard-teacher',
      iconType: 'FontAwesome5',
      gradient: ['#8B5CF6', '#A78BFA'],
      bgPattern: '💡',
    },
    {
      title: 'Knowledge Nuggets',
      subtitle: 'Animated whiteboard video designed to elevate learning to the next level.',
      icon: 'lightbulb',
      iconType: 'FontAwesome5',
      gradient: ['#F97316', '#FB923C'],
      bgPattern: '✨',
    },
  ];



  // Animation values for PAGE CONTENT only
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const cardAnims = useRef([...Array(categories.length)].map(() => new Animated.Value(0))).current;

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

    // Staggered card animations
    cardAnims.forEach((anim, index) => {
      setTimeout(() => {
        Animated.spring(anim, {
          toValue: 1,
          tension: 40,
          friction: 7,
          useNativeDriver: true,
        }).start();
      }, index * 150);
    });

    // Continuous pulse animation
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

  
  // Handle card press
  const handleCardPress = (index) => {
    Animated.sequence([
      Animated.spring(cardAnims[index], {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(cardAnims[index], {
        toValue: 1,
        tension: 50,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />

      <Animated.View style={[styles.mainContent, { opacity: fadeAnim }]}>
        {/* ✅ Universal Header Component */}
        <Header title="Learning Hub" onMenuPress={toggleDrawer} onNotificationPress={openNotification}/>

        {/* Learning Categories */}
        <ScrollView
          style={styles.scrollContent}
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {categories.map((category, index) => {
            const scale = cardAnims[index].interpolate({
              inputRange: [0, 1],
              outputRange: [0.9, 1],
            });
            const opacity = cardAnims[index].interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            });
            const translateY = cardAnims[index].interpolate({
              inputRange: [0, 1],
              outputRange: [30, 0],
            });

            return (
              <Animated.View
                key={index}
                style={[
                  styles.categoryCard,
                  { opacity, transform: [{ scale }, { translateY }] },
                ]}
              >
                <TouchableOpacity
                  onPress={() => {
                    handleCardPress(index);
                    if (category.title === "Month Calendar") {
    // Navigate normally to Calendar screen
    navigation.navigate("Calendar");
  } else {
    // Your existing logic for other categories
    handleCardPress(index);
    navigation.navigate("Exploremore", { category: category.title });
  }
                  }}
                  activeOpacity={0.9}
                >
                  <LinearGradient
                    colors={category.gradient}
                    style={styles.cardGradient}
                  >
                    {/* Background Pattern */}
                    <Text style={styles.bgPattern}>{category.bgPattern}</Text>

                    {/* Card Content */}
                    <View style={styles.cardHeader}>
                      <View style={styles.iconCircle}>
                        <FontAwesome5 name={category.icon} size={24} color="#fff" />
                      </View>
                      <View style={styles.headerTextContainer}>
                        <Text style={styles.cardTitle}>{category.title}</Text>
                      </View>
                    </View>

                    <Text style={styles.cardSubtitle}>{category.subtitle}</Text>

                    {/* Explore Button */}
                    <View style={styles.exploreButtonContainer}>
                      <View style={styles.exploreButton}>
                        <Text style={styles.exploreButtonText}>Explore More</Text>
                        <Ionicons name="arrow-forward" size={16} color="#fff" />
                      </View>
                    </View>

                    {/* Decorative elements */}
                    <View style={styles.decorativeCircle1} />
                    <View style={styles.decorativeCircle2} />
                  </LinearGradient>
                </TouchableOpacity>
              </Animated.View>
            );
          })}

          {/* Bottom Padding */}
          <View style={{ height: 100 }} />
        </ScrollView>
      </Animated.View>

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
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  mainContent: {
    flex: 1,
  },
  scrollContent: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 20,
  },
  categoryCard: {
    marginBottom: 20,
    borderRadius: 24,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  cardGradient: {
    padding: 24,
    minHeight: 180,
    position: 'relative',
    overflow: 'hidden',
  },
  bgPattern: {
    position: 'absolute',
    fontSize: 120,
    opacity: 0.1,
    right: -20,
    bottom: -30,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    zIndex: 2,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 20,
    marginBottom: 16,
    zIndex: 2,
  },
  exploreButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    zIndex: 2,
  },
  exploreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    gap: 8,
  },
  exploreButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  decorativeCircle1: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    top: -30,
    right: -30,
  },
  decorativeCircle2: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    bottom: -10,
    left: -10,
  },
});

export default LearningHubScreen;
