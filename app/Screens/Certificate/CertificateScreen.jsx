// import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useFocusEffect } from '@react-navigation/native';
// import { LinearGradient } from 'expo-linear-gradient';
// import React, { useEffect, useRef, useState } from 'react';

// import {
//   Animated,
//   BackHandler,
//   Dimensions,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View
// } from 'react-native';
// // ✅ Import the universal drawer components
// import CustomDrawer from '../../Components/CustomDrawer';
// import { useDrawer } from '../../Components/useDrawer';

// const { width } = Dimensions.get('window');

// const CertificateScreen = ({ navigation }) => {

  
//    useFocusEffect(
//     React.useCallback(() => {
//       const onBackPress = () => {
//         navigation.navigate('Dashboard'); // 👈 change this if needed
//         return true; // prevent default behavior
//       };
  
//       const subscription = BackHandler.addEventListener(
//         'hardwareBackPress',
//         onBackPress
//       );
  
//       // ✅ cleanup using .remove()
//       return () => subscription.remove();
//     }, [navigation])
//   );
  
//   const [selectedTab, setSelectedTab] = useState('Dashboard');
//   const [searchText, setSearchText] = useState('');
//   const [filteredCertificates, setFilteredCertificates] = useState([]);

//   // ✅ Use the drawer hook - Certificates is at index 6
//   const {
//     drawerVisible,
//     selectedMenuItem,
//     drawerSlideAnim,
//     overlayOpacity,
//     menuItemAnims,
//     toggleDrawer,
//     handleMenuItemPress,
//   } = useDrawer(6);

//   // Animation values for PAGE CONTENT only
//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const slideAnim = useRef(new Animated.Value(50)).current;
//   const searchBarAnim = useRef(new Animated.Value(0)).current;
//   const cardAnims = useRef([...Array(6)].map(() => new Animated.Value(0))).current;
//   const tabScaleAnims = useRef([...Array(3)].map(() => new Animated.Value(1))).current;
//   const rotateAnims = useRef([...Array(3)].map(() => new Animated.Value(0))).current;
//   const pulseAnim = useRef(new Animated.Value(1)).current;


//   // Certificates data (from API)
//   const [certificates, setCertificates] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch Certificates from API
//   const fetchCertificates = async (search = '') => {
//     try {
//       setLoading(true);
//       const employeeID = await AsyncStorage.getItem('employeeID');

//       if (!employeeID) {
//         console.warn("Employee ID missing in AsyncStorage");
//         setCertificates([]);
//         setFilteredCertificates([]);
//         return;
//       }

//       const apiUrl = `https://lms-api-qa.abisaio.com/api/v1/CertificateTemplate/GetEmployeeCertificates?UserID=${employeeID}&Page=1&CertificateDate=&ExpiryDate=&Search=${encodeURIComponent(search)}&RowsPerPage=20&Sort=`;

//       const response = await fetch(apiUrl);
//       const json = await response.json();

//       if (json?.succeeded && Array.isArray(json.data) && json.data.length > 0) {
//         const formatted = json.data.map((item, index) => ({
//           id: item.certificateID?.toString() || String(index),
//           courseName: item.courseName || '-',
//           courseType: item.courseType || '-',
//           certificateDate: item.certificateDate || '-',
//           certificateCode: item.trainingSessionID
//             ? `TS-${item.trainingSessionID}`
//             : item.eLearningCourseID
//               ? `EL-${item.eLearningCourseID}`
//               : '-',
//           expiryDate: item.expiryDate || '-',
//           template: ['blue', 'gold', 'elegant'][index % 3],
//         }));

//         setCertificates(formatted);
//         setFilteredCertificates(formatted);
//       } else {
//         setCertificates([]);
//         setFilteredCertificates([]);
//       }
//     } catch (error) {
//       console.error('Certificate API error:', error);
//       setCertificates([]);
//       setFilteredCertificates([]);
//     } finally {
//       setLoading(false);
//     }
//   };


//   const bottomTabs = [
//     { name: 'Sessions', icon: 'calendar', type: 'FontAwesome5' },
//     { name: 'Dashboard', icon: 'view-dashboard', type: 'MaterialIcons' },
//     { name: 'Calendar', icon: 'calendar-alt', type: 'FontAwesome5' },
//   ];

