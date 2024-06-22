import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
  ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import splash from "../../assets/splash.png";
import { useNavigation } from "@react-navigation/native";
import Animated, { FlipInEasyX, StretchInY } from "react-native-reanimated";
import { removeToken, getToken } from "../../utils/auth";
import axios from "axios";

export default function Profile() {
  const navigation = useNavigation();
  const [user, setUser] = useState({
    firstname: "",
    email: "",
    lastname: "",
    userId: "",
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
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
          const { firstname, lastname, email, userId } = response.data;
          setUser({
            email: email,
            firstname: firstname,
            lastname: lastname,
            userId: userId,
          });
        } else {
          console.error("Error fetching user details:", error);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleLogout = async () => {
    try {
      await removeToken();
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      Alert.alert(
        "Confirm Deletion",
        "Are you sure you want to delete the account?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: async () => {
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
                const response = await axios.delete(
                  "http://172.20.10.3:5005/api/delete",
                  config
                );
                console.log(response.data.message);
                await removeToken();
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Login" }],
                });
              } catch (error) {
                console.error(
                  "Error during account deletion:",
                  error.response ? error.response.data.message : error.message
                );
              }
            },
          },
        ]
      );
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const settings = [
    { key: "1", label: "My addresses", icon: "map-marker" },
    { key: "2", label: "Notifications", icon: "bell" },
    { key: "3", label: "Scan settings", icon: "qrcode" },
    { key: "4", label: "Privacy and Security", icon: "shield-lock" },
    { key: "5", label: "Terms of Service", icon: "file-document" },
    { key: "6", label: "Language", icon: "earth", value: "English" },
    { key: "7", label: "Verify Identity", icon: "account-check", value: "Set" },
    { key: "8", label: "Payment Methods", icon: "credit-card-multiple" },
    { key: "9", label: "Close Account", icon: "account-remove" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View className="flex flex-row justify-between m-2 mt-3">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="chevron-left" size={28} color="#000" />
        </TouchableOpacity>
        <Text className="text-center text-[22px] font-bold">Profile</Text>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="dots-horizontal"
            size={28}
            color="#000"
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={settings}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.settingsList}
        ListHeaderComponent={() => (
          <View className="m-2 mt-5">
            <View className="flex-row items-center">
              <Image source={splash} style={styles.avatar} />
              <View className="gap-1 ml-1">
                <Text className="text-3xl font-semibold">
                  {user.firstname} {user.lastname}
                </Text>
                <Text className="text-gray-500 text-[16px]">{user.email}</Text>
              </View>
            </View>
            <Animated.View
              entering={StretchInY.delay(100).duration(200)}
              className="w-full">
              <TouchableOpacity
                onPress={() => navigation.push("EditProfile")}
                className="bg-sky-500 p-3 rounded-xl w-full my-3">
                <Text className="text-xl text-white font-semibold text-center">
                  Edit Profile
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        )}
        renderItem={({ item, index }) => (
          <Animated.ScrollView
            entering={FlipInEasyX.delay(index * 100)}
            style={styles.animatedContainer}>
            <TouchableOpacity
              style={styles.settingItem}
              onPress={() => {
                if (item.label === "Privacy and Security") {
                  navigation.push("ResetOrSetPin");
                } else if (item.label === "Close Account") {
                  handleDeleteAccount();
                } else if (item.label === "Terms of Service") {
                  navigation.push("TermsOfService");
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
        ListFooterComponent={() => (
          <View className="w-full p-3">
            <TouchableOpacity
              onPress={() => {}}
              className="border border-sky-600 p-5 rounded-full w-full my-3">
              <Text className="text-xl text-sky-600 font-semibold text-center">
                Contact Support
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout}>
              <Text className="text-xl text-sky-600 font-semibold text-center">
                Log Out
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
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
