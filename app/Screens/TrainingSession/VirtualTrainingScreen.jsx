// import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';
// import { useEffect, useRef, useState } from 'react';
// import {
//     Animated,
//     Dimensions,
//     ScrollView,
//     StatusBar,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View
// } from 'react-native';

// const { width } = Dimensions.get('window');

// const VirtualTrainingScreen = ({ navigation, route }) => {
//     const [drawerVisible, setDrawerVisible] = useState(false);
//     const [selectedMenuItem, setSelectedMenuItem] = useState(3);
//     const [selectedTab, setSelectedTab] = useState('Sessions');

//     // Animation values
//     const fadeAnim = useRef(new Animated.Value(0)).current;
//     const slideAnim = useRef(new Animated.Value(50)).current;
//     const cardAnim = useRef(new Animated.Value(0)).current;
//     const drawerSlideAnim = useRef(new Animated.Value(-width * 0.75)).current;
//     const overlayOpacity = useRef(new Animated.Value(0)).current;
//     const menuItemAnims = useRef([...Array(8)].map(() => new Animated.Value(0))).current;
//     const tabScaleAnims = useRef([...Array(3)].map(() => new Animated.Value(1))).current;
//     const rotateAnims = useRef([...Array(3)].map(() => new Animated.Value(0))).current;

//     // Drawer menu items
//     const menuItems = [
//         { name: 'Dashboard', icon: 'view-dashboard', type: 'MaterialIcons' },
//         { name: 'Learning Hub', icon: 'graduation-cap', type: 'FontAwesome5' },
//         { name: 'Courses', icon: 'book', type: 'FontAwesome5' },
//         { name: 'Training Session', icon: 'chalkboard-teacher', type: 'FontAwesome5' },
//         { name: 'Calendar', icon: 'calendar', type: 'FontAwesome5' },
//         { name: 'E-Learning', icon: 'laptop', type: 'FontAwesome5' },
//         { name: 'Certificates', icon: 'certificate', type: 'FontAwesome5' },
//         { name: 'User Manual', icon: 'book-reader', type: 'FontAwesome5' },
//     ];

//     useEffect(() => {
//         Animated.parallel([
//             Animated.timing(fadeAnim, {
//                 toValue: 1,
//                 duration: 800,
//                 useNativeDriver: true,
//             }),
//             Animated.spring(slideAnim, {
//                 toValue: 0,
//                 tension: 50,
//                 friction: 8,
//                 useNativeDriver: true,
//             }),
//         ]).start();

//         setTimeout(() => {
//             Animated.spring(cardAnim, {
//                 toValue: 1,
//                 tension: 40,
//                 friction: 7,
//                 useNativeDriver: true,
//             }).start();
//         }, 300);
//     }, []);

//     // Toggle drawer
//     const toggleDrawer = () => {
//         const toValue = drawerVisible ? 0 : 1;

//         if (!drawerVisible) {
//             setDrawerVisible(true);
//             menuItemAnims.forEach((anim, index) => {
//                 setTimeout(() => {
//                     Animated.spring(anim, {
//                         toValue: 1,
//                         tension: 50,
//                         friction: 7,
//                         useNativeDriver: true,
//                     }).start();
//                 }, index * 50);
//             });
//         } else {
//             menuItemAnims.forEach((anim) => {
//                 Animated.timing(anim, {
//                     toValue: 0,
//                     duration: 200,
//                     useNativeDriver: true,
//                 }).start();
//             });
//         }

//         Animated.parallel([
//             Animated.spring(drawerSlideAnim, {
//                 toValue: toValue ? 0 : -width * 0.75,
//                 tension: 50,
//                 friction: 8,
//                 useNativeDriver: true,
//             }),
//             Animated.timing(overlayOpacity, {
//                 toValue: toValue ? 0.5 : 0,
//                 duration: 300,
//                 useNativeDriver: true,
//             }),
//         ]).start(() => {
//             if (drawerVisible) setDrawerVisible(false);
//         });
//     };

//     // Handle menu item selection
//     const handleMenuItemPress = (index) => {
//         setSelectedMenuItem(index);

//         Animated.sequence([
//             Animated.spring(menuItemAnims[index], {
//                 toValue: 1.2,
//                 tension: 100,
//                 friction: 3,
//                 useNativeDriver: true,
//             }),
//             Animated.spring(menuItemAnims[index], {
//                 toValue: 1,
//                 tension: 50,
//                 friction: 5,
//                 useNativeDriver: true,
//             }),
//         ]).start();

//         setTimeout(() => {
//             toggleDrawer();
//             const navigationMap = {
//                 0: 'Dashboard',
//                 1: 'LearningHub',
//                 2: 'Courses',
//                 3: 'TrainingSession',
//                 4: 'Calendar',
//                 5: 'ELearning',
//                 6: 'Certificate',
//                 7: 'UserManual',
//             };

