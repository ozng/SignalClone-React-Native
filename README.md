# Signal Clone App

## Screenshots

### **Login and Register Screens**

![LoginRegister](https://user-images.githubusercontent.com/93818025/185962544-fc9975e2-be5b-4ad8-96e6-f0b043d98466.jpg)

### **Home and Chat Screens**

![HomeChat](https://user-images.githubusercontent.com/93818025/185962564-110ba762-0cec-4179-8d81-701e372434bb.jpg)

## **Create Firestore Database**

---

Create a new project from Firebase Console.

Create a Firestore Database from the project.

Visit

> Project settings > General > Your apps > Add Web App

Copy `firebaseConfig ` constant and replace it with the code below.

You also need `firebase.js` at the root file of your project.

```javascript
import * as firebase from 'firebase';
import 'firebase/auth';
import "firebase/firestore";

const firebaseConfig = {
// PASTE YOURS HERE.
  apiKey: ***Your api key***,
  authDomain: "***",
  projectId: "***",
  storageBucket: "***",
  messagingSenderId: "***",
  appId: "***"
//
};

let app;

if (firebase.default.apps.length === 0) {
  app = firebase.default.initializeApp(firebaseConfig);
} else {
  app = firebase.default.app()
}

const auth = firebase.default.auth();

const storage = firebase.default.firestore();

export { auth, storage };
```

## **Setting up the development environment**

---

Assuming that you have Node 14 LTS or greater installed, you can use npm to install the Expo CLI command line utility:

```
npm install -g expo-cli
```

Then run the following commands to install dependencies:

```
npm install

npm start # you can also use: expo start
```

This will start a development server for you.

## Technologies

- React Native [docs](https://reactnative.dev/docs/getting-started)
- Expo [docs](https://docs.expo.dev/)
- React Navigation [docs](https://reactnavigation.org/docs/getting-started/)
- Redux [docs](https://redux.js.org/introduction/getting-started)
- React-redux [docs](https://react-redux.js.org/introduction/getting-started)
- Redux-thunk [git-hub](https://github.com/reduxjs/redux-thunk)
- Firebase [console](https://console.firebase.google.com/)
