import { combineReducers } from 'redux';
import { reducer as notifications } from 'react-notification-system-redux';
import { routerReducer as routing} from 'react-router-redux';

import hotels from './hotels';

const rootReducer = combineReducers({
	notifications, // Redux Notification System
	routing, // Redux Router Reducer

    hotels, // Hotels duration search & listing
});

export default rootReducer;
