import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { getPin } from "../utils/PinStorage";
import { getToken } from "../utils/auth";
import axios from "axios";
import * as Haptics from "expo-haptics";

export default function VerifyOldPin() {
  const navigation = useNavigation();
  const [pin, setPin] = useState("");
  const [savedPin, setSavedPin] = useState("");

  useEffect(() => {
    const fetchSavedPin = async () => {
      try {
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

        const userId = response.data.userId;
        const pinFromStorage = await getPin(userId);
        setSavedPin(pinFromStorage);
      } catch (error) {
        console.error("Error fetching saved PIN:", error);
        Alert.alert("Error", "Failed to fetch saved PIN. Please try again.");
      }
    };

    fetchSavedPin();
  }, []);

  const handleKeyPress = async (key) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (key === "delete") {
      setPin(pin.slice(0, -1));
    } else if (pin.length < 4) {
      setPin(pin + key);
    }
  };

  useEffect(() => {
    if (pin.length === 4) {
      handleVerifyPin();
    }
  }, [pin]);

  const handleVerifyPin = async () => {
    try {
      if (pin === savedPin) {
        await Haptics.notificationAsync(
          Haptics.NotificationFeedbackType.Success
        );
        Alert.alert("Success", "PIN verified successfully!");
        navigation.replace("SetPin");
      } else {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        Alert.alert("Error", "Incorrect PIN. Please try again.");
        setPin("");
      }
    } catch (error) {
      console.error("Error verifying PIN:", error);
      Alert.alert("Error", "Failed to verify PIN. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flexContainer}>
        <MaterialCommunityIcons name="lock" size={30} color="#000" />
        <Text style={styles.headerText}>Enter old Passcode</Text>
        <View style={styles.pinContainer}>
          {[...Array(4)].map((_, index) => (
            <View
              key={index}
              style={[styles.pinDot, pin.length > index && styles.filledPinDot]}
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
              onPress={() => {
                handleKeyPress(key);
                if (pin.length === 3 && key !== "delete") {
                  setTimeout(handleVerifyPin, 400);
                }
              }}>
              <Text style={styles.keyText}>{key === "delete" ? "⌫" : key}</Text>
            </TouchableOpacity>
          )
        )}
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
});
