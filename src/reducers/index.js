import { combineReducers } from 'redux';

import animes from './animes';
import auth from './auth';

export default combineReducers({
    animes,
    auth
});