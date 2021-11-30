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

export const savedLocationsApi = async (userId) => {
  try {
    const response = await fetch(
      `https://ccp2-capstone-backend-sa-yxiyypij7a-an.a.run.app/api/user/${userId}/bookmarks`,
    );
    const data = await response.json()
    return data[0].bookmarks;
  } catch (err){ 
    console.log(err)
  }
};