//             if (navigationMap[index]) {
//                 navigation.navigate(navigationMap[index]);
//             }
//         }, 300);
//     };

//     // Bottom navigation tabs
//     const bottomTabs = [
//         { name: 'Sessions', icon: 'calendar', type: 'FontAwesome5' },
//         { name: 'Dashboard', icon: 'view-dashboard', type: 'MaterialIcons' },
//         { name: 'Calendar', icon: 'calendar-alt', type: 'FontAwesome5' },
//     ];

//     // Handle bottom tab press
//     const handleTabPress = (index, tabName) => {
//         setSelectedTab(tabName);

//         Animated.sequence([
//             Animated.spring(tabScaleAnims[index], {
//                 toValue: 0.8,
//                 duration: 100,
//                 useNativeDriver: true,
//             }),
//             Animated.spring(tabScaleAnims[index], {
//                 toValue: 1.2,
//                 tension: 50,
//                 friction: 3,
//                 useNativeDriver: true,
//             }),
//             Animated.spring(tabScaleAnims[index], {
//                 toValue: 1,
//                 tension: 50,
//                 friction: 3,
//                 useNativeDriver: true,
//             }),
//         ]).start();

//         Animated.sequence([
//             Animated.timing(rotateAnims[index], {
//                 toValue: 1,
//                 duration: 300,
//                 useNativeDriver: true,
//             }),
//             Animated.timing(rotateAnims[index], {
//                 toValue: 0,
//                 duration: 300,
//                 useNativeDriver: true,
//             }),
//         ]).start();

//         if (index === 1) {
//             navigation.navigate('Dashboard');
//         } else if (index === 2) {
//             navigation.navigate('Calendar');
//         } else if (index === 0) {
//             navigation.navigate('TrainingSession');
//         }
//     };

//     // Render icon helper
//     const renderIcon = (item, isSelected, iconSize = 22) => {
//         const iconColor = isSelected ? '#fff' : '#8B7AA3';
//         switch (item.type) {
//             case 'MaterialIcons':
//                 return <MaterialIcons name={item.icon} size={iconSize} color={iconColor} />;
//             case 'FontAwesome5':
//                 return <FontAwesome5 name={item.icon} size={iconSize} color={iconColor} />;
//             default:
//                 return <Ionicons name={item.icon} size={iconSize} color={iconColor} />;
//         }
//     };

//     // Custom Drawer Component
//     const DrawerContent = () => (
//         <Animated.View
//             style={[
//                 styles.drawerContainer,
//                 {
//                     transform: [{ translateX: drawerSlideAnim }],
//                 },
//             ]}
//         >
//             <View style={styles.drawerSolid}>
//                 <View style={styles.drawerHeader}>
//                     <TouchableOpacity onPress={toggleDrawer} style={styles.backButton}>
//                         <Ionicons name="arrow-back" size={24} color="#fff" />
//                     </TouchableOpacity>

//                     <View style={styles.profileSection}>
//                         <LinearGradient
//                             colors={['#667eea', '#764ba2']}
//                             style={styles.avatarGradient}
//                         >
//                             <View style={styles.avatar}>
//                                 <Text style={styles.avatarText}>U</Text>
//                             </View>
//                         </LinearGradient>
//                         <Text style={styles.userName}>User Name</Text>
//                         <Text style={styles.userId}>U8123445</Text>
//                     </View>
//                 </View>

//                 <ScrollView style={styles.menuContainer} showsVerticalScrollIndicator={false}>
//                     {menuItems.map((item, index) => {
//                         const isSelected = selectedMenuItem === index;
//                         const scale = menuItemAnims[index].interpolate({
//                             inputRange: [0, 1, 1.2],
//                             outputRange: [0.95, 1, 1.05],
//                         });
//                         const translateX = menuItemAnims[index].interpolate({
//                             inputRange: [0, 1],
//                             outputRange: [-30, 0],
//                         });
//                         const opacity = menuItemAnims[index].interpolate({
//                             inputRange: [0, 1],
//                             outputRange: [0, 1],
//                         });