//   useEffect(() => {
//     fetchCertificates();
//     setFilteredCertificates(certificates);

//     // Initial animations
//     Animated.parallel([
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 800,
//         useNativeDriver: true,
//       }),
//       Animated.spring(slideAnim, {
//         toValue: 0,
//         tension: 50,
//         friction: 8,
//         useNativeDriver: true,
//       }),
//     ]).start();

//     // Search bar animation
//     setTimeout(() => {
//       Animated.spring(searchBarAnim, {
//         toValue: 1,
//         tension: 40,
//         friction: 7,
//         useNativeDriver: true,
//       }).start();
//     }, 200);

//     // Staggered card animations
//     cardAnims.forEach((anim, index) => {
//       setTimeout(() => {
//         Animated.spring(anim, {
//           toValue: 1,
//           tension: 40,
//           friction: 7,
//           useNativeDriver: true,
//         }).start();
//       }, 500 + index * 100);
//     });

//     // Pulse animation
//     Animated.loop(
//       Animated.sequence([
//         Animated.timing(pulseAnim, {
//           toValue: 1.05,
//           duration: 2000,
//           useNativeDriver: true,
//         }),
//         Animated.timing(pulseAnim, {
//           toValue: 1,
//           duration: 2000,
//           useNativeDriver: true,
//         }),
//       ])
//     ).start();
//   }, []);


//   // Handle search with API
//   const handleSearch = async (text) => {
//     setSearchText(text);
//     await fetchCertificates(text);
//   };



//   // Handle card press
//   const handleCardPress = (index) => {
//     Animated.sequence([
//       Animated.spring(cardAnims[index], {
//         toValue: 0.95,
//         duration: 100,
//         useNativeDriver: true,
//       }),
//       Animated.spring(cardAnims[index], {
//         toValue: 1,
//         tension: 50,
//         friction: 3,
//         useNativeDriver: true,
//       }),
//     ]).start();
//   };

//   // Handle bottom tab press
//   const handleTabPress = (index, tabName) => {
//     setSelectedTab(tabName);

//     Animated.sequence([
//       Animated.spring(tabScaleAnims[index], {
//         toValue: 0.8,
//         duration: 100,
//         useNativeDriver: true,
//       }),
//       Animated.spring(tabScaleAnims[index], {
//         toValue: 1.2,
//         tension: 50,
//         friction: 3,
//         useNativeDriver: true,
//       }),
//       Animated.spring(tabScaleAnims[index], {
//         toValue: 1,
//         tension: 50,
//         friction: 3,
//         useNativeDriver: true,
//       }),
//     ]).start();

//     Animated.sequence([
//       Animated.timing(rotateAnims[index], {
//         toValue: 1,
//         duration: 300,
//         useNativeDriver: true,
//       }),
//       Animated.timing(rotateAnims[index], {
//         toValue: 0,
//         duration: 300,
//         useNativeDriver: true,
//       }),
//     ]).start();

//     if (index === 1) {
//       navigation.navigate('Dashboard');
//     } else if (index === 2) {
//       navigation.navigate('Calendar');
//     } else if (index === 0) {
//       navigation.navigate('TrainingSession');
//     }
//   };

//   // Get certificate template colors
//   const getTemplateColors = (template) => {
//     switch (template) {
//       case 'blue':
//         return {
//           border: '#1E3A8A',
//           gradient: ['#3B82F6', '#1E40AF'],
//           accent: '#60A5FA',
//         };
//       case 'gold':
//         return {
//           border: '#B45309',
//           gradient: ['#F59E0B', '#D97706'],
//           accent: '#FCD34D',
//         };
//       case 'elegant':
//         return {
//           border: '#7B68EE',
//           gradient: ['#7B68EE', '#9D7FEA'],
//           accent: '#A78BFA',
//         };
//       default:
//         return {
//           border: '#7B68EE',
//           gradient: ['#7B68EE', '#9D7FEA'],
//           accent: '#A78BFA',
//         };
//     }
//   };

//   // Render icon helper
//   const renderIcon = (item, isSelected, iconSize = 22) => {
//     const iconColor = isSelected ? '#fff' : '#8B7AA3';
//     switch (item.type) {
//       case 'MaterialIcons':
//         return <MaterialIcons name={item.icon} size={iconSize} color={iconColor} />;
//       case 'FontAwesome5':
//         return <FontAwesome5 name={item.icon} size={iconSize} color={iconColor} />;
//       default:
//         return <Ionicons name={item.icon} size={iconSize} color={iconColor} />;
//     }
//   };

