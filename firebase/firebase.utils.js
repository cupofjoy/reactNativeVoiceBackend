import firebase from 'firebase/app';
import 'firebase/firestore';

// Add firebase config file from firebase console
const config = {

};

firebase.initiateApp(firebaseConfig);

export const firestore = firebase.firestore();

export const addFrequencyToFirebase = async (frequencyData) => {
  if(!frequencyData) return;

  const frequencyRef = firestore.doc(`frequency/${frequencyData.uid}`);

  try {
    await frequencyRef.set({ frequencyData });
  } catch (e) {
    console.error('error creating frequency data', e)
  }
}
