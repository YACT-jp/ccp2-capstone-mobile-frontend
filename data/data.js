export const locResultsByMedia = async mediaId => {
  try {
    const response = await fetch(
      `https://ccp2-capstone-backend-sa-yxiyypij7a-an.a.run.app/api/media/${mediaId}/locations`,
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const mediaResultsApi = async () => {
  try {
    const response = await fetch(
      'https://ccp2-capstone-backend-sa-yxiyypij7a-an.a.run.app/api/media',
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const savedLocationsApi = async userId => {
  try {
    const response = await fetch(
      `https://ccp2-capstone-backend-sa-yxiyypij7a-an.a.run.app/api/user/${userId}/bookmarks`,
    );
    const data = await response.json();
    return data[0].bookmarks;
  } catch (err) {
    console.log(err);
  }
};

export const photosByUser = async (userId) => {
  try {
    const response = await fetch(
      `https://ccp2-capstone-backend-sa-yxiyypij7a-an.a.run.app/api/user/${userId}/photo`,
    );
    const data = await response.json()
    return data;
  } catch(err) {
    console.log(err)
  }
};

export const photosByLocation = async (locationId) => {
  try {
    const response = await fetch(
      `https://ccp2-capstone-backend-sa-yxiyypij7a-an.a.run.app/api/location/${locationId}/photo`,
    );
    const data = await response.json()
    return data;
  } catch(err) {
    console.log(err)
  }
};

//export default mediaResults;
export const dynamicSavedLocationsApi = async (userId, inputdata, method) => {
  try {
    const response = await fetch(
      `https://ccp2-capstone-backend-sa-yxiyypij7a-an.a.run.app/api/user/${userId}/bookmarks`,
      {
        method: method.toUpperCase(), // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputdata), // body data type must match "Content-Type" header
      },
    );
    const data = await response.text();
    return data;
  } catch (err) {
    console.log('error', err);
  }
};
