import {action} from 'easy-peasy';

export default {
  user: {},
  isLoggedIn: 'false',
  setIsLoggedIn: action((state, payload) => {
    state.isLoggedIn = payload;
  }),
  setUser: action((state, payload) => {
    state.user = payload;
  }),
};