//   // Bottom Navigation Component
//   const BottomNavigation = () => {
//     return (
//       <View style={styles.bottomNavContainer}>
//         <LinearGradient
//           colors={['#2D1B69', '#1a1a2e']}
//           style={styles.bottomNavBar}
//         >
//           {bottomTabs.map((tab, index) => {
//             const isActive = tab.name === selectedTab;
//             const rotation = rotateAnims[index].interpolate({
//               inputRange: [0, 1],
//               outputRange: ['0deg', '360deg'],
//             });

//             return (
//               <TouchableOpacity
//                 key={index}
//                 onPress={() => handleTabPress(index, tab.name)}
//                 activeOpacity={0.8}
//                 style={[styles.tab, index === 1 && styles.centerTab]}
//               >
//                 <Animated.View
//                   style={[
//                     styles.tabIconContainer,
//                     {
//                       transform: [
//                         { scale: tabScaleAnims[index] },
//                         { rotate: rotation }
//                       ]
//                     },
//                   ]}
//                 >
//                   {isActive && (
//                     <LinearGradient
//                       colors={['#667eea', '#764ba2']}
//                       style={styles.centerTabBg}
//                     />
//                   )}
//                   {renderIcon(tab, isActive, index === 1 ? 28 : 24)}
//                 </Animated.View>
//               </TouchableOpacity>
//             );
//           })}
//         </LinearGradient>
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />

//       <View style={styles.mainContent}>
//         {/* Header */}
//         <View style={styles.header}>
//           <View style={styles.headerLeft}>
//             <TouchableOpacity onPress={toggleDrawer} style={styles.menuButton}>
//               <Ionicons name="menu" size={28} color="#fff" />
//             </TouchableOpacity>
//             <Text style={styles.headerTitle}>Certificates</Text>
//           </View>
//           <View style={styles.headerRight}>
//             <TouchableOpacity style={styles.iconButton}>
//               <Ionicons name="notifications-outline" size={24} color="#fff" />
//               <View style={styles.notificationDot} />
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.iconButton}>
//               <Ionicons name="ellipsis-vertical" size={24} color="#fff" />
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Search Bar */}
//         <Animated.View
//           style={[
//             styles.searchContainer,
//             {
//               opacity: searchBarAnim,
//               transform: [{
//                 translateY: searchBarAnim.interpolate({
//                   inputRange: [0, 1],
//                   outputRange: [20, 0],
//                 })
//               }]
//             }
//           ]}
//         >
//           <View style={styles.searchBar}>
//             <Ionicons name="search" size={20} color="#8B7AA3" style={styles.searchIcon} />
//             <TextInput
//               style={styles.searchInput}
//               placeholder="Search here.."
//               placeholderTextColor="#8B7AA3"
//               value={searchText}
//               onChangeText={handleSearch}
//             />
//           </View>
//           <TouchableOpacity style={styles.filterButton}>
//             <LinearGradient
//               colors={['#7B68EE', '#9D7FEA']}
//               style={styles.filterGradient}
//             >
//               <Ionicons name="options" size={20} color="#fff" />
//             </LinearGradient>
//           </TouchableOpacity>
//         </Animated.View>

//         {/* Certificates Grid */}
//         <ScrollView
//           style={styles.scrollContent}
//           showsVerticalScrollIndicator={false}
//         >
//           <View style={styles.certificatesGrid}>


//             {loading ? (
//               <View style={styles.emptyState}>
//                 <FontAwesome5 name="spinner" size={40} color="#7B68EE" />
//                 <Text style={styles.emptyText}>Loading certificates...</Text>
//               </View>
//             ) : (
//               <>
//                 {filteredCertificates.map((cert, index) => {
//                   const scale = cardAnims[index].interpolate({
//                     inputRange: [0, 1],
//                     outputRange: [0.95, 1],
//                   });
//                   const opacity = cardAnims[index].interpolate({
//                     inputRange: [0, 1],
//                     outputRange: [0, 1],
//                   });
//                   const translateY = cardAnims[index].interpolate({
//                     inputRange: [0, 1],
//                     outputRange: [20, 0],
//                   });

