import {
  deleteRequestApi,
  getRequestApi,
  postRequestWithFormDataApi,
  putRequestWithFormDataApi,
} from '../helpers/AxiosHelper';
import {URLS} from '../helpers/urls';

const getCategories = async (params) => {
  try {
    const response = await getRequestApi(URLS.CATEGORIES, params);
    return response;
  } catch (e) {
    return e;
  }
};

const changeCategoryStatus = async (id, status) => {
  try {
    const response = await getRequestApi(`${URLS.CHANGE_CATEGORY_STATUS}/${id}/${status}`);
    return response;
  } catch (e) {
    return e;
  }
};

const addCategory = async (params) => {
  try {
    const response = await postRequestWithFormDataApi(URLS.CATEGORIES, params);
    return response;
  } catch (e) {
    return e;
  }
};

const updateCategory = async (params, id) => {
  try {
    const response = await putRequestWithFormDataApi(`${URLS.CATEGORIES}/${id}`, params);
    return response;
  } catch (e) {
    return e;
  }
};

const deleteCategory = async (id) => {
  try {
    const response = await deleteRequestApi(`${URLS.CATEGORIES}/${id}`);
    return response;
  } catch (e) {
    return e;
  }
};

export default {
  deleteCategory,
  addCategory,
  updateCategory,
  getCategories,
  changeCategoryStatus,
};
