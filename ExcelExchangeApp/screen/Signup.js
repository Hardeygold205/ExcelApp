import React, { useEffect, useState } from "react";
import {
  Text,
  Image,
  View,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Dimensions,
  Platform,
} from "react-native";
import { TextInput } from "react-native-paper";
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
    setMessage("");
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
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <ImageBackground
        style={styles.backgroundImage}
        source={background} 
      />
      {loaded && (
        <>
          <Animated.View
            entering={FadeInUp.delay(100).damping(5).springify().duration(3000)}
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
            <Text style={styles.titleText}>Signup</Text>
          </View>
        </>
      )}
      {loaded && (
        <ScrollView style={styles.scrollView}>
          <View style={styles.formContainer}>
            <View style={styles.inputRow}>
              <Animated.View
                entering={StretchInX.delay(100).duration(200)}
                style={styles.inputContainer}>
                <TextInput
                  value={firstname}
                  onChangeText={handleFirstNameChange}
                  placeholderTextColor={"gray"}
                  label="Firstname"
                  mode="outlined"
                  activeOutlineColor="#42a5f5"
                  style={styles.input}
                  error={errors.firstname ? true : false}
                />
                {errors.firstname && (
                  <Text style={styles.errorText}>{errors.firstname}</Text>
                )}
              </Animated.View>
              <Animated.View
                entering={StretchInX.delay(100).duration(200)}
                style={styles.inputContainer}>
                <TextInput
                  value={lastname}
                  onChangeText={handleLastNameChange}
                  placeholderTextColor={"gray"}
                  label="Lastname"
                  mode="outlined"
                  activeOutlineColor="#42a5f5"
                  style={styles.input}
                  error={errors.lastname ? true : false}
                />
                {errors.lastname && (
                  <Text style={styles.errorText}>{errors.lastname}</Text>
                )}
              </Animated.View>
            </View>
            <Animated.View
              entering={StretchInX.delay(100).duration(200)}
              style={styles.fullWidthInputContainer}>
              <TextInput
                value={username}
                onChangeText={handleUsernameChange}
                label="Username"
                mode="outlined"
                activeOutlineColor="#42a5f5"
                style={styles.input}
                error={errors.username ? true : false}
              />
              {errors.username && (
                <Text style={styles.errorText}>{errors.username}</Text>
              )}
            </Animated.View>
            <Animated.View
              entering={StretchInX.delay(100).duration(200)}
              style={styles.fullWidthInputContainer}>
              <TextInput
                value={email}
                onChangeText={handleEmailChange}
                label="Email"
                mode="outlined"
                activeOutlineColor="#42a5f5"
                style={styles.input}
                error={errors.email ? true : false}
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </Animated.View>
            <Animated.View
              entering={StretchInX.delay(100).duration(200)}
              style={[styles.fullWidthInputContainer, styles.mb3]}>
              <TextInput
                value={password}
                onChangeText={handlePasswordChange}
                label="Password"
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
              style={styles.fullWidthInputContainer}>
              <TouchableOpacity
                onPress={handleSignup}
                disabled={isLoading}
                style={styles.signupButton}>
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.signupButtonText}>Signup</Text>
                )}
              </TouchableOpacity>
            </Animated.View>
            <Text style={styles.errorText}>{message}</Text>
            <View style={styles.separatorContainer}>
              <View style={styles.separatorLine} />
              <Text style={styles.separatorText}>OR</Text>
              <View style={styles.separatorLine} />
            </View>
            <Animated.View
              entering={FlipInEasyX.delay(200).duration(400)}
              style={styles.socialLoginContainer}>
              <TouchableOpacity style={styles.socialLoginButton}>
                <Image
                  style={styles.socialLoginIcon}
                  source={require("../assets/google.png")}
                />
                <Text style={styles.socialLoginButtonText}>Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialLoginButton}>
                <Image
                  style={styles.socialLoginIcon}
                  source={require("../assets/apple-logo.png")}
                />
                <Text style={styles.socialLoginButtonText}>Apple</Text>
              </TouchableOpacity>
            </Animated.View>
            <View style={styles.loginRedirectContainer}>
              <Text style={styles.loginRedirectText}>
                Already have an account?
              </Text>
              <TouchableOpacity onPress={() => navigation.push("Login")}>
                <Text style={styles.loginRedirectButtonText}>Login</Text>
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
        marginTop: width * 0.1,
      },
    }),
  },
  titleText: {
    fontSize: 50,
    fontWeight: "bold",
    color: "white",
    letterSpacing: 2,
    ...Platform.select({
      web: {
        fontSize: 55,
      },
    }),
  },
  scrollView: {
    marginTop: 10,
    flex: 1,
  },
  formContainer: {
    flex: 1,
    width: "100%",
    padding: 12,
    justifyContent: "center",
    marginTop: width * 0.3,
    ...Platform.select({
      web: {
        marginTop: width * 0.1,
      },
    })
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  inputContainer: {
    width: "48%",
  },
  fullWidthInputContainer: {
    width: "100%",
    marginBottom: 5,
  },
  mb3: {
    marginBottom: 15,
  },
  errorText: {
    color: "red",
    fontSize: 10,
    marginTop: 1,
  },
  signupButton: {
    backgroundColor: "#0ea5e9",
    padding: 16,
    borderRadius: 16,
    width: "100%",
    alignItems: "center",
  },
  signupButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  separatorContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: "gray",
  },
  separatorText: {
    marginHorizontal: 12,
    fontSize: 18,
    color: "gray",
  },
  socialLoginContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  socialLoginButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 43,
    flexDirection: "row",
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 16,
    marginHorizontal: 4,
  },
  socialLoginIcon: {
    height: 30,
    width: 30,
  },
  socialLoginButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
    color: "black",
  },
  loginRedirectContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loginRedirectText: {
    fontSize: 18,
  },
  loginRedirectButtonText: {
    color: "#0ea5e9",
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 8,
  },
});
