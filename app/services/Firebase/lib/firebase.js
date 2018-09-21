import firebase from './firebaseInit';
import { combineSets } from './firebaseUtils';
import { sets } from '../sets';

const functions = combineSets(sets, firebase);

export default functions;

