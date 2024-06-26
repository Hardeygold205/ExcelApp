import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import background from "../assets/background.png";
import light from "../assets/light.png";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  FadeInUp,
  StretchInX,
  StretchInY,
} from "react-native-reanimated";
import axios from "axios";
import { saveToken } from "../utils/auth";
import { getPin } from "../utils/PinStorage";
import { ActivityIndicator } from "react-native-paper";

export default function Login() {
  const navigation = useNavigation();
  const [loaded, setLoaded] = useState(false);
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [secureText, setSecureText] = useState(true);

  const togglePasswordVisibility = () => {
    setSecureText(!secureText);
  };

  const validateEmailOrUsername = (emailOrUsername) => {
    if (!emailOrUsername) {
      return "Email or Username is required";
    }
    return "";
  };

  const validatePassword = (password) => {
    if (!password) {
      return "Password is required";
    } else if (password.length < 6) {
      return "Password must be at least 6 characters";
    }
    return "";
  };

  const handleLogin = async () => {
    const emailError = validateEmailOrUsername(emailOrUsername);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setErrors({ emailOrUsername: emailError, password: passwordError });
      return;
    }
    setIsLoading(true);
    setMessage("");
    try {
      const response = await axios.post("http://172.20.10.3:5005/api/login", {
        emailOrUsername,
        password,
      });
      const token = response.data.token;
      await saveToken(token);

      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const userId = decodedToken.userId;

      const storedPin = await getPin(userId);

      if (storedPin) {
        console.log("Navigating to PinLogin");
        navigation.reset({
          index: 0,
          routes: [{ name: "PinLogin" }],
        });
      } else {
        console.log("Navigating to Welcome");
        navigation.reset({
          index: 0,
          routes: [{ name: "Welcome" }],
        });
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Internal server error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleEmailOrUsernameChange = (value) => {
    setEmailOrUsername(value);
    const emailError = validateEmailOrUsername(value);
    setErrors((prevErrors) => ({ ...prevErrors, emailOrUsername: emailError }));
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    const passwordError = validatePassword(value);
    setErrors((prevErrors) => ({ ...prevErrors, password: passwordError }));
  };

  return (
    <SafeAreaView className="bg-white h-full w-full">
      <StatusBar style="light" />
      <ImageBackground
        className="absolute h-full w-full"
        source={background}
        style={styles.background}
      />
      {loaded && (
        <Animated.View
          entering={FadeInUp.delay(100).damping(3).springify(1).duration(3000)}
          className="flex-row justify-around w-full absolute">
          <ImageBackground className="h-[225] w-[90]" source={light} />
          <ImageBackground className="h-[160] w-[65]" source={light} />
        </Animated.View>
      )}
      {loaded && (
        <View className="flex justify-around w-full h-full pt-36 pb-10">
          <View className="flex items-center">
            <Text className="text-5xl font-bold text-white tracking-wider">
              Login
            </Text>
          </View>
          <View className="flex items-center mx-4 space-y-4">
            <Animated.View
              entering={StretchInX.delay(100).duration(200)}
              className="w-full">
              <TextInput
                value={emailOrUsername}
                onChangeText={handleEmailOrUsernameChange}
                placeholder="Email or username"
                placeholderTextColor={"gray"}
                className={
                  errors.emailOrUsername
                    ? "border border-red-500 p-5 rounded-2xl"
                    : "p-5 border border-sky-600 bg-black/5 rounded-2xl"
                }
              />
              {errors.emailOrUsername && (
                <Text className="mb-[-10px]" style={styles.errorText}>
                  {errors.emailOrUsername}
                </Text>
              )}
            </Animated.View>
            <Animated.View
              entering={StretchInX.delay(100).duration(200)}
              className="w-full mb-3">
              <View className="relative">
                <TextInput
                  value={password}
                  onChangeText={handlePasswordChange}
                  placeholder="password"
                  secureTextEntry={secureText}
                  placeholderTextColor={"gray"}
                  className={
                    errors.password
                      ? "border border-red-500 p-5 rounded-2xl"
                      : "p-5 border border-sky-600 bg-black/5 rounded-2xl"
                  }
                />
                <TouchableOpacity
                  className="absolute right-5 top-4"
                  onPress={togglePasswordVisibility}>
                  <Icon
                    name={secureText ? "eye-off" : "eye"}
                    size={24}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>
              {errors.password && (
                <Text className="mb-[-10px]" style={styles.errorText}>
                  {errors.password}
                </Text>
              )}
            </Animated.View>
            <Animated.View
              entering={StretchInY.delay(100).duration(200)}
              className="w-full">
              <TouchableOpacity
                onPress={handleLogin}
                disabled={isLoading}
                className="bg-sky-500 p-3 rounded-2xl w-full mb-3">
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text className="text-white font-bold text-center text-xl">
                    Login
                  </Text>
                )}
              </TouchableOpacity>
            </Animated.View>
            <Text style={styles.errorText}>{message}</Text>
            <View className="w-full flex-row justify-center">
              <Text className="text-xl">Don't have an account?</Text>
              <TouchableOpacity
                className=""
                onPress={() => navigation.push("Signup")}>
                <Text className="text-sky-500 font-bold text-xl">Signup</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});
