import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function TermsOfService() {
  const navigation = useNavigation();
  const [isScrolledToEnd, setIsScrolledToEnd] = useState(false);
  const scrollViewRef = useRef();

  const handleScroll = ({ nativeEvent }) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    const isEndReached =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
    setIsScrolledToEnd(isEndReached);
  };

  const handleAccept = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View className="flex flex-row justify-between m-2 mt-3">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="chevron-left" size={28} color="#000" />
        </TouchableOpacity>
        <Text className="text-center text-[22px] font-bold">
          Terms of Service
        </Text>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="dots-horizontal"
            size={28}
            color="#000"
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.scrollView}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ref={scrollViewRef}>
        <Text style={styles.paragraph}>
          Excel exchange is a Securities Dealer registered in... with
          registration number... and authorised by the Financial Services
          Authority (FSA) with licence number... The registered office of Excel
          exchange Ltd ...
        </Text>
        <Text style={styles.paragraph}>
          Excelexchange is authorised by the Financial Services Commission (FSC)
          in BVI with registration number... and investment business licence
          number... The registered office of Excelexchange is...
        </Text>
        <Text style={styles.paragraph}>
          Risk Warning: Our services relate to complex derivative products which
          are traded outside an exchange. These products come with a high risk
          of losing money rapidly due to leverage and thus are not appropriate
          for all investors. Under no circumstances shall Excelexchange have any
          liability to any person or entity for any loss or damage in whole or
          part caused by, resulting from, or relating to any investing activity.
          Learn more.
        </Text>
        <Text style={styles.paragraph}>
          The information on this website does not constitute investment advice
          or a recommendation or a solicitation to engage in any investment
          activity.
        </Text>
        <Text style={styles.paragraph}>
          Excelexchange complies with the Payment Card Industry Data Security
          Standard (PCI DSS) to ensure your security and privacy. We conduct
          regular vulnerability scans and penetration tests in accordance with
          the PCI DSS requirements for our business model.
        </Text>
        <Text style={styles.paragraph}>
          Risk Warning: Our services relate to complex derivative products which
          are traded outside an exchange. These products come with a high risk
          of losing money rapidly due to leverage and thus are not appropriate
          for all investors. Under no circumstances shall Excelexchange have any
          liability to any person or entity for any loss or damage in whole or
          part caused by, resulting from, or relating to any investing activity.
          Learn more.
        </Text>
        <Text style={styles.paragraph}>
          The information on this website does not constitute investment advice
          or a recommendation or a solicitation to engage in any investment
          activity.
        </Text>
        <Text style={styles.paragraph}>
          Excelexchange complies with the Payment Card Industry Data Security
          Standard (PCI DSS) to ensure your security and privacy. We conduct
          regular vulnerability scans and penetration tests in accordance with
          the PCI DSS requirements for our business model.
        </Text>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, !isScrolledToEnd && styles.buttonDisabled]}
          disabled={!isScrolledToEnd}
          onPress={handleAccept}>
          <Text style={styles.buttonText}>Accept Terms and Conditions</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    paddingHorizontal: 25,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 22,
    textAlign: "justify",
    fontStyle: "italic",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#aaa",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
