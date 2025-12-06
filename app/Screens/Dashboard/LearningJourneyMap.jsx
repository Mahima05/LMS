// import { LinearGradient } from 'expo-linear-gradient';
// import { useEffect, useRef, useState } from 'react';
// import {
//   ActivityIndicator,
//   Animated,
//   Dimensions,
//   Easing,
//   RefreshControl,
//   ScrollView,
//   StyleSheet,
//   Text,
//   View
// } from 'react-native';

// const { width } = Dimensions.get('window');

// const LearningJourneyMap = () => {
//   const [journeyData, setJourneyData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [error, setError] = useState(null);
//   const [animatedSteps, setAnimatedSteps] = useState([]);
//   const [fadeAnims, setFadeAnims] = useState([]);
//   const [pulseAnims, setPulseAnims] = useState([]);
//   const [rotateAnims, setRotateAnims] = useState([]);
//   const [bounceAnims, setBounceAnims] = useState([]);
//   const [glowAnims, setGlowAnims] = useState([]);

//   const confettiAnim = useRef(new Animated.Value(0)).current;
//   const flagWaveAnim = useRef(new Animated.Value(0)).current;
//   const starburstAnim = useRef(new Animated.Value(0)).current;
//   const celebrationScale = useRef(new Animated.Value(0)).current;

//   // API Configuration
//   // const API_URL = 'https://lms-api-qa.abisaio.com/api/v1/Journey/user-progress';
//   //const API_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMDAwNzA2OSIsIlVzZXJJZCI6IjQ1NDYwIiwiRW1haWwiOiJkZXZlbG9wZXJAbWFya3VwbGFiLmNvbSIsImp0aSI6IjllMDA4MTBkLWRlNzktNDBkOS1iZGJhLTAxNjlkMmNjNDEwOCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlVzZXIiLCJVc2VyVHlwZSI6IlVzZXIiLCJleHAiOjE3NjYyMDExODIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6Mjg3NDciLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjI4NzQ3In0.CljD-wqPF_3pXeHOWLP4otN_qDvKYs2KiRHTLmFceAo';

//   // Start continuous pulse animation for active step
//   const startPulseAnimation = (anim) => {
//     Animated.loop(
//       Animated.sequence([
//         Animated.timing(anim, {
//           toValue: 1,
//           duration: 1500,
//           easing: Easing.inOut(Easing.ease),
//           useNativeDriver: true,
//         }),
//         Animated.timing(anim, {
//           toValue: 0,
//           duration: 1500,
//           easing: Easing.inOut(Easing.ease),
//           useNativeDriver: true,
//         }),
//       ])
//     ).start();
//   };

//   // Start continuous rotation for completed steps
//   const startRotationAnimation = (anim) => {
//     Animated.loop(
//       Animated.timing(anim, {
//         toValue: 1,
//         duration: 3000,
//         easing: Easing.linear,
//         useNativeDriver: true,
//       })
//     ).start();
//   };

//   // Start glow animation
//   const startGlowAnimation = (anim) => {
//     Animated.loop(
//       Animated.sequence([
//         Animated.timing(anim, {
//           toValue: 1,
//           duration: 2000,
//           easing: Easing.inOut(Easing.ease),
//           useNativeDriver: true,
//         }),
//         Animated.timing(anim, {
//           toValue: 0,
//           duration: 2000,
//           easing: Easing.inOut(Easing.ease),
//           useNativeDriver: true,
//         }),
//       ])
//     ).start();
//   };

//   // Fetch journey data from API
//   // const fetchJourneyData = async () => {
//   //   try {
//   //     setLoading(true);
//   //     setError(null);

//   //     const response = await axios.get(API_URL, {
//   //       headers: {
//   //         'Authorization': `Bearer ${API_TOKEN}`,
//   //         'Content-Type': 'application/json',
//   //       }
//   //     });

//   //     if (response.data.succeeded) {
//   //       setJourneyData(response.data);
//   //       const total = response.data.totalAssigned;

//   //       // Initialize all animations
//   //       setFadeAnims(Array(total).fill(0).map(() => new Animated.Value(0)));
//   //       setPulseAnims(Array(total).fill(0).map(() => new Animated.Value(0)));
//   //       setRotateAnims(Array(total).fill(0).map(() => new Animated.Value(0)));
//   //       setBounceAnims(Array(total).fill(0).map(() => new Animated.Value(0)));
//   //       setGlowAnims(Array(total).fill(0).map(() => new Animated.Value(0)));
//   //     } else {
//   //       setError('Failed to load journey data');
//   //     }
//   //   } catch (err) {
//   //     console.error('API Error:', err);
//   //     setError(err.message || 'Failed to fetch journey data');
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   // const onRefresh = async () => {
//   //   setRefreshing(true);
//   //   await fetchJourneyData();
//   //   setRefreshing(false);
//   // };

//   // useEffect(() => {
//   //   fetchJourneyData();
//   // }, []);

//   // Animate steps with staggered entrance
//   useEffect(() => {
//     if (journeyData && fadeAnims.length > 0) {
//       const steps = Array.from({ length: journeyData.totalAssigned }, (_, i) => i);

//       steps.forEach((step, index) => {
//         setTimeout(() => {
//           setAnimatedSteps(prev => [...prev, step]);

