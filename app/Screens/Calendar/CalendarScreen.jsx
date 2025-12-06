// import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
// import { useFocusEffect } from '@react-navigation/native';
// import { LinearGradient } from 'expo-linear-gradient';
// import React, { useEffect, useRef, useState } from 'react';
// import {
//   Animated,
//   BackHandler,
//   Dimensions,
//   Modal, Pressable,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View
// } from 'react-native';
// // ✅ Import the universal drawer components
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import CustomDrawer from '../../Components/CustomDrawer';
// import { useDrawer } from '../../Components/useDrawer';

// const { width } = Dimensions.get('window');

// const CalendarScreen = ({ navigation }) => {


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


//   // Always normalize date (ignore time, ignore timezone)
//   const normalizeDate = (dateStringOrObject) => {
//     const d = new Date(dateStringOrObject);
//     return new Date(d.getFullYear(), d.getMonth(), d.getDate());
//   };

//   const [calendarData, setCalendarData] = useState([]);
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCalendarData = async () => {
//       try {
//         const userID = await AsyncStorage.getItem('employeeID');
//         if (!userID) return;

//         const res = await fetch(`https://lms-api-qa.abisaio.com/api/v1/Calendar/GetCalendarData?UserID=${userID}&type=Admin`);
//         const json = await res.json();

//         if (json?.succeeded && Array.isArray(json.data)) {
//           setCalendarData(json.data);

//           // Extract unique dates from API and map to event days
//           const today = new Date();
//           const todayDate = today.getDate();
//           const todayMonth = today.getMonth();
//           const todayYear = today.getFullYear();

//           // Default: show today's tasks
//           const todayTasks = json.data.filter(item => {
//             const d = normalizeDate(item.trainingDate);
//             return (
//               d.getDate() === todayDate &&
//               d.getMonth() === todayMonth &&
//               d.getFullYear() === todayYear
//             );
//           });


//           setTasks(todayTasks);
//           setTaskAnims(todayTasks.map(() => new Animated.Value(0)));

//           setSelectedDate(todayDate);
//           setCurrentMonth(today.toLocaleString('default', { month: 'long' }));
//           setCurrentYear(todayYear);
//         }
//       } catch (err) {
//         console.error('Error fetching calendar data:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCalendarData();
//   }, []);

//   const months = [
//     'January', 'February', 'March', 'April', 'May', 'June',
//     'July', 'August', 'September', 'October', 'November', 'December'
//   ];
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [modalVisible, setModalVisible] = useState(false);


//   const today = new Date();
//   const todayDay = today.getDate();
//   const todayMonthIndex = today.getMonth();
//   const todayYear = today.getFullYear();

//   const [selectedDate, setSelectedDate] = useState(todayDay);
//   const [selectedTab, setSelectedTab] = useState('Calendar');
//   const [currentMonth, setCurrentMonth] = useState(months[todayMonthIndex]);
//   const [currentYear, setCurrentYear] = useState(todayYear);



//   const handlePrevMonth = () => {
//     const newMonthIndex = months.indexOf(currentMonth) - 1;
//     let newMonth, newYear;

//     if (newMonthIndex < 0) {
//       newMonth = months[11];
//       newYear = currentYear - 1;
//     } else {
//       newMonth = months[newMonthIndex];
//       newYear = currentYear;
//     }

//     setCurrentMonth(newMonth);
//     setCurrentYear(newYear);

//     // Reset selected date and tasks
//     const today = new Date();
//     if (today.getFullYear() === newYear && today.getMonth() === months.indexOf(newMonth)) {
//       // show today’s tasks if the new month = current month
//       setSelectedDate(today.getDate());
//       const filtered = calendarData.filter(x => {
//         const d = normalizeDate(x.trainingDate);
//         return (
//           d.getFullYear() === newYear &&
//           d.getMonth() === months.indexOf(newMonth) &&
//           d.getDate() === today.getDate()
//         );
//       });
//       setTasks(filtered);
//       const anims = filtered.map(() => new Animated.Value(0));
//       setTaskAnims(anims);
//     } else {
//       setSelectedDate(null);
//       setTasks([]);
//       setTaskAnims([]);
//     }
//   };

//   const handleNextMonth = () => {
//     const newMonthIndex = months.indexOf(currentMonth) + 1;
//     let newMonth, newYear;

//     if (newMonthIndex > 11) {
//       newMonth = months[0];
//       newYear = currentYear + 1;
//     } else {
//       newMonth = months[newMonthIndex];
//       newYear = currentYear;
//     }

//     setCurrentMonth(newMonth);
//     setCurrentYear(newYear);

//     // Reset selected date and tasks
//     const today = new Date();
//     if (today.getFullYear() === newYear && today.getMonth() === months.indexOf(newMonth)) {
//       // show today’s tasks if the new month = current month
//       setSelectedDate(today.getDate());
//       const filtered = calendarData.filter(x => {
//         const d = normalizeDate(x.trainingDate);
//         return (
//           d.getFullYear() === newYear &&
//           d.getMonth() === months.indexOf(newMonth) &&
//           d.getDate() === today.getDate()
//         );
//       });
//       setTasks(filtered);
//       const anims = filtered.map(() => new Animated.Value(0));
//       setTaskAnims(anims);
//     } else {
//       setSelectedDate(null);
//       setTasks([]);
//       setTaskAnims([]);
//     }
//   };



//   // ✅ Use the drawer hook - Calendar is at index 4
//   const {
//     drawerVisible,
//     selectedMenuItem,
//     drawerSlideAnim,
//     overlayOpacity,
//     menuItemAnims,
//     toggleDrawer,
//     handleMenuItemPress,
//   } = useDrawer(4);

//   // Animation values for PAGE CONTENT only
//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const slideAnim = useRef(new Animated.Value(50)).current;
//   const calendarAnim = useRef(new Animated.Value(0)).current;
//   const [taskAnims, setTaskAnims] = useState([]);

//   const tabScaleAnims = useRef([...Array(3)].map(() => new Animated.Value(1))).current;
//   const rotateAnims = useRef([...Array(3)].map(() => new Animated.Value(0))).current;
//   const pulseAnim = useRef(new Animated.Value(1)).current;

//   // Calendar data
//   const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
//   const generateCalendarDays = () => {
//     const monthIndex = months.indexOf(currentMonth);
//     const date = new Date(currentYear, monthIndex, 1);

//     const firstDay = (date.getDay() + 6) % 7;
//     const daysInMonth = new Date(currentYear, date.getMonth() + 1, 0).getDate();
//     const prevMonthDays = new Date(currentYear, date.getMonth(), 0).getDate();

//     const days = [];

//     // Previous month days
//     for (let i = firstDay - 1; i >= 0; i--) {
//       days.push({ day: prevMonthDays - i, isCurrentMonth: false });
//     }

//     // Current month days
//     for (let i = 1; i <= daysInMonth; i++) {
//       const fullDate = new Date(currentYear, date.getMonth(), i);
//       const event = calendarData.find(item => {
//         const d = new Date(item.trainingDate);
//         return (
//           d.getDate() === fullDate.getDate() &&
//           d.getMonth() === fullDate.getMonth() &&
//           d.getFullYear() === fullDate.getFullYear()
//         );
//       });

//       days.push({
//         day: i,
//         isCurrentMonth: true,
//         hasEvent: !!event,
//         eventType: event ? event.type.toLowerCase() : null,
//       });
//     }

//     // Fill next month to complete 42 cells
//     while (days.length < 42) {
//       days.push({ day: days.length - (firstDay + daysInMonth) + 1, isCurrentMonth: false });
//     }

//     return days;
//   };

//   const [calendarDays, setCalendarDays] = useState([]);

//   useEffect(() => {
//     setCalendarDays(generateCalendarDays());
//   }, [currentMonth, currentYear, calendarData]);




//   // Bottom navigation tabs
//   const bottomTabs = [
//     { name: 'Sessions', icon: 'calendar', type: 'FontAwesome5' },
//     { name: 'Dashboard', icon: 'view-dashboard', type: 'MaterialIcons' },
//     { name: 'Calendar', icon: 'calendar-alt', type: 'FontAwesome5' },
//   ];

//   useEffect(() => {
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

//     // Calendar animation
//     setTimeout(() => {
//       Animated.spring(calendarAnim, {
//         toValue: 1,
//         tension: 40,
//         friction: 7,
//         useNativeDriver: true,
//       }).start();
//     }, 300);

//     // Staggered task animations
//     taskAnims.forEach((anim, index) => {
//       setTimeout(() => {
//         Animated.spring(anim, {
//           toValue: 1,
//           tension: 40,
//           friction: 7,
//           useNativeDriver: true,
//         }).start();
//       }, 600 + index * 150);
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
//     } else if (index === 0) {
//       navigation.navigate('TrainingSession');
//     } else if (index === 2) {
//       navigation.navigate('Calendar');
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

//   // Get event color
//   const getEventColor = (type) => {
//     switch (type) {
//       case 'classroom': return '#A855F7';
//       case 'virtual': return '#FF6B6B';
//       case 'self': return '#667eea';
//       default: return '#667eea';
//     }
//   };
//   useEffect(() => {
//     if (!taskAnims || taskAnims.length === 0) return;

//     // Stagger and animate each task Animated.Value to 1
//     taskAnims.forEach((anim, index) => {
//       setTimeout(() => {
//         Animated.spring(anim, {
//           toValue: 1,
//           tension: 40,
//           friction: 7,
//           useNativeDriver: true,
//         }).start();
//       }, 200 + index * 150);
//     });
//   }, [taskAnims]);

//   // Bottom Navigation Component
//   const BottomNavigation = () => (
//     <View style={styles.bottomNavContainer}>
//       <LinearGradient colors={['#2D1B69', '#1a1a2e']} style={styles.bottomNavBar}>
//         {bottomTabs.map((tab, index) => {
//           const isActive = tab.name === selectedTab;
//           const rotation = rotateAnims[index].interpolate({
//             inputRange: [0, 1],
//             outputRange: ['0deg', '360deg'],
//           });

//           return (
//             <TouchableOpacity
//               key={index}
//               onPress={() => handleTabPress(index, tab.name)}
//               activeOpacity={0.8}
//               style={[styles.tab, index === 1 && styles.centerTab]}
//             >
//               <Animated.View
//                 style={[
//                   styles.tabIconContainer,
//                   { transform: [{ scale: tabScaleAnims[index] }] },
//                 ]}
//               >
//                 {isActive && (
//                   <LinearGradient
//                     colors={['#7B68EE', '#9D7FEA']}
//                     style={styles.centerTabBg}
//                   />
//                 )}
//                 <Animated.View style={{ transform: [{ rotate: rotation }] }}>
//                   {renderIcon(tab, isActive, index === 1 ? 28 : 24)}
//                 </Animated.View>
//               </Animated.View>
//             </TouchableOpacity>
//           );
//         })}
//       </LinearGradient>
//     </View>
//   );
//   const [userName, setUserName] = useState("");
//   useEffect(() => {
//     const loadUserName = async () => {
//       try {
//         const storedName = await AsyncStorage.getItem("name");
//         if (storedName) {
//           setUserName(storedName);
//         }
//       } catch (error) {
//         console.log("Error fetching name:", error);
//       }
//     };

//     loadUserName();
//   }, []);
//   const getGreeting = () => {
//     const hour = new Date().getHours();
//     if (hour < 12) return "Good Morning";
//     if (hour < 18) return "Good Afternoon";
//     return "Good Evening";
//   };



//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />

//       <Animated.View style={[styles.mainContent, { opacity: fadeAnim }]}>
//         {/* Header */}
//         <View style={styles.header}>
//           <View style={styles.headerLeft}>
//             <TouchableOpacity onPress={toggleDrawer} style={styles.menuButton}>
//               <Ionicons name="menu" size={28} color="#fff" />
//             </TouchableOpacity>
//             <Text style={styles.headerTitle}>Calendar</Text>
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

//         {/* Greeting Section */}
//         <Animated.View
//           style={[
//             styles.greetingSection,
//             { transform: [{ translateY: slideAnim }] }
//           ]}
//         >
//           <LinearGradient
//             colors={['rgba(123, 104, 238, 0.2)', 'rgba(123, 104, 238, 0.05)']}
//             style={styles.greetingCard}
//           >
//             <Text style={styles.greetingText}>
//               {getGreeting()}, {userName ? userName : "User"} ☀️
//             </Text>



//           </LinearGradient>
//         </Animated.View>

//         <ScrollView
//           style={styles.scrollContent}
//           showsVerticalScrollIndicator={false}
//         >
//           {/* Legend */}
//           <View style={styles.legendContainer}>
//             <View style={styles.legendItem}>
//               <View style={[styles.legendDot, { backgroundColor: '#A855F7' }]} />
//               <Text style={styles.legendText}>Classroom Training</Text>
//             </View>
//             <View style={styles.legendItem}>
//               <View style={[styles.legendDot, { backgroundColor: '#FF6B6B' }]} />
//               <Text style={styles.legendText}>Virtual Training</Text>
//             </View>
//             <View style={styles.legendItem}>
//               <View style={[styles.legendDot, { backgroundColor: '#667eea' }]} />
//               <Text style={styles.legendText}>Self Enroll</Text>
//             </View>
//           </View>

//           {/* Calendar Card */}
//           <Animated.View
//             style={[
//               styles.calendarCard,
//               {
//                 opacity: calendarAnim,
//                 transform: [{
//                   scale: calendarAnim.interpolate({
//                     inputRange: [0, 1],
//                     outputRange: [0.9, 1],
//                   })
//                 }]
//               }
//             ]}
//           >
//             <LinearGradient
//               colors={['#fff', '#f8f9ff']}
//               style={styles.calendarGradient}
//             >
//               {/* Month Header */}
//               <View style={styles.monthHeader}>
//                 <TouchableOpacity style={styles.monthButton} onPress={handlePrevMonth}>
//                   <Ionicons name="chevron-back" size={24} color="#7B68EE" />
//                 </TouchableOpacity>
//                 <View style={styles.monthTextContainer}>
//                   <Text style={styles.monthText}>{currentMonth}</Text>
//                   <Text style={styles.yearText}>🗓️ {currentYear}</Text>
//                 </View>
//                 <TouchableOpacity style={styles.monthButton} onPress={handleNextMonth}>
//                   <Ionicons name="chevron-forward" size={24} color="#7B68EE" />
//                 </TouchableOpacity>
//               </View>

//               {/* Days of Week */}
//               <View style={styles.daysOfWeekRow}>
//                 {daysOfWeek.map((day, index) => (
//                   <View key={index} style={styles.dayOfWeekCell}>
//                     <Text style={styles.dayOfWeekText}>{day}</Text>
//                   </View>
//                 ))}
//               </View>

//               {/* Calendar Grid */}
//               <View style={styles.calendarGrid}>
//                 {calendarDays.map((item, index) => {
//                   const isSelected = item.day === selectedDate && item.isCurrentMonth;
//                   return (
//                     <TouchableOpacity
//                       key={index}
//                       onPress={() => {
//                         if (!item.isCurrentMonth) return;

//                         setSelectedDate(item.day);

//                         // Build clicked date components
//                         const clickedYear = currentYear;
//                         const clickedMonth = months.indexOf(currentMonth); // 0-based
//                         const clickedDay = item.day;

//                         // Filter by numeric year/month/day (avoids timezone issues)
//                         const filtered = calendarData.filter(x => {
//                           const d = normalizeDate(x.trainingDate);
//                           return (
//                             d.getFullYear() === clickedYear &&
//                             d.getMonth() === clickedMonth &&
//                             d.getDate() === clickedDay
//                           );
//                         });

//                         // Update tasks
//                         setTasks(filtered);

//                         // Create Animated.Value array and save it to state
//                         const newAnims = filtered.map(() => new Animated.Value(0));
//                         setTaskAnims(newAnims);

//                         // Start staggered animations for the newly created anims
//                         newAnims.forEach((anim, idx) => {
//                           setTimeout(() => {
//                             Animated.spring(anim, {
//                               toValue: 1,
//                               tension: 40,
//                               friction: 7,
//                               useNativeDriver: true,
//                             }).start();
//                           }, 150 + idx * 120);
//                         });
//                       }}


//                       style={styles.dayCell}
//                       activeOpacity={0.7}
//                     >
//                       {isSelected ? (
//                         <LinearGradient
//                           colors={['#7B68EE', '#9D7FEA']}
//                           style={styles.selectedDay}
//                         >
//                           <Text style={styles.selectedDayText}>{item.day}</Text>
//                           {item.hasEvent && (
//                             <View style={[styles.eventDot, { backgroundColor: '#fff' }]} />
//                           )}
//                         </LinearGradient>
//                       ) : (
//                         <View style={styles.dayContent}>
//                           <Text
//                             style={[
//                               styles.dayText,
//                               !item.isCurrentMonth && styles.inactiveDayText,
//                             ]}
//                           >
//                             {item.day}
//                           </Text>
//                           {item.hasEvent && item.isCurrentMonth && (
//                             <View style={[styles.eventDot, { backgroundColor: getEventColor(item.eventType) }]} />
//                           )}
//                         </View>
//                       )}
//                     </TouchableOpacity>
//                   );
//                 })}
//               </View>
//             </LinearGradient>
//           </Animated.View>


//           {/* Today's Tasks */}
//           <View style={styles.tasksSection}>
//             <Text style={styles.tasksSectionTitle}>
//               {(() => {
//                 if (selectedDate === null) {
//                   return "No date selected";
//                 }

//                 const today = new Date();
//                 const isToday =
//                   selectedDate === today.getDate() &&
//                   months.indexOf(currentMonth) === today.getMonth() &&
//                   currentYear === today.getFullYear();

//                 return isToday
//                   ? "Today's Tasks"
//                   : `Tasks for ${selectedDate} ${currentMonth}`;
//               })()}
//             </Text>




//             {tasks.length === 0 ? (
//               <Text style={{ color: '#999', fontSize: 14, textAlign: 'center', marginTop: 10 }}>
//                 No trainings scheduled for this date.
//               </Text>
//             ) : (
//               tasks.map((task, index) => {
//                 const scale = taskAnims[index]
//                   ? taskAnims[index].interpolate({ inputRange: [0, 1], outputRange: [0.9, 1] })
//                   : 1;
//                 const translateY = taskAnims[index]
//                   ? taskAnims[index].interpolate({ inputRange: [0, 1], outputRange: [30, 0] })
//                   : 0;
//                 const opacity = taskAnims[index] || 1;

//                 const typeColor = getEventColor(task.type?.toLowerCase());

//                 const dateObj = new Date(task.trainingDate);
//                 const dateStr = dateObj.toDateString();
//                 const timeStr = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

//                 return (
//                   <Animated.View
//                     key={index}
//                     style={[
//                       styles.taskCard,
//                       {
//                         opacity,
//                         transform: [{ scale }, { translateY }],
//                       },
//                     ]}
//                   >
//                     <LinearGradient
//                       colors={[typeColor, '#7B68EE']}
//                       style={styles.taskGradient}
//                     >
//                       <View style={styles.taskLeft}>
//                         <Text style={styles.taskDate}>{dateObj.getDate()}</Text>
//                         <Text style={{ color: '#fff', fontSize: 10 }}>{currentMonth.slice(0, 3)}</Text>
//                       </View>

//                       <View style={styles.taskMiddle}>
//                         <FontAwesome5
//                           name={task.type?.toLowerCase() === 'virtual' ? 'video' : 'chalkboard-teacher'}
//                           size={16}
//                           color="#fff"
//                           style={styles.taskIcon}
//                         />
//                         <View style={styles.taskInfo}>
//                           <Text style={styles.taskTitle}>{task.title}</Text>
//                           <View style={styles.taskMeta}>
//                             <Ionicons name="calendar" size={12} color="rgba(255,255,255,0.9)" />
//                             <Text style={styles.taskMetaText}>{dateStr}</Text>
//                           </View>

//                         </View>
//                       </View>

//                       <TouchableOpacity style={styles.detailsBtn} onPress={() => {
//                         setSelectedTask(task);
//                         setModalVisible(true);
//                       }}>
//                         <Text style={styles.detailsBtnText}>Details</Text>
//                       </TouchableOpacity>
//                     </LinearGradient>
//                   </Animated.View>
//                 );
//               })
//             )}

//           </View>


//           <View style={{ height: 100 }} />
//         </ScrollView>
//       </Animated.View>
//       <Modal
//         transparent={true}
//         animationType="fade"
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContainer}>
//             {selectedTask && (
//               <>
//                 <Text style={styles.modalTitle}>Training Session Details</Text>
//                 <Text style={styles.modalSubTitle}>{selectedTask.title}</Text>

