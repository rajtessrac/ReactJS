import {action} from 'easy-peasy';

const profileModel = {
  editProfileData: [],
  isEditProile: false,

  setEditProfileData: action((state, payload) => {
    state.editProfileData = payload;
  }),

  setIsEditProfile: action((state, payload) => {
    state.isEditProile = payload;
  }),
};

export default profileModel;
