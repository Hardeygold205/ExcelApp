import * as SecureStore from "expo-secure-store";

export const savePin = async (pin, userId) => {
  try {
    const key = `pin_${userId}`;
    await SecureStore.setItemAsync(key, pin);
    console.log("PIN saved securely!");
  } catch (error) {
    console.error("Error saving PIN:", error);
  }
};

export const getPin = async (userId) => {
  try {
    const key = `pin_${userId}`; 
    const storedPin = await SecureStore.getItemAsync(key);
    return storedPin;
  } catch (error) {
    console.error("Error retrieving PIN:", error);
    return null;
  }
};

export const deletePin = async (userId) => {
  try {
    const key = generatePinKey(userId);
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error("Error deleting PIN:", error);
  }
};