//           const isCompleted = index < journeyData.completed;
//           const isActive = index === journeyData.completed;

//           // Entrance animation
//           Animated.parallel([
//             Animated.spring(fadeAnims[index], {
//               toValue: 1,
//               tension: 50,
//               friction: 7,
//               useNativeDriver: true,
//             }),
//             Animated.sequence([
//               Animated.spring(bounceAnims[index], {
//                 toValue: 1.2,
//                 tension: 100,
//                 friction: 3,
//                 useNativeDriver: true,
//               }),
//               Animated.spring(bounceAnims[index], {
//                 toValue: 1,
//                 tension: 50,
//                 friction: 7,
//                 useNativeDriver: true,
//               }),
//             ]),
//           ]).start();

//           // Start continuous animations based on state
//           if (isActive) {
//             startPulseAnimation(pulseAnims[index]);
//             startGlowAnimation(glowAnims[index]);
//           }

//           if (isCompleted) {
//             startRotationAnimation(rotateAnims[index]);
//             startGlowAnimation(glowAnims[index]);
//           }
//         }, index * 400);
//       });
//     }
//   }, [journeyData, fadeAnims]);

//   // Celebration animation when all complete
//   useEffect(() => {
//     if (journeyData && journeyData.completed === journeyData.totalAssigned && animatedSteps.length === journeyData.totalAssigned) {
//       setTimeout(() => {
//         // Flag wave
//         Animated.loop(
//           Animated.sequence([
//             Animated.timing(flagWaveAnim, {
//               toValue: 1,
//               duration: 1000,
//               easing: Easing.inOut(Easing.sine),
//               useNativeDriver: true,
//             }),
//             Animated.timing(flagWaveAnim, {
//               toValue: 0,
//               duration: 1000,
//               easing: Easing.inOut(Easing.sine),
//               useNativeDriver: true,
//             }),
//           ])
//         ).start();

//         // Confetti rain
//         Animated.loop(
//           Animated.timing(confettiAnim, {
//             toValue: 1,
//             duration: 3000,
//             easing: Easing.linear,
//             useNativeDriver: true,
//           })
//         ).start();

//         // Starburst
//         Animated.loop(
//           Animated.sequence([
//             Animated.timing(starburstAnim, {
//               toValue: 1,
//               duration: 1500,
//               easing: Easing.out(Easing.ease),
//               useNativeDriver: true,
//             }),
//             Animated.timing(starburstAnim, {
//               toValue: 0,
//               duration: 0,
//               useNativeDriver: true,
//             }),
//           ])
//         ).start();

//         // Celebration scale pop
//         Animated.sequence([
//           Animated.spring(celebrationScale, {
//             toValue: 1.1,
//             tension: 50,
//             friction: 3,
//             useNativeDriver: true,
//           }),
//           Animated.spring(celebrationScale, {
//             toValue: 1,
//             tension: 50,
//             friction: 7,
//             useNativeDriver: true,
//           }),
//         ]).start();
//       }, 500);
//     }
//   }, [journeyData, animatedSteps]);

//   const renderStepIcon = (stepNumber, isCompleted, isActive, index) => {
//     const pulseScale = pulseAnims[index]?.interpolate({
//       inputRange: [0, 1],
//       outputRange: [1, 1.15],
//     }) || 1;

//     const rotateZ = rotateAnims[index]?.interpolate({
//       inputRange: [0, 1],
//       outputRange: ['0deg', '360deg'],
//     }) || '0deg';

//     const glowOpacity = glowAnims[index]?.interpolate({
//       inputRange: [0, 1],
//       outputRange: [0.3, 1],
//     }) || 0.5;

//     if (isCompleted) {
//       return (
//         <Animated.View style={[
//           styles.stepCircle,
//           styles.completedCircle,
//           {
//             transform: [
//               { scale: bounceAnims[index] || 1 },
//               { rotate: rotateZ }
//             ]
//           }
//         ]}>
//           {/* Outer glow ring */}
//           <Animated.View style={[
//             styles.glowRing,
//             styles.glowRingCompleted,
//             { opacity: glowOpacity }
//           ]} />

//           {/* Sparkles */}
//           <View style={styles.sparkleContainer}>
//             <Animated.Text style={[
//               styles.sparkle,
//               { opacity: glowOpacity, transform: [{ rotate: '0deg' }] }
//             ]}>✨</Animated.Text>
//             <Animated.Text style={[
//               styles.sparkle,
//               { opacity: glowOpacity, transform: [{ rotate: '90deg' }] }
//             ]}>✨</Animated.Text>
//             <Animated.Text style={[
//               styles.sparkle,
//               { opacity: glowOpacity, transform: [{ rotate: '180deg' }] }
//             ]}>✨</Animated.Text>
//             <Animated.Text style={[
//               styles.sparkle,
//               { opacity: glowOpacity, transform: [{ rotate: '270deg' }] }
//             ]}>✨</Animated.Text>
//           </View>

//           <LinearGradient
//             colors={['#00d4aa', '#00a884', '#00d4aa']}
//             style={styles.gradientCircle}
//           >
//             <Animated.Text style={[
//               styles.checkmark,
//               { transform: [{ scale: bounceAnims[index] || 1 }] }
//             ]}>✓</Animated.Text>
//           </LinearGradient>
//         </Animated.View>
//       );
//     }

