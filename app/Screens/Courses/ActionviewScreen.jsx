// // import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
// // import { useRoute } from '@react-navigation/native';
// // import * as FileSystem from 'expo-file-system/legacy';
// // import { LinearGradient } from 'expo-linear-gradient';
// // import * as Sharing from 'expo-sharing';
// // import React, { useEffect, useRef, useState } from 'react';
// // import {
// //   Alert,
// //   Animated,
// //   Dimensions,
// //   Image,
// //   ScrollView,
// //   StatusBar,
// //   StyleSheet,
// //   Text,
// //   TouchableOpacity,
// //   View
// // } from 'react-native';
// // import { lookup as mimeLookup } from 'react-native-mime-types';

// // const { width } = Dimensions.get('window');

// // const ActionviewScreen = ({ navigation }) => {
// //   const route = useRoute();
// //   const { course } = route.params || {};

// //   const [selectedTab, setSelectedTab] = useState('Dashboard');

// //   // Download + open file
// //   const downloadFile = async (url, fileName) => {
// //     try {
// //       const fileUri = `${FileSystem.documentDirectory}${fileName}`;
// //       const { uri } = await FileSystem.downloadAsync(url, fileUri);
// //       console.log('File downloaded to:', uri);

// //       if (await Sharing.isAvailableAsync()) {
// //         await Sharing.shareAsync(uri);
// //       } else {
// //         Alert.alert('Downloaded', `File saved to: ${uri}`);
// //       }
// //     } catch (error) {
// //       console.error('File download error:', error);
// //       Alert.alert('Download Failed', 'Unable to download this file.');
// //     }
// //   };

// //   // Animations
// //   const fadeAnim = useRef(new Animated.Value(0)).current;
// //   const slideAnim = useRef(new Animated.Value(50)).current;
// //   const cardSlideAnim = useRef(new Animated.Value(30)).current;
// //   const tabScaleAnims = useRef([...Array(3)].map(() => new Animated.Value(1))).current;
// //   const rotateAnims = useRef([...Array(3)].map(() => new Animated.Value(0))).current;

// //   const bottomTabs = [
// //     { name: 'Sessions', icon: 'calendar', type: 'FontAwesome5' },
// //     { name: 'Dashboard', icon: 'view-dashboard', type: 'MaterialIcons' },
// //     { name: 'Calendar', icon: 'calendar-alt', type: 'FontAwesome5' },
// //   ];

// //   useEffect(() => {
// //     Animated.parallel([
// //       Animated.timing(fadeAnim, {
// //         toValue: 1,
// //         duration: 600,
// //         useNativeDriver: true,
// //       }),
// //       Animated.spring(slideAnim, {
// //         toValue: 0,
// //         tension: 50,
// //         friction: 8,
// //         useNativeDriver: true,
// //       }),
// //     ]).start();

// //     setTimeout(() => {
// //       Animated.spring(cardSlideAnim, {
// //         toValue: 0,
// //         tension: 40,
// //         friction: 7,
// //         useNativeDriver: true,
// //       }).start();
// //     }, 200);
// //   }, []);

// //   const handleTabPress = (index, tabName) => {
// //     setSelectedTab(tabName);

// //     Animated.sequence([
// //       Animated.spring(tabScaleAnims[index], {
// //         toValue: 0.8,
// //         duration: 100,
// //         useNativeDriver: true,
// //       }),
// //       Animated.spring(tabScaleAnims[index], {
// //         toValue: 1.2,
// //         tension: 50,
// //         friction: 3,
// //         useNativeDriver: true,
// //       }),
// //       Animated.spring(tabScaleAnims[index], {
// //         toValue: 1,
// //         tension: 50,
// //         friction: 3,
// //         useNativeDriver: true,
// //       }),
// //     ]).start();

// //     Animated.sequence([
// //       Animated.timing(rotateAnims[index], {
// //         toValue: 1,
// //         duration: 300,
// //         useNativeDriver: true,
// //       }),
// //       Animated.timing(rotateAnims[index], {
// //         toValue: 0,
// //         duration: 300,
// //         useNativeDriver: true,
// //       }),
// //     ]).start();

// //     if (index === 1) {
// //       navigation.navigate('Dashboard');
// //     } else if (index === 2) {
// //       navigation.navigate('Calendar');
// //     } else if (index === 0) {
// //       navigation.navigate('TrainingSession');
// //     }
// //   };
// //   const handleViewFile = async (fileUrl) => {
// //   try {
// //     const fileName = fileUrl.split('/').pop();
// //     const localPath = `${FileSystem.documentDirectory}${fileName}`;

