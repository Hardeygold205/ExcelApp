import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import Animated, { FlipInEasyX } from "react-native-reanimated";
import { getPin } from "../../utils/PinStorage";
import { getToken } from "../../utils/auth";
import axios from "axios";

const isPinSet = async (userId) => {
  const pin = await getPin(userId);
  return !!pin;
};

export default function ResetOrSetpin() {
  const navigation = useNavigation();

  const [settings, setSettings] = useState([
    { key: "1", label: "Set Pin", icon: "shield-lock", value: "Set" },
    { key: "2", label: "Reset Pin", icon: "fingerprint" },
  ]);

  useEffect(() => {
    const checkPinStatus = async () => {
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
        const pinSet = await isPinSet(userId);

        setSettings((prevSettings) =>
          prevSettings.map((setting) =>
            setting.key === "1"
              ? { ...setting, value: pinSet ? "Done" : "Set" }
              : setting
          )
        );
      } catch (error) {
        console.error("Error checking pin status:", error);
      }
    };
    checkPinStatus();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white ">
      <View className="flex flex-row justify-between m-2 mt-3">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="chevron-left" size={28} color="#000" />
        </TouchableOpacity>
        <Text className="text-center text-[22px] font-bold">
          Privacy and Security
        </Text>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="dots-horizontal"
            size={28}
            color="#000"
          />
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={settings}
          keyExtractor={(item) => item.key}
          contentContainerStyle={styles.settingsList}
          renderItem={({ item, index }) => (
            <Animated.ScrollView
              entering={FlipInEasyX.delay(index * 100)}
              style={styles.animatedContainer}>
              <TouchableOpacity
                style={styles.settingItem}
                onPress={() => {
                  if (item.label === "Set Pin" && item.value === "Set") {
                    navigation.push("SetPin");
                  } else if (item.label === "Reset Pin") {
                    navigation.push("ResetPin");
                  }
                  return false;
                }}>
                <View className="bg-blue-400 rounded-md p-1">
                  <MaterialCommunityIcons
                    name={item.icon}
                    size={24}
                    color="#fff"
                  />
                </View>
                <Text style={styles.settingLabel}>{item.label}</Text>
                {item.value && (
                  <Text style={styles.settingValue}>{item.value}</Text>
                )}
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={24}
                  color="#4F4F4F"
                />
              </TouchableOpacity>
            </Animated.ScrollView>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  settingsList: {
    paddingVertical: 5,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  settingLabel: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  settingValue: {
    marginRight: 10,
    fontSize: 16,
    color: "#007BFF",
  },
});
