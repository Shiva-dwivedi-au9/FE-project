import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyCavBZhy-5sNGQfti3tsn09LsGYVDnU0hU",
    authDomain: "movie-database-b302b.firebaseapp.com",
    projectId: "movie-database-b302b",
    storageBucket: "movie-database-b302b.appspot.com",
    messagingSenderId: "330872786994",
    appId: "1:330872786994:web:e450815eff294fd5a7ac2b"
  };
  
  const firebaseApp =  firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore()

  export default db;