//                         return (
//                             <Animated.View
//                                 key={index}
//                                 style={[
//                                     styles.menuItemWrapper,
//                                     {
//                                         transform: [{ scale }, { translateX }],
//                                         opacity,
//                                     },
//                                 ]}
//                             >
//                                 <TouchableOpacity
//                                     onPress={() => handleMenuItemPress(index)}
//                                     activeOpacity={0.8}
//                                     style={[styles.menuItem, isSelected && styles.menuItemActive]}
//                                 >
//                                     {isSelected && (
//                                         <LinearGradient
//                                             colors={['#667eea', '#764ba2']}
//                                             style={styles.activeMenuGradient}
//                                         />
//                                     )}
//                                     <View style={styles.menuIconContainer}>
//                                         {renderIcon(item, isSelected)}
//                                     </View>
//                                     <Text style={[styles.menuText, isSelected && styles.menuTextActive]}>
//                                         {item.name}
//                                     </Text>
//                                     {isSelected && (
//                                         <Ionicons name="chevron-forward" size={18} color="#fff" style={styles.chevron} />
//                                     )}
//                                 </TouchableOpacity>
//                             </Animated.View>
//                         );
//                     })}
//                 </ScrollView>

//                 <TouchableOpacity style={styles.logoutButton}>
//                     <LinearGradient
//                         colors={['#FF6B6B', '#FF4757']}
//                         style={styles.logoutGradient}
//                     >
//                         <Ionicons name="log-out-outline" size={20} color="#fff" />
//                         <Text style={styles.logoutText}>Logout</Text>
//                     </LinearGradient>
//                 </TouchableOpacity>
//             </View>
//         </Animated.View>
//     );

//     // Bottom Navigation Component
//     const BottomNavigation = () => {
//         return (
//             <View style={styles.bottomNavContainer}>
//                 <LinearGradient
//                     colors={['#2D1B69', '#1a1a2e']}
//                     style={styles.bottomNavBar}
//                 >
//                     {bottomTabs.map((tab, index) => {
//                         const isActive = tab.name === selectedTab;
//                         const rotation = rotateAnims[index].interpolate({
//                             inputRange: [0, 1],
//                             outputRange: ['0deg', '360deg'],
//                         });

//                         return (
//                             <TouchableOpacity
//                                 key={index}
//                                 onPress={() => handleTabPress(index, tab.name)}
//                                 activeOpacity={0.8}
//                                 style={[styles.tab, index === 1 && styles.centerTab]}
//                             >
//                                 <Animated.View
//                                     style={[
//                                         styles.tabIconContainer,
//                                         {
//                                             transform: [
//                                                 { scale: tabScaleAnims[index] },
//                                                 { rotate: rotation }
//                                             ]
//                                         },
//                                     ]}
//                                 >
//                                     {isActive && (
//                                         <LinearGradient
//                                             colors={['#667eea', '#764ba2']}
//                                             style={styles.centerTabBg}
//                                         />
//                                     )}
//                                     {renderIcon(tab, isActive, index === 1 ? 28 : 24)}
//                                 </Animated.View>
//                             </TouchableOpacity>
//                         );
//                     })}
//                 </LinearGradient>
//             </View>
//         );
//     };

//     return (
//         <View style={styles.container}>
//             <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />

//             <LinearGradient
//                 colors={['#4A3B7C', '#2D1B69', '#1a1a2e']}
//                 style={styles.gradientBg}
//             >
//                 <View style={styles.mainContent}>
//                     {/* Header */}
//                     <View style={styles.header}>
//                         <View style={styles.headerLeft}>
//                             <TouchableOpacity onPress={toggleDrawer} style={styles.menuButton}>
//                                 <Ionicons name="menu" size={28} color="#fff" />
//                             </TouchableOpacity>
//                             <Text style={styles.headerTitle}>Training Details</Text>
//                         </View>
//                         <View style={styles.headerRight}>
//                             <TouchableOpacity style={styles.iconButton}>
//                                 <Ionicons name="notifications-outline" size={24} color="#fff" />
//                                 <View style={styles.notificationDot} />
//                             </TouchableOpacity>
//                             <TouchableOpacity style={styles.iconButton}>
//                                 <Ionicons name="ellipsis-vertical" size={24} color="#fff" />
//                             </TouchableOpacity>
//                         </View>
//                     </View>

//                     {/* Main Content */}
//                     <ScrollView
//                         style={styles.scrollContent}
//                         showsVerticalScrollIndicator={false}
//                     >
//                         <Animated.View
//                             style={[
//                                 styles.contentContainer,
//                                 {
//                                     opacity: fadeAnim,
//                                     transform: [{ translateY: slideAnim }]
//                                 }
//                             ]}
//                         >
//                             {/* Hero Image */}
//                             <View style={styles.heroImageContainer}>
//                                 <View style={styles.bookImagePlaceholder}>
//                                     <FontAwesome5 name="book-open" size={60} color="#FF6B6B" />
//                                     <View style={styles.decorativeElements}>
//                                         <View style={[styles.decorDot, { top: 20, left: 20, backgroundColor: '#FFD700' }]} />
//                                         <View style={[styles.decorDot, { top: 40, right: 30, backgroundColor: '#7FFF00' }]} />
//                                         <View style={[styles.decorDot, { bottom: 30, left: 40, backgroundColor: '#FF1493' }]} />
//                                         <View style={[styles.decorDot, { bottom: 50, right: 20, backgroundColor: '#00CED1' }]} />
//                                     </View>
//                                 </View>
//                             </View>