//                 {/* Compute Start/End */}
//                 {(() => {
//                   const start = new Date(selectedTask.trainingDate);
//                   const end = new Date(start.getTime() + selectedTask.duration * 60000);

//                   const formatTime = (d) =>
//                     d.toLocaleString("en-US", {
//                       month: "long",
//                       day: "numeric",
//                       year: "numeric",
//                       hour: "numeric",
//                       minute: "2-digit",
//                       hour12: true,
//                     });

//                   return (
//                     <>
//                       <Text style={styles.modalText}>
//                         <Text style={styles.modalLabel}>Start: </Text>
//                         {formatTime(start)}
//                       </Text>
//                       <Text style={styles.modalText}>
//                         <Text style={styles.modalLabel}>End: </Text>
//                         {formatTime(end)}
//                       </Text>
//                     </>
//                   );
//                 })()}

//                 {selectedTask.trainerName && (
//                   <Text style={styles.modalText}>
//                     <Text style={styles.modalLabel}>Trainer: </Text>
//                     {selectedTask.trainerName}
//                   </Text>
//                 )}

//                 {selectedTask.location && (
//                   <Text style={styles.modalText}>
//                     <Text style={styles.modalLabel}>Location: </Text>
//                     {selectedTask.location.trim()}
//                   </Text>
//                 )}

