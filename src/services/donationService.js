import {
  getRequestApi,
  postRequestApi,
  postRequestWithFormDataApi,
  putRequestWithFormDataApi,
} from '../helpers/AxiosHelper';
import {URLS} from '../helpers/urls';

const getDonationList = async (params) => {
  try {
    const response = await getRequestApi(URLS.DONATIONS, params);
    return response;
  } catch (e) {
    return e;
  }
};

const getDonationDetail = async (id) => {
  try {
    const response = await getRequestApi(`${URLS.DONATIONS}/${id}`);
    return response;
  } catch (e) {
    return e;
  }
};

const addRegularDonationList = async (params, type) => {
  try {
    const response = await postRequestWithFormDataApi(
      type === 'offline' ? URLS.DONATIONS : URLS.ONLINE_PAYMENT,
      params
    );
    return response;
  } catch (e) {
    return e;
  }
};

const editDonation = async (id, params) => {
  try {
    const response = await putRequestWithFormDataApi(`${URLS.DONATIONS}/${id}`, params);
    return response;
  } catch (e) {
    return e;
  }
};

const getDonationUserData = async (params) => {
  try {
    const response = await postRequestApi(`${URLS.DONATION_GET_DATA}`, params);
    return response;
  } catch (e) {
    return e;
  }
};

export default {
  getDonationList,
  addRegularDonationList,
  getDonationDetail,
  editDonation,
  getDonationUserData,
};
