import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions,Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { RFValue } from "react-native-responsive-fontsize";
import WeValueImage from "../assets/weValue.webp";

export default function ResetPin() {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-sky-600 justify-center p-3 items-center">
      <TouchableOpacity
        className="absolute top-14 left-3 flex-row items-center"
        onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons name="chevron-left" size={24} color="#fff" />
        <Text className="text-white text-[18rem] font-semibold">Back</Text>
      </TouchableOpacity>
      <Image source={WeValueImage} style={styles.image} />
      <Text style={styles.title}>
        To reset your pin, please verify your old pin first.
      </Text>
      <View className="absolute bottom-20 w-full items-center ">
        <TouchableOpacity
          className="p-4 w-full bg-white text-gray-800 rounded-2xl"
          onPress={() => navigation.replace("VerifyOldPin")}>
          <Text style={styles.buttonText}>Verify Passcode</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  image: {
    width: width * 0.9,
    height: width * 0.9,
    marginBottom: 40,
  },
  title: {
    fontSize: RFValue(20),
    fontFamily: "RobotoMono_400Regular",
    color: "#333",
    textAlign: "center",
    marginHorizontal: 10,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    fontWeight: "bold",
  },
});
