import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const termsContent = [
  {
    key: "1",
    text: "Excel exchange is a Securities Dealer registered in... with registration number... and authorised by the Financial Services Authority (FSA) with licence number... The registered office of Excel exchange Ltd ...",
  },
  {
    key: "2",
    text: "Excelexchange is authorised by the Financial Services Commission (FSC) in BVI with registration number... and investment business licence number... The registered office of Excelexchange is...",
  },
  {
    key: "3",
    text: "Risk Warning: Our services relate to complex derivative products which are traded outside an exchange. These products come with a high risk of losing money rapidly due to leverage and thus are not appropriate for all investors. Under no circumstances shall Excelexchange have any liability to any person or entity for any loss or damage in whole or part caused by, resulting from, or relating to any investing activity. Learn more.",
  },
  {
    key: "4",
    text: "The information on this website does not constitute investment advice or a recommendation or a solicitation to engage in any investment activity.",
  },
  {
    key: "5",
    text: "Excelexchange complies with the Payment Card Industry Data Security Standard (PCI DSS) to ensure your security and privacy. We conduct regular vulnerability scans and penetration tests in accordance with the PCI DSS requirements for our business model.",
  },
  {
    key: "6",
    text: "Risk Warning: Our services relate to complex derivative products which are traded outside an exchange. These products come with a high risk of losing money rapidly due to leverage and thus are not appropriate for all investors. Under no circumstances shall Excelexchange have any liability to any person or entity for any loss or damage in whole or part caused by, resulting from, or relating to any investing activity. Learn more.",
  },
  {
    key: "7",
    text: "The information on this website does not constitute investment advice or a recommendation or a solicitation to engage in any investment activity.",
  },
  {
    key: "8",
    text: "Excelexchange complies with the Payment Card Industry Data Security Standard (PCI DSS) to ensure your security and privacy. We conduct regular vulnerability scans and penetration tests in accordance with the PCI DSS requirements for our business model.",
  },
];

export default function TermsOfService() {
  const navigation = useNavigation();

  const handleAccept = () => {
    navigation.goBack();
  };

  const renderTerm = ({ item }) => (
    <View style={styles.paragraphContainer}>
      <Text style={styles.paragraph}>{item.text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="chevron-left" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Terms of Service</Text>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="dots-horizontal"
            size={28}
            color="#000"
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={termsContent}
        renderItem={renderTerm}
        keyExtractor={(item) => item.key}
        style={styles.scrollView}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          //disabled={!isScrolledToEnd}
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
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    marginTop: 20,
  },
  headerText: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
  },
  scrollView: {
    paddingHorizontal: 25,
  },
  paragraphContainer: {
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 22,
    fontStyle: "italic",
    textAlign: "justify",
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
