
import Axios from 'axios';

Axios.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('token');

  const newConfig = {
    ...config,
  
  };
  if (token) {
    newConfig.headers = {
      authorization: `Bearer ${token}`,
      Accept: '*/*',
      ...config.headers,
    };
  } else {
    newConfig.headers = {
      ...config.headers,
    };
  }

  newConfig.timeout = 30000;

  return newConfig;
});

export const configureBaseURL = (baseURL) => {
  Axios.defaults.baseURL = baseURL;
};

export const postRequestApi = (url, data, headers) =>
  new Promise((resolve, reject) => {
    Axios.post(`${Axios.defaults.baseURL}${url}`, data, {
      headers,
    })
      .then((response) => {
        resolve(response?.data);
      })
      .catch(async (error) => {
        reject(await getApiError(error));
      });
  });

export const postRequestWithFormDataApi = (url, data) =>
  new Promise((resolve, reject) => {
    Axios.post(`${Axios.defaults.baseURL}${url}`, data, {
      headers: {'Content-Type': 'multipart/form-data'},
    })
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(getApiError(error));
      });
  });

export const putRequestWithFormDataApi = (url, data) =>
  new Promise((resolve, reject) => {
    Axios.put(`${Axios.defaults.baseURL}${url}`, data, {
      headers: {'Content-Type': 'multipart/form-data'},
    })
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(getApiError(error));
      });
  });

export const deleteRequestApi = (url, data, headers) =>
  new Promise((resolve, reject) => {
    Axios.delete(`${Axios.defaults.baseURL}${url}`, {data, headers})
      .then((response) => {
        resolve(response?.data);
      })
      .catch(async (error) => {
        reject(await getApiError(error));
      });
  });

export const putRequestApi = (url, data, headers) =>
  new Promise((resolve, reject) => {
    Axios.put(`${Axios.defaults.baseURL}${url}`, data, {
      headers,
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch(async (error) => {
        reject(await getApiError(error));
      });
  });

export const patchRequestApi = (url, data, headers) =>
  new Promise((resolve, reject) => {
    Axios.patch(`${Axios.defaults.baseURL}${url}`, data, {
      headers,
    })
      .then((response) => {
        resolve(response?.data);
      })
      .catch(async (error) => {
        reject(await getApiError(error));
      });
  });

export const getRequestApi = (url, params = undefined, headers) =>
  new Promise((resolve, reject) => {
    Axios.get(
      params ? `${Axios.defaults.baseURL}${url}?${new URLSearchParams(params).toString()}` : url,
      {headers}
    )
      .then((response) => {
        resolve(response?.data);
      })
      .catch(async (error) => {
        reject(await getApiError(error));
      });
  });

export const getApiError = async (error) => {
  if (!error?.response || error?.response?.status === 502) {
    return {message: 'Unknown Error Code 502', status: null, error: true};
  }
  if (error?.response?.status === 500) {
    return {message: 'Something Went Wrong.', status: 500, error: true};
  }
  if (error?.response?.status === 401) {
    const token = localStorage.getItem('token');
    if (token) {
     // do logout
    }
  }
  return {
    message: Array.isArray(error?.response?.data?.message)
      ? error.response.data.message[0]
      : error?.response?.data?.message,
    status: error?.response?.status,
    error: true,
    errorResponse: error?.response?.data,
    errorCode: error?.response?.data?.errorCode,
  };
};