//     if (isActive) {
//       return (
//         <Animated.View style={[
//           styles.stepCircle,
//           { transform: [{ scale: bounceAnims[index] || 1 }] }
//         ]}>
//           {/* Multiple pulse rings */}
//           <Animated.View style={[
//             styles.pulseRing,
//             styles.pulseRing1,
//             {
//               transform: [{ scale: pulseScale }],
//               opacity: pulseAnims[index]?.interpolate({
//                 inputRange: [0, 1],
//                 outputRange: [0.7, 0],
//               }) || 0.5
//             }
//           ]} />
//           <Animated.View style={[
//             styles.pulseRing,
//             styles.pulseRing2,
//             {
//               transform: [{
//                 scale: pulseAnims[index]?.interpolate({
//                   inputRange: [0, 1],
//                   outputRange: [1, 1.3],
//                 }) || 1
//               }],
//               opacity: pulseAnims[index]?.interpolate({
//                 inputRange: [0, 1],
//                 outputRange: [0.5, 0],
//               }) || 0.3
//             }
//           ]} />

//           {/* Glowing outer ring */}
//           <Animated.View style={[
//             styles.glowRing,
//             styles.glowRingActive,
//             { opacity: glowOpacity }
//           ]} />

//           <LinearGradient
//             colors={['#6c5ce7', '#5448c8', '#a44aff']}
//             style={styles.gradientCircle}
//           >
//             <Animated.Text style={[
//               styles.stepNumber,
//               { transform: [{ scale: pulseScale }] }
//             ]}>{stepNumber + 1}</Animated.Text>
//           </LinearGradient>

//           {/* Progress ring */}
//           <Animated.View style={[
//             styles.progressRing,
//             {
//               opacity: pulseAnims[index]?.interpolate({
//                 inputRange: [0, 1],
//                 outputRange: [1, 0.5],
//               }) || 0.7
//             }
//           ]} />
//         </Animated.View>
//       );
//     }

//     return (
//       <Animated.View style={[
//         styles.stepCircle,
//         styles.inactiveCircle,
//         { transform: [{ scale: bounceAnims[index] || 1 }] }
//       ]}>
//         <Text style={styles.stepNumberInactive}>{stepNumber + 1}</Text>
//         {/* Lock icon overlay */}
//         <View style={styles.lockOverlay}>
//           <Text style={styles.lockIcon}>🔒</Text>
//         </View>
//       </Animated.View>
//     );
//   };

//   const renderConnectingLine = (index, isCompleted, isLeft) => {
//     const lineProgress = fadeAnims[index]?.interpolate({
//       inputRange: [0, 1],
//       outputRange: [0, 60],
//     }) || 0;

//     const scaleY = lineProgress.interpolate({
//       inputRange: [0, 60],
//       outputRange: [0, 1],
//     });

//     const translateY = Animated.multiply(-30, Animated.subtract(1, scaleY));

//     return (
//       <Animated.View style={[
//         styles.connectingLine,
//         isLeft ? styles.lineToLeft : styles.lineToRight,
//         {
//           transform: [
//             { scaleY },
//             { translateY }
//           ]
//         }
//       ]}>
//         {isCompleted ? (
//           <>
//             <LinearGradient
//               colors={['#00d4aa', '#00a884']}
//               style={styles.lineGradient}
//             />
//             {/* Flowing particles on line */}
//             <Animated.View style={[
//               styles.flowingParticle,
//               {
//                 opacity: glowAnims[index]?.interpolate({
//                   inputRange: [0, 1],
//                   outputRange: [0.5, 1],
//                 }) || 0.7
//               }
//             ]} />
//           </>
//         ) : (
//           <View style={styles.dashedLine} />
//         )}
//       </Animated.View>
//     );
//   };

//   const renderPath = () => {
//     if (!journeyData) return null;

//     const steps = [];
//     const totalSteps = journeyData.totalAssigned;

//     for (let i = 0; i < totalSteps; i++) {
//       const isCompleted = i < journeyData.completed;
//       const isActive = i === journeyData.completed;
//       const isVisible = animatedSteps.includes(i);
//       const isLeft = i % 2 === 0;

//       if (!isVisible) continue;

//       const translateX = fadeAnims[i]?.interpolate({
//         inputRange: [0, 1],
//         outputRange: [isLeft ? -80 : 80, 0]
//       }) || 0;

//       steps.push(
//         <Animated.View
//           key={i}
//           style={[
//             styles.stepContainer,
//             {
//               opacity: fadeAnims[i] || 0,
//               transform: [{ translateX }]
//             }
//           ]}
//         >
//           {/* Connecting Line with animation */}
//           {i > 0 && renderConnectingLine(i, isCompleted, isLeft)}

