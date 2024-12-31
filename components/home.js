// components/home.js
import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated, Text, Dimensions } from 'react-native';

const Home = () => {
  const fadeAnimGif = useRef(new Animated.Value(0)).current; // Initial opacity: 0 for GIF
  const fadeAnimAspire = useRef(new Animated.Value(0)).current; // Initial opacity: 0 for ASPIRE
  const fadeAnimToInspire = useRef(new Animated.Value(0)).current; // Initial opacity: 0 for TO INSPIRE

  useEffect(() => {
    // Fade in the GIF, ASPIRE, and TO INSPIRE sequentially
    Animated.sequence([
      Animated.timing(fadeAnimGif, {
        toValue: 1,
        duration: 1500, // 1.5 seconds for GIF fade-in
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(fadeAnimAspire, {
          toValue: 1,
          duration: 1500, // 1.5 seconds for ASPIRE fade-in
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnimToInspire, {
          toValue: 1,
          duration: 1500, // 1.5 seconds for TO INSPIRE fade-in
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [fadeAnimGif, fadeAnimAspire, fadeAnimToInspire]);

  return (
    <View style={styles.container}>
      {/* Centered Animated GIF */}
      <Animated.Image
        source={require('../assets/loading/MK.gif')}
        style={[styles.gif, { opacity: fadeAnimGif }]}
        resizeMode="contain"
        accessibilityLabel="Maicol&Co Loading Animation"
      />

      {/* Brutalism Styled ASPIRE */}
      <Animated.Text
        style={[styles.aspireText, { opacity: fadeAnimAspire }]}
      >
        ASPIRE
      </Animated.Text>

      {/* Brutalism Styled TO INSPIRE */}
      <Animated.Text
        style={[styles.toInspireText, { opacity: fadeAnimToInspire }]}
      >
        TO INSPIRE
      </Animated.Text>
    </View>
  );
};

const { height, width } = Dimensions.get('window'); // Get screen dimensions

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    backgroundColor: '#FFFFFF',
  },
  gif: {
    width: '70%', // Fill 70% of the screen width
    height: '70%', // Fill 70% of the screen height
  },
  aspireText: {
    position: 'absolute',
    left: -98, // Move further to the left
    top: height * 0.15, // Adjust to position vertically
    transform: [{ rotate: '-90deg' }], // Rotate text
    fontSize: 60, // Larger brutalist font size
    fontWeight: 'bold',
    color: '#2d3436',
    letterSpacing: 6, // Add spacing for brutalism effect
  },
  toInspireText: {
    position: 'absolute',
    right: -165, // Shift closer to the screen's right edge
    bottom: 200, // Move higher up for better alignment
    transform: [{ rotate: '90deg' }], // Rotate text to match aesthetic
    fontSize: 60, // Larger brutalist font size
    fontWeight: 'bold',
    color: '#2d3436',
    letterSpacing: 6, // Add spacing for brutalism effect
    textAlign: 'right',
  },
});

export default Home;
