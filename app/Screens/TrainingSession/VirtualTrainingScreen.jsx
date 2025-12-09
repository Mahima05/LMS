
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
                            <Text allowFontScaling={false} style={styles.headerTitle}>Training Details</Text>
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
                                    <Text allowFontScaling={false} style={styles.detailLabel}>Training Name:</Text>
                                    <Text allowFontScaling={false} style={styles.detailValue}>COE Self Training Session</Text>
                                </View>

                                <View style={styles.detailRow}>
                                    <Text allowFontScaling={false} style={styles.detailLabel}>Course Name:</Text>
                                    <Text allowFontScaling={false} style={styles.detailValue}>Online Course</Text>
                                </View>

                                <View style={styles.detailRow}>
                                    <Text allowFontScaling={false} style={styles.detailLabel}>Training Date:</Text>
                                    <Text allowFontScaling={false} style={styles.detailValue}>Nov 21, 2024</Text>
                                </View>

                                <View style={styles.detailRow}>
                                    <Text allowFontScaling={false} style={styles.detailLabel}>Training Time:</Text>
                                    <Text allowFontScaling={false} style={styles.detailValue}>12:00 AM</Text>
                                </View>

                                <View style={styles.detailRow}>
                                    <Text allowFontScaling={false} style={styles.detailLabel}>Training Mode:</Text>
                                    <Text allowFontScaling={false} style={styles.detailValue}>Online</Text>
                                </View>

                                <View style={styles.detailRow}>
                                    <Text allowFontScaling={false} style={styles.detailLabel}>Session Link:</Text>
                                    <Text allowFontScaling={false} style={styles.detailValueBlue}>https://www.figma.com</Text>
                                </View>

                                <View style={styles.detailRow}>
                                    <Text allowFontScaling={false} style={styles.detailLabel}>Session Id:</Text>
                                    <Text allowFontScaling={false} style={styles.detailValueBlue}>4923749</Text>
                                </View>

                                <View style={styles.detailRow}>
                                    <Text allowFontScaling={false} style={styles.detailLabel}>Session Password:</Text>
                                    <Text allowFontScaling={false} style={styles.detailValueBlue}>hD**g#gop</Text>
                                </View>

                                <View style={styles.detailRow}>
                                    <Text allowFontScaling={false} style={styles.detailLabel}>Trainer Name:</Text>
                                    <Text allowFontScaling={false} style={styles.detailValue}>Usama Sir</Text>
                                </View>

                                <View style={styles.detailRow}>
                                    <Text allowFontScaling={false} style={styles.detailLabel}>Is Mandatory:</Text>
                                    <Text allowFontScaling={false} style={styles.detailValue}>Yes</Text>
                                </View>

                                <View style={styles.detailRow}>
                                    <Text allowFontScaling={false} style={styles.detailLabel}>Certificate Status:</Text>
                                    <View style={styles.inactiveTag}>
                                        <Text allowFontScaling={false} style={styles.inactiveText}>Inactive</Text>
                                    </View>
                                </View>

                                {/* Action Buttons */}
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity style={styles.actionButton}>
                                        <LinearGradient
                                            colors={['#6B7FD7', '#5A4D8F']}
                                            style={styles.buttonGradient}
                                        >
                                            <Text allowFontScaling={false} style={styles.buttonText}>Pre-Assessment</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.actionButton}>
                                        <LinearGradient
                                            colors={['#6B7FD7', '#5A4D8F']}
                                            style={styles.buttonGradient}
                                        >
                                            <Text allowFontScaling={false} style={styles.buttonText}>Post-Assessment</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>

                                <TouchableOpacity style={styles.feedbackButton}>
                                    <LinearGradient
                                        colors={['#6B7FD7', '#5A4D8F']}
                                        style={styles.feedbackGradient}
                                    >
                                        <Text allowFontScaling={false} style={styles.feedbackText}>Fill Feedback</Text>
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