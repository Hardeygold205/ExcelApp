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
    <View className="flex-1 justify-center items-center bg-sky-500">
      <StatusBar style="light" />
      <View>
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
        <Text
          style={{ fontFamily: "AlfaSlabOne_400Regular", fontSize: "45px" }}
          className="text-white font-bold text-center text-4xl">
          ExcelExchange
        </Text>
        {!isImageLoaded && <ActivityIndicator size="large" color="#0000ff" />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 90,
    height: 90,
    resizeMode: "contain",
    alignSelf: "center",
  },
});