// //     const fileInfo = await FileSystem.getInfoAsync(localPath);
// //     if (!fileInfo.exists) {
// //       console.log('Downloading file...');
// //       const downloadResumable = FileSystem.createDownloadResumable(fileUrl, localPath);
// //       await downloadResumable.downloadAsync();
// //       console.log('Download complete:', localPath);
// //     }

// //     const mimeType = mimeLookup(fileName) || 'application/octet-stream';
// //     console.log('Detected MIME type:', mimeType);

// //     // ✅ Use Sharing for both platforms
// //     const canShare = await Sharing.isAvailableAsync();
// //     if (canShare) {
// //       await Sharing.shareAsync(localPath, {
// //         mimeType,
// //         dialogTitle: 'Open file with...',
// //       });
// //     } else {
// //       alert('No compatible apps found to open this file.');
// //     }
// //   } catch (error) {
// //     console.error('Error opening file:', error);
// //   }
// // };
// //   const renderIcon = (item, isSelected, iconSize = 22) => {
// //     const iconColor = isSelected ? '#fff' : '#8B7AA3';
// //     switch (item.type) {
// //       case 'MaterialIcons':
// //         return <MaterialIcons name={item.icon} size={iconSize} color={iconColor} />;
// //       case 'FontAwesome5':
// //         return <FontAwesome5 name={item.icon} size={iconSize} color={iconColor} />;
// //       default:
// //         return <Ionicons name={item.icon} size={iconSize} color={iconColor} />;
// //     }
// //   };

// //   const BottomNavigation = () => {
// //     return (
// //       <View style={styles.bottomNavContainer}>
// //         <LinearGradient colors={['#2D1B69', '#1a1a2e']} style={styles.bottomNavBar}>
// //           {bottomTabs.map((tab, index) => {
// //             const isActive = tab.name === selectedTab;
// //             const rotation = rotateAnims[index].interpolate({
// //               inputRange: [0, 1],
// //               outputRange: ['0deg', '360deg'],
// //             });

// //             return (
// //               <TouchableOpacity
// //                 key={index}
// //                 onPress={() => handleTabPress(index, tab.name)}
// //                 activeOpacity={0.8}
// //                 style={[styles.tab, index === 1 && styles.centerTab]}
// //               >
// //                 <Animated.View
// //                   style={[
// //                     styles.tabIconContainer,
// //                     {
// //                       transform: [
// //                         { scale: tabScaleAnims[index] },
// //                         { rotate: rotation },
// //                       ],
// //                     },
// //                   ]}
// //                 >
// //                   {isActive && (
// //                     <LinearGradient
// //                       colors={['#7B68EE', '#9D7FEA']}
// //                       style={styles.centerTabBg}
// //                     />
// //                   )}
// //                   {renderIcon(tab, isActive, index === 1 ? 28 : 24)}
// //                 </Animated.View>
// //               </TouchableOpacity>
// //             );
// //           })}
// //         </LinearGradient>
// //       </View>
// //     );
// //   };

// //   // Helper to format date
// //   const formatDate = (dateString) => {
// //     if (!dateString) return '-';
// //     const d = new Date(dateString);
// //     return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <StatusBar barStyle="light-content" backgroundColor="#7B68EE" />

// //       <View style={styles.mainContent}>
// //         {/* Header */}
// //         <LinearGradient colors={['#1a1a2e', '#1a1a2e']} style={styles.header}>
// //           <View style={styles.headerTop}>
// //             <View style={styles.headerLeft}>
// //               <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
// //                 <Ionicons name="arrow-back" size={28} color="#fff" />
// //               </TouchableOpacity>
// //               <Text style={styles.headerTitle}>Course Details</Text>
// //             </View>
// //             <View style={styles.headerRight}>
// //               <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Dashboard')}>
// //                 <Ionicons name="home-outline" size={24} color="#fff" />
// //               </TouchableOpacity>
// //               <TouchableOpacity style={styles.iconButton}>
// //                 <Ionicons name="notifications-outline" size={24} color="#fff" />
// //                 <View style={styles.notificationDot} />
// //               </TouchableOpacity>
// //               <TouchableOpacity style={styles.iconButton}>
// //                 <Ionicons name="ellipsis-vertical" size={24} color="#fff" />
// //               </TouchableOpacity>
// //             </View>
// //           </View>
// //         </LinearGradient>

