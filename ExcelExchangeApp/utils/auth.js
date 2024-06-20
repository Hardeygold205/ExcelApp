import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveToken = async (token) => {
  try {
    await AsyncStorage.setItem("userToken", token);
    console.log("Token saved:", token);
  } catch (e) {
    console.error("Error saving token:", e); 
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    console.log("Token retrieved:", token);
    return token;
  } catch (e) {
    console.error("Error retrieving token:", e);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem("userToken");
    console.log("Token removed");
  } catch (e) {
    console.error("Error removing token:", e);
  }
};