//                   const colors = getTemplateColors(cert.template);

//                   return (
//                     <Animated.View
//                       key={cert.id}
//                       style={[
//                         styles.certificateCard,
//                         {
//                           opacity,
//                           transform: [{ scale }, { translateY }],
//                           borderLeftWidth: 5,
//                           borderLeftColor: colors.border,
//                         },
//                       ]}
//                     >
//                       <View style={styles.certificateDetailsBox}>
//                         <Text style={styles.certificateTitle}>{cert.courseName}</Text>

//                         <View style={styles.detailRow}>
//                           <Text style={styles.detailLabel}>Course Type:</Text>
//                           <Text style={styles.detailValue}>{cert.courseType}</Text>
//                         </View>

//                         <View style={styles.detailRow}>
//                           <Text style={styles.detailLabel}>Certificate Date:</Text>
//                           <Text style={styles.detailValue}>{cert.certificateDate}</Text>
//                         </View>

//                         <View style={styles.detailRow}>
//                           <Text style={styles.detailLabel}>Certificate Code:</Text>
//                           <Text style={styles.detailValue}>{cert.certificateCode}</Text>
//                         </View>

//                         <View style={styles.detailRow}>
//                           <Text style={styles.detailLabel}>Expiry Date:</Text>
//                           <Text style={styles.detailValue}>{cert.expiryDate}</Text>
//                         </View>

//                         <View style={styles.actionButtons}>
//                           <TouchableOpacity style={[styles.actionButton, { marginRight: 10 }]}>
//                             <LinearGradient
//                               colors={colors.gradient}
//                               style={styles.downloadButton}
//                             >
//                               <FontAwesome5 name="download" size={14} color="#fff" />
//                               <Text style={styles.downloadText}>Download</Text>
//                             </LinearGradient>
//                           </TouchableOpacity>

//                           <TouchableOpacity style={[styles.actionButton, { marginLeft: 10 }]}>
//                             <LinearGradient
//                               colors={colors.gradient}
//                               style={styles.viewButton}
//                             >
//                               <Text style={styles.viewText}>View</Text>
//                             </LinearGradient>
//                           </TouchableOpacity>
//                         </View>
//                       </View>
//                     </Animated.View>
//                   );
//                 })}


//                 {filteredCertificates.length === 0 && (
//                   <View style={styles.emptyState}>
//                     <FontAwesome5 name="certificate" size={48} color="#8B7AA3" />
//                     <Text style={styles.emptyText}>No certificates found</Text>
//                   </View>
//                 )}
//               </>
//             )}

//           </View>

//           <View style={{ height: 100 }} />
//         </ScrollView>
//       </View>

//       {/* Bottom Navigation */}
//       <BottomNavigation />

//       {/* ✅ Universal Drawer Component */}
//       <CustomDrawer
//         drawerVisible={drawerVisible}
//         drawerSlideAnim={drawerSlideAnim}
//         overlayOpacity={overlayOpacity}
//         menuItemAnims={menuItemAnims}
//         selectedMenuItem={selectedMenuItem}
//         handleMenuItemPress={(index) => handleMenuItemPress(index, navigation)}
//         toggleDrawer={toggleDrawer}
//         navigation={navigation}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   certificateDetailsBox: {
//   padding: 20,
// },
// certificateTitle: {
//   fontSize: 16,
//   fontWeight: 'bold',
//   color: '#1a1a2e',
//   marginBottom: 12,
// },