// //         {/* Content */}
// //         <ScrollView
// //           style={styles.scrollContent}
// //           showsVerticalScrollIndicator={false}
// //           contentContainerStyle={{ paddingBottom: 100 }}
// //         >
// //           <Animated.View
// //             style={[
// //               styles.contentCard,
// //               {
// //                 opacity: fadeAnim,
// //                 transform: [{ translateY: slideAnim }],
// //               },
// //             ]}
// //           >
// //             {/* Course Details Card */}
// //             <View
// //               style={{
// //                 backgroundColor: '#fff',
// //                 borderRadius: 12,
// //                 padding: 16,
// //                 marginBottom: 20,
// //                 elevation: 2,
// //               }}
// //             >
// //               <View style={{ flexDirection: 'row' }}>
// //                 <Image
// //                   source={{ uri: course?.imageUrl }}
// //                   style={{ width: 120, height: 120, borderRadius: 8 }}
// //                 />
// //                 <View style={{ flex: 1, marginLeft: 12 }}>
// //                   <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#333' }}>
// //                     {course?.name}
// //                   </Text>
// //                   <Text style={{ marginVertical: 6, color: '#555' }}>{course?.objective}</Text>

// //                   <Text style={{ color: '#666', marginBottom: 4 }}>
// //                     <Text style={{ fontWeight: 'bold', color: '#444' }}>Program: </Text>
// //                     {course?.programName || '-'}
// //                   </Text>

// //                   <Text style={{ color: '#666', marginBottom: 4 }}>
// //                     <Text style={{ fontWeight: 'bold', color: '#444' }}>Category: </Text>
// //                     {course?.category}  <Text style={{ fontWeight: 'bold' }}>Level:</Text>{' '}
// //                     {course?.level}
// //                   </Text>

// //                   <Text style={{ color: '#666', marginBottom: 4 }}>
// //                     <Text style={{ fontWeight: 'bold', color: '#444' }}>Status: </Text>
// //                     {course?.status}
// //                   </Text>

// //                   <Text style={{ color: '#666', marginBottom: 4 }}>
// //                     <Text style={{ fontWeight: 'bold', color: '#444' }}>Validity: </Text>
// //                     {formatDate(course?.validity)}
// //                   </Text>

// //                   <Text style={{ color: '#666', marginBottom: 4 }}>
// //                     <Text style={{ fontWeight: 'bold', color: '#444' }}>Published By: </Text>
// //                     {course?.publishedBy}
// //                   </Text>

// //                   <Text style={{ color: '#666', marginBottom: 4 }}>
// //                     <Text style={{ fontWeight: 'bold', color: '#444' }}>Published On: </Text>
// //                     {formatDate(course?.publishedOn)}
// //                   </Text>

// //                   <Text style={{ color: '#666', marginBottom: 4 }}>
// //                     <Text style={{ fontWeight: 'bold', color: '#444' }}>Last Updated: </Text>
// //                     {formatDate(course?.lastUpdatedOn)}
// //                   </Text>

// //                   <Text style={{ color: '#666' }}>
// //                     <Text style={{ fontWeight: 'bold', color: '#444' }}>Duration: </Text>
// //                     {course?.duration} mins
// //                   </Text>
// //                 </View>
// //               </View>
// //             </View>

// //             {/* Course Content Cards */}
// //             <View style={{ backgroundColor: '#fff', borderRadius: 12, padding: 16 }}>
// //               <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>
// //                 Course Content
// //               </Text>

// //               {course?.courseContent?.length > 0 ? (
// //                 course.courseContent
// //                   .sort((a, b) => a.displayOrder - b.displayOrder)
// //                   .map((content, index) => (
// //                     <View
// //                       key={index}
// //                       style={{
// //                         backgroundColor: '#F9F9FF',
// //                         borderRadius: 10,
// //                         padding: 12,
// //                         marginBottom: 12,
// //                         borderLeftWidth: 4,
// //                         borderLeftColor: '#7B68EE',
// //                       }}
// //                     >
// //                       <Text
// //                         style={{
// //                           fontSize: 16,
// //                           fontWeight: '600',
// //                           color: '#333',
// //                           marginBottom: 4,
// //                         }}
// //                       >
// //                         {content.title}
// //                       </Text>
// //                       <Text style={{ color: '#666', marginBottom: 4 }}>
// //                         {content.description || '-'}
// //                       </Text>
// //                       <Text style={{ fontSize: 13, color: '#777' }}>
// //                         <Text style={{ fontWeight: 'bold' }}>Duration:</Text>{' '}
// //                         {content.duration} mins |{' '}
// //                         <Text style={{ fontWeight: 'bold' }}>Pages:</Text> {content.noOfPages} |{' '}
// //                         <Text style={{ fontWeight: 'bold' }}>Last Updated:</Text>{' '}
// //                         {formatDate(content.lastUpdatedOn)}
// //                       </Text>

