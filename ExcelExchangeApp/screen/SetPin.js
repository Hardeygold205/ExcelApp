import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { savePin } from "../utils/PinStorage";
import { getToken } from "../utils/auth";
import axios from "axios";
import * as Haptics from "expo-haptics";

export default function SetPin() {
  const navigation = useNavigation();
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [stage, setStage] = useState(1);

  const handleKeyPress = async (key) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (key === "delete") {
      stage === 1
        ? setPin(pin.slice(0, -1))
        : setConfirmPin(confirmPin.slice(0, -1));
    } else if (
      (stage === 1 && pin.length < 4) ||
      (stage === 2 && confirmPin.length < 4)
    ) {
      stage === 1 ? setPin(pin + key) : setConfirmPin(confirmPin + key);
    }
  };

  const handleSetPin = async () => {
    if (pin.length === 4 && confirmPin.length === 4) {
      if (pin === confirmPin) {
        try {
          const token = await getToken();
          if (!token) {
            console.error("No token found");
            return;
          }

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
              await savePin(pin, userId);
              Alert.alert("Success", "PIN set successfully!");
              console.log(pin, "PIN set successfully!");
              await Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
              );
              navigation.replace("Welcome");
            } else {
              Alert.alert("Error", "User ID not found!");
            }
          } else {
            Alert.alert("Error", "Failed to retrieve user data!");
          }
        } catch (error) {
          console.error("Error setting PIN:", error);
          Alert.alert("Error", "Failed to set PIN. Please try again.");
        }
      } else {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        Alert.alert("Error", "PINs do not match!");
        setPin("");
        setConfirmPin("");
        setStage(1);
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flexContainer}>
        <MaterialCommunityIcons name="lock" size={30} color="#000" />
        <Text style={styles.headerText}>
          {stage === 1 ? "Enter new passcode" : "Confirm new passcode"}
        </Text>
        <View style={styles.pinContainer}>
          {[...Array(4)].map((_, index) => (
            <View
              key={index}
              style={[
                styles.pinDot,
                (stage === 1 ? pin : confirmPin).length > index &&
                  styles.filledPinDot,
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
              onPress={() => {
                handleKeyPress(key);
                if (stage === 1 && pin.length === 3 && key !== "delete") {
                  setTimeout(() => setStage(2), 300);
                } else if (
                  stage === 2 &&
                  confirmPin.length === 3 &&
                  key !== "delete"
                ) {
                  setTimeout(handleSetPin, 400);
                }
              }}>
              <Text style={styles.keyText}>{key === "delete" ? "⌫" : key}</Text>
            </TouchableOpacity>
          )
        )}
      </View>

      {stage === 2 && (
        <TouchableOpacity
          style={[
            styles.doneButton,
            { backgroundColor: confirmPin.length === 4 ? "blue" : "gray" },
          ]}
          onPress={handleSetPin}
          disabled={confirmPin.length !== 4}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      )}
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
  doneButton: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
  },
  doneButtonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
});