//           {/* Step Content */}
//           <View style={[
//             styles.stepContent,
//             isLeft ? styles.stepLeft : styles.stepRight
//           ]}>
//             {isLeft ? (
//               <>
//                 <Animated.View style={[
//                   styles.stepInfo,
//                   isActive && styles.stepInfoActive,
//                   isCompleted && styles.stepInfoCompleted,
//                   {
//                     transform: [{ scale: bounceAnims[i] || 1 }]
//                   }
//                 ]}>
//                   <View style={styles.stepHeader}>
//                     <Text style={[
//                       styles.stepTitle,
//                       isCompleted && styles.completedText
//                     ]}>
//                       Step {i + 1}
//                     </Text>
//                     <View style={[
//                       styles.statusBadge,
//                       isCompleted && styles.statusBadgeCompleted,
//                       isActive && styles.statusBadgeActive
//                     ]}>
//                       <Text style={styles.statusText}>
//                         {isCompleted ? '✓ Done' : isActive ? '⚡ Active' : '🔒 Locked'}
//                       </Text>
//                     </View>
//                   </View>
//                   <Text style={styles.stepDescription}>
//                     {isCompleted
//                       ? 'Successfully completed! Great work!'
//                       : isActive
//                         ? 'You are here! Keep going!'
//                         : 'Complete previous steps to unlock'}
//                   </Text>
//                   <View style={styles.progressBar}>
//                     <Animated.View style={[
//                       styles.progressFill,
//                       { width: isCompleted ? '100%' : isActive ? '50%' : '0%' }
//                     ]}>
//                       <LinearGradient
//                         colors={isCompleted ? ['#00d4aa', '#00a884'] : ['#6c5ce7', '#a44aff']}
//                         start={{ x: 0, y: 0 }}
//                         end={{ x: 1, y: 0 }}
//                         style={styles.progressGradient}
//                       />
//                     </Animated.View>
//                   </View>
//                 </Animated.View>
//                 {renderStepIcon(i, isCompleted, isActive, i)}
//               </>
//             ) : (
//               <>
//                 {renderStepIcon(i, isCompleted, isActive, i)}
//                 <Animated.View style={[
//                   styles.stepInfo,
//                   isActive && styles.stepInfoActive,
//                   isCompleted && styles.stepInfoCompleted,
//                   {
//                     transform: [{ scale: bounceAnims[i] || 1 }]
//                   }
//                 ]}>
//                   <View style={styles.stepHeader}>
//                     <Text style={[
//                       styles.stepTitle,
//                       isCompleted && styles.completedText
//                     ]}>
//                       Step {i + 1}
//                     </Text>
//                     <View style={[
//                       styles.statusBadge,
//                       isCompleted && styles.statusBadgeCompleted,
//                       isActive && styles.statusBadgeActive
//                     ]}>
//                       <Text style={styles.statusText}>
//                         {isCompleted ? '✓ Done' : isActive ? '⚡ Active' : '🔒 Locked'}
//                       </Text>
//                     </View>
//                   </View>
//                   <Text style={styles.stepDescription}>
//                     {isCompleted
//                       ? 'Successfully completed! Great work!'
//                       : isActive
//                         ? 'You are here! Keep going!'
//                         : 'Complete previous steps to unlock'}
//                   </Text>
//                   <View style={styles.progressBar}>
//                     <Animated.View style={[
//                       styles.progressFill,
//                       { width: isCompleted ? '100%' : isActive ? '50%' : '0%' }
//                     ]}>
//                       <LinearGradient
//                         colors={isCompleted ? ['#00d4aa', '#00a884'] : ['#6c5ce7', '#a44aff']}
//                         start={{ x: 0, y: 0 }}
//                         end={{ x: 1, y: 0 }}
//                         style={styles.progressGradient}
//                       />
//                     </Animated.View>
//                   </View>
//                 </Animated.View>
//               </>
//             )}
//           </View>
//         </Animated.View>
//       );
//     }

//     return steps;
//   };

//   const renderFinishFlag = () => {
//     if (!journeyData) return null;

//     const allCompleted = journeyData.completed === journeyData.totalAssigned;
//     const isVisible = animatedSteps.length === journeyData.totalAssigned;

//     if (!isVisible) return null;

//     const waveRotation = flagWaveAnim.interpolate({
//       inputRange: [0, 1],
//       outputRange: ['-5deg', '5deg'],
//     });

//     const confettiY = confettiAnim.interpolate({
//       inputRange: [0, 1],
//       outputRange: [-20, 600],
//     });

//     const starburstScale = starburstAnim.interpolate({
//       inputRange: [0, 1],
//       outputRange: [0, 2],
//     });

//     const starburstOpacity = starburstAnim.interpolate({
//       inputRange: [0, 0.5, 1],
//       outputRange: [0, 1, 0],
//     });

//     return (
//       <Animated.View style={[
//         styles.finishContainer,
//         {
//           opacity: fadeAnims[journeyData.totalAssigned - 1] || 1,
//         }
//       ]}>
//         <View style={[
//           styles.flagPole,
//           allCompleted && styles.flagPoleActive
//         ]} />

//         <Animated.View style={[
//           styles.flag,
//           allCompleted && styles.flagActive,
//           allCompleted && { transform: [{ rotate: waveRotation }] }
//         ]}>
//           {allCompleted ? (
//             <LinearGradient
//               colors={['#ffd700', '#ffed4e', '#ffd700']}
//               style={styles.flagGradient}
//             >
//               <Text style={styles.flagText}>🏆 Journey Complete! 🏆</Text>
//             </LinearGradient>
//           ) : (
//             <Text style={styles.flagTextInactive}>🏁 Finish Line</Text>
//           )}
//         </Animated.View>

