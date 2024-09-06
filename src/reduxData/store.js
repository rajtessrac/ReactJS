import {action, createStore} from 'easy-peasy';

import authModel from './models/authModel';
import userModel from './models/userModel';
import profileModel from './models/profileModel';

let initialState = {};
window.requestIdleCallback = null;
const store = createStore(
  {
    
    auth: authModel,
    
    user: userModel,
    profile: profileModel,
    reset: action(() => ({
      ...initialState,
    })),
  },
  {name: 'easystore', enhancers: []}
);

initialState = store.getState();
export default store;
