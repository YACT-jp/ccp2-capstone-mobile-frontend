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

export const savedLocations = () => {
  const data = [{"_id": "61946602bd51c43c5d434cde", "coordinates": "{latitude: 35.6897460, longitude: 139.6977640}", "description": "", "location_pic": "https://d20aeo683mqd6t.cloudfront.net/articles/title_images/000/037/012/original/29333925272_a21ae711a9_h.jpg?2019&d=750x400", "media_id": ["67075", "13916"], "media_link": "", "name": "Shinjuku Station", "plus_code": "MPQ2+R6 Shinjuku City, Tokyo"}];
  return data;
}

//export default mediaResults;
