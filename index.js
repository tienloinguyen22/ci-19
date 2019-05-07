window.onload = () => {
  // init firebase
  const firebaseConfig = {
    apiKey: "AIzaSyAfZ8JNu9LIMRxJ9vwzwNb65TFvSCNm6Ss",
    authDomain: "ci19-acd74.firebaseapp.com",
    databaseURL: "https://ci19-acd74.firebaseio.com",
    projectId: "ci19-acd74",
    storageBucket: "ci19-acd74.appspot.com",
    messagingSenderId: "471607403324",
    appId: "1:471607403324:web:99b51278b45b4af3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // mount login screen
  view.setActiveScreen('login');
};