import EncryptedStorage from 'react-native-encrypted-storage';

export async function storeUserSession(token) {
  try {
      const now = new Date();
      await EncryptedStorage.setItem(
          "user_token",
          JSON.stringify({
              token : token,
              timestamp: now
          })
      );
      console.log('secure token stored:', token);
  } catch (error) {
      // There was an error on the native side
  }
}

export async function retrieveUserSession() {
  try {   
      const session = await EncryptedStorage.getItem("user_token");
  
      if (session !== undefined) {
          // Congrats! You've just retrieved your first value!
          return JSON.parse(session);
      }
  } catch (error) {
      // There was an error on the native side
  }
}

export async function removeUserSession() {
  try {
      await EncryptedStorage.removeItem("user_token");
      // Congrats! You've just removed your first value!
      console.log('secure token removed');
  } catch (error) {
      // There was an error on the native side
  }
}

export async function clearStorage() {
  try {
      await EncryptedStorage.clear();
      // Congrats! You've just cleared the device storage!
  } catch (error) {
      // There was an error on the native side
  }
}