// //                       <TouchableOpacity
// //                         onPress={() => handleViewFile(content.contentUrl)}
// //                         style={{
// //                           marginTop: 10,
// //                           alignSelf: 'flex-start',
// //                           backgroundColor: '#7B68EE',
// //                           paddingHorizontal: 16,
// //                           paddingVertical: 8,
// //                           borderRadius: 8,
// //                           flexDirection: 'row',
// //                           alignItems: 'center',
// //                         }}
// //                       >
// //                         <MaterialIcons name="visibility" size={20} color="#fff" />
// //                         <Text
// //                           style={{
// //                             color: '#fff',
// //                             fontWeight: '600',
// //                             marginLeft: 6,
// //                           }}
// //                         >
// //                           View
// //                         </Text>
// //                       </TouchableOpacity>
// //                     </View>
// //                   ))
// //               ) : (
// //                 <Text style={{ color: '#888', textAlign: 'center' }}>
// //                   No course content available
// //                 </Text>
// //               )}
// //             </View>
// //           </Animated.View>
// //         </ScrollView>
// //       </View>

// //       <BottomNavigation />
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: { flex: 1, backgroundColor: '#1a1a2e' },
// //   mainContent: { flex: 1, backgroundColor: '#1a1a2e' },
// //   header: { paddingTop: 50, paddingBottom: 20 },
// //   headerTop: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //     paddingHorizontal: 20,
// //   },
// //   headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
// //   backButton: { width: 45, height: 45, justifyContent: 'center', alignItems: 'center' },
// //   headerTitle: { fontSize: 23, fontWeight: 'bold', color: '#fff' },
// //   headerRight: { flexDirection: 'row', alignItems: 'center', gap: 15 },
// //   iconButton: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
// //   notificationDot: {
// //     position: 'absolute',
// //     top: 8,
// //     right: 8,
// //     width: 8,
// //     height: 8,
// //     backgroundColor: '#ff4757',
// //     borderRadius: 4,
// //   },
// //   scrollContent: { flex: 1, backgroundColor: '#1a1a2e', padding: 20 },
// //   contentCard: {
// //     backgroundColor: '#fff',
// //     borderRadius: 16,
// //     overflow: 'hidden',
// //     elevation: 4,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 8,
// //   },
// //   bottomNavContainer: { position: 'absolute', bottom: 0, left: 0, right: 0 },
// //   bottomNavBar: {
// //     flexDirection: 'row',
// //     height: 70,
// //     alignItems: 'center',
// //     justifyContent: 'space-around',
// //     borderTopLeftRadius: 25,
// //     borderTopRightRadius: 25,
// //     paddingBottom: 5,
// //     elevation: 10,
// //   },
// //   tab: { flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%' },
// //   centerTab: { marginTop: -20 },
// //   tabIconContainer: { width: 56, height: 56, justifyContent: 'center', alignItems: 'center', borderRadius: 28 },
// //   centerTabBg: {
// //     position: 'absolute',
// //     width: 56,
// //     height: 56,
// //     borderRadius: 28,
// //     elevation: 5,
// //   },
// // });

// // export default ActionviewScreen;


// import { Ionicons, MaterialIcons } from '@expo/vector-icons';
// import { useRoute } from '@react-navigation/native';
// import * as FileSystem from 'expo-file-system/legacy';
// import { LinearGradient } from 'expo-linear-gradient';
// import * as Sharing from 'expo-sharing';
// import React, { useEffect, useRef } from 'react';
// import {
//   Alert,
//   Animated,
//   Dimensions,
//   Image,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View
// } from 'react-native';
// import { lookup as mimeLookup } from 'react-native-mime-types';
// // ✅ Import universal bottom navigation
// import BottomNavigation from '../../Components/BottomNavigation';
// import { useBottomNav } from '../../Components/useBottomNav';

// const { width } = Dimensions.get('window');

// const ActionviewScreen = ({ navigation }) => {
//   const route = useRoute();
//   const { course } = route.params || {};

//   // ✅ Use the bottom nav hook
//   const {
//     selectedTab,
//     tabScaleAnims,
//     rotateAnims,
//     handleTabPress
//   } = useBottomNav('Dashboard');

//   // Download + open file
//   const downloadFile = async (url, fileName) => {
//     try {
//       const fileUri = `${FileSystem.documentDirectory}${fileName}`;
//       const { uri } = await FileSystem.downloadAsync(url, fileUri);
//       console.log('File downloaded to:', uri);

//       if (await Sharing.isAvailableAsync()) {
//         await Sharing.shareAsync(uri);
//       } else {
//         Alert.alert('Downloaded', `File saved to: ${uri}`);
//       }
//     } catch (error) {
//       console.error('File download error:', error);
//       Alert.alert('Download Failed', 'Unable to download this file.');
//     }
//   };

