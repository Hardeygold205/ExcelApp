import React, { useEffect, useState } from "react";
import {
  Text,
  Image,
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
  FlipInEasyX,
  StretchInX,
  StretchInY,
} from "react-native-reanimated";
import axios from "axios";
import { saveToken } from "../utils/auth";
import { ActivityIndicator } from "react-native-paper";

export default function Signup() {
  const navigation = useNavigation();
  const [loaded, setLoaded] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [secureText, setSecureText] = useState(true);

  const togglePasswordVisibility = () => {
    setSecureText(!secureText);
  };

  const validateFirstName = (firstname) => {
    if (!firstname) {
      return "Firstname is required";
    } else if (firstname.length < 3) {
      return "Name must be at least 3 characters";
    }
    return "";
  };

  const validateLastName = (lastname) => {
    if (!lastname) {
      return "Lastname is required";
    } else if (lastname.length < 3) {
      return "Name must be at least 3 characters";
    } else if (firstname === lastname) {
      return "Firstname and lastname cannot be the same";
    }
    return "";
  };

  const validateUsername = (username) => {
    if (!username) {
      return "Username is required";
    } else if (username.length < 3) {
      return "Username must be at least 3 characters";
    }
    return "";
  };

  const validateEmail = (email) => {
    if (!email) {
      return "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      return "Email address is invalid";
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

  const handleSignup = async () => {
    const firstnameError = validateFirstName(firstname);
    const lastnameError = validateLastName(lastname);
    const usernameError = validateUsername(username);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);


    if (usernameError || emailError || passwordError) {
      setErrors({
        firstname: firstnameError,
        lastname: lastnameError,
        username: usernameError,
        email: emailError,
        password: passwordError,
      });
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post("http://172.20.10.3:5005/api/signup", {
        username,
        firstname,
        lastname,
        email,
        password,
      });
      console.log("Signup response:", response.data);

      await saveToken(response.data.token);
      console.log("Saved token:", response.data.token);

      navigation.replace("OnBoardScreen");
    } catch (error) {
      console.error("Signup error:", error);
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

  const handleFirstNameChange = (value) => {
    setFirstname(value);
    const firstnameError = validateFirstName(value);
    setErrors((prevErrors) => ({ ...prevErrors, firstname: firstnameError }));
  };
  const handleLastNameChange = (value) => {
    setLastname(value);
    const lastnameError = validateLastName(value);
    setErrors((prevErrors) => ({ ...prevErrors, lastname: lastnameError }));
  };
  const handleUsernameChange = (value) => {
    setUsername(value);
    const usernameError = validateUsername(value);
    setErrors((prevErrors) => ({ ...prevErrors, username: usernameError }));
  };

  const handleEmailChange = (value) => {
    setEmail(value);
    const emailError = validateEmail(value);
    setErrors((prevErrors) => ({ ...prevErrors, email: emailError }));
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
          entering={FadeInUp.delay(100).damping(5).springify().duration(3000)}
          className="flex-row justify-around w-full absolute">
          <ImageBackground className="h-[225] w-[90]" source={light} />
          <ImageBackground className="h-[160] w-[65]" source={light} />
        </Animated.View>
      )}
      {loaded && (
        <>
          <View className="flex items-center absolute top-1/3 left-1/3">
            <Text className="text-5xl font-bold text-white tracking-wider">
              Signup
            </Text>
          </View>
          <View className="flex w-full h-full justify-center top-48 ">
            <View className="flex items-center mx-4 space-y-4">
              <View className="flex-row w-full justify-between gap-x-1">
                <Animated.View
                  entering={StretchInX.delay(100).duration(200)}
                  className="w-1/2">
                  <TextInput
                    value={firstname}
                    onChangeText={handleFirstNameChange}
                    placeholder="Firstname"
                    placeholderTextColor={"gray"}
                    className={
                      errors.firstname
                        ? "border border-red-500 p-5 rounded-2xl"
                        : "p-5 border border-sky-600 bg-black/5 rounded-2xl"
                    }
                  />
                  {errors.firstname && (
                    <Text className="mb-[-10px]" style={styles.errorText}>
                      {errors.firstname}
                    </Text>
                  )}
                </Animated.View>
                <Animated.View
                  entering={StretchInX.delay(100).duration(200)}
                  className="w-1/2">
                  <TextInput
                    value={lastname}
                    onChangeText={handleLastNameChange}
                    placeholder="Lastname"
                    placeholderTextColor={"gray"}
                    className={
                      errors.lastname
                        ? "border border-red-500 p-5 rounded-2xl"
                        : "p-5 border border-sky-600 bg-black/5 rounded-2xl"
                    }
                  />
                  {errors.lastname && (
                    <Text className="mb-[-10px]" style={styles.errorText}>
                      {errors.lastname}
                    </Text>
                  )}
                </Animated.View>
              </View>
              <Animated.View
                entering={StretchInX.delay(100).duration(200)}
                className="w-full">
                <TextInput
                  value={username}
                  onChangeText={handleUsernameChange}
                  placeholder="Username"
                  placeholderTextColor={"gray"}
                  className={
                    errors.username
                      ? "border border-red-500 p-5 rounded-2xl"
                      : "p-5 border border-sky-600 bg-black/5 rounded-2xl"
                  }
                />
                {errors.username && (
                  <Text className="mb-[-10px]" style={styles.errorText}>
                    {errors.username}
                  </Text>
                )}
              </Animated.View>
              <Animated.View
                entering={StretchInX.delay(100).duration(200)}
                className="w-full">
                <TextInput
                  value={email}
                  onChangeText={handleEmailChange}
                  placeholder="Email"
                  placeholderTextColor={"gray"}
                  className={
                    errors.email
                      ? "border border-red-500 p-5 rounded-2xl"
                      : "p-5 border border-sky-600 bg-black/5 rounded-2xl"
                  }
                />
                {errors.email && (
                  <Text className="mb-[-10px]" style={styles.errorText}>
                    {errors.email}
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
                  onPress={handleSignup}
                  disabled={isLoading}
                  className="bg-sky-500 p-3 rounded-2xl w-full">
                  {isLoading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text className="text-white font-bold text-center text-xl">
                      Signup
                    </Text>
                  )}
                </TouchableOpacity>
              </Animated.View>
              <Text style={styles.errorText}>{message}</Text>
              <View className="w-full items-center flex-row justify-center">
                <View className="flex-1 h-[1px] bg-gray-300" />
                <Text className="text-xl text-gray-500 mx-3">OR</Text>
                <View className="flex-1 h-[1px] bg-gray-300" />
              </View>
              <Animated.View
                entering={FlipInEasyX.delay(200).duration(400)}
                className="w-full flex-row justify-center items-center gap-1">
                <TouchableOpacity className="flex-1 justify-center items-center h-[43] flex-row bg-white border border-2xl rounded-2xl">
                  <Image
                    className="h-[30] w-[30]"
                    source={require("../assets/google.png")}
                  />
                  <Text className="text-xl text-black font-bold ml-2">
                    Google
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 justify-center items-center h-[43] flex-row bg-white border border-2xl rounded-2xl">
                  <Image
                    className="h-[30] w-[30]"
                    source={require("../assets/apple-logo.png")}
                  />
                  <Text className="text-xl text-black font-bold ml-2">
                    Apple
                  </Text>
                </TouchableOpacity>
              </Animated.View>
              <View className="w-full flex-row justify-center align-items-center ">
                <Text className="text-xl ">Already have an account?</Text>
                <TouchableOpacity
                  className=""
                  onPress={() => navigation.push("Login")}>
                  <Text className="text-sky-500 font-bold text-xl">Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </>
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
    fontSize: 10,
  },
});
