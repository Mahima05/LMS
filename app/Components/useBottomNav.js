import { useRef, useState } from 'react';
import { Animated } from 'react-native';

export const useBottomNav = (initialTab = 'Dashboard') => {
  const [selectedTab, setSelectedTab] = useState(initialTab);
  const tabScaleAnims = useRef([...Array(3)].map(() => new Animated.Value(1))).current;
  const rotateAnims = useRef([...Array(3)].map(() => new Animated.Value(0))).current;

  const handleTabPress = (index, tabName, navigation) => {
    setSelectedTab(tabName);

    // Scale animation
    Animated.sequence([
      Animated.spring(tabScaleAnims[index], {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(tabScaleAnims[index], {
        toValue: 1.2,
        tension: 50,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.spring(tabScaleAnims[index], {
        toValue: 1,
        tension: 50,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();

    // Rotation animation
    Animated.sequence([
      Animated.timing(rotateAnims[index], {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnims[index], {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigation
    if (index === 1) {
      navigation.navigate('Dashboard');
    } else if (index === 2) {
      navigation.navigate('Calendar');
    } else if (index === 0) {
      navigation.navigate('TrainingSession');
    }
  };

  return {
    selectedTab,
    tabScaleAnims,
    rotateAnims,
    handleTabPress,
  };
};