//   // Animations
//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const slideAnim = useRef(new Animated.Value(50)).current;
//   const cardSlideAnim = useRef(new Animated.Value(30)).current;

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 600,
//         useNativeDriver: true,
//       }),
//       Animated.spring(slideAnim, {
//         toValue: 0,
//         tension: 50,
//         friction: 8,
//         useNativeDriver: true,
//       }),
//     ]).start();

//     setTimeout(() => {
//       Animated.spring(cardSlideAnim, {
//         toValue: 0,
//         tension: 40,
//         friction: 7,
//         useNativeDriver: true,
//       }).start();
//     }, 200);
//   }, []);

//   const handleViewFile = async (fileUrl) => {
//     try {
//       const fileName = fileUrl.split('/').pop();
//       const localPath = `${FileSystem.documentDirectory}${fileName}`;

//       const fileInfo = await FileSystem.getInfoAsync(localPath);
//       if (!fileInfo.exists) {
//         console.log('Downloading file...');
//         const downloadResumable = FileSystem.createDownloadResumable(fileUrl, localPath);
//         await downloadResumable.downloadAsync();
//         console.log('Download complete:', localPath);
//       }

//       const mimeType = mimeLookup(fileName) || 'application/octet-stream';
//       console.log('Detected MIME type:', mimeType);

//       // ✅ Use Sharing for both platforms
//       const canShare = await Sharing.isAvailableAsync();
//       if (canShare) {
//         await Sharing.shareAsync(localPath, {
//           mimeType,
//           dialogTitle: 'Open file with...',
//         });
//       } else {
//         alert('No compatible apps found to open this file.');
//       }
//     } catch (error) {
//       console.error('Error opening file:', error);
//     }
//   };

//   // Helper to format date
//   const formatDate = (dateString) => {
//     if (!dateString) return '-';
//     const d = new Date(dateString);
//     return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor="#7B68EE" />

//       <View style={styles.mainContent}>
//         {/* Header */}
//         <LinearGradient colors={['#1a1a2e', '#1a1a2e']} style={styles.header}>
//           <View style={styles.headerTop}>
//             <View style={styles.headerLeft}>
//               <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//                 <Ionicons name="arrow-back" size={28} color="#fff" />
//               </TouchableOpacity>
//               <Text style={styles.headerTitle}>Course Details</Text>
//             </View>
//             <View style={styles.headerRight}>
//               <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Dashboard')}>
//                 <Ionicons name="home-outline" size={24} color="#fff" />
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.iconButton}>
//                 <Ionicons name="notifications-outline" size={24} color="#fff" />
//                 <View style={styles.notificationDot} />
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.iconButton}>
//                 <Ionicons name="ellipsis-vertical" size={24} color="#fff" />
//               </TouchableOpacity>
//             </View>
//           </View>
//         </LinearGradient>

//         {/* Content */}
//         <ScrollView
//           style={styles.scrollContent}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{ paddingBottom: 100 }}
//         >
//           <Animated.View
//             style={[
//               styles.contentCard,
//               {
//                 opacity: fadeAnim,
//                 transform: [{ translateY: slideAnim }],
//               },
//             ]}
//           >
//             {/* Course Details Card */}
//             <View
//               style={{
//                 backgroundColor: '#fff',
//                 borderRadius: 12,
//                 padding: 16,
//                 marginBottom: 20,
//                 elevation: 2,
//               }}
//             >
//               <View style={{ flexDirection: 'row' }}>
//                 <Image
//                   source={{ uri: course?.imageUrl }}
//                   style={{ width: 120, height: 120, borderRadius: 8 }}
//                 />
//                 <View style={{ flex: 1, marginLeft: 12 }}>
//                   <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#333' }}>
//                     {course?.name}
//                   </Text>
//                   <Text style={{ marginVertical: 6, color: '#555' }}>{course?.objective}</Text>

//                   <Text style={{ color: '#666', marginBottom: 4 }}>
//                     <Text style={{ fontWeight: 'bold', color: '#444' }}>Program: </Text>
//                     {course?.programName || '-'}
//                   </Text>

//                   <Text style={{ color: '#666', marginBottom: 4 }}>
//                     <Text style={{ fontWeight: 'bold', color: '#444' }}>Category: </Text>
//                     {course?.category}  <Text style={{ fontWeight: 'bold' }}>Level:</Text>{' '}
//                     {course?.level}
//                   </Text>

//                   <Text style={{ color: '#666', marginBottom: 4 }}>
//                     <Text style={{ fontWeight: 'bold', color: '#444' }}>Status: </Text>
//                     {course?.status}
//                   </Text>

