import firebase from 'firebase/app';
import 'firebase/database';
import { config } from '../config';

let instance = null;

try {
  if (!config.init) {
    throw new Error('INIT_OFF');
  }

  if (!firebase.apps.length) {
    let app = firebase.initializeApp(config);
  }

  instance = firebase.database();
} catch (e) {
  const prefix = '[FIREBASE SERVICE]';

  switch (e.message) {
    case 'INIT_OFF':
      console.log(prefix, 'Firebase is turned off in config.');
      break;

    default:
      console.warn(prefix, 'Cannot initialize connection or database. Please check your configuration.');
  }
}

const expInstance = instance;
export default expInstance;
