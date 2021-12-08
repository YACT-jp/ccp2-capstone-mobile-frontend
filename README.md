# ccp2-capstone-mobile-frontend

## Cloning this repository

```
git clone
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