//         {allCompleted && (
//           <>
//             {/* Starburst effect */}
//             <Animated.View style={[
//               styles.starburst,
//               {
//                 transform: [{ scale: starburstScale }],
//                 opacity: starburstOpacity,
//               }
//             ]}>
//               <Text style={styles.starburstText}>⭐</Text>
//             </Animated.View>

//             {/* Confetti */}
//             <Animated.View style={[
//               styles.confettiContainer,
//               { transform: [{ translateY: confettiY }] }
//             ]}>
//               <Text style={styles.confetti}>🎉</Text>
//               <Text style={[styles.confetti, { left: 30 }]}>🎊</Text>
//               <Text style={[styles.confetti, { left: 60 }]}>✨</Text>
//               <Text style={[styles.confetti, { left: 90 }]}>🎉</Text>
//               <Text style={[styles.confetti, { left: 120 }]}>🎊</Text>
//               <Text style={[styles.confetti, { left: 150 }]}>✨</Text>
//             </Animated.View>

//             <Animated.View style={[
//               styles.celebration,
//               { transform: [{ scale: celebrationScale }] }
//             ]}>
//               <Text style={styles.celebrationText}>✨ 🎊 ✨ 🎉 ✨ 🎊 ✨</Text>
//               <Text style={styles.congratsText}>🎉 Congratulations! 🎉</Text>
//               <Text style={styles.congratsSubtext}>
//                 You've completed all {journeyData.totalAssigned} steps
//               </Text>
//               <Text style={styles.congratsSubtext2}>
//                 Amazing work! You're a learning champion! 🌟
//               </Text>
//             </Animated.View>
//           </>
//         )}
//       </Animated.View>
//     );
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric'
//     });
//   };

//   if (loading) {
//     return (
//       <View style={styles.centerContainer}>
//         <ActivityIndicator size="large" color="#6c5ce7" />
//         <Text style={styles.loadingText}>Loading your journey...</Text>
//       </View>
//     );
//   }

//   // if (error) {
//   //   return (
//   //     <View style={styles.centerContainer}>
//   //       <Text style={styles.errorIcon}>⚠️</Text>
//   //       <Text style={styles.errorText}>Oops! Something went wrong</Text>
//   //       <Text style={styles.errorSubtext}>{error}</Text>
//   //       <TouchableOpacity style={styles.retryButton} onPress={fetchJourneyData}>
//   //         <Text style={styles.retryButtonText}>Try Again</Text>
//   //       </TouchableOpacity>
//   //     </View>
//   //   );
//   // }

//   if (!journeyData) {
//     return (
//       <View style={styles.centerContainer}>
//         <Text style={styles.errorIcon}>📭</Text>
//         <Text style={styles.errorText}>No journey data available</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>

//       <LinearGradient
//         colors={['#1a1a2e', '#16213e']}
//         style={styles.header}
//       >
//         {/* <Text style={styles.journeyTitle}>{journeyData.journey.name}</Text> */}
//         {/* <Text style={styles.journeyDescription}>
//           {journeyData.journey.description}
//         </Text> */}
//         {/* <View style={styles.dateContainer}>
//           <Text style={styles.dateText}>
//             📅 {formatDate(journeyData.journey.startDate)} - {formatDate(journeyData.journey.endDate)}
//           </Text>
//           <View style={[
//             styles.statusBadgeLarge,
//             journeyData.journey.status === 'Published' && styles.statusBadgePublished
//           ]}>
//             <Text style={styles.statusBadgeText}>{journeyData.journey.status}</Text>
//           </View>
//         </View> */}
//         {/* <View style={styles.progressHeader}>
//           <Text style={styles.progressText}>
//             Overall Progress: {journeyData.completed}/{journeyData.totalAssigned} Steps
//           </Text>
//           <View style={styles.overallProgressBar}>
//             <Animated.View style={[
//               styles.overallProgressFill,
//               { width: `${(journeyData.completed / journeyData.totalAssigned) * 100}%` }
//             ]}>
//               <LinearGradient
//                 colors={['#6c5ce7', '#a44aff']}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 0 }}
//                 style={styles.overallProgressGradient}
//               />
//             </Animated.View>
//           </View>
//           <Text style={styles.percentageText}>
//             {Math.round((journeyData.completed / journeyData.totalAssigned) * 100)}% Complete
//           </Text>
//         </View> */}
//       </LinearGradient>

//       <ScrollView
//         style={styles.scrollView}
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={false}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={onRefresh}
//             tintColor="#6c5ce7"
//             colors={['#6c5ce7']}
//           />
//         }
//       >
//         <View style={styles.startContainer}>
//           {/* -----------------correct------- */}
//           <Text style={styles.journeyTitle}>{journeyData.journey.name}</Text>
//           <Text style={styles.dateText}>
//             📅 {formatDate(journeyData.journey.startDate)} - {formatDate(journeyData.journey.endDate)}
//           </Text>
//         </View>