//   container: {
//     flex: 1,
//     backgroundColor: '#f4f7fe',
//   },
//   mainContent: {
//     flex: 1,
//     backgroundColor: '#1a1a2e',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingTop: 50,
//     paddingHorizontal: 20,
//     paddingBottom: 20,
//     backgroundColor: '#1a1a2e',
//   },
//   menuButton: {
//     width: 45,
//     height: 45,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   headerRight: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 15,
//   },
//   iconButton: {
//     width: 40,
//     height: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'relative',
//   },
//   notificationDot: {
//     position: 'absolute',
//     top: 8,
//     right: 8,
//     width: 8,
//     height: 8,
//     backgroundColor: '#ff4757',
//     borderRadius: 4,
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     paddingHorizontal: 20,
//     paddingBottom: 20,
//     gap: 12,
//     alignItems: 'center',
//     backgroundColor: '#1a1a2e',
//   },
//   searchBar: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#2c2c54',
//     borderRadius: 25,
//     paddingHorizontal: 20,
//     height: 50,
//   },
//   searchIcon: {
//     marginRight: 10,
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: 16,
//     color: '#fff',
//   },
//   filterButton: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     overflow: 'hidden',
//     elevation: 4,
//   },
//   filterGradient: {
//     width: '100%',
//     height: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   scrollContent: {
//     flex: 1,
//     backgroundColor: '#f4f7fe',
//     borderTopLeftRadius: 25,
//     borderTopRightRadius: 25,
//     paddingTop: 20,
//   },
//   certificatesGrid: {
//     paddingHorizontal: 20,
//   },
//   certificateCard: {
//     backgroundColor: '#fff',
//     borderRadius: 16,
//     overflow: 'hidden',
//     marginBottom: 20,
//     elevation: 6,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.15,
//     shadowRadius: 6,
//   },
//   certificatePreview: {
//     borderWidth: 3,
//     borderRadius: 12,
//     margin: 15,
//     overflow: 'hidden',
//     elevation: 3,
//   },
//   certificateInner: {
//     padding: 20,
//     position: 'relative',
//     minHeight: 180,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   cornerTL: {
//     position: 'absolute',
//     top: 8,
//     left: 8,
//     width: 20,
//     height: 20,
//     borderTopWidth: 3,
//     borderLeftWidth: 3,
//   },
//   cornerTR: {
//     position: 'absolute',
//     top: 8,
//     right: 8,
//     width: 20,
//     height: 20,
//     borderTopWidth: 3,
//     borderRightWidth: 3,
//   },
//   headerLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 5,
//   },
//   cornerBL: {
//     position: 'absolute',
//     bottom: 8,
//     left: 8,
//     width: 20,
//     height: 20,
//     borderBottomWidth: 3,
//     borderLeftWidth: 3,
//   },
//   cornerBR: {
//     position: 'absolute',
//     bottom: 8,
//     right: 8,
//     width: 20,
//     height: 20,
//     borderBottomWidth: 3,
//     borderRightWidth: 3,
//   },
//   certHeader: {
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   certTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 6,
//     letterSpacing: 2,
//   },
//   certSubtitle: {
//     fontSize: 14,
//     color: '#555',
//     letterSpacing: 1,
//   },
//   certBody: {
//     alignItems: 'center',
//   },
//   certLabel: {
//     fontSize: 12,
//     color: '#666',
//   },
//   certName: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#333',
//     marginVertical: 4,
//     fontFamily: 'serif',
//   },
//   certCourse: {
//     borderRadius: 8,
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     marginTop: 8,
//   },
//   certCourseText: {
//     fontSize: 13,
//     fontWeight: '600',
//     textAlign: 'center',
//   },
//   seal: {
//     position: 'absolute',
//     bottom: 10,
//     right: 10,
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   certificateDetails: {
//     paddingHorizontal: 20,
//     paddingBottom: 20,
//   },
//   detailRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 8,
//   },
//   detailLabel: {
//     fontSize: 14,
//     color: '#8B7AA3',
//     fontWeight: '500',
//   },
//   detailValue: {
//     fontSize: 14,
//     color: '#2D2D2D',
//     fontWeight: '600',
//     flex: 1,
//     textAlign: 'right',
//   },
//   actionButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 15,
//   },
//   actionButton: {
//     flex: 1,
//   },
//   downloadButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 12,
//     borderRadius: 25,
//     marginRight: 10,
//     elevation: 3,
//   },
//   downloadText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginLeft: 8,
//   },
//   viewButton: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 12,
//     borderRadius: 25,
//     marginLeft: 10,
//     elevation: 3,
//   },
//   viewText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   emptyState: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 50,
//   },
//   emptyText: {
//     marginTop: 15,
//     fontSize: 18,
//     color: '#8B7AA3',
//   },
//   bottomNavContainer: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//   },
//   bottomNavBar: {
//     flexDirection: 'row',
//     height: 70,
//     alignItems: 'center',
//     justifyContent: 'space-around',
//     borderTopLeftRadius: 25,
//     borderTopRightRadius: 25,
//     paddingBottom: 5,
//     elevation: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: -3 },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//   },
//   tab: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '100%',
//   },
//   centerTab: {
//     marginTop: -20,
//   },
//   tabIconContainer: {
//     width: 56,
//     height: 56,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 28,
//   },
//   centerTabBg: {
//     position: 'absolute',
//     width: 56,
//     height: 56,
//     borderRadius: 28,
//     elevation: 5,
//   },
// });

// export default CertificateScreen;


import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  BackHandler,
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
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

const { width } = Dimensions.get('window');

const CertificateScreen = ({ navigation }) => {
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

  const [searchText, setSearchText] = useState('');
  const [filteredCertificates, setFilteredCertificates] = useState([]);

  // ✅ Use the drawer hook - Certificates is at index 6
  const {
    drawerVisible,
    selectedMenuItem,
    drawerSlideAnim,
    overlayOpacity,
    menuItemAnims,
    toggleDrawer,
    handleMenuItemPress,
  } = useDrawer(6);

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
  const searchBarAnim = useRef(new Animated.Value(0)).current;
  const cardAnims = useRef([...Array(6)].map(() => new Animated.Value(0))).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Certificates data (from API)
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Certificates from API
  const fetchCertificates = async (search = '') => {
    try {
      setLoading(true);
      const employeeID = await AsyncStorage.getItem('employeeID');

      if (!employeeID) {
        console.warn("Employee ID missing in AsyncStorage");
        setCertificates([]);
        setFilteredCertificates([]);
        return;
      }

      const apiUrl = `https://lms-api-qa.abisaio.com/api/v1/CertificateTemplate/GetEmployeeCertificates?UserID=${employeeID}&Page=1&CertificateDate=&ExpiryDate=&Search=${encodeURIComponent(search)}&RowsPerPage=20&Sort=`;

      const response = await fetch(apiUrl);
      const json = await response.json();

      if (json?.succeeded && Array.isArray(json.data) && json.data.length > 0) {
        const formatted = json.data.map((item, index) => ({
          id: item.certificateID?.toString() || String(index),
          courseName: item.courseName || '-',
          courseType: item.courseType || '-',
          certificateDate: item.certificateDate || '-',
          certificateCode: item.trainingSessionID
            ? `TS-${item.trainingSessionID}`
            : item.eLearningCourseID
              ? `EL-${item.eLearningCourseID}`
              : '-',
          expiryDate: item.expiryDate || '-',
          template: ['blue', 'gold', 'elegant'][index % 3],
        }));

        setCertificates(formatted);
        setFilteredCertificates(formatted);
      } else {
        setCertificates([]);
        setFilteredCertificates([]);
      }
    } catch (error) {
      console.error('Certificate API error:', error);
      setCertificates([]);
      setFilteredCertificates([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
    setFilteredCertificates(certificates);

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

    // Search bar animation
    setTimeout(() => {
      Animated.spring(searchBarAnim, {
        toValue: 1,
        tension: 40,
        friction: 7,
        useNativeDriver: true,
      }).start();
    }, 200);

    // Staggered card animations
    cardAnims.forEach((anim, index) => {
      setTimeout(() => {
        Animated.spring(anim, {
          toValue: 1,
          tension: 40,
          friction: 7,
          useNativeDriver: true,
        }).start();
      }, 500 + index * 100);
    });

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

  // Handle search with API
  const handleSearch = async (text) => {
    setSearchText(text);
    await fetchCertificates(text);
  };

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

  // Get certificate template colors
  const getTemplateColors = (template) => {
    switch (template) {
      case 'blue':
        return {
          border: '#1E3A8A',
          gradient: ['#3B82F6', '#1E40AF'],
          accent: '#60A5FA',
        };
      case 'gold':
        return {
          border: '#B45309',
          gradient: ['#F59E0B', '#D97706'],
          accent: '#FCD34D',
        };
      case 'elegant':
        return {
          border: '#7B68EE',
          gradient: ['#7B68EE', '#9D7FEA'],
          accent: '#A78BFA',
        };
      default:
        return {
          border: '#7B68EE',
          gradient: ['#7B68EE', '#9D7FEA'],
          accent: '#A78BFA',
        };
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />

      <View style={styles.mainContent}>
        {/* ✅ Universal Header Component */}
        <Header title="Certificates" onMenuPress={toggleDrawer} onNotificationPress={openNotification} />

        {/* Search Bar */}
        <Animated.View
          style={[
            styles.searchContainer,
            {
              opacity: searchBarAnim,
              transform: [{
                translateY: searchBarAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0],
                })
              }]
            }
          ]}
        >
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#8B7AA3" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search here.."
              placeholderTextColor="#8B7AA3"
              value={searchText}
              onChangeText={handleSearch}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <LinearGradient
              colors={['#7B68EE', '#9D7FEA']}
              style={styles.filterGradient}
            >
              <Ionicons name="options" size={20} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {/* Certificates Grid */}
        <ScrollView
          style={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.certificatesGrid}>
            {loading ? (
              <View style={styles.emptyState}>
                <FontAwesome5 name="spinner" size={40} color="#7B68EE" />
                <Text style={styles.emptyText}>Loading certificates...</Text>
              </View>
            ) : (
              <>
                {filteredCertificates.map((cert, index) => {
                  const scale = cardAnims[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.95, 1],
                  });
                  const opacity = cardAnims[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  });
                  const translateY = cardAnims[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0],
                  });

                  const colors = getTemplateColors(cert.template);

                  return (
                    <Animated.View
                      key={cert.id}
                      style={[
                        styles.certificateCard,
                        {
                          opacity,
                          transform: [{ scale }, { translateY }],
                          borderLeftWidth: 5,
                          borderLeftColor: colors.border,
                        },
                      ]}
                    >
                      <View style={styles.certificateDetailsBox}>
                        <Text style={styles.certificateTitle}>{cert.courseName}</Text>

                        <View style={styles.detailRow}>
                          <Text style={styles.detailLabel}>Course Type:</Text>
                          <Text style={styles.detailValue}>{cert.courseType}</Text>
                        </View>

                        <View style={styles.detailRow}>
                          <Text style={styles.detailLabel}>Certificate Date:</Text>
                          <Text style={styles.detailValue}>{cert.certificateDate}</Text>
                        </View>

                        <View style={styles.detailRow}>
                          <Text style={styles.detailLabel}>Certificate Code:</Text>
                          <Text style={styles.detailValue}>{cert.certificateCode}</Text>
                        </View>

                        <View style={styles.detailRow}>
                          <Text style={styles.detailLabel}>Expiry Date:</Text>
                          <Text style={styles.detailValue}>{cert.expiryDate}</Text>
                        </View>

                        <View style={styles.actionButtons}>
                          <TouchableOpacity style={[styles.actionButton, { marginRight: 10 }]}>
                            <LinearGradient
                              colors={colors.gradient}
                              style={styles.downloadButton}
                            >
                              <FontAwesome5 name="download" size={14} color="#fff" />
                              <Text style={styles.downloadText}>Download</Text>
                            </LinearGradient>
                          </TouchableOpacity>

                          <TouchableOpacity style={[styles.actionButton, { marginLeft: 10 }]}>
                            <LinearGradient
                              colors={colors.gradient}
                              style={styles.viewButton}
                            >
                              <Text style={styles.viewText}>View</Text>
                            </LinearGradient>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </Animated.View>
                  );
                })}

                {filteredCertificates.length === 0 && (
                  <View style={styles.emptyState}>
                    <FontAwesome5 name="certificate" size={48} color="#8B7AA3" />
                    <Text style={styles.emptyText}>No certificates found</Text>
                  </View>
                )}
              </>
            )}
          </View>

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
  certificateDetailsBox: {
    padding: 20,
  },
  certificateTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 12,
  },
  container: {
    flex: 1,
    backgroundColor: '#f4f7fe',
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 12,
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2c2c54',
    borderRadius: 25,
    paddingHorizontal: 20,
    height: 50,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
  },
  filterButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 4,
  },
  filterGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    flex: 1,
    backgroundColor: '#f4f7fe',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 20,
  },
  certificatesGrid: {
    paddingHorizontal: 20,
  },
  certificateCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#8B7AA3',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: '#2D2D2D',
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  actionButton: {
    flex: 1,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 25,
    marginRight: 10,
    elevation: 3,
  },
  downloadText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  viewButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 25,
    marginLeft: 10,
    elevation: 3,
  },
  viewText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    marginTop: 15,
    fontSize: 18,
    color: '#8B7AA3',
  },
});

export default CertificateScreen;
