import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Image, StyleSheet, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function SplashScreen({ navigation, onFinish }) {

  const logoScale = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Logo animation
    Animated.spring(logoScale, {
      toValue: 1,
      tension: 10,
      friction: 3,
      useNativeDriver: true,
    }).start();

    // Text animation
    Animated.timing(textOpacity, {
      toValue: 1,
      duration: 800,
      delay: 300,
      useNativeDriver: true,
    }).start();

    // Loading dots animation
    const animateDots = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(dot1, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(dot2, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(dot3, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.parallel([
            Animated.timing(dot1, { toValue: 0, duration: 0, useNativeDriver: true }),
            Animated.timing(dot2, { toValue: 0, duration: 0, useNativeDriver: true }),
            Animated.timing(dot3, { toValue: 0, duration: 0, useNativeDriver: true }),
          ]),
        ])
      ).start();
    };

    setTimeout(animateDots, 700);

    // Auto hide after 3 seconds
    const timer = setTimeout(() => {
      if (onFinish) onFinish();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const dotScale = (dot) => ({
    transform: [
      {
        scale: dot.interpolate({
          inputRange: [0, 1],
          outputRange: [0.8, 1.2],
        }),
      },
    ],
    opacity: dot.interpolate({
      inputRange: [0, 1],
      outputRange: [0.5, 1],
    }),
  });

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {/* Animated Logo Container */}
      <Animated.View
        style={[
          styles.logoContainer,
          {
            transform: [{ scale: logoScale }],
          },
        ]}
      >
        {/* Logo Image */}
        <Image
          source={require('../../assets/images/LOGOO.png')} // Update path to your image
          style={styles.logoImage}
          resizeMode="contain"
        />
      </Animated.View>

      {/* Tagline */}
      <Animated.Text allowFontScaling={false} style={[styles.tagline, { opacity: textOpacity }]}>
        Learn Today, Lead Tomorrow
      </Animated.Text>

      {/* Loading Dots */}
      <View style={styles.loadingContainer}>
        <Animated.View style={[styles.dot, dotScale(dot1)]} />
        <Animated.View style={[styles.dot, dotScale(dot2)]} />
        <Animated.View style={[styles.dot, dotScale(dot3)]} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: 200,
    height: 200,
    backgroundColor: 'white',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 20,
    padding: 20,
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  tagline: {
    color: 'rgba(255, 255, 255, 0.95)',
    fontSize: 20,
    fontWeight: '400',
    marginTop: 30,
    letterSpacing: 1,
  },
  loadingContainer: {
    flexDirection: 'row',
    marginTop: 50,
    gap: 8,
  },
  dot: {
    width: 12,
    height: 12,
    backgroundColor: 'white',
    borderRadius: 6,
  },
});