//                   <Text style={{ color: '#666', marginBottom: 4 }}>
//                     <Text style={{ fontWeight: 'bold', color: '#444' }}>Validity: </Text>
//                     {formatDate(course?.validity)}
//                   </Text>

//                   <Text style={{ color: '#666', marginBottom: 4 }}>
//                     <Text style={{ fontWeight: 'bold', color: '#444' }}>Published By: </Text>
//                     {course?.publishedBy}
//                   </Text>

//                   <Text style={{ color: '#666', marginBottom: 4 }}>
//                     <Text style={{ fontWeight: 'bold', color: '#444' }}>Published On: </Text>
//                     {formatDate(course?.publishedOn)}
//                   </Text>

//                   <Text style={{ color: '#666', marginBottom: 4 }}>
//                     <Text style={{ fontWeight: 'bold', color: '#444' }}>Last Updated: </Text>
//                     {formatDate(course?.lastUpdatedOn)}
//                   </Text>

//                   <Text style={{ color: '#666' }}>
//                     <Text style={{ fontWeight: 'bold', color: '#444' }}>Duration: </Text>
//                     {course?.duration} mins
//                   </Text>
//                 </View>
//               </View>
//             </View>

//             {/* Course Content Cards */}
//             <View style={{ backgroundColor: '#fff', borderRadius: 12, padding: 16 }}>
//               <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>
//                 Course Content
//               </Text>

//               {course?.courseContent?.length > 0 ? (
//                 course.courseContent
//                   .sort((a, b) => a.displayOrder - b.displayOrder)
//                   .map((content, index) => (
//                     <View
//                       key={index}
//                       style={{
//                         backgroundColor: '#F9F9FF',
//                         borderRadius: 10,
//                         padding: 12,
//                         marginBottom: 12,
//                         borderLeftWidth: 4,
//                         borderLeftColor: '#7B68EE',
//                       }}
//                     >
//                       <Text
//                         style={{
//                           fontSize: 16,
//                           fontWeight: '600',
//                           color: '#333',
//                           marginBottom: 4,
//                         }}
//                       >
//                         {content.title}
//                       </Text>
//                       <Text style={{ color: '#666', marginBottom: 4 }}>
//                         {content.description || '-'}
//                       </Text>
//                       <Text style={{ fontSize: 13, color: '#777' }}>
//                         <Text style={{ fontWeight: 'bold' }}>Duration:</Text>{' '}
//                         {content.duration} mins |{' '}
//                         <Text style={{ fontWeight: 'bold' }}>Pages:</Text> {content.noOfPages} |{' '}
//                         <Text style={{ fontWeight: 'bold' }}>Last Updated:</Text>{' '}
//                         {formatDate(content.lastUpdatedOn)}
//                       </Text>

//                       <TouchableOpacity
//                         onPress={() => handleViewFile(content.contentUrl)}
//                         style={{
//                           marginTop: 10,
//                           alignSelf: 'flex-start',
//                           backgroundColor: '#7B68EE',
//                           paddingHorizontal: 16,
//                           paddingVertical: 8,
//                           borderRadius: 8,
//                           flexDirection: 'row',
//                           alignItems: 'center',
//                         }}
//                       >
//                         <MaterialIcons name="visibility" size={20} color="#fff" />
//                         <Text
//                           style={{
//                             color: '#fff',
//                             fontWeight: '600',
//                             marginLeft: 6,
//                           }}
//                         >
//                           View
//                         </Text>
//                       </TouchableOpacity>
//                     </View>
//                   ))
//               ) : (
//                 <Text style={{ color: '#888', textAlign: 'center' }}>
//                   No course content available
//                 </Text>
//               )}
//             </View>
//           </Animated.View>
//         </ScrollView>
//       </View>

//       {/* ✅ Universal Bottom Navigation Component */}
//       <BottomNavigation
//         selectedTab={selectedTab}
//         tabScaleAnims={tabScaleAnims}
//         rotateAnims={rotateAnims}
//         handleTabPress={handleTabPress}
//         navigation={navigation}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#1a1a2e' },
//   mainContent: { flex: 1, backgroundColor: '#1a1a2e' },
//   header: { paddingTop: 50, paddingBottom: 20 },
//   headerTop: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//   },
//   headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
//   backButton: { width: 45, height: 45, justifyContent: 'center', alignItems: 'center' },
//   headerTitle: { fontSize: 23, fontWeight: 'bold', color: '#fff' },
//   headerRight: { flexDirection: 'row', alignItems: 'center', gap: 15 },
//   iconButton: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
//   notificationDot: {
//     position: 'absolute',
//     top: 8,
//     right: 8,
//     width: 8,
//     height: 8,
//     backgroundColor: '#ff4757',
//     borderRadius: 4,
//   },
//   scrollContent: { flex: 1, backgroundColor: '#1a1a2e', padding: 20 },
//   contentCard: {
//     backgroundColor: '#fff',
//     borderRadius: 16,
//     overflow: 'hidden',
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//   },
// });