//                             {/* Details Card */}
//                             <Animated.View
//                                 style={[
//                                     styles.detailsCard,
//                                     {
//                                         opacity: cardAnim,
//                                         transform: [{
//                                             translateY: cardAnim.interpolate({
//                                                 inputRange: [0, 1],
//                                                 outputRange: [30, 0]
//                                             })
//                                         }]
//                                     }
//                                 ]}
//                             >
//                                 <View style={styles.detailRow}>
//                                     <Text style={styles.detailLabel}>Training Name:</Text>
//                                     <Text style={styles.detailValue}>COE Self Training Session</Text>
//                                 </View>

//                                 <View style={styles.detailRow}>
//                                     <Text style={styles.detailLabel}>Course Name:</Text>
//                                     <Text style={styles.detailValue}>Online Course</Text>
//                                 </View>

//                                 <View style={styles.detailRow}>
//                                     <Text style={styles.detailLabel}>Training Date:</Text>
//                                     <Text style={styles.detailValue}>Nov 21, 2024</Text>
//                                 </View>

//                                 <View style={styles.detailRow}>
//                                     <Text style={styles.detailLabel}>Training Time:</Text>
//                                     <Text style={styles.detailValue}>12:00 AM</Text>
//                                 </View>

//                                 <View style={styles.detailRow}>
//                                     <Text style={styles.detailLabel}>Training Mode:</Text>
//                                     <Text style={styles.detailValue}>Online</Text>
//                                 </View>

//                                 {/* <View style={styles.detailDivider} /> */}

//                                 <View style={styles.detailRow}>
//                                     <Text style={styles.detailLabel}>Session Link:</Text>
//                                     <Text style={styles.detailValueBlue}>https://www.figma.com</Text>
//                                 </View>

//                                 <View style={styles.detailRow}>
//                                     <Text style={styles.detailLabel}>Session Id:</Text>
//                                     <Text style={styles.detailValueBlue}>4923749</Text>
//                                 </View>

//                                 <View style={styles.detailRow}>
//                                     <Text style={styles.detailLabel}>Session Password:</Text>
//                                     <Text style={styles.detailValueBlue}>hD**g#gop</Text>
//                                 </View>

//                                 <View style={styles.detailRow}>
//                                     <Text style={styles.detailLabel}>Trainer Name:</Text>
//                                     <Text style={styles.detailValue}>Usama Sir</Text>
//                                 </View>

//                                 <View style={styles.detailRow}>
//                                     <Text style={styles.detailLabel}>Is Mandatory:</Text>
//                                     <Text style={styles.detailValue}>Yes</Text>
//                                 </View>

//                                 <View style={styles.detailRow}>
//                                     <Text style={styles.detailLabel}>Certificate Status:</Text>
//                                     <View style={styles.inactiveTag}>
//                                         <Text style={styles.inactiveText}>Inactive</Text>
//                                     </View>
//                                 </View>

//                                 {/* Action Buttons */}
//                                 <View style={styles.buttonContainer}>
//                                     <TouchableOpacity style={styles.actionButton}>
//                                         <LinearGradient
//                                             colors={['#6B7FD7', '#5A4D8F']}
//                                             style={styles.buttonGradient}
//                                         >
//                                             <Text style={styles.buttonText}>Pre-Assessment</Text>
//                                         </LinearGradient>
//                                     </TouchableOpacity>

//                                     <TouchableOpacity style={styles.actionButton}>
//                                         <LinearGradient
//                                             colors={['#6B7FD7', '#5A4D8F']}
//                                             style={styles.buttonGradient}
//                                         >
//                                             <Text style={styles.buttonText}>Post-Assessment</Text>
//                                         </LinearGradient>
//                                     </TouchableOpacity>
//                                 </View>

//                                 <TouchableOpacity style={styles.feedbackButton}>
//                                     <LinearGradient
//                                         colors={['#6B7FD7', '#5A4D8F']}
//                                         style={styles.feedbackGradient}
//                                     >
//                                         <Text style={styles.feedbackText}>Fill Feedback</Text>
//                                     </LinearGradient>
//                                 </TouchableOpacity>
//                             </Animated.View>

//                             <View style={{ height: 100 }} />
//                         </Animated.View>
//                     </ScrollView>
//                 </View>

