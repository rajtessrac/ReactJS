import {
  deleteRequestApi,
  getRequestApi,
  postRequestWithFormDataApi,
  putRequestWithFormDataApi,
} from '../helpers/AxiosHelper';
import {URLS} from '../helpers/urls';

const getEvents = async (params) => {
  try {
    const response = await getRequestApi(URLS.EVENTS, params);
    return response;
  } catch (e) {
    return e;
  }
};

const getCategories = async (params) => {
  try {
    const response = await getRequestApi(URLS.CATEGORIES, params);
    return response;
  } catch (e) {
    return e;
  }
};

const getDonationCategories = async (params) => {
  try {
    const response = await getRequestApi(URLS.DONATION_CATEGORIES, params);
    return response;
  } catch (e) {
    return e;
  }
};

const addEvent = async (params) => {
  try {
    const response = await postRequestWithFormDataApi(URLS.EVENTS, params);
    return response;
  } catch (e) {
    return e;
  }
};

const updateEvent = async (params, id) => {
  try {
    const response = await putRequestWithFormDataApi(`${URLS.EVENTS}/${id}`, params);
    return response;
  } catch (e) {
    return e;
  }
};

const deleteEvents = async (id) => {
  try {
    const response = await deleteRequestApi(`${URLS.EVENTS}/${id}`);
    return response;
  } catch (e) {
    return e;
  }
};

const changeEventStatus = async (id, status) => {
  try {
    const response = await getRequestApi(`${URLS.CHANGE_EVENT_STATUS}/${id}/${status}`);
    return response;
  } catch (e) {
    return e;
  }
};

export default {
  getEvents,
  deleteEvents,
  addEvent,
  updateEvent,
  getCategories,
  changeEventStatus,
  getDonationCategories,
};
