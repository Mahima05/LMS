import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Easing, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

/**
 * @typedef {Object} Labels
 * @property {string} [previous]
 * @property {string} [next]
 * @property {string} [skip]
 * @property {string} [finish]
 *
 * @typedef {Object} TooltipProps
 * @property {boolean} [isFirstStep]
 * @property {boolean} [isLastStep]
 * @property {() => void} [handleNext]
 * @property {() => void} [handlePrev]
 * @property {() => void} [handleStop]
 * @property {Object} [currentStep]
 * @property {Labels} [labels]
 *
 * @param {TooltipProps} props
 */
const CustomTooltip = ({
    isFirstStep = false,
    isLastStep = false,
    handleNext = () => { },
    handlePrev = () => { },
    handleStop = () => { },
    currentStep = {},
    labels = { previous: 'Back', next: 'Next', skip: 'Skip', finish: 'Got it!' },
}) => {
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const glowAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Pulse animation for step number
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.15,
                    duration: 1000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        ).start();

        // Glow animation
        Animated.loop(
            Animated.sequence([
                Animated.timing(glowAnim, {
                    toValue: 1,
                    duration: 1500,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(glowAnim, {
                    toValue: 0,
                    duration: 1500,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    const glowOpacity = glowAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.3, 0.7],
    });

    return (
  <View style={styles.tooltipContainer}>
    {/* Step Number Circle - Positioned above tooltip */}
    <View style={styles.stepNumberContainer}>
      <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
        <LinearGradient colors={['#7B68EE', '#9D7FEA']} style={styles.stepGradient}>
          <View style={styles.stepInnerCircle}>
            <Text style={styles.stepNumberText}>{currentStep?.order ?? 1}</Text>
          </View>
        </LinearGradient>
      </Animated.View>
      {/* Animated glow ring */}
      <Animated.View style={[styles.stepGlowRing, { opacity: glowOpacity }]} />
    </View>

    {/* Modern glassmorphic card */}
    <LinearGradient
      colors={['rgba(123, 104, 238, 0.2)', 'rgba(157, 127, 234, 0.1)']}
      style={styles.tooltipGradient}
    >
      <View style={styles.glassEffect}>
        {/* Step indicator badge */}
        <View style={styles.stepBadge}>
          <LinearGradient colors={['#7B68EE', '#9D7FEA']} style={styles.badgeGradient}>
            <Ionicons name="bulb" size={14} color="#fff" />
            <Text style={styles.stepText}>Step {currentStep?.order ?? 1}</Text>
          </LinearGradient>
        </View>

        {/* Tooltip content */}
        <Text style={styles.tooltipText}>
          {currentStep?.text || 'Welcome to the tutorial!'}
        </Text>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Action buttons */}
        <View style={styles.buttonContainer}>
          {!isFirstStep && (
            <TouchableOpacity style={styles.secondaryButton} onPress={handlePrev}>
              <Ionicons name="arrow-back" size={18} color="#9D7FEA" />
              <Text style={styles.secondaryButtonText}>{labels.previous}</Text>
            </TouchableOpacity>
          )}

          {isFirstStep && (
            <TouchableOpacity style={styles.skipButton} onPress={handleStop}>
              <Text style={styles.skipButtonText}>{labels.skip}</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.primaryButtonWrapper}
            onPress={isLastStep ? handleStop : handleNext}
          >
            <LinearGradient colors={['#7B68EE', '#9D7FEA']} style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>
                {isLastStep ? labels.finish : labels.next}
              </Text>
              <Ionicons
                name={isLastStep ? 'checkmark-circle' : 'arrow-forward'}
                size={20}
                color="#fff"
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  </View>
);


};

const styles = StyleSheet.create({
    tooltipContainer: {
        maxWidth: width - 60,
        alignItems: 'center',
        marginTop: 60, // Space for step number circle (increase this to push tooltip down)
        paddingHorizontal: 8, // additional horizontal padding for tooltip positioning
    },
    // Step Number Styles
    stepNumberContainer: {
        position: 'absolute',
        top: -20, // move step number circle down (less negative)
        zIndex: 10,
    },
    stepGradient: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 15,
        shadowColor: '#7B68EE',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.6,
        shadowRadius: 15,
    },
    stepInnerCircle: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: 'rgba(26, 26, 46, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    stepNumberText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    stepGlowRing: {
        position: 'absolute',
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 2,
        borderColor: 'rgba(123, 104, 238, 0.5)',
        top: -5,
        left: -5,
    },
    // Tooltip Card Styles
    tooltipGradient: {
        borderRadius: 28,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.18)',
        overflow: 'hidden',
        elevation: 20,
        shadowColor: '#7B68EE',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        width: '100%',
        marginTop: 10,
    },
    glassEffect: {
        backgroundColor: 'rgba(29, 29, 39, 0.95)',
        padding: 24,
    },
    stepBadge: {
        alignSelf: 'flex-start',
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 16,
        elevation: 5,
    },
    badgeGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 14,
        gap: 6,
    },
    stepText: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    tooltipText: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.95)',
        lineHeight: 24,
        marginBottom: 20,
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    secondaryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 18,
        borderRadius: 16,
        backgroundColor: 'rgba(157, 127, 234, 0.12)',
        borderWidth: 1,
        borderColor: 'rgba(157, 127, 234, 0.3)',
        gap: 6,
    },
    secondaryButtonText: {
        color: '#9D7FEA',
        fontSize: 15,
        fontWeight: '600',
    },
    skipButton: {
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    skipButtonText: {
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: 14,
        fontWeight: '600',
    },
    primaryButtonWrapper: {
        flex: 1,
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#7B68EE',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    primaryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        paddingHorizontal: 24,
        gap: 8,
    },
    primaryButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
});

export default CustomTooltip;