//                 {/* Bottom Navigation */}
//                 <BottomNavigation />

//                 {/* Drawer Overlay */}
//                 {drawerVisible && (
//                     <TouchableOpacity
//                         style={styles.overlay}
//                         activeOpacity={1}
//                         onPress={toggleDrawer}
//                     >
//                         <Animated.View
//                             style={[
//                                 StyleSheet.absoluteFill,
//                                 {
//                                     backgroundColor: 'black',
//                                     opacity: overlayOpacity,
//                                 },
//                             ]}
//                         />
//                     </TouchableOpacity>
//                 )}

//                 {/* Drawer */}
//                 {(drawerVisible || drawerSlideAnim._value > -width * 0.75) && <DrawerContent />}
//             </LinearGradient>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     gradientBg: {
//         flex: 1,
//     },
//     mainContent: {
//         flex: 1,
//     },
//     header: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         paddingTop: 50,
//         paddingHorizontal: 20,
//         paddingBottom: 20,
//     },
//     headerLeft: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         gap: 10,
//     },
//     menuButton: {
//         width: 45,
//         height: 45,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     headerTitle: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         color: '#fff',
//     },
//     headerRight: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         gap: 15,
//     },
//     iconButton: {
//         width: 40,
//         height: 40,
//         justifyContent: 'center',
//         alignItems: 'center',
//         position: 'relative',
//     },
//     notificationDot: {
//         position: 'absolute',
//         top: 8,
//         right: 8,
//         width: 8,
//         height: 8,
//         backgroundColor: '#ff4757',
//         borderRadius: 4,
//     },
//     scrollContent: {
//         flex: 1,
//     },
//     contentContainer: {
//         paddingHorizontal: 20,
//     },
//     heroImageContainer: {
//         height: 220,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginBottom: 20,
//     },
//     bookImagePlaceholder: {
//         width: 200,
//         height: 180,
//         justifyContent: 'center',
//         alignItems: 'center',
//         position: 'relative',
//     },
//     decorativeElements: {
//         position: 'absolute',
//         width: '100%',
//         height: '100%',
//     },
//     decorDot: {
//         position: 'absolute',
//         width: 12,
//         height: 12,
//         borderRadius: 6,
//     },
//     detailsCard: {
//         backgroundColor: '#fff',
//         borderRadius: 20,
//         padding: 20,
//         elevation: 5,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 3 },
//         shadowOpacity: 0.2,
//         shadowRadius: 5,
//     },
//     detailRow: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginBottom: 16,
//     },
//     detailLabel: {
//         fontSize: 14,
//         color: '#000',
//         fontWeight: '500',
//         flex: 1,
//     },
//     detailValue: {
//         fontSize: 14,
//         color: '#FF6B6B',
//         fontWeight: '600',
//         flex: 1,
//         textAlign: 'right',
//     },
//     detailValueBlue: {
//         fontSize: 14,
//         color: '#6B7FD7',
//         fontWeight: '600',
//         flex: 1,
//         textAlign: 'right',
//     },
//     detailDivider: {
//         height: 1,
//         backgroundColor: '#E0E0E0',
//         marginVertical: 8,
//     },
//     inactiveTag: {
//         backgroundColor: '#D3D3D3',
//         paddingHorizontal: 16,
//         paddingVertical: 6,
//         borderRadius: 15,
//     },
//     inactiveText: {
//         fontSize: 12,
//         color: '#666',
//         fontWeight: '600',
//     },
//     buttonContainer: {
//         flexDirection: 'row',
//         gap: 10,
//         marginTop: 20,
//         marginBottom: 12,
//     },
//     actionButton: {
//         flex: 1,
//         height: 45,
//         borderRadius: 10,
//         overflow: 'hidden',
//     },
//     buttonGradient: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     buttonText: {
//         color: '#fff',
//         fontSize: 13,
//         fontWeight: '600',
//     },
//     feedbackButton: {
//         height: 50,
//         borderRadius: 12,
//         overflow: 'hidden',
//         marginTop: 8,
//     },
//     feedbackGradient: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     feedbackText: {
//         color: '#fff',
//         fontSize: 15,
//         fontWeight: '700',
//     },
//     // Bottom Navigation
//     bottomNavContainer: {
//         position: 'absolute',
//         bottom: 0,
//         left: 0,
//         right: 0,
//     },
//     bottomNavBar: {
//         flexDirection: 'row',
//         height: 70,
//         alignItems: 'center',
//         justifyContent: 'space-around',
//         borderTopLeftRadius: 25,
//         borderTopRightRadius: 25,
//         paddingBottom: 5,
//         elevation: 10,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: -3 },
//         shadowOpacity: 0.3,
//         shadowRadius: 5,
//     },
//     tab: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: '100%',
//     },
//     centerTab: {
//         marginTop: -20,
//     },
//     tabIconContainer: {
//         width: 56,
//         height: 56,
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 28,
//     },
//     centerTabBg: {
//         position: 'absolute',
//         width: 56,
//         height: 56,
//         borderRadius: 28,
//         elevation: 5,
//     },
//     // Drawer Styles
//     overlay: {
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//     },
//     drawerContainer: {
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         bottom: 0,
//         width: width * 0.75,
//         elevation: 10,
//         shadowColor: '#000',
//         shadowOffset: { width: 2, height: 0 },
//         shadowOpacity: 0.5,
//         shadowRadius: 10,
//     },
//     drawerSolid: {
//         flex: 1,
//         paddingTop: 50,
//         backgroundColor: '#2D2438',
//     },
//     drawerHeader: {
//         paddingHorizontal: 20,
//         marginBottom: 30,
//     },
//     backButton: {
//         width: 40,
//         height: 40,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginBottom: 20,
//     },
//     profileSection: {
//         alignItems: 'center',
//     },
//     avatarGradient: {
//         width: 85,
//         height: 85,
//         borderRadius: 43,
//         padding: 3,
//         marginBottom: 12,
//         elevation: 5,
//     },
//     avatar: {
//         width: '100%',
//         height: '100%',
//         borderRadius: 40,
//         backgroundColor: '#2D2438',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     avatarText: {
//         fontSize: 32,
//         fontWeight: 'bold',
//         color: '#fff',
//     },
//     userName: {
//         fontSize: 18,
//         fontWeight: '600',
//         color: '#fff',
//         marginBottom: 4,
//     },
//     userId: {
//         fontSize: 14,
//         color: '#B8A7C7',
//     },
//     menuContainer: {
//         flex: 1,
//         paddingHorizontal: 15,
//     },
//     menuItemWrapper: {
//         marginVertical: 3,
//     },
//     menuItem: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         paddingVertical: 14,
//         paddingHorizontal: 18,
//         borderRadius: 12,
//         position: 'relative',
//         overflow: 'hidden',
//     },
//     menuItemActive: {
//         backgroundColor: 'transparent',
//     },
//     activeMenuGradient: {
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         borderRadius: 12,
//     },
//     menuIconContainer: {
//         width: 35,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     menuText: {
//         flex: 1,
//         fontSize: 15,
//         color: '#B8A7C7',
//         marginLeft: 12,
//         fontWeight: '500',
//     },
//     menuTextActive: {
//         color: '#fff',
//         fontWeight: '600',
//     },
//     chevron: {
//         marginLeft: 'auto',
//     },
//     logoutButton: {
//         margin: 20,
//         marginTop: 10,
//     },
//     logoutGradient: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         paddingVertical: 14,
//         borderRadius: 12,
//     },
//     logoutText: {
//         color: '#fff',
//         fontSize: 16,
//         fontWeight: '600',
//         marginLeft: 10,
//     },
// });