//         {renderPath()}
//         {renderFinishFlag()}
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#0f0f23',
//   },
//   centerContainer: {
//     flex: 1,
//     backgroundColor: '#0f0f23',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   loadingText: {
//     marginTop: 16,
//     fontSize: 16,
//     color: '#a0a0a0',
//   },
//   errorIcon: {
//     fontSize: 64,
//     marginBottom: 16,
//   },
//   errorText: {
//     fontSize: 20,
//     color: '#fff',
//     fontWeight: 'bold',
//     marginBottom: 8,
//     textAlign: 'center',
//   },
//   errorSubtext: {
//     fontSize: 14,
//     color: '#a0a0a0',
//     textAlign: 'center',
//     marginBottom: 24,
//   },
//   retryButton: {
//     backgroundColor: '#6c5ce7',
//     paddingHorizontal: 32,
//     paddingVertical: 12,
//     borderRadius: 12,
//   },
//   retryButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   // header: {
//   //   padding: 20,
//   //   paddingTop: 60,
//   //   borderBottomLeftRadius: 30,
//   //   borderBottomRightRadius: 30,
//   //   shadowColor: '#000',
//   //   shadowOffset: { width: 0, height: 4 },
//   //   shadowOpacity: 0.3,
//   //   shadowRadius: 8,
//   //   elevation: 8,
//   // },
//   journeyTitle: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginBottom: 8,
//   },
//   journeyDescription: {
//     fontSize: 14,
//     color: '#a0a0a0',
//     marginBottom: 12,
//   },
//   // dateContainer: {
//   //   flexDirection: 'row',
//   //   justifyContent: 'space-between',
//   //   alignItems: 'center',
//   //   marginBottom: 20,
//   // },
//   dateText: {
//     fontSize: 13,
//     color: '#7a7a8e',
//   },
//   statusBadgeLarge: {
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 12,
//     backgroundColor: '#2a2a3e',
//   },
//   statusBadgePublished: {
//     backgroundColor: 'rgba(0, 212, 170, 0.2)',
//   },
//   statusBadgeText: {
//     fontSize: 12,
//     color: '#00d4aa',
//     fontWeight: '600',
//   },
//   progressHeader: {
//     marginTop: 10,
//   },
//   progressText: {
//     fontSize: 16,
//     color: '#fff',
//     marginBottom: 10,
//     fontWeight: '600',
//   },
//   overallProgressBar: {
//     height: 10,
//     backgroundColor: '#2a2a3e',
//     borderRadius: 5,
//     overflow: 'hidden',
//   },
//   overallProgressFill: {
//     height: '100%',
//   },
//   overallProgressGradient: {
//     flex: 1,
//   },
//   percentageText: {
//     fontSize: 14,
//     color: '#a0a0a0',
//     marginTop: 8,
//     textAlign: 'right',
//   },
//   scrollView: {
//     flex: 1,
//   },
//   scrollContent: {
//     padding: 20,
//     paddingTop: 40,
//     paddingBottom: 60,
//   },
//   startContainer: {
//     alignItems: 'center',
//     marginBottom: 50,
//   },
//   startCircle: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     overflow: 'hidden',
//     shadowColor: '#6c5ce7',
//     shadowOffset: { width: 0, height: 0 },
//     shadowOpacity: 0.8,
//     shadowRadius: 20,
//     elevation: 12,
//   },
//   startGradient: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   startIcon: {
//     fontSize: 36,
//   },
//   startText: {
//     marginTop: 12,
//     fontSize: 18,
//     color: '#fff',
//     fontWeight: '700',
//   },
//   startDate: {
//     marginTop: 4,
//     fontSize: 13,
//     color: '#7a7a8e',
//   },
//   stepContainer: {
//     marginBottom: 60,
//     position: 'relative',
//   },
//   connectingLine: {
//     position: 'absolute',
//     top: -60,
//     width: 4,
//     height: 60,
//     left: '50%',
//     marginLeft: -2,
//     overflow: 'hidden',
//   },
//   lineGradient: {
//     flex: 1,
//   },
//   dashedLine: {
//     flex: 1,
//     backgroundColor: '#2a2a3e',
//     borderStyle: 'dashed',
//   },
//   lineToLeft: {
//     transform: [{ translateX: -70 }],
//   },
//   lineToRight: {
//     transform: [{ translateX: 70 }],
//   },
//   flowingParticle: {
//     position: 'absolute',
//     width: 6,
//     height: 6,
//     borderRadius: 3,
//     backgroundColor: '#00d4aa',
//     left: -1,
//     top: '50%',
//   },
//   stepContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 15,
//   },
//   stepLeft: {
//     justifyContent: 'flex-end',
//   },
//   stepRight: {
//     justifyContent: 'flex-start',
//   },
//   stepCircle: {
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'relative',
//   },
//   completedCircle: {
//     shadowColor: '#00d4aa',
//     shadowOffset: { width: 0, height: 0 },
//     shadowOpacity: 0.8,
//     shadowRadius: 15,
//     elevation: 10,
//   },
//   inactiveCircle: {
//     backgroundColor: '#2a2a3e',
//     borderWidth: 2,
//     borderColor: '#3a3a4e',
//   },
//   gradientCircle: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 35,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   glowRing: {
//     position: 'absolute',
//     width: 90,
//     height: 90,
//     borderRadius: 45,
//     borderWidth: 2,
//   },
//   glowRingCompleted: {
//     borderColor: '#00d4aa',
//   },
//   glowRingActive: {
//     borderColor: '#6c5ce7',
//   },
//   sparkleContainer: {
//     position: 'absolute',
//     width: 100,
//     height: 100,
//   },
//   sparkle: {
//     position: 'absolute',
//     fontSize: 16,
//   },
//   pulseRing: {
//     position: 'absolute',
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//     borderWidth: 3,
//     borderColor: '#6c5ce7',
//   },
//   pulseRing1: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//   },
//   pulseRing2: {
//     width: 90,
//     height: 90,
//     borderRadius: 45,
//   },
//   progressRing: {
//     position: 'absolute',
//     width: 76,
//     height: 76,
//     borderRadius: 38,
//     borderWidth: 2,
//     borderColor: '#a44aff',
//     borderStyle: 'dashed',
//   },
//   checkmark: {
//     fontSize: 32,
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   stepNumber: {
//     fontSize: 24,
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   stepNumberInactive: {
//     fontSize: 22,
//     color: '#5a5a6e',
//     fontWeight: '600',
//   },
//   lockOverlay: {
//     position: 'absolute',
//     bottom: -5,
//     right: -5,
//     backgroundColor: '#1a1a2e',
//     borderRadius: 12,
//     padding: 2,
//   },
//   lockIcon: {
//     fontSize: 16,
//   },
//   stepInfo: {
//     flex: 1,
//     backgroundColor: '#1a1a2e',
//     padding: 18,
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: '#2a2a3e',
//   },
//   stepInfoActive: {
//     borderColor: '#6c5ce7',
//     borderWidth: 2,
//     shadowColor: '#6c5ce7',
//     shadowOffset: { width: 0, height: 0 },
//     shadowOpacity: 0.4,
//     shadowRadius: 10,
//     elevation: 6,
//     backgroundColor: '#1f1f35',
//   },
//   stepInfoCompleted: {
//     borderColor: '#00d4aa',
//     backgroundColor: '#1a2e2a',
//   },
//   stepHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   stepTitle: {
//     fontSize: 18,
//     color: '#fff',
//     fontWeight: '700',
//   },
//   completedText: {
//     color: '#00d4aa',
//   },
//   statusBadge: {
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     borderRadius: 12,
//     backgroundColor: '#2a2a3e',
//   },
//   statusBadgeCompleted: {
//     backgroundColor: 'rgba(0, 212, 170, 0.2)',
//   },
//   statusBadgeActive: {
//     backgroundColor: 'rgba(108, 92, 231, 0.2)',
//   },
//   statusText: {
//     fontSize: 11,
//     color: '#a0a0a0',
//     fontWeight: '600',
//   },
//   stepDescription: {
//     fontSize: 13,
//     color: '#7a7a8e',
//     marginBottom: 12,
//     lineHeight: 18,
//   },
//   progressBar: {
//     height: 6,
//     backgroundColor: '#2a2a3e',
//     borderRadius: 3,
//     overflow: 'hidden',
//   },
//   progressFill: {
//     height: '100%',
//   },
//   progressGradient: {
//     flex: 1,
//   },
//   finishContainer: {
//     alignItems: 'center',
//     marginTop: 30,
//     marginBottom: 40,
//     position: 'relative',
//   },
//   flagPole: {
//     width: 4,
//     height: 70,
//     backgroundColor: '#2a2a3e',
//     marginBottom: 0,
//   },
//   flagPoleActive: {
//     backgroundColor: '#ffd700',
//     shadowColor: '#ffd700',
//     shadowOffset: { width: 0, height: 0 },
//     shadowOpacity: 0.8,
//     shadowRadius: 10,
//   },
//   flag: {
//     paddingHorizontal: 28,
//     paddingVertical: 14,
//     borderRadius: 16,
//     backgroundColor: '#2a2a3e',
//     borderWidth: 2,
//     borderColor: '#3a3a4e',
//     overflow: 'hidden',
//   },
//   flagActive: {
//     backgroundColor: 'transparent',
//     borderColor: 'transparent',
//     shadowColor: '#ffd700',
//     shadowOffset: { width: 0, height: 0 },
//     shadowOpacity: 0.8,
//     shadowRadius: 20,
//     elevation: 12,
//   },
//   flagGradient: {
//     paddingHorizontal: 8,
//     paddingVertical: 2,
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   flagText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#0f0f23',
//   },
//   flagTextInactive: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#7a7a8e',
//   },
//   starburst: {
//     position: 'absolute',
//     top: 0,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   starburstText: {
//     fontSize: 80,
//   },
//   confettiContainer: {
//     position: 'absolute',
//     top: -20,
//     width: width,
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//   },
//   confetti: {
//     fontSize: 24,
//     position: 'absolute',
//   },
//   celebration: {
//     marginTop: 24,
//     alignItems: 'center',
//   },
//   celebrationText: {
//     fontSize: 28,
//     marginBottom: 12,
//   },
//   congratsText: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#ffd700',
//     marginBottom: 8,
//     textShadowColor: 'rgba(255, 215, 0, 0.5)',
//     textShadowOffset: { width: 0, height: 0 },
//     textShadowRadius: 10,
//   },
//   congratsSubtext: {
//     fontSize: 16,
//     color: '#a0a0a0',
//     marginBottom: 4,
//   },
//   congratsSubtext2: {
//     fontSize: 14,
//     color: '#7a7a8e',
//     fontStyle: 'italic',
//   },
// });

// export default LearningJourneyMap;

import { useEffect, useState } from 'react';

const LearningJourneyMap = () => {
  const [journeyData] = useState({
    journey: {
      name: "Learning Adventure",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
    },
    completed: 2,
    totalAssigned: 8
  });

  const [animatedSteps, setAnimatedSteps] = useState([]);

  // Path waypoints - creating a winding path
  const pathPoints = [
    { x: 50, y: 95 },   // Start bottom center
    { x: 30, y: 85 },
    { x: 60, y: 75 },
    { x: 40, y: 65 },
    { x: 70, y: 55 },
    { x: 35, y: 45 },
    { x: 65, y: 35 },
    { x: 40, y: 25 },
  ];

  useEffect(() => {
    pathPoints.forEach((_, index) => {
      setTimeout(() => {
        setAnimatedSteps(prev => [...prev, index]);
      }, index * 300);
    });
  }, []);

  const getStepStyle = (index) => {
    const isCompleted = index < journeyData.completed;
    const isActive = index === journeyData.completed;
    
    if (isCompleted) {
      return {
        background: 'linear-gradient(135deg, #FF6B6B 0%, #EE5A6F 100%)',
        boxShadow: '0 4px 15px rgba(255, 107, 107, 0.4)',
        border: '4px solid #FFE66D',
      };
    } else if (isActive) {
      return {
        background: 'linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)',
        boxShadow: '0 4px 15px rgba(78, 205, 196, 0.6)',
        border: '4px solid #FFFFFF',
        animation: 'pulse 2s ease-in-out infinite',
      };
    } else {
      return {
        background: '#8B7355',
        border: '4px solid #FFFFFF',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
      };
    }
  };

  const renderPath = () => {
    const paths = [];
    for (let i = 0; i < pathPoints.length - 1; i++) {
      const from = pathPoints[i];
      const to = pathPoints[i + 1];
      const isCompleted = i < journeyData.completed;
      
      const dx = to.x - from.x;
      const dy = to.y - from.y;
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      const length = Math.sqrt(dx * dx + dy * dy);

      paths.push(
        <div
          key={`path-${i}`}
          style={{
            position: 'absolute',
            left: `${from.x}%`,
            top: `${from.y}%`,
            width: `${length}%`,
            height: '40px',
            background: isCompleted 
              ? 'linear-gradient(90deg, #FFD93D 0%, #F9A826 100%)'
              : 'linear-gradient(90deg, #A8DADC 0%, #457B9D 100%)',
            border: '3px solid #F5F5DC',
            borderRadius: '20px',
            transform: `rotate(${angle}deg)`,
            transformOrigin: 'left center',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
            opacity: animatedSteps.includes(i) ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
          }}
        />
      );
    }
    return paths;
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #87CEEB 0%, #E0F6FF 100%)',
      position: 'relative',
      overflow: 'hidden',
      padding: '20px',
    }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        padding: '40px 20px 40px',
      }}>
        <h1 style={{
          fontSize: '42px',
          fontWeight: 'bold',
          color: '#2C3E50',
          textShadow: '2px 2px 4px rgba(255, 255, 255, 0.8)',
          margin: '0 0 10px 0',
        }}>
          {journeyData.journey.name}
        </h1>
        <p style={{
          fontSize: '18px',
          color: '#34495E',
          fontWeight: '600',
          margin: 0,
        }}>
          {journeyData.completed} of {journeyData.totalAssigned} completed
        </p>
      </div>

      {/* Map container */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto',
        height: '1200px',
        background: 'linear-gradient(180deg, #7EC850 0%, #6AB43E 100%)',
        borderRadius: '20px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
      }}>
        {/* Path */}
        {renderPath()}

        {/* Step nodes */}
        {pathPoints.map((point, index) => {
          const isCompleted = index < journeyData.completed;
          const isActive = index === journeyData.completed;
          const isVisible = animatedSteps.includes(index);

          return (
            <div
              key={`step-${index}`}
              style={{
                position: 'absolute',
                left: `${point.x}%`,
                top: `${point.y}%`,
                transform: 'translate(-50%, -50%)',
                opacity: isVisible ? 1 : 0,
                transition: 'all 0.5s ease-out',
              }}
            >
              {/* Stars for completed */}
              {isCompleted && (
                <div style={{
                  position: 'absolute',
                  top: '-30px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  animation: 'rotate 3s linear infinite',
                }}>
                  <span style={{ fontSize: '24px' }}>⭐</span>
                </div>
              )}

              {/* Step circle */}
              <div style={{
                width: '70px',
                height: '70px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                fontWeight: 'bold',
                color: '#FFFFFF',
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
                ...getStepStyle(index),
                position: 'relative',
              }}>
                {index + 1}
                {!isCompleted && !isActive && (
                  <div style={{
                    position: 'absolute',
                    bottom: '-8px',
                    right: '-8px',
                    fontSize: '20px',
                  }}>🔒</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.05); }
        }
        @keyframes rotate {
          from { transform: translateX(-50%) rotate(0deg); }
          to { transform: translateX(-50%) rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LearningJourneyMap;