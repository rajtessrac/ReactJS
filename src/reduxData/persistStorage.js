

const persistStorage = {
  async getItem(key) {
    return JSON.parse(await localStorage.getItem(key));
  },
  setItem(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  },
  removeItem(key) {
    localStorage.removeItem(key);
  },
};

export default persistStorage;
