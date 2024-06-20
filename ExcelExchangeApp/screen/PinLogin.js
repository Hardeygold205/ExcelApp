import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { getPin } from "../utils/PinStorage";
import { getToken } from "../utils/auth";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as Haptics from "expo-haptics";

export default function PinLogin() {
  const navigation = useNavigation();
  const [userPin, setUserPin] = useState("");

  const handleKeyPress = async (key) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (key === "delete") {
      setUserPin(userPin.slice(0, -1));
    } else if (userPin.length < 4) {
      setUserPin(userPin + key);
    }
  };

  useEffect(() => {
    if (userPin.length === 4) {
      handleLogin();
    }
  }, [userPin]);

  const handleLogin = async () => {
    console.log("Entered PIN:", userPin);
    const token = await getToken();

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
      const { userId } = response.data;

      if (userId) {
        const storedPin = await getPin(userId);
        console.log("Stored PIN:", storedPin);
        if (storedPin && storedPin === userPin) {
          console.log("PIN matched! Navigating to Welcome.");
          await Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Success
          );
          navigation.replace("Welcome");
        } else {
          console.log("Invalid PIN!");
          await Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Error
          );
          Alert.alert("Invalid PIN", "The PIN you entered is incorrect.");
          setUserPin("");
        }
      } else {
        console.error("UserId not found in token");
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flexContainer}>
        <MaterialCommunityIcons name="lock" size={30} color="#000" />
        <Text style={styles.headerText}>Enter Your Passcode</Text>
        <View style={styles.pinContainer}>
          {[...Array(4)].map((_, index) => (
            <View
              key={index}
              style={[
                styles.pinDot,
                userPin.length > index && styles.filledPinDot,
              ]}
            />
          ))}
        </View>
      </View>

      <View style={styles.keypad}>
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "delete"].map(
          (key) => (
            <TouchableOpacity
              key={key}
              style={styles.key}
              onPress={() => handleKeyPress(key)}>
              <Text style={styles.keyText}>{key === "delete" ? "⌫" : key}</Text>
            </TouchableOpacity>
          )
        )}
      </View>
      <View style={styles.footer}>
        <TouchableOpacity>
          <Text style={styles.forgotText}>Forgot PIN?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  flexContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  pinContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "50%",
    marginBottom: 20,
  },
  pinDot: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    borderWidth: 1,
    borderColor: "#000",
    margin: 10,
  },
  filledPinDot: {
    backgroundColor: "#000",
  },
  keypad: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  key: {
    width: "30%",
    padding: 20,
    alignItems: "center",
  },
  keyText: {
    fontSize: 18,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  forgotText: {
    fontSize: 16,
    color: "#0000ff",
  },
});
