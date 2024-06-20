import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import WeValueImage from '../assets/weValue.webp'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { RFValue } from "react-native-responsive-fontsize";

export default function ValueSecurity() {
    const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1 bg-sky-600 justify-center p-3 items-center">
      <TouchableOpacity
        className="absolute top-14 right-3 flex-row items-center"
        onPress={() => navigation.replace("Welcome")}>
        <Text className="text-white text-[18rem] font-semibold">Skip</Text>
        <MaterialCommunityIcons
          name="chevron-right"
          size={24}
          color="#fff"
        />
      </TouchableOpacity>
      <Image source={WeValueImage} style={styles.image} />
      <Text style={styles.title}>
        We value your Security and Personal Information as we value ours.
      </Text>
      <View className="absolute bottom-20 w-full items-center ">
        <TouchableOpacity
          className="p-4 w-full bg-white text-gray-800 rounded-2xl"
          onPress={() => navigation.replace("SetPin")}>
          <Text style={styles.buttonText}>Set Passcode</Text>
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