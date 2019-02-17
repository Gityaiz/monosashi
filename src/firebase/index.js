import firebase from 'firebase'

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyDw7414ij2BMEcx-zF_CmQPMNdvIRnWmck',
  authDomain: 'monosashi-1173a.firebaseapp.com',
  databaseURL: 'https://monosashi-1173a.firebaseio.com',
  projectId: 'monosashi-1173a',
  storageBucket: 'monosashi-1173a.appspot.com',
  messagingSenderId: '320413114490'
}

firebase.initializeApp(config)
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)

export default firebase
