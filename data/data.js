import { retrieveUserSession } from '../data/secureStorage';

export const locResultsByMedia = async mediaId => {
  try {
    const userToken = await retrieveUserSession();
    const response = await fetch(
      `https://ccp2-capstone-backend-sa-yxiyypij7a-an.a.run.app/api/media/${mediaId}/locations`,
      {
          method: 'GET',
          headers: {         
            'Content-Type': 'application/json',   
            'Authorization': `Bearer ${userToken['token']}`   
          },
          // body data type must match "Content-Type" header     
        });     
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const mediaResultsApi = async () => {
  try {
    const userToken = await retrieveUserSession();
    const response = await fetch(
      'https://ccp2-capstone-backend-sa-yxiyypij7a-an.a.run.app/api/media',
      {
          method: 'GET',
          headers: {         
            'Content-Type': 'application/json',   
            'Authorization': `Bearer ${userToken['token']}`   
          },
          // body data type must match "Content-Type" header     
        });     
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const savedLocationsApi = async userId => {
  try {
    const userToken = await retrieveUserSession();
    const response = await fetch(
      `https://ccp2-capstone-backend-sa-yxiyypij7a-an.a.run.app/api/user/${userId}/bookmarks`,
      {
          method: 'GET',
          headers: {         
            'Content-Type': 'application/json',   
            'Authorization': `Bearer ${userToken['token']}`   
          },
          // body data type must match "Content-Type" header     
        });     
    const data = await response.json();
    return data[0].bookmarks;
  } catch (err) {
    console.log(err);
  }
};

export const photosByUser = async (userId) => {
  try {
    const userToken = await retrieveUserSession();
    const response = await fetch(
      `https://ccp2-capstone-backend-sa-yxiyypij7a-an.a.run.app/api/user/${userId}/photo`,
      {
          method: 'GET',
          headers: {         
            'Content-Type': 'application/json',   
            'Authorization': `Bearer ${userToken['token']}`   
          },
          // body data type must match "Content-Type" header     
        });     
    const data = await response.json()
    return data;
  } catch(err) {
    console.log(err)
  }
};

export const photosByLocation = async (locationId) => {
  try {
    const userToken = await retrieveUserSession();
    const response = await fetch(
      `https://ccp2-capstone-backend-sa-yxiyypij7a-an.a.run.app/api/location/${locationId}/photo`,
      {
          method: 'GET',
          headers: {         
            'Content-Type': 'application/json',   
            'Authorization': `Bearer ${userToken['token']}`   
          },
          // body data type must match "Content-Type" header     
        });     
    const data = await response.json()
    return data;
  } catch(err) {
    console.log(err)
  }
};

//export default mediaResults;
export const dynamicSavedLocationsApi = async (userId, inputdata, method) => {
  try {
    const userToken = await retrieveUserSession();
    const response = await fetch(
      `https://ccp2-capstone-backend-sa-yxiyypij7a-an.a.run.app/api/user/${userId}/bookmarks`,
      {
        method: method.toUpperCase(), // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken['token']}`   
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

export const apiAuth = async (userId, userEmail) => {   
  try {    
    const response = await fetch('https://ccp2-capstone-backend-sa-yxiyypij7a-an.a.run.app/api/auth',
    {
        method: 'POST',
        headers: {         
          'Content-Type': 'application/json',       
        },
        body: JSON.stringify({_id: userId, email: userEmail}), 
        // body data type must match "Content-Type" header     
      });     
    const data = await response.text();     
    return data;   
  } catch (err) { 
    console.log('error', err);   
  } 
};

export const authTest = async () => {
  try {
    const userToken = await retrieveUserSession();
    //console.log('userToken pure:', userToken['token']);
    const response = await fetch(
      'https://ccp2-capstone-backend-sa-yxiyypij7a-an.a.run.app/authtest',
      {
          method: 'GET',
          headers: {         
            'Content-Type': 'application/json',   
            'Authorization': `Bearer ${userToken['token']}`   
          },
          // body data type must match "Content-Type" header     
        });     
    const data = await response.text();
    return data;
  } catch (err) {
    console.log(err);
  }
};