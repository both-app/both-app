import * as firebase from 'firebase'

import { ENVIRONMENT } from '../env'

const FIREBASE_CONFIG =
  ENVIRONMENT === 'staging'
    ? {
        apiKey: 'AIzaSyCPoE7TkgEGoQhxBs8ikMSmjW-EWATfQ3I',
        authDomain: 'both-staging.firebaseapp.com',
        databaseURL: 'https://both-staging.firebaseio.com',
        projectId: 'both-staging',
        storageBucket: 'both-staging.appspot.com',
      }
    : {
        apiKey: 'AIzaSyB6spqYru57m5-UVZkizRii7UW66k9TYo0',
        authDomain: 'both-prod.firebaseapp.com',
        databaseURL: 'https://both-prod.firebaseio.com',
        projectId: 'both-prod',
        storageBucket: 'both-prod.appspot.com',
      }

export default firebase.initializeApp(FIREBASE_CONFIG)
