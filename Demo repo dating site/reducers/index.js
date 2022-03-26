import { combineReducers } from 'redux';
import user from './currUser_reducer';
import profileObj from './profileObj_reducer';
import profiles from './profiles_reducer';
import messages from './messages_reducer';
import statistics from './statistics_reducer';
import views from './views_reducer';


const rootReducer = combineReducers({
    user,
    profileObj,
    profiles,
    messages,
    statistics,
    views
});

export default rootReducer;