// export default VirtualTrainingScreen;


import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
// ✅ Import the universal drawer components
import CustomDrawer from '../../Components/CustomDrawer';
import { useDrawer } from '../../Components/useDrawer';

const { width } = Dimensions.get('window');

const VirtualTrainingScreen = ({ navigation, route }) => {
    const [selectedTab, setSelectedTab] = useState('Sessions');

    // ✅ Use the drawer hook - Training Session is at index 3
    const {
        drawerVisible,
        selectedMenuItem,
        drawerSlideAnim,
        overlayOpacity,
        menuItemAnims,
        toggleDrawer,
        handleMenuItemPress,
    } = useDrawer(3);

    // Animation values for PAGE CONTENT only
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;
    const cardAnim = useRef(new Animated.Value(0)).current;
    const tabScaleAnims = useRef([...Array(3)].map(() => new Animated.Value(1))).current;
    const rotateAnims = useRef([...Array(3)].map(() => new Animated.Value(0))).current;

    useEffect(() => {
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

        setTimeout(() => {
            Animated.spring(cardAnim, {
                toValue: 1,
                tension: 40,
                friction: 7,
                useNativeDriver: true,
            }).start();
        }, 300);
    }, []);

    // Bottom navigation tabs
    const bottomTabs = [
        { name: 'Sessions', icon: 'calendar', type: 'FontAwesome5' },
        { name: 'Dashboard', icon: 'view-dashboard', type: 'MaterialCommunityIcons' },
        { name: 'Calendar', icon: 'calendar-alt', type: 'FontAwesome5' },
    ];

    // Handle bottom tab press
    const handleTabPress = (index, tabName) => {
        setSelectedTab(tabName);

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

        if (index === 1) {
            navigation.navigate('Dashboard');
        } else if (index === 2) {
            navigation.navigate('Calendar');
        } else if (index === 0) {
            navigation.navigate('TrainingSession');
        }
    };

    // Render icon helper
    const renderIcon = (item, isSelected, iconSize = 22) => {
        const iconColor = isSelected ? '#fff' : '#8B7AA3';
        switch (item.type) {
            case 'MaterialIcons':
                return <MaterialIcons name={item.icon} size={iconSize} color={iconColor} />;
            case 'FontAwesome5':
                return <FontAwesome5 name={item.icon} size={iconSize} color={iconColor} />;
            default:
                return <Ionicons name={item.icon} size={iconSize} color={iconColor} />;
        }
    };

    // Bottom Navigation Component
    const BottomNavigation = () => {
        return (
            <View style={styles.bottomNavContainer}>
                <LinearGradient
                    colors={['#2D1B69', '#1a1a2e']}
                    style={styles.bottomNavBar}
                >
                    {bottomTabs.map((tab, index) => {
                        const isActive = tab.name === selectedTab;
                        const rotation = rotateAnims[index].interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0deg', '360deg'],
                        });

                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => handleTabPress(index, tab.name)}
                                activeOpacity={0.8}
                                style={[styles.tab, index === 1 && styles.centerTab]}
                            >
                                <Animated.View
                                    style={[
                                        styles.tabIconContainer,
                                        {
                                            transform: [
                                                { scale: tabScaleAnims[index] },
                                                { rotate: rotation }
                                            ]
                                        },
                                    ]}
                                >
                                    {isActive && (
                                        <LinearGradient
                                            colors={['#7B68EE', '#9D7FEA']}
                                            style={styles.centerTabBg}
                                        />
                                    )}
                                    {renderIcon(tab, isActive, index === 1 ? 28 : 24)}
                                </Animated.View>
                            </TouchableOpacity>
                        );
                    })}
                </LinearGradient>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />

            <LinearGradient
                colors={['#4A3B7C', '#2D1B69', '#1a1a2e']}
                style={styles.gradientBg}
            >
                <View style={styles.mainContent}>
                    {/* Header */}
                    <View style={styles.header}>
                        <View style={styles.headerLeft}>
                            <TouchableOpacity onPress={toggleDrawer} style={styles.menuButton}>
                                <Ionicons name="menu" size={28} color="#fff" />
                            </TouchableOpacity>
                            <Text style={styles.headerTitle}>Training Details</Text>
                        </View>
                        <View style={styles.headerRight}>
                            <TouchableOpacity style={styles.iconButton}>
                                <Ionicons name="notifications-outline" size={24} color="#fff" />
                                <View style={styles.notificationDot} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconButton}>
                                <Ionicons name="ellipsis-vertical" size={24} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Main Content */}
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
                            {/* Hero Image */}
                            <View style={styles.heroImageContainer}>
                                <View style={styles.bookImagePlaceholder}>
                                    <FontAwesome5 name="book-open" size={60} color="#FF6B6B" />
                                    <View style={styles.decorativeElements}>
                                        <View style={[styles.decorDot, { top: 20, left: 20, backgroundColor: '#FFD700' }]} />
                                        <View style={[styles.decorDot, { top: 40, right: 30, backgroundColor: '#7FFF00' }]} />
                                        <View style={[styles.decorDot, { bottom: 30, left: 40, backgroundColor: '#FF1493' }]} />
                                        <View style={[styles.decorDot, { bottom: 50, right: 20, backgroundColor: '#00CED1' }]} />
                                    </View>
                                </View>
                            </View>

                            {/* Details Card */}
                            <Animated.View
                                style={[
                                    styles.detailsCard,
                                    {
                                        opacity: cardAnim,
                                        transform: [{
                                            translateY: cardAnim.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [30, 0]
                                            })
                                        }]
                                    }
                                ]}
                            >
                                <View style={styles.detailRow}>
                                    <Text style={styles.detailLabel}>Training Name:</Text>
                                    <Text style={styles.detailValue}>COE Self Training Session</Text>
                                </View>

                                <View style={styles.detailRow}>
                                    <Text style={styles.detailLabel}>Course Name:</Text>
                                    <Text style={styles.detailValue}>Online Course</Text>
                                </View>

                                <View style={styles.detailRow}>
                                    <Text style={styles.detailLabel}>Training Date:</Text>
                                    <Text style={styles.detailValue}>Nov 21, 2024</Text>
                                </View>

                                <View style={styles.detailRow}>
                                    <Text style={styles.detailLabel}>Training Time:</Text>
                                    <Text style={styles.detailValue}>12:00 AM</Text>
                                </View>

                                <View style={styles.detailRow}>
                                    <Text style={styles.detailLabel}>Training Mode:</Text>
                                    <Text style={styles.detailValue}>Online</Text>
                                </View>

                                <View style={styles.detailRow}>
                                    <Text style={styles.detailLabel}>Session Link:</Text>
                                    <Text style={styles.detailValueBlue}>https://www.figma.com</Text>
                                </View>

                                <View style={styles.detailRow}>
                                    <Text style={styles.detailLabel}>Session Id:</Text>
                                    <Text style={styles.detailValueBlue}>4923749</Text>
                                </View>

                                <View style={styles.detailRow}>
                                    <Text style={styles.detailLabel}>Session Password:</Text>
                                    <Text style={styles.detailValueBlue}>hD**g#gop</Text>
                                </View>

                                <View style={styles.detailRow}>
                                    <Text style={styles.detailLabel}>Trainer Name:</Text>
                                    <Text style={styles.detailValue}>Usama Sir</Text>
                                </View>

                                <View style={styles.detailRow}>
                                    <Text style={styles.detailLabel}>Is Mandatory:</Text>
                                    <Text style={styles.detailValue}>Yes</Text>
                                </View>

                                <View style={styles.detailRow}>
                                    <Text style={styles.detailLabel}>Certificate Status:</Text>
                                    <View style={styles.inactiveTag}>
                                        <Text style={styles.inactiveText}>Inactive</Text>
                                    </View>
                                </View>

                                {/* Action Buttons */}
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity style={styles.actionButton}>
                                        <LinearGradient
                                            colors={['#6B7FD7', '#5A4D8F']}
                                            style={styles.buttonGradient}
                                        >
                                            <Text style={styles.buttonText}>Pre-Assessment</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.actionButton}>
                                        <LinearGradient
                                            colors={['#6B7FD7', '#5A4D8F']}
                                            style={styles.buttonGradient}
                                        >
                                            <Text style={styles.buttonText}>Post-Assessment</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>

                                <TouchableOpacity style={styles.feedbackButton}>
                                    <LinearGradient
                                        colors={['#6B7FD7', '#5A4D8F']}
                                        style={styles.feedbackGradient}
                                    >
                                        <Text style={styles.feedbackText}>Fill Feedback</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </Animated.View>

                            <View style={{ height: 100 }} />
                        </Animated.View>
                    </ScrollView>
                </View>

                {/* Bottom Navigation */}
                <BottomNavigation />

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
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradientBg: {
        flex: 1,
    },
    mainContent: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 50,
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    menuButton: {
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    iconButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    notificationDot: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 8,
        height: 8,
        backgroundColor: '#ff4757',
        borderRadius: 4,
    },
    scrollContent: {
        flex: 1,
    },
    contentContainer: {
        paddingHorizontal: 20,
    },
    heroImageContainer: {
        height: 220,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    bookImagePlaceholder: {
        width: 200,
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    decorativeElements: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    decorDot: {
        position: 'absolute',
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    detailsCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    detailLabel: {
        fontSize: 14,
        color: '#000',
        fontWeight: '500',
        flex: 1,
    },
    detailValue: {
        fontSize: 14,
        color: '#FF6B6B',
        fontWeight: '600',
        flex: 1,
        textAlign: 'right',
    },
    detailValueBlue: {
        fontSize: 14,
        color: '#6B7FD7',
        fontWeight: '600',
        flex: 1,
        textAlign: 'right',
    },
    detailDivider: {
        height: 1,
        backgroundColor: '#E0E0E0',
        marginVertical: 8,
    },
    inactiveTag: {
        backgroundColor: '#D3D3D3',
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 15,
    },
    inactiveText: {
        fontSize: 12,
        color: '#666',
        fontWeight: '600',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 20,
        marginBottom: 12,
    },
    actionButton: {
        flex: 1,
        height: 45,
        borderRadius: 10,
        overflow: 'hidden',
    },
    buttonGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '600',
    },
    feedbackButton: {
        height: 50,
        borderRadius: 12,
        overflow: 'hidden',
        marginTop: 8,
    },
    feedbackGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    feedbackText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '700',
    },
    // Bottom Navigation
    bottomNavContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    bottomNavBar: {
        flexDirection: 'row',
        height: 70,
        alignItems: 'center',
        justifyContent: 'space-around',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingBottom: 5,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    centerTab: {
        marginTop: -20,
    },
    tabIconContainer: {
        width: 56,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 28,
    },
    centerTabBg: {
        position: 'absolute',
        width: 56,
        height: 56,
        borderRadius: 28,
        elevation: 5,
    },
});

export default VirtualTrainingScreen;