//                 {selectedTask.venue && (
//                   <Text style={styles.modalText}>
//                     <Text style={styles.modalLabel}>Venue: </Text>
//                     {selectedTask.venue.trim()}
//                   </Text>
//                 )}

//                 {/* Buttons */}
//                 <View style={styles.modalButtonRow}>
//                   <Pressable
//                     style={[styles.modalButton, { backgroundColor: '#7B68EE' }]}
//                     onPress={() => {
//                       // Navigate to details screen if needed
//                       setModalVisible(false);
//                     }}
//                   >
//                     <Text style={styles.modalButtonText}>DETAILS</Text>
//                   </Pressable>

//                   <Pressable
//                     style={[styles.modalButton, { backgroundColor: '#ccc' }]}
//                     onPress={() => setModalVisible(false)}
//                   >
//                     <Text style={[styles.modalButtonText, { color: '#000' }]}>CLOSE</Text>
//                   </Pressable>
//                 </View>
//               </>
//             )}
//           </View>
//         </View>
//       </Modal>


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
//   container: {
//     flex: 1,
//     backgroundColor: '#1a1a2e',
//   },
//   mainContent: {
//     flex: 1,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingTop: 50,
//     paddingHorizontal: 20,
//     paddingBottom: 20,
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
//   greetingSection: {
//     paddingHorizontal: 20,
//     marginBottom: 15,
//   },
//   greetingCard: {
//     borderRadius: 16,
//     padding: 16,
//     borderWidth: 1,
//     borderColor: 'rgba(123, 104, 238, 0.3)',
//   },
//   greetingText: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#fff',
//   },
//   scrollContent: {
//     flex: 1,
//   },
//   legendContainer: {
//     flexDirection: 'row',
//     paddingHorizontal: 20,
//     marginBottom: 20,
//     flexWrap: 'wrap',
//     gap: 12,
//   },
//   legendItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 6,
//   },
//   legendDot: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//   },
//   legendText: {
//     fontSize: 11,
//     color: '#a8b2d1',
//     fontWeight: '500',
//   },
//   calendarCard: {
//     marginHorizontal: 20,
//     marginBottom: 25,
//     borderRadius: 20,
//     elevation: 8,
//     shadowColor: '#7B68EE',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     overflow: 'hidden',
//   },
//   calendarGradient: {
//     padding: 20,
//   },
//   monthHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   monthButton: {
//     width: 40,
//     height: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   monthTextContainer: {
//     alignItems: 'center',
//   },
//   monthText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#2D2D2D',
//   },
//   yearText: {
//     fontSize: 14,
//     color: '#666',
//     marginTop: 2,
//   },
//   headerLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 5,
//   },
//   daysOfWeekRow: {
//     flexDirection: 'row',
//     marginBottom: 10,
//   },
//   dayOfWeekCell: {
//     flex: 1,
//     alignItems: 'center',
//     paddingVertical: 8,
//   },
//   dayOfWeekText: {
//     fontSize: 12,
//     fontWeight: '600',
//     color: '#7B68EE',
//   },
//   calendarGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//   },
//   dayCell: {
//     width: `${100 / 7}%`,
//     aspectRatio: 1,
//     padding: 2,
//   },
//   selectedDay: {
//     flex: 1,
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 4,
//   },
//   selectedDayText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   dayContent: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   dayText: {
//     fontSize: 15,
//     color: '#2D2D2D',
//     fontWeight: '500',
//   },
//   inactiveDayText: {
//     color: '#CCC',
//   },
//   eventDot: {
//     width: 6,
//     height: 6,
//     borderRadius: 3,
//     marginTop: 2,
//   },
//   tasksSection: {
//     paddingHorizontal: 20,
//   },
//   tasksSectionTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginBottom: 15,
//   },
//   taskCard: {
//     marginBottom: 15,
//     borderRadius: 16,
//     overflow: 'hidden',
//     elevation: 6,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//   },
//   taskGradient: {
//     flexDirection: 'row',
//     padding: 16,
//     alignItems: 'center',
//   },
//   taskLeft: {
//     backgroundColor: 'rgba(255,255,255,0.2)',
//     borderRadius: 12,
//     paddingVertical: 12,
//     paddingHorizontal: 10,
//     marginRight: 12,
//     minWidth: 55,
//     alignItems: 'center',
//   },
//   taskDate: {
//     color: '#fff',
//     fontSize: 13,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     lineHeight: 16,
//   },
//   taskMiddle: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   taskIcon: {
//     marginRight: 10,
//   },
//   taskInfo: {
//     flex: 1,
//   },
//   taskTitle: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#fff',
//     marginBottom: 4,
//   },
//   taskMeta: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 4,
//     marginTop: 2,
//   },
//   taskMetaText: {
//     fontSize: 11,
//     color: 'rgba(255,255,255,0.9)',
//   },
//   detailsBtn: {
//     backgroundColor: 'rgba(255,255,255,0.3)',
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 20,
//   },
//   detailsBtnText: {
//     color: '#fff',
//     fontSize: 12,
//     fontWeight: '600',
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
//     alignItems: 'center',
//     justifyContent: 'center',
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

