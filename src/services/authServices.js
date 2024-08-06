// eslint-disable-next-line no-unused-vars
import {getRequestApi, postRequestApi, putRequestApi} from '../helpers/AxiosHelper';
import { URLS } from '../helpers/urls';


const doLogin = async (params) => {
  try {
    const response = await postRequestApi(URLS.LOGIN, params);
    return response;
  } catch (e) {
    return e;
  }
};

const googleLogin = async (params) => {
  try {
    const response = await postRequestApi(URLS.GOOGLE_LOGIN, params);
    return response;
  } catch (e) {
    return e;
  }
};

const verifyOTP = async (params) => {
  try {
    const response = await postRequestApi(URLS.VERIFY_OTP, params);
    return response;
  } catch (e) {
    return e;
  }
};

const getConfiguration = async (params) => {
  try {
    const response = await getRequestApi(URLS.CONFIGURATION, params);
    return response;
  } catch (e) {
    return e;
  }
};

const doSignup = async (params) => {
  try {
    const response = await postRequestApi(URLS.SIGN_UP, params);
    return response;
  } catch (e) {
    return e;
  }
};

const getProfile = async (id) => {
  try {
    const response = await getRequestApi(`${URLS.USERS}/${id}`);
    return response;
  } catch (e) {
    return e;
  }
};

const updateProfile = async (id, params) => {
  try {
    const response = await putRequestApi(`${URLS.USERS}/${id}`, params);
    return response;
  } catch (e) {
    return e;
  }
};

export default {
  doLogin,
  verifyOTP,
  getConfiguration,
  googleLogin,
  doSignup,
  getProfile,
  updateProfile,
};
