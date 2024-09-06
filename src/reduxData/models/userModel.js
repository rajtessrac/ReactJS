import {action} from 'easy-peasy';

const userModel = {
  editUserData: [],
  isEditUser: false,

  userList: [],
  referredByList: [],

  setEditUserData: action((state, payload) => {
    state.editUserData = payload;
  }),

  setIsEditUser: action((state, payload) => {
    state.isEditUser = payload;
  }),

  setUserList: action((state, payload) => {
    state.userList = payload;
  }),

  setReferredByList: action((state, payload) => {
    state.referredByList = payload;
  }),
};

export default userModel;
