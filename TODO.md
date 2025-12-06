# TODO: Implement Dynamic Microlearning Banners and Screen

## 1. Update DashboardScreen.jsx
- [ ] Add state for microlearning banners
- [ ] Fetch microlearning data from API on component mount
- [ ] Replace hardcoded bannerAds with dynamic data
- [ ] Handle banner press to navigate to MicroLearningScreen with params
- [ ] Update pagination dots based on dynamic data length

## 2. Create MicroLearningScreen.jsx
- [ ] Create new file app/Screens/MicroLearning/MicroLearningScreen.jsx
- [ ] Implement header with back and notification using common components
- [ ] Add WebView for content display (handle video, pdf, text, image)
- [ ] Implement timer logic: start on focus, track time spent
- [ ] Post to API when timeSpent >= durationInSeconds + 1

## 3. Update AppNavigator.tsx
- [ ] Import MicroLearningScreen
- [ ] Add screen to Stack.Navigator

## 4. Testing
- [ ] Test API fetch and banner display
- [ ] Test navigation to MicroLearningScreen
- [ ] Test content display in WebView
- [ ] Test timer and API post on completion
