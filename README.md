# ccp2-capstone-mobile-frontend

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