// export default ActionviewScreen;


import { MaterialIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import React, { useEffect, useRef } from 'react';
import {
    Alert,
    Animated,
    BackHandler,
    Dimensions,
    Image,
    Modal,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
// ✅ Import universal components
import { useNotification } from '@/app/Components/NotificationContext';
import Pdf from 'react-native-pdf';
import { WebView } from 'react-native-webview';
import BottomNavigation from '../../Components/BottomNavigation';
import Header from '../../Components/Header';
import { useBottomNav } from '../../Components/useBottomNav';

const { width } = Dimensions.get('window');

const ActionviewScreen = ({ navigation }) => {

  const [isViewerOpen, setViewerOpen] = React.useState(false);
  const [fileToView, setFileToView] = React.useState(null);
const { openNotification } = useNotification();


  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });
    return () => backHandler.remove();
  }, [navigation]);
  const route = useRoute();
  const { course } = route.params || {};

  // ✅ Use the bottom nav hook
  const {
    selectedTab,
    tabScaleAnims,
    rotateAnims,
    handleTabPress
  } = useBottomNav('Dashboard');

  // Download + open file
  const downloadFile = async (url, fileName) => {
    try {
      const fileUri = `${FileSystem.documentDirectory}${fileName}`;
      const { uri } = await FileSystem.downloadAsync(url, fileUri);
      console.log('File downloaded to:', uri);

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
      } else {
        Alert.alert('Downloaded', `File saved to: ${uri}`);
      }
    } catch (error) {
      console.error('File download error:', error);
      Alert.alert('Download Failed', 'Unable to download this file.');
    }
  };

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const cardSlideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(() => {
      Animated.spring(cardSlideAnim, {
        toValue: 0,
        tension: 40,
        friction: 7,
        useNativeDriver: true,
      }).start();
    }, 200);
  }, []);

  const handleViewFile = async (fileUrl) => {
    console.log("📄 View Requested For:", fileUrl);

    try {
      const extension = fileUrl.split('.').pop().toLowerCase();

      if (extension === 'pdf') {
        const fileName = fileUrl.split('/').pop();
        const localPath = `${FileSystem.documentDirectory}${fileName}`;

        // Check if already downloaded
        const fileInfo = await FileSystem.getInfoAsync(localPath);

        if (fileInfo.exists) {
          console.log("✅ PDF already exists locally:", localPath);
        } else {
          console.log("⬇️ Downloading PDF...");
          await FileSystem.downloadAsync(fileUrl, localPath);
          console.log("✅ PDF downloaded successfully:", localPath);
        }

        setFileToView({ uri: localPath, type: "pdf" });
      }
      else {
        const encodedUrl = encodeURIComponent(fileUrl);
        const officeViewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodedUrl}`;
        console.log("📄 Viewing via Microsoft Office Viewer:", officeViewerUrl);
        setFileToView({ uri: officeViewerUrl, type: "web" });

      }

      setViewerOpen(true);

    } catch (error) {
      console.error('❌ Error opening file:', error);
      Alert.alert('Error', 'Unable to open this file.');
    }
  };


  // Helper to format date
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const d = new Date(dateString);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };


  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />

      <View style={styles.mainContent}>
        {/* ✅ Universal Header Component with Back Button */}
        <Header
          title="Course Details"
          showBackButton
          onBackPress={() => navigation.goBack()}
          onNotificationPress={openNotification}
        />

        {/* Content */}
        <ScrollView
          style={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <Animated.View
            style={[
              styles.contentCard,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            {/* Course Details Card */}
            <View style={styles.courseDetailsCard}>
              <View style={styles.courseDetailsRow}>
                <Image
                  source={{ uri: course?.imageUrl }}
                  style={styles.courseImage}
                />
                <View style={styles.courseDetailsContent}>
                  <Text style={styles.courseName}>
                    {course?.name}
                  </Text>
                  <Text style={styles.courseObjective}>{course?.objective}</Text>

                  <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>Program: </Text>
                    {course?.programName || '-'}
                  </Text>

                  <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>Category: </Text>
                    {course?.category}  <Text style={styles.detailLabel}>Level:</Text>{' '}
                    {course?.level}
                  </Text>

                  <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>Status: </Text>
                    {course?.status}
                  </Text>

                  <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>Validity: </Text>
                    {formatDate(course?.validity)}
                  </Text>

                  <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>Published By: </Text>
                    {course?.publishedBy}
                  </Text>

                  <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>Published On: </Text>
                    {formatDate(course?.publishedOn)}
                  </Text>

                  <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>Last Updated: </Text>
                    {formatDate(course?.lastUpdatedOn)}
                  </Text>

                  <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>Duration: </Text>
                    {course?.duration} mins
                  </Text>
                </View>
              </View>
            </View>

            {/* Course Content Cards */}
            <View style={styles.courseContentCard}>
              <Text style={styles.courseContentTitle}>
                Course Content
              </Text>

              {course?.courseContent?.length > 0 ? (
                course.courseContent
                  .sort((a, b) => a.displayOrder - b.displayOrder)
                  .map((content, index) => (
                    <View key={index} style={styles.contentItem}>
                      <Text style={styles.contentItemTitle}>
                        {content.title}
                      </Text>
                      <Text style={styles.contentItemDescription}>
                        {content.description || '-'}
                      </Text>
                      <Text style={styles.contentItemMeta}>
                        <Text style={styles.metaLabel}>Duration:</Text>{' '}
                        {content.duration} mins |{' '}
                        <Text style={styles.metaLabel}>Pages:</Text> {content.noOfPages} |{' '}
                        <Text style={styles.metaLabel}>Last Updated:</Text>{' '}
                        {formatDate(content.lastUpdatedOn)}
                      </Text>

                      <TouchableOpacity
                        onPress={() => handleViewFile(content.contentUrl)}
                        style={styles.viewButton}
                      >
                        <MaterialIcons name="visibility" size={20} color="#fff" />
                        <Text style={styles.viewButtonText}>View</Text>
                      </TouchableOpacity>
                    </View>
                  ))
              ) : (
                <Text style={styles.noContentText}>
                  No course content available
                </Text>
              )}
            </View>
          </Animated.View>
        </ScrollView>
      </View>

      {isViewerOpen && (
        <Modal
          visible={isViewerOpen}
          animationType="slide"
          onRequestClose={() => setViewerOpen(false)} // Handles Android back button
          transparent={true}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>

              {/* File Viewer */}
              {fileToView?.type === "pdf" ? (
                <Pdf
                  source={{ uri: fileToView.uri }}
                  trustAllCerts={false}
                  style={{ flex: 1, width: '100%' }}
                />
              ) : (
                <WebView
                  source={{ uri: fileToView.uri }}
                  originWhitelist={['*']}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  startInLoadingState={true}
                  allowFileAccess={true}
                  allowUniversalAccessFromFileURLs={true}
                  mixedContentMode="always"
                  style={{ flex: 1 }}
                />

              )}


              {/* ✅ Close Button at Bottom */}
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setViewerOpen(false)}
              >
                <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
                  Close
                </Text>
              </TouchableOpacity>

            </View>
          </View>
        </Modal>
      )}



      {/* ✅ Universal Bottom Navigation Component */}
      <BottomNavigation
        selectedTab={selectedTab}
        tabScaleAnims={tabScaleAnims}
        rotateAnims={rotateAnims}
        handleTabPress={handleTabPress}
        navigation={navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  modalContent: {
    backgroundColor: '#fff',
    height: '85%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  closeBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
  },
  modalCloseButton: {
    backgroundColor: '#7B68EE',
    paddingVertical: 12,
    alignItems: 'center',
  },


  container: {
    flex: 1,
    backgroundColor: '#1a1a2e'
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#1a1a2e'
  },
  scrollContent: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    padding: 20
  },
  contentCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  courseDetailsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
  },
  courseDetailsRow: {
    flexDirection: 'row',
  },
  courseImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  courseDetailsContent: {
    flex: 1,
    marginLeft: 12,
  },
  courseName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  courseObjective: {
    marginVertical: 6,
    color: '#555',
  },
  detailText: {
    color: '#666',
    marginBottom: 4,
  },
  detailLabel: {
    fontWeight: 'bold',
    color: '#444',
  },
  courseContentCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },
  courseContentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  contentItem: {
    backgroundColor: '#F9F9FF',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#7B68EE',
  },
  contentItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  contentItemDescription: {
    color: '#666',
    marginBottom: 4,
  },
  contentItemMeta: {
    fontSize: 13,
    color: '#777',
  },
  metaLabel: {
    fontWeight: 'bold',
  },
  viewButton: {
    marginTop: 10,
    alignSelf: 'flex-start',
    backgroundColor: '#7B68EE',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewButtonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 6,
  },
  noContentText: {
    color: '#888',
    textAlign: 'center',
  },
});

export default ActionviewScreen;
