import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base dimensions (design reference - e.g., iPhone 11 or common Android)
const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

// Responsive font size function
export const RFValue = (fontSize, baseWidth = BASE_WIDTH) => {
  const scale = SCREEN_WIDTH / baseWidth;
  const newSize = fontSize * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

// Get responsive width/height
export const widthPercentage = (percentage) => {
  return (SCREEN_WIDTH * percentage) / 100;
};

export const heightPercentage = (percentage) => {
  return (SCREEN_HEIGHT * percentage) / 100;
};
