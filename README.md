# E-mina Pop Culture Tourism App - React Native Mobile Frontend

## About the app

![Screen shots of various E-mina screens](e-mina-screens.png?raw=true "Screen shots of various E-mina screens")

E-Mina is a Pop Culture Tourism App that will introduce travelers to their favorite Japanese pop culture locations in real life, allowing users to self-curate the travel experience of their dreams.

Re/Create memories in your favorite anime/movie/book locations and be able to share them with other members of the community.

[Download the app from Google Play](https://play.google.com/store/apps/details?id=com.reactnativehello)

## Technical Details

Built using React, React Native, React Navigation, NativeBase, Android Studio, JWT Tokens and more. 

Connects to the [backend REST api](https://github.com/YACT-jp/e-mina-backend)

## Cloning this repository

```
git clone https://github.com/YACT-jp/ccp2-capstone-mobile-frontend.git
npm install
```

## Running locally

1. Run this in the Terminal and do not close

```
npx react-native start
```

2. Open another Terminal and run this

```
npx react-native run-android
```

### Troubleshooting

If you ran into this error
```
error listen EADDRINUSE: address already in use :::8081.
```
Just add this `--port=8088` (or any other port) to the `npx react-native` commands
ie.
```
npx react-native start --port=8088
```

## Building official AAB package for Google Play Store Release 

1. Run the following command - this will also update the androidVersion required in the release

```
npm run android-build
```

### Test builds

1. Run the following command - this will NOT update the androidVersion

```
npm run android-temp-build
```

2. Test the application in the Android Emulator

```
npm run test-android-build
```

### Note

Although build may be successful on your local, only the one with the upload key will have a successful upload for the Play Store release.

- https://reactnative.dev/docs/signed-apk-android