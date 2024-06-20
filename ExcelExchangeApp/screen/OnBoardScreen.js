import React, { useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import Swiper from "react-native-swiper";
import OnBoard from "../assets/onboard1.webp";
import OnBoard1 from "../assets/joinFulture.png";
import OnBoard2 from "../assets/fastpay.png";
import OnBoard3 from "../assets/allcoin.png";
import OnBoard4 from "../assets/fastpay2.png";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { RFValue } from "react-native-responsive-fontsize";

const OnBoardScreen = ({ navigation }) => {
  const swiperRef = useRef(null);

  const goNext = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(1);
    }
  };
  const goPrev = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(-1);
    }
  };

  return (
    <Swiper
      ref={swiperRef}
      loop={false}
      showsPagination={true}
      dotColor="#E5E5E5"
      activeDotColor="#4299e1">
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <View className="absolute top-12 flex-row w-full gap-x-1">
          <View className="flex-1 h-[3px] bg-sky-500" />
          <View className="flex-1 h-[3px] bg-gray-300" />
          <View className="flex-1 h-[3px] bg-gray-300" />
          <View className="flex-1 h-[3px] bg-gray-300 mr-1" />
        </View>
        <TouchableOpacity
          className="absolute top-14 right-3 flex-row items-center"
          onPress={() => navigation.replace("Welcome")}>
          <Text className="text-sky-500 text-[18rem] font-semibold">Skip</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color="#4299e1"
          />
        </TouchableOpacity>
        <Image source={OnBoard} style={styles.image} />
        <Text numberOfLines={2} style={styles.title}>
          Make your finances move.
        </Text>
        <View className="flex-row absolute bottom-20 w-full justify-around items-center ">
          <Text className="font-bold text-xl text-slate-500" numberOfLines={1}>
            Step 1 of 4
          </Text>
          <TouchableOpacity
            className="p-4 px-5 bg-sky-500 text-slate-900 rounded-2xl"
            onPress={goNext}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <View className="absolute top-12 flex-row w-full gap-x-1">
          <View className="flex-1 h-[3px] bg-gray-300" />
          <View className="flex-1 h-[3px] bg-sky-500" />
          <View className="flex-1 h-[3px] bg-gray-300" />
          <View className="flex-1 h-[3px] bg-gray-300 mr-1" />
        </View>
        <TouchableOpacity
          className="absolute top-14 left-3 flex-row items-center"
          onPress={goPrev}>
          <MaterialCommunityIcons
            name="chevron-left"
            size={24}
            color="#4299e1"
          />
          <Text className="text-sky-500 text-[18rem] font-semibold">Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="absolute top-14 right-3 flex-row items-center"
          onPress={() => navigation.replace("Welcome")}>
          <Text className="text-sky-500 text-[18rem] font-semibold">Skip</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color="#4299e1"
          />
        </TouchableOpacity>
        <Image source={OnBoard2} style={{ width: width * 0.6 }} />
        <Image source={OnBoard4} style={styles.image2} />
        <Text numberOfLines={2} style={styles.title}>
          Faster payments with our app.
        </Text>
        <View className="flex-row absolute bottom-20 w-full justify-around items-center ">
          <Text className="font-bold text-xl text-slate-500" numberOfLines={1}>
            Step 2 of 4
          </Text>
          <TouchableOpacity
            className="p-4 px-5 bg-sky-500 text-slate-900 rounded-2xl"
            onPress={goNext}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <View className="absolute top-12 flex-row w-full gap-x-1">
          <View className="flex-1 h-[3px] bg-gray-300" />
          <View className="flex-1 h-[3px] bg-gray-300" />
          <View className="flex-1 h-[3px] bg-sky-500" />
          <View className="flex-1 h-[3px] bg-gray-300 mr-1" />
        </View>
        <TouchableOpacity
          className="absolute top-14 left-3 flex-row items-center"
          onPress={goPrev}>
          <MaterialCommunityIcons
            name="chevron-left"
            size={24}
            color="#4299e1"
          />
          <Text className="text-sky-500 text-[18rem] font-semibold">Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="absolute top-14 right-3 flex-row items-center"
          onPress={() => navigation.replace("Welcome")}>
          <Text className="text-sky-500 text-[18rem] font-semibold">Skip</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color="#4299e1"
          />
        </TouchableOpacity>
        <Image source={OnBoard3} style={styles.image} />
        <Text numberOfLines={2} style={styles.title}>
          Any coin for every taste.
        </Text>
        <View className="flex-row absolute bottom-20 w-full justify-around items-center ">
          <Text className="font-bold text-xl text-slate-500" numberOfLines={1}>
            Step 3 of 4
          </Text>
          <TouchableOpacity
            className="p-4 px-5 bg-sky-500 text-slate-900 rounded-2xl"
            onPress={goNext}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <View className="absolute top-12 flex-row w-full gap-x-1">
          <View className="flex-1 h-[3px] bg-gray-300" />
          <View className="flex-1 h-[3px] bg-gray-300" />
          <View className="flex-1 h-[3px] bg-gray-300" />
          <View className="flex-1 h-[3px] bg-sky-500 mr-1" />
        </View>
        <TouchableOpacity
          className="absolute top-14 left-3 flex-row items-center"
          onPress={goPrev}>
          <MaterialCommunityIcons
            name="chevron-left"
            size={24}
            color="#4299e1"
          />
          <Text className="text-sky-500 text-[18rem] font-semibold">Back</Text>
        </TouchableOpacity>
        <Image source={OnBoard1} style={styles.image} />
        <Text numberOfLines={2} style={styles.title}>
          Join the future of trading.
        </Text>
        <View className="flex-row absolute bottom-20 w-full justify-around items-center ">
          <Text className="font-bold text-xl text-slate-500" numberOfLines={1}>
            Step 4 of 4
          </Text>
          <TouchableOpacity
            className="p-4 bg-sky-500 text-slate-900 rounded-2xl"
            onPress={() => navigation.replace("ValueSecurity")}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Swiper>
  );
};

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: width * 0.8,
    height: width * 0.8,
  },
  image2: {
    width: width * 0.4,
    height: width * 0.4,
    marginBottom: 5,
  },
  title: {
    fontSize: RFValue(40),
    fontFamily: "RobotoMono_400Regular",
    color: "#333",
    textAlign: "left",
    marginHorizontal: 20,
  },
  button: {
    marginTop: 30,
    backgroundColor: "#C0FF01",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: "#000",
  },
  skipButton: {
    position: "absolute",
    top: 40,
    right: 20,
  },
  skipButtonText: {
    fontSize: 16,
    color: "#6200EE",
  },
});

export default OnBoardScreen;