//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContainer: {
//     width: '85%',
//     backgroundColor: '#fff',
//     borderRadius: 16,
//     padding: 20,
//     elevation: 10,
//     shadowColor: '#7B68EE',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#1a1a2e',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   modalSubTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#7B68EE',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   modalText: {
//     fontSize: 14,
//     color: '#333',
//     marginBottom: 6,
//   },
//   modalLabel: {
//     fontWeight: 'bold',
//     color: '#1a1a2e',
//   },
//   modalButtonRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginTop: 20,
//   },
//   modalButton: {
//     flex: 1,
//     marginHorizontal: 5,
//     paddingVertical: 10,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   modalButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 14,
//   },

// });

// export default CalendarScreen;

import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  BackHandler,
  Dimensions,
  Modal,
  Pressable,
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

const { width } = Dimensions.get('window');

const CalendarScreen = ({ navigation }) => {

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

  // Always normalize date (ignore time, ignore timezone)
  const normalizeDate = (dateStringOrObject) => {
    const d = new Date(dateStringOrObject);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  };

  const [calendarData, setCalendarData] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        const userID = await AsyncStorage.getItem('employeeID');
        if (!userID) return;

        const res = await fetch(`https://lms-api-qa.abisaio.com/api/v1/Calendar/GetCalendarData?UserID=${userID}&type=Admin`);
        const json = await res.json();

        if (json?.succeeded && Array.isArray(json.data)) {
          setCalendarData(json.data);

          const today = new Date();
          const todayDate = today.getDate();
          const todayMonth = today.getMonth();
          const todayYear = today.getFullYear();

          const todayTasks = json.data.filter(item => {
            const d = normalizeDate(item.trainingDate);
            return (
              d.getDate() === todayDate &&
              d.getMonth() === todayMonth &&
              d.getFullYear() === todayYear
            );
          });

          setTasks(todayTasks);
          setTaskAnims(todayTasks.map(() => new Animated.Value(0)));

          setSelectedDate(todayDate);
          setCurrentMonth(today.toLocaleString('default', { month: 'long' }));
          setCurrentYear(todayYear);
        }
      } catch (err) {
        console.error('Error fetching calendar data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCalendarData();
  }, []);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const [selectedTask, setSelectedTask] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const today = new Date();
  const todayDay = today.getDate();
  const todayMonthIndex = today.getMonth();
  const todayYear = today.getFullYear();

  const [selectedDate, setSelectedDate] = useState(todayDay);
  const [currentMonth, setCurrentMonth] = useState(months[todayMonthIndex]);
  const [currentYear, setCurrentYear] = useState(todayYear);

  const handlePrevMonth = () => {
    const newMonthIndex = months.indexOf(currentMonth) - 1;
    let newMonth, newYear;

    if (newMonthIndex < 0) {
      newMonth = months[11];
      newYear = currentYear - 1;
    } else {
      newMonth = months[newMonthIndex];
      newYear = currentYear;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);

    const today = new Date();
    if (today.getFullYear() === newYear && today.getMonth() === months.indexOf(newMonth)) {
      setSelectedDate(today.getDate());
      const filtered = calendarData.filter(x => {
        const d = normalizeDate(x.trainingDate);
        return (
          d.getFullYear() === newYear &&
          d.getMonth() === months.indexOf(newMonth) &&
          d.getDate() === today.getDate()
        );
      });
      setTasks(filtered);
      const anims = filtered.map(() => new Animated.Value(0));
      setTaskAnims(anims);
    } else {
      setSelectedDate(null);
      setTasks([]);
      setTaskAnims([]);
    }
  };

  const handleNextMonth = () => {
    const newMonthIndex = months.indexOf(currentMonth) + 1;
    let newMonth, newYear;

    if (newMonthIndex > 11) {
      newMonth = months[0];
      newYear = currentYear + 1;
    } else {
      newMonth = months[newMonthIndex];
      newYear = currentYear;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);

    const today = new Date();
    if (today.getFullYear() === newYear && today.getMonth() === months.indexOf(newMonth)) {
      setSelectedDate(today.getDate());
      const filtered = calendarData.filter(x => {
        const d = normalizeDate(x.trainingDate);
        return (
          d.getFullYear() === newYear &&
          d.getMonth() === months.indexOf(newMonth) &&
          d.getDate() === today.getDate()
        );
      });
      setTasks(filtered);
      const anims = filtered.map(() => new Animated.Value(0));
      setTaskAnims(anims);
    } else {
      setSelectedDate(null);
      setTasks([]);
      setTaskAnims([]);
    }
  };

  // ✅ Use the drawer hook - Calendar is at index 4
  const {
    drawerVisible,
    selectedMenuItem,
    drawerSlideAnim,
    overlayOpacity,
    menuItemAnims,
    toggleDrawer,
    handleMenuItemPress,
  } = useDrawer(4);

  // ✅ Use the bottom nav hook
  const {
    selectedTab,
    tabScaleAnims,
    rotateAnims,
    handleTabPress
  } = useBottomNav('Calendar');

  // Animation values for PAGE CONTENT only
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const calendarAnim = useRef(new Animated.Value(0)).current;
  const [taskAnims, setTaskAnims] = useState([]);

  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Calendar data
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const generateCalendarDays = () => {
    const monthIndex = months.indexOf(currentMonth);
    const date = new Date(currentYear, monthIndex, 1);

    const firstDay = (date.getDay() + 6) % 7;
    const daysInMonth = new Date(currentYear, date.getMonth() + 1, 0).getDate();
    const prevMonthDays = new Date(currentYear, date.getMonth(), 0).getDate();

    const days = [];

    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({ day: prevMonthDays - i, isCurrentMonth: false });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const fullDate = new Date(currentYear, date.getMonth(), i);
      const event = calendarData.find(item => {
        const d = new Date(item.trainingDate);
        return (
          d.getDate() === fullDate.getDate() &&
          d.getMonth() === fullDate.getMonth() &&
          d.getFullYear() === fullDate.getFullYear()
        );
      });

      days.push({
        day: i,
        isCurrentMonth: true,
        hasEvent: !!event,
        eventType: event ? event.type.toLowerCase() : null,
      });
    }

    while (days.length < 42) {
      days.push({ day: days.length - (firstDay + daysInMonth) + 1, isCurrentMonth: false });
    }

    return days;
  };

  const [calendarDays, setCalendarDays] = useState([]);

  useEffect(() => {
    setCalendarDays(generateCalendarDays());
  }, [currentMonth, currentYear, calendarData]);

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
      Animated.spring(calendarAnim, {
        toValue: 1,
        tension: 40,
        friction: 7,
        useNativeDriver: true,
      }).start();
    }, 300);

    taskAnims.forEach((anim, index) => {
      setTimeout(() => {
        Animated.spring(anim, {
          toValue: 1,
          tension: 40,
          friction: 7,
          useNativeDriver: true,
        }).start();
      }, 600 + index * 150);
    });

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

  const getEventColor = (type) => {
    switch (type) {
      case 'classroom': return '#A855F7';
      case 'virtual': return '#FF6B6B';
      case 'self': return '#667eea';
      default: return '#667eea';
    }
  };

  useEffect(() => {
    if (!taskAnims || taskAnims.length === 0) return;

    taskAnims.forEach((anim, index) => {
      setTimeout(() => {
        Animated.spring(anim, {
          toValue: 1,
          tension: 40,
          friction: 7,
          useNativeDriver: true,
        }).start();
      }, 200 + index * 150);
    });
  }, [taskAnims]);

  const [userName, setUserName] = useState("");
  useEffect(() => {
    const loadUserName = async () => {
      try {
        const storedName = await AsyncStorage.getItem("name");
        if (storedName) {
          setUserName(storedName);
        }
      } catch (error) {
        console.log("Error fetching name:", error);
      }
    };

    loadUserName();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />

      <Animated.View style={[styles.mainContent, { opacity: fadeAnim }]}>
        {/* ✅ Universal Header Component */}
        <Header title="Calendar" onMenuPress={toggleDrawer} onNotificationPress={openNotification} />

        {/* Greeting Section */}
        <Animated.View
          style={[
            styles.greetingSection,
            { transform: [{ translateY: slideAnim }] }
          ]}
        >
          <LinearGradient
            colors={['rgba(123, 104, 238, 0.2)', 'rgba(123, 104, 238, 0.05)']}
            style={styles.greetingCard}
          >
            <Text style={styles.greetingText}>
              {getGreeting()}, {userName ? userName : "User"} ☀️
            </Text>
          </LinearGradient>
        </Animated.View>

        <ScrollView
          style={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Legend */}
          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#A855F7' }]} />
              <Text style={styles.legendText}>Classroom Training</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#FF6B6B' }]} />
              <Text style={styles.legendText}>Virtual Training</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#667eea' }]} />
              <Text style={styles.legendText}>Self Enroll</Text>
            </View>
          </View>

          {/* Calendar Card */}
          <Animated.View
            style={[
              styles.calendarCard,
              {
                opacity: calendarAnim,
                transform: [{
                  scale: calendarAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.9, 1],
                  })
                }]
              }
            ]}
          >
            <LinearGradient
              colors={['#fff', '#f8f9ff']}
              style={styles.calendarGradient}
            >
              {/* Month Header */}
              <View style={styles.monthHeader}>
                <TouchableOpacity style={styles.monthButton} onPress={handlePrevMonth}>
                  <Ionicons name="chevron-back" size={24} color="#7B68EE" />
                </TouchableOpacity>
                <View style={styles.monthTextContainer}>
                  <Text style={styles.monthText}>{currentMonth}</Text>
                  <Text style={styles.yearText}>🗓️ {currentYear}</Text>
                </View>
                <TouchableOpacity style={styles.monthButton} onPress={handleNextMonth}>
                  <Ionicons name="chevron-forward" size={24} color="#7B68EE" />
                </TouchableOpacity>
              </View>

              {/* Days of Week */}
              <View style={styles.daysOfWeekRow}>
                {daysOfWeek.map((day, index) => (
                  <View key={index} style={styles.dayOfWeekCell}>
                    <Text style={styles.dayOfWeekText}>{day}</Text>
                  </View>
                ))}
              </View>

              {/* Calendar Grid */}
              <View style={styles.calendarGrid}>
                {calendarDays.map((item, index) => {
                  const isSelected = item.day === selectedDate && item.isCurrentMonth;
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        if (!item.isCurrentMonth) return;

                        setSelectedDate(item.day);

                        const clickedYear = currentYear;
                        const clickedMonth = months.indexOf(currentMonth);
                        const clickedDay = item.day;

                        const filtered = calendarData.filter(x => {
                          const d = normalizeDate(x.trainingDate);
                          return (
                            d.getFullYear() === clickedYear &&
                            d.getMonth() === clickedMonth &&
                            d.getDate() === clickedDay
                          );
                        });

                        setTasks(filtered);

                        const newAnims = filtered.map(() => new Animated.Value(0));
                        setTaskAnims(newAnims);

                        newAnims.forEach((anim, idx) => {
                          setTimeout(() => {
                            Animated.spring(anim, {
                              toValue: 1,
                              tension: 40,
                              friction: 7,
                              useNativeDriver: true,
                            }).start();
                          }, 150 + idx * 120);
                        });
                      }}
                      style={styles.dayCell}
                      activeOpacity={0.7}
                    >
                      {isSelected ? (
                        <LinearGradient
                          colors={['#7B68EE', '#9D7FEA']}
                          style={styles.selectedDay}
                        >
                          <Text style={styles.selectedDayText}>{item.day}</Text>
                          {item.hasEvent && (
                            <View style={[styles.eventDot, { backgroundColor: '#fff' }]} />
                          )}
                        </LinearGradient>
                      ) : (
                        <View style={styles.dayContent}>
                          <Text
                            style={[
                              styles.dayText,
                              !item.isCurrentMonth && styles.inactiveDayText,
                            ]}
                          >
                            {item.day}
                          </Text>
                          {item.hasEvent && item.isCurrentMonth && (
                            <View style={[styles.eventDot, { backgroundColor: getEventColor(item.eventType) }]} />
                          )}
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </LinearGradient>
          </Animated.View>

          {/* Today's Tasks */}
          <View style={styles.tasksSection}>
            <Text style={styles.tasksSectionTitle}>
              {(() => {
                if (selectedDate === null) {
                  return "No date selected";
                }

                const today = new Date();
                const isToday =
                  selectedDate === today.getDate() &&
                  months.indexOf(currentMonth) === today.getMonth() &&
                  currentYear === today.getFullYear();

                return isToday
                  ? "Today's Tasks"
                  : `Tasks for ${selectedDate} ${currentMonth}`;
              })()}
            </Text>

            {tasks.length === 0 ? (
              <Text style={{ color: '#999', fontSize: 14, textAlign: 'center', marginTop: 10 }}>
                No trainings scheduled for this date.
              </Text>
            ) : (
              tasks.map((task, index) => {
                const scale = taskAnims[index]
                  ? taskAnims[index].interpolate({ inputRange: [0, 1], outputRange: [0.9, 1] })
                  : 1;
                const translateY = taskAnims[index]
                  ? taskAnims[index].interpolate({ inputRange: [0, 1], outputRange: [30, 0] })
                  : 0;
                const opacity = taskAnims[index] || 1;

                const typeColor = getEventColor(task.type?.toLowerCase());

                const dateObj = new Date(task.trainingDate);
                const dateStr = dateObj.toDateString();

                return (
                  <Animated.View
                    key={index}
                    style={[
                      styles.taskCard,
                      {
                        opacity,
                        transform: [{ scale }, { translateY }],
                      },
                    ]}
                  >
                    <LinearGradient
                      colors={[typeColor, '#7B68EE']}
                      style={styles.taskGradient}
                    >
                      <View style={styles.taskLeft}>
                        <Text style={styles.taskDate}>{dateObj.getDate()}</Text>
                        <Text style={{ color: '#fff', fontSize: 10 }}>{currentMonth.slice(0, 3)}</Text>
                      </View>

                      <View style={styles.taskMiddle}>
                        <FontAwesome5
                          name={task.type?.toLowerCase() === 'virtual' ? 'video' : 'chalkboard-teacher'}
                          size={16}
                          color="#fff"
                          style={styles.taskIcon}
                        />
                        <View style={styles.taskInfo}>
                          <Text style={styles.taskTitle}>{task.title}</Text>
                          <View style={styles.taskMeta}>
                            <Ionicons name="calendar" size={12} color="rgba(255,255,255,0.9)" />
                            <Text style={styles.taskMetaText}>{dateStr}</Text>
                          </View>
                        </View>
                      </View>

                      <TouchableOpacity style={styles.detailsBtn} onPress={() => {
                        setSelectedTask(task);
                        setModalVisible(true);
                      }}>
                        <Text style={styles.detailsBtnText}>Details</Text>
                      </TouchableOpacity>
                    </LinearGradient>
                  </Animated.View>
                );
              })
            )}
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>
      </Animated.View>

      {/* Modal */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {selectedTask && (
              <>
                <Text style={styles.modalTitle}>Training Session Details</Text>
                <Text style={styles.modalSubTitle}>{selectedTask.title}</Text>

                {(() => {
                  const start = new Date(selectedTask.trainingDate);
                  const end = new Date(start.getTime() + selectedTask.duration * 60000);

                  const formatTime = (d) =>
                    d.toLocaleString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    });

                  return (
                    <>
                      <Text style={styles.modalText}>
                        <Text style={styles.modalLabel}>Start: </Text>
                        {formatTime(start)}
                      </Text>
                      <Text style={styles.modalText}>
                        <Text style={styles.modalLabel}>End: </Text>
                        {formatTime(end)}
                      </Text>
                    </>
                  );
                })()}

                {selectedTask.trainerName && (
                  <Text style={styles.modalText}>
                    <Text style={styles.modalLabel}>Trainer: </Text>
                    {selectedTask.trainerName}
                  </Text>
                )}

                {selectedTask.location && (
                  <Text style={styles.modalText}>
                    <Text style={styles.modalLabel}>Location: </Text>
                    {selectedTask.location.trim()}
                  </Text>
                )}

                {selectedTask.venue && (
                  <Text style={styles.modalText}>
                    <Text style={styles.modalLabel}>Venue: </Text>
                    {selectedTask.venue.trim()}
                  </Text>
                )}

                <View style={styles.modalButtonRow}>
                  <Pressable
                    style={[styles.modalButton, { backgroundColor: '#7B68EE' }]}
                    onPress={() => {
                      setModalVisible(false);
                      navigation.navigate('TrainingDetails', {
                        trainingSessionId: selectedTask.trainingSessionId
                      });
                    }}
                  >
                    <Text style={styles.modalButtonText}>DETAILS</Text>
                  </Pressable>


                  <Pressable
                    style={[styles.modalButton, { backgroundColor: '#ccc' }]}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={[styles.modalButtonText, { color: '#000' }]}>CLOSE</Text>
                  </Pressable>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

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
  greetingSection: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  greetingCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(123, 104, 238, 0.3)',
  },
  greetingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  scrollContent: {
    flex: 1,
  },
  legendContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    flexWrap: 'wrap',
    gap: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 11,
    color: '#a8b2d1',
    fontWeight: '500',
  },
  calendarCard: {
    marginHorizontal: 20,
    marginBottom: 25,
    borderRadius: 20,
    elevation: 8,
    shadowColor: '#7B68EE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    overflow: 'hidden',
  },
  calendarGradient: {
    padding: 20,
  },
  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  monthButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthTextContainer: {
    alignItems: 'center',
  },
  monthText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D2D2D',
  },
  yearText: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  daysOfWeekRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  dayOfWeekCell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  dayOfWeekText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7B68EE',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    padding: 2,
  },
  selectedDay: {
    flex: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  selectedDayText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  dayContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    fontSize: 15,
    color: '#2D2D2D',
    fontWeight: '500',
  },
  inactiveDayText: {
    color: '#CCC',
  },
  eventDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 2,
  },
  tasksSection: {
    paddingHorizontal: 20,
  },
  tasksSectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  taskCard: {
    marginBottom: 15,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  taskGradient: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  taskLeft: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginRight: 12,
    minWidth: 55,
    alignItems: 'center',
  },
  taskDate: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 16,
  },
  taskMiddle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskIcon: {
    marginRight: 10,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  taskMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  taskMetaText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.9)',
  },
  detailsBtn: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  detailsBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 10,
    shadowColor: '#7B68EE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalSubTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7B68EE',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
  },
  modalLabel: {
    fontWeight: 'bold',
    color: '#1a1a2e',
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default CalendarScreen;

