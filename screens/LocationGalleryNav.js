import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';
import {Image, HStack, ArrowBackIcon, ArrowForwardIcon} from 'native-base';
import {useAuth, AuthProvider} from '../providers/AuthProvider';
import {photosByUser} from '../data/data';
import {retrieveUserSession} from '../data/secureStorage';

function LocationGalleryNav(props) {
  const [singlePhoto, setSinglePhoto] = useState(props.singlePhoto); // passes only URL
  const [currentIndex, setCurrentIndex] = useState(props.currentIndex);
  const [singleDescription, setSingleDescription] = useState('No description');

  /** update photo url for singlePhoto modal */
  useEffect(() => {
    if (currentIndex !== undefined) {
      setSinglePhoto(props.DATA[`${currentIndex}`]['url']);
      setSingleDescription(props.DATA[`${currentIndex}`]['description']);
    }
  }, [currentIndex]);

  const lastPhoto = event => {
    if (currentIndex === 0) {
      setCurrentIndex(props.DATA.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
    event.preventDefault();
  };

  const nextPhoto = event => {
    if (currentIndex === props.DATA.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
    event.preventDefault();
  };

  return (
    <>
      <HStack space={5} alignItems="center" justifyContent="center">
        <ArrowBackIcon onPress={event => lastPhoto(event)} />
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
        <ArrowForwardIcon onPress={event => nextPhoto(event)} />
      </HStack>
      {singleDescription ? (
        <Text>{singleDescription}</Text>
      ) : (
        <Text>No description</Text>
      )}
    </>
  );
}

export default LocationGalleryNav;
