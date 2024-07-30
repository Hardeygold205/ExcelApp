import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import splash from "../assets/splash.png";
import { StatusBar } from "expo-status-bar";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export default function SplashScreenUi() {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(
      withTiming(1.1, {
        duration: 1500,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );
  }, [scale]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handleImageError = () => {
    console.error("failed to load image");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.innerContainer}>
        <Animated.View style={animatedStyle}>
          <ImageBackground
            onLoad={() => {
              setIsImageLoaded(true);
            }}
            onError={handleImageError}
            style={styles.image}
            source={splash}
          />
        </Animated.View>
        <Text style={styles.text}>ExcelExchange</Text>
        {!isImageLoaded && <ActivityIndicator size="large" color="#0000ff" />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0ea5e9",
  },
  innerContainer: {
    alignItems: "center",
  },
  image: {
    width: 90,
    height: 90,
    resizeMode: "contain",
    alignSelf: "center",
  },
  text: {
    fontFamily: "AlfaSlabOne_400Regular",
    fontSize: 45,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});