import {adminData} from 'constants/data';
import {action, persist} from 'easy-peasy';
// import persistStorage from '../persistStorage';

export default persist(
  {
    drawerData: adminData,
    setDrawerData: action((state, payload) => {
      state.drawerData = payload;
    }),
  },
  // {
  //   storage: persistStorage,
  // }
);
