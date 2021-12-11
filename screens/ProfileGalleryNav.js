import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';
import {Image, HStack, ArrowBackIcon, ArrowForwardIcon} from 'native-base';
import {useAuth, AuthProvider} from '../providers/AuthProvider';
import {photosByUser} from '../data/data';
import {retrieveUserSession} from '../data/secureStorage';

function ProfileGalleryNav(props, item, DATA) {
  const [singlePhoto, setSinglePhoto] = useState(); // passes only URL
  const [currentIndex, setCurrentIndex] = useState(props.currentIndex);
  const [singleDescription, setSingleDescription] = useState('No description');

  /** update photo url for singlePhoto modal */
  useEffect(() => {
    if (currentIndex !== undefined) {
      setSinglePhoto(props.DATA[`${currentIndex}`]['url']);
      setSingleDescription(props.DATA[`${currentIndex}`]['description']);
      props.setDeleteId(props.DATA[`${currentIndex}`]['_id']);
      console.log('deleteId', props.deleteId);
    }
  }, [currentIndex]);

  const lastPhoto = (event, item) => {
    if (currentIndex === 0) {
      setCurrentIndex(props.DATA.length - 1);
      setSinglePhoto(props.DATA[`${currentIndex}`]['url']);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
    event.preventDefault();
  };

  const nextPhoto = (event, item) => {
    if (currentIndex === props.DATA.length - 1) {
      setCurrentIndex(0);
      setSinglePhoto(props.DATA[0]['url']);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
    event.preventDefault();
  };

  return (
    <>
      <HStack space={5} alignItems="center" justifyContent="center">
        <ArrowBackIcon onPress={(event, item) => lastPhoto(event, item)} />
        <Image
          border={1}
          borderWidth={5}
          borderColor="white"
          source={{
            uri: singlePhoto,
          }}
          key={singlePhoto}
          alt="Alternate Text"
          size="2xl"
        />
        <ArrowForwardIcon onPress={(event, item) => nextPhoto(event, item)} />
      </HStack>
      {singleDescription ? (
        <Text>{singleDescription}</Text>
      ) : (
        <Text>No description</Text>
      )}
    </>
  );
}

export default ProfileGalleryNav;
