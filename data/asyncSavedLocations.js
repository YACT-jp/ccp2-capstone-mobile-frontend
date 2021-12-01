import AsyncStorageLib from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'SAVED_LOCATIONS';

export const getAsyncSavedLocations = async() => {
  try {
    const data = await AsyncStorageLib.getItem(STORAGE_KEY);
    console.log('Success to get AsyncSavedLocations.');
    return JSON.parse(data)
  } catch (e) {
    console.error('Failed to get AsyncSavedLocations.');
    console.error(e);
    return e
  }
}

export const updateAsyncSavedLocations = async (input) => {
  try {
    await AsyncStorageLib.setItem(STORAGE_KEY, JSON.stringify(input));
    console.log('Success to save AsyncSavedLocations.');
    return 'Success to save AsyncSavedLocations.'
  } catch (e) {
    console.error('Failed to save AsyncSavedLocations.');
    console.error(e)
    return e
  }
}
