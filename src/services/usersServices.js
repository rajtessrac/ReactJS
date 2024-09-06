import {
  deleteRequestApi,
  getRequestApi,
  postRequestApi,
  putRequestApi,
} from '../helpers/AxiosHelper';
import {URLS} from '../helpers/urls';

const getUsers = async (params) => {
  try {
    const response = await getRequestApi(URLS.USERS, params);
    return response;
  } catch (e) {
    return e;
  }
};

const getUsersList = async (params) => {
  try {
    const response = await getRequestApi(URLS.USERS_LIST, params);
    return response;
  } catch (e) {
    return e;
  }
};

const emailExistenceCheck = async (email) => {
  try {
    const response = await getRequestApi(`${URLS.CHECK_EMAIL}/${email}`);
    return response;
  } catch (e) {
    return e;
  }
};

const addUser = async (params) => {
  try {
    const response = await postRequestApi(`${URLS.USERS}`, params);
    return response;
  } catch (e) {
    return e;
  }
};

const editUser = async (id, params) => {
  try {
    const response = await putRequestApi(`${URLS.USERS}/${id}`, params);
    return response;
  } catch (e) {
    return e;
  }
};

const deleteUser = async (id) => {
  try {
    const response = await deleteRequestApi(`${URLS.USERS}/${id}`);
    return response;
  } catch (e) {
    return e;
  }
};

const changeUserStatus = async (userId, status) => {
  const url = `${URLS.CHANGE_STATUS}/${userId}/${status}`;
  try {
    const response = await getRequestApi(url);
    return response;
  } catch (e) {
    return e;
  }
};

const getReports = async (params) => {
  const url = `${URLS.GET_REPORT}`;
  try {
    const response = await postRequestApi(url, params);
    return response;
  } catch (e) {
    return e;
  }
};

export default {
  getUsers,
  deleteUser,
  editUser,
  addUser,
  emailExistenceCheck,
  changeUserStatus,
  getReports,
  getUsersList,
};
