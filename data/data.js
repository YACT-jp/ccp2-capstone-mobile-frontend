//For use later with API:
// const fetchData = async () => {
//   const response = await fetch('https://randomuser.me/api/')
//   const data = await response.json()
//   return data
// }

//For use in other component:
// const printData = async () => {
//   try {
//     const data = await fetchData()
//     console.log('Data', data)
//   } catch (error) {
//     console.error('Problem', error)
//   }
// }

//No longer needed, replaced by Api method
//Note: had to remove 'Object()' from _id
//Note: incorrect json format for arrays and sub objects
export const locationResults = () => {
  const data = `[{'_id': '6194639dbd51c43c5d434cd7', 'Name': 'Yotsuya Station', 'Media id': '[4]', 'Coordinates': '{latitude: 35.6852600, longitude: 139.7299368}', 'Plus Code': 'MPPH+4QH Shinjuku City, Tokyo', 'Description': '', 'Location pic': '', 'MediaLink': ''},
  {'_id': '6194639dbd51c43c5d434cd7', 'Name': 'Shinjuku Station', 'Media id': '[2]', 'Coordinates': '{latitude: 35.6852600, longitude: 139.7299368}', 'Plus Code': 'MPPH+4QH Shinjuku City, Tokyo', 'Description': '', 'Location pic': '', 'MediaLink': ''},
  {'_id': '6194639dbd51c43c5d434cd7', 'Name': 'Osaka', 'Media id': '[3]', 'Coordinates': '{latitude: 35.6852600, longitude: 139.7299368}', 'Plus Code': 'MPPH+4QH Shinjuku City, Tokyo', 'Description': '', 'Location pic': '', 'MediaLink': ''},
  {'_id': '6194639dbd51c43c5d434cd7', 'Name': 'Osaka 2', 'Media id': '[3]', 'Coordinates': '{latitude: 35.6852600, longitude: 139.7299368}', 'Plus Code': 'MPPH+4QH Shinjuku City, Tokyo', 'Description': '', 'Location pic': '', 'MediaLink': ''},
  {'_id': '6194639dbd51c43c5d434cd7', 'Name': 'Karaoke Place', 'Media id': '[5]', 'Coordinates': '{latitude: 35.6852600, longitude: 139.7299368}', 'Plus Code': 'MPPH+4QH Shinjuku City, Tokyo', 'Description': '', 'Location pic': '', 'MediaLink': ''}]`.replace(/'/g, '"');
  return(data);
}

export const locResultsByMedia = async (mediaId) => {
  try {
    //console.log('GETTING LOCS FOR',mediaId);
    const response = await fetch(
      `https://ccp2-capstone-backend-sa-yxiyypij7a-an.a.run.app/api/media/${mediaId}/locations`,
    );
    const data = await response.json()
    return data;
  } catch (err){ 
    console.log(err)
  }
};

//No longer needed, replaced by Api method
export const mediaInfo = () => {
  const data = `{"_id":{"$oid":"61961ed8b1e5cdc0bf41a44f"},"backdrop_path":"/2Yfzm5857lprGonYPl30XgEpTry.jpg","first_air_date":"2006-10-04","genre_ids":[16,9648],"id":13916,"media_type":"tv","name":"Death Note","origin_country":["JP"],"original_language":"ja","original_name":"DEATH NOTE","overview":"Light Yagami is an ace student with great prospects—and he’s bored out of his mind. But all that changes when he finds the Death Note, a notebook dropped by a rogue Shinigami death god. Any human whose name is written in the notebook dies, and Light has vowed to use the power of the Death Note to rid the world of evil. But will Light succeed in his noble goal, or will the Death Note turn him into the very thing he fights against?","popularity":123.365,"poster_path":"/iigTJJskR1PcjjXqxdyJwVB3BoU.jpg","vote_average":8.7,"vote_count":2502}`;
  return(data);
}

//No longer needed, replaced by Api method
export const mediaResults = () => {
  const data =`[{'Name': 'Death Note', 'Media ID': 1},
    {'Name': 'Mob Psycho 100', 'Media ID': 2},
    {'Name': 'Steins Gate', 'Media ID': 3},
    {'Name': 'Kimi No Na Wa (Your Name)', 'Media ID': 4},
    {'Name': 'Lost In Translation', 'Media ID': 5},
    {'Name': 'Kill Bill', 'Media ID': 6}]`.replace(/'/g, '"');
  return(data);
}

export const mediaResultsApi = async () => {
  try {
    const response = await fetch(
      'https://ccp2-capstone-backend-sa-yxiyypij7a-an.a.run.app/api/media',
    );
    const data = await response.json()
    return data;
  } catch (err){ 
    console.log(err)
  }
};

//No longer needed, replaced by Api method
export const savedLocations = () => {
  const data = [{"_id": "61946602bd51c43c5d434cde", "coordinates": "{latitude: 35.6897460, longitude: 139.6977640}", "description": "", "location_pic": "https://d20aeo683mqd6t.cloudfront.net/articles/title_images/000/037/012/original/29333925272_a21ae711a9_h.jpg?2019&d=750x400", "media_id": ["67075", "13916"], "media_link": "", "name": "Shinjuku Station", "plus_code": "MPQ2+R6 Shinjuku City, Tokyo"}];
  return data;
}

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

//export default mediaResults;