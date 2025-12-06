// import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';
// import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';

// const bottomTabs = [
//   { name: 'Sessions', icon: 'calendar', type: 'FontAwesome5' },
//   { name: 'Dashboard', icon: 'widgets', type: 'MaterialIcons' }, // ⭐
//   { name: 'Calendar', icon: 'calendar-alt', type: 'FontAwesome5' },
// ];

// const BottomNavigation = ({
//   selectedTab,
//   tabScaleAnims,
//   rotateAnims,
//   handleTabPress,
//   navigation,
// }) => {
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

//   return (
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
//               onPress={() => handleTabPress(index, tab.name, navigation)}
//               activeOpacity={0.8}
//               style={[styles.tab, index === 1 && styles.centerTab]}
//             >
//               <Animated.View
//                 style={[
//                   styles.tabIconContainer,
//                   {
//                     transform: [{ scale: tabScaleAnims[index] }, { rotate: rotation }],
//                   },
//                 ]}
//               >
//                 {isActive && (
//                   <LinearGradient
//                     colors={['#667eea', '#764ba2']}
//                     style={styles.centerTabBg}
//                   />
//                 )}
//                 {renderIcon(tab, isActive, index === 1 ? 28 : 24)}
//               </Animated.View>
//             </TouchableOpacity>
//           );
//         })}
//       </LinearGradient>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
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
// });

// export default BottomNavigation;


import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const bottomTabs = [
  { name: 'Sessions', icon: 'calendar', type: 'FontAwesome5' },
  { name: 'Dashboard', icon: 'widgets', type: 'MaterialIcons' },
  { name: 'Calendar', icon: 'calendar-alt', type: 'FontAwesome5' },
];

const BottomNavigation = ({
  selectedTab,
  tabScaleAnims,
  rotateAnims,
  handleTabPress,
  navigation,
}) => {
  const insets = useSafeAreaInsets();

  // Dynamic bottom padding: only applies if navigation bar exists (buttons mode)
  // If insets.bottom is 0, user has gesture navigation - no padding needed
  // If insets.bottom > 0, user has button navigation - apply padding
  const dynamicBottomPadding = insets.bottom > 0 ? insets.bottom : 0;

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

  return (
    <View style={[styles.bottomNavContainer, { paddingBottom: dynamicBottomPadding }]}>
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
              onPress={() => handleTabPress(index, tab.name, navigation)}
              activeOpacity={0.8}
              style={[styles.tab, index === 1 && styles.centerTab]}
            >
              <Animated.View
                style={[
                  styles.tabIconContainer,
                  { transform: [{ scale: tabScaleAnims[index] }, { rotate: rotation }] },
                ]}
              >
                {isActive && (
                  <LinearGradient
                    colors={['#667eea', '#764ba2']}
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

const styles = StyleSheet.create({
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

export default BottomNavigation;
