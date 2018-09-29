import firebase from '../firebaseInit';
import 'firebase/database';
import { combineSets } from './utils';

import sets from './sets';

const database = firebase.database();

const functions = combineSets(sets, database);

export default functions;
