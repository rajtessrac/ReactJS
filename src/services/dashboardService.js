import {getRequestApi} from '../helpers/AxiosHelper';
import {URLS} from '../helpers/urls';

const getTotalDonation = async (type) => {
  try {
    const response = await getRequestApi(`${URLS.DASHBOARD_TOTAL_DONATION}/${type}`);
    return response;
  } catch (e) {
    return e;
  }
};

const getDonationByEvents = async (type) => {
  try {
    const response = await getRequestApi(`${URLS.DASHBOARD_DONATION_BY_EVENTS}/${type}`);
    return response;
  } catch (e) {
    return e;
  }
};

const getTopTenDonors = async (type) => {
  try {
    const response = await getRequestApi(`${URLS.DASHBOARD_TOP_TEN_DONORS}/${type}`);
    return response;
  } catch (e) {
    return e;
  }
};

const getDonationByDate = async (type) => {
  try {
    const response = await getRequestApi(`${URLS.DASHBOARD_DONATION_BY_DATE}/${type}`);
    return response;
  } catch (e) {
    return e;
  }
};

const getBirthdayAnniversary = async (type) => {
  try {
    const response = await getRequestApi(`${URLS.DASHBOARD_BIRTHDAY_ANNIVERSARY}/${type}`);
    return response;
  } catch (e) {
    return e;
  }
};

const getUpcomingEvents = async (type) => {
  try {
    const response = await getRequestApi(`${URLS.DASHBOARD_UPCOMING_EVENTS}/${type}`);
    return response;
  } catch (e) {
    return e;
  }
};

const getJeevanadiNumbers = async (type) => {
  try {
    const response = await getRequestApi(`${URLS.DASHBOARD_JEEVANADI_NUMBERS}/${type}`);
    return response;
  } catch (e) {
    return e;
  }
};

const getRecurringDonationList = async (type) => {
  try {
    const response = await getRequestApi(`${URLS.DASHBOARD_RECURRING_DONATION}/${type}`);
    return response;
  } catch (e) {
    return e;
  }
};

export default {
  getTotalDonation,
  getUpcomingEvents,
  getBirthdayAnniversary,
  getDonationByDate,
  getTopTenDonors,
  getDonationByEvents,
  getRecurringDonationList,
  getJeevanadiNumbers,
};
