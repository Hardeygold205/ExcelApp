import React, { useEffect, useState, useRef } from "react";
import {
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  SplashScreenUi,
  Login,
  Signup,
  OnBoardScreen,
  PinLogin,
  SetPin,
  ValueSecurity,
  ResetPin,
  VerifyOldPin,
} from "./screen";
import Welcome from "./navigations/Welcome";
import EditProfile from "./navigations/screens/EditProfile";
import Home from "./navigations/screens/Home";
import Wallet from "./navigations/screens/Wallet";
import Market from "./navigations/screens/Market";
import Trade from "./navigations/screens/Trade";
import ResetOrSetpin from "./navigations/screens/ResetOrSetpin";
import { getToken } from "./utils/auth";
import { getPin } from "./utils/PinStorage";
import { Inter_400Regular } from "@expo-google-fonts/inter";
import { Roboto_400Regular } from "@expo-google-fonts/roboto";
import { Poppins_400Regular } from "@expo-google-fonts/poppins";
import { RobotoMono_400Regular } from "@expo-google-fonts/roboto-mono";
import { useFonts } from "expo-font";
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import axios from "axios";

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

const cacheImages = (images) => {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
};

const loadResources = async () => {
  const imageAssets = cacheImages([
    require("./assets/allcoin.png"),
    require("./assets/apple-logo.png"),
    require("./assets/background.png"),
    require("./assets/fastpay.png"),
    require("./assets/google.png"),
    require("./assets/light.png"),
    require("./assets/onboard1.webp"),
    require("./assets/Payment-Gate.png"),
    require("./assets/payment-gateway.png"),
    require("./assets/splash.png"),
    require("./assets/weValue.webp"),
    require("./assets/joinFulture.png"),
    require("./assets/fastpay2.png"),
  ]);

  await Promise.all([...imageAssets]);
};

export default function App() {
  const [isShowSplashScreen, setIsShowSplashScreen] = useState(true);
  const navigationRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Roboto_400Regular,
    Poppins_400Regular,
    RobotoMono_400Regular,
  });

  useEffect(() => {
    const prepareResources = async () => {
      try {
        await loadResources();
        if (fontsLoaded && !fontError) {
          await SplashScreen.hideAsync();
          setIsReady(true);
        }
      } catch (error) {
        console.warn(error);
      }
    };

    prepareResources();
  }, [fontsLoaded]);

  useEffect(() => {
    const checkUserToken = async () => {
      try {
        const token = await getToken();

        let userId;
        let storedPin = null;

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          "http://172.20.10.3:5005/api/user/me",
          config
        );

        if (response.data) {
          userId = response.data.userId;
          console.log("UserId retrieved in App.js:", userId);

          if (userId) {
            storedPin = await getPin(userId);
            console.log("Pin retrieved in App.js:", storedPin);
          } else {
            console.error("No userId in token");
          }
        }

        setTimeout(() => {
          setIsShowSplashScreen(false);
          if (token && userId) {
            if (storedPin) {
              console.log("Navigating to PinLogin");
              navigationRef.current?.reset({
                index: 0,
                routes: [{ name: "PinLogin" }],
              });
            } else if (!storedPin) {
              console.log("Navigating to SetPin");
              navigationRef.current?.reset({
                index: 0,
                routes: [{ name: "SetPin" }],
              });
            } else {
              console.log("Navigating to Welcome");
              navigationRef.current?.reset({
                index: 0,
                routes: [{ name: "Welcome" }],
              });
            }
          } else {
            console.log("Navigating to Login");
            navigationRef.current?.reset({
              index: 0,
              routes: [{ name: "Login" }],
            });
          }
        }, 3000);
      } catch (error) {
        setIsShowSplashScreen(false);
        console.log("Navigating to Login");
        navigationRef.current?.navigate("Login");
      }
    };

    if (isReady) {
      checkUserToken();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  if (!isReady || (!fontsLoaded && !fontError)) {
    return (
      <AppLoading
        startAsync={loadResources}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1 }}>
        <NavigationContainer ref={navigationRef}>
          <StatusBar style="light" />
          <Stack.Navigator initialRouteName="SplashScreenUi">
            {isShowSplashScreen ? (
              <Stack.Screen
                name="SplashScreenUi"
                component={SplashScreenUi}
                options={{ headerShown: false }}
              />
            ) : (
              <>
                <Stack.Screen
                  name="Welcome"
                  component={Welcome}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Login"
                  component={Login}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Signup"
                  component={Signup}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Home"
                  component={Home}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Wallet"
                  component={Wallet}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Market"
                  component={Market}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Trade"
                  component={Trade}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="EditProfile"
                  component={EditProfile}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="OnBoardScreen"
                  component={OnBoardScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="ValueSecurity"
                  component={ValueSecurity}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="PinLogin"
                  component={PinLogin}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="SetPin"
                  component={SetPin}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="ResetPin"
                  component={ResetPin}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="ResetOrSetPin"
                  component={ResetOrSetpin}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="VerifyOldPin"
                  component={VerifyOldPin}
                  options={{ headerShown: false }}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </TouchableWithoutFeedback>
  );
}
