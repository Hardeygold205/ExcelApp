import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Dimensions,
  Platform
} from "react-native";
import { TextInput } from "react-native-paper";
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
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <ImageBackground
        style={styles.backgroundImage}
        source={background}
      />
      {loaded && (
        <>
          <Animated.View
            entering={FadeInUp.delay(100)
              .damping(3)
              .springify(1)
              .duration(3000)}
            style={styles.animatedContainer}>
            <ImageBackground
              style={styles.lightImage1}
              source={light} 
            />
            <ImageBackground
              style={styles.lightImage2}
              source={light}
            />
          </Animated.View>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Login</Text>
          </View>
        </>
      )}
      {loaded && (
        <ScrollView style={styles.scrollView}>
          <View style={styles.formContainer}>
            <Animated.View
              entering={StretchInX.delay(100).duration(200)}
              style={styles.inputContainer}>
              <TextInput
                value={emailOrUsername}
                onChangeText={handleEmailOrUsernameChange}
                placeholderTextColor={"gray"}
                label="Email or username"
                mode="outlined"
                activeOutlineColor="#42a5f5"
                style={styles.input}
                error={errors.emailOrUsername ? true : false}
              />
              {errors.emailOrUsername && (
                <Text style={styles.errorText}>{errors.emailOrUsername}</Text>
              )}
            </Animated.View>
            <Animated.View
              entering={StretchInX.delay(100).duration(200)}
              style={[styles.inputContainer, styles.passwordContainer]}>
              <TextInput
                label="Password"
                value={password}
                onChangeText={handlePasswordChange}
                placeholderTextColor={"gray"}
                mode="outlined"
                activeOutlineColor="#42a5f5"
                secureTextEntry={secureText}
                right={
                  <Icon
                    onPress={togglePasswordVisibility}
                    icon={secureText ? "eye-off" : "eye"}
                  />
                }
                style={styles.input}
                error={errors.password ? true : false}
              />
              {errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </Animated.View>
            <Animated.View
              entering={StretchInY.delay(100).duration(200)}
              style={styles.inputContainer}>
              <TouchableOpacity
                onPress={handleLogin}
                disabled={isLoading}
                style={styles.loginButton}>
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.loginButtonText}>Login</Text>
                )}
              </TouchableOpacity>
            </Animated.View>
            <Text style={styles.errorText}>{message}</Text>
            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.push("Signup")}>
                <Text style={styles.signupButtonText}>Signup</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "white",
    height: "100%",
    width: "100%",
  },
  backgroundImage: {
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  animatedContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    position: "absolute",
  },
  lightImage1: {
    height: 225,
    width: 90,
  },
  lightImage2: {
    height: 160,
    width: 65,
  },
  titleContainer: {
    marginTop: width * 0.4,
    alignItems: "center",
    ...Platform.select({
      web: {
        marginTop: width * 0.1
      }
    })
  },
  titleText: {
    fontSize: 50,
    fontWeight: "bold",
    color: "white",
    letterSpacing: 2,
  },
  scrollView: {
    width: "100%",
    paddingBottom: 10,
  },
  formContainer: {
    flex: 1,
    marginTop: width * 0.4,
    alignItems: "center",
    marginHorizontal: 16,
    spaceY: 4,
    ...Platform.select({
      web: {
        marginTop: width * 0.2
      }
    })
  },
  inputContainer: {
    width: "100%",
    marginBottom: 16,
  },
  passwordContainer: {
    marginBottom: 20,
  },
  errorText: {
    color: "red",
    fontSize: 10,
    marginTop: 1,
  },
  loginButton: {
    backgroundColor: "#0ea5e9",
    padding: 16,
    borderRadius: 16,
    width: "100%",
    alignItems: "center",
  },
  loginButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  signupContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  signupText: {
    fontSize: 20,
  },
  signupButtonText: {
    color: "#0ea5e9",
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 8,
  },
});