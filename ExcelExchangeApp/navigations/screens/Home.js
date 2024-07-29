import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import Splash from "../../assets/splash.png";

export default function HomeScreen() {
  const [coins, setCoins] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0.14098341);

  useEffect(() => {
    fetchCoinData();
  }, []);

  const fetchCoinData = async () => {
    const options = {
      method: "GET",
      url: "https://coingecko.p.rapidapi.com/coins/markets",
      params: {
        price_change_percentage: "24h",
        page: "1",
        sparkline: "true",
        vs_currency: "usd",
        per_page: "100",
        order: "market_cap_desc",
      },
      headers: {
        "x-rapidapi-key": "c035064f09msh1556300f9888915p119ce1jsnd37ebdb08f47",
        "x-rapidapi-host": "coingecko.p.rapidapi.com",
      },
    };
    try {
      const response = await axios.request(options);
      setCoins(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const icons = [
    { name: "account-multiple-plus", label: "Referral" },
    { name: "piggy-bank", label: "Earn" },
    { name: "bank", label: "Withdraw Fiat" },
    { name: "plus-box", label: "Deposit" },
    { name: "swap-horizontal", label: "Convert" },
    { name: "send", label: "Transfer" },
    { name: "chat", label: "Chat Room" },
    { name: "dots-horizontal", label: "More" },
  ];

  const getChangeColor = (change) => {
    if (change > 0) return "text-green-500";
    if (change < 0) return "text-red-500";
    return "text-gray-500";
  };

  return (
    <SafeAreaView className="flex-1 p-3 bg-white">
      <View className="flex-1 m-3 z-50 bg-white flex-row absolute top-10  justify-between w-full items-center">
        <TouchableOpacity className="bg-sky-400 p-1 rounded-md">
          <Image source={Splash} className="w-[20] h-[20]" />
        </TouchableOpacity>
        <TouchableOpacity className="border border-sky-400 w-8/12 flex-row items-center p-2 rounded-xl">
          <MaterialCommunityIcons name="magnify" size={16} color="gray" />
          <Text className="text-gray-800">BTC</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialCommunityIcons name="bell" size={26} color="#42a5f5" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="barcode-scan"
            size={26}
            color="#42a5f5"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialCommunityIcons name="headset" size={26} color="#42a5f5" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View className="mt-10 flex-row items-center justify-between">
          <View className="flex-col my-2 gap-1">
            <Text
              className="text-lg"
              style={{ fontFamily: "RobotoMono_400Regular" }}>
              Total Balance (USD)
            </Text>
            <Text
              className="font-extrabold text-4xl"
              style={{ fontFamily: "RobotoMono_400Regular" }}>
              {totalBalance}
            </Text>
          </View>
          <TouchableOpacity className="bg-sky-400 p-3 px-5 rounded-md">
            <Text className="font-bold ">Deposit</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row flex-wrap justify-between">
          {icons.map((icon, index) => (
            <TouchableOpacity
              className="items-center my-1 w-1/4 p-2"
              key={index}>
              <View className="border border-sky-400 rounded-xl p-2 items-center">
                <MaterialCommunityIcons
                  name={icon.name}
                  size={26}
                  color="black"
                />
              </View>
              <Text className="text-[11rem] mt-2">{icon.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View className="border flex-row border-sky-400 rounded-lg w-full p-5">
          {coins.map((coin) => (
            <TouchableOpacity className="mx-2" key={coin.id}>
              <Text>{coin.symbol.toUpperCase()}/USDT</Text>
              <Text>{coin.current_price}</Text>
              <Text>{coin.price_change_percentage}%</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View>
          <Text style={styles.sectionTitle}>Favorites</Text>
          {coins.map((coin) => (
            <View key={coin.id} style={styles.coinRow}>
              <Text>{coin.symbol.toUpperCase()}/USDT</Text>
              <Text>{coin.current_price}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  totalBalanceText: {
    fontSize: 16,
    color: "#888",
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  iconContainer: {
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  coinRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});
