import { action, persist } from 'easy-peasy';
import persistStorage from '../persistStorage';

export default persist({
  user: {},
  isLoggedIn: 'false',
  setIsLoggedIn: action((state, payload) => {
    state.isLoggedIn = payload;
  }),
  setUser: action((state, payload) => {
    state.user = payload;
  }),
}, {
  storage: persistStorage
})