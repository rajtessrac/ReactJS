const mappings = {
  gender: [
    {id: 1, value: 'Male', short: 'M'},
    {id: 2, value: 'Female', short: 'F'},
    {id: 3, value: 'Others', short: 'O'},
  ],
  maritalStatus: [
    {id: 1, value: 'Single', short: 'S'},
    // {id: 5, value: 'Unmarried', short: 'U'},
    {id: 2, value: 'Married', short: 'M'},
    {id: 3, value: 'Divorced', short: 'D'},
    {id: 4, value: 'Widow', short: 'W'},
  ],
  communicationPref: [
    {id: 1, value: 'WhatsApp', short: 'W'},
    {id: 2, value: 'Email', short: 'E'},
    // {id: 3, value: 'SMS', short: 'S'},
  ],
  role: [
    {id: 1, value: 'Admin', short: '1'},
    {id: 2, value: 'Volunteer', short: '2'},
    {id: 3, value: 'Donor', short: '3'},
  ],
  paadam: [
    {id: 1, value: 'Paadam 1', short: '1'},
    {id: 2, value: 'Paadam 2', short: '2'},
    {id: 3, value: 'Paadam 3', short: '3'},
    {id: 4, value: 'Paadam 4', short: '4'},
  ],
  paymentType: [
    {value: 'Online transfer'},
    {value: 'UPI'},
    {value: 'NEFT'},
    {value: 'RTGS'},
    {value: 'IMPS'},
    {value: 'Cheque'},
    {value: 'Cash'},
  ],
};

const nakshatramData = [
  'Ashwini',
  'Bharani',
  'Krittika',
  'Rohini',
  'Mrigashira',
  'Arudra',
  'Punarvasu',
  'Pushya',
  'Ashlesha',
  'Magha',
  'Purva Phalguni',
  'Uttara Phalguni',
  'Hasta',
  'Chitra',
  'Swati',
  'Vishaka',
  'Anuradha',
  'Jyeshta',
  'Mula',
  'Purva Ashadha',
  'Uttara Ashadha',
  'Shravana',
  'Dhanishta',
  'Shatabhisha',
  'Purva Bhadrapada',
  'Uttara Bhadrapada',
  'Revati',
];

const relationList = [
  'Wife',
  'Husband',
  'Father',
  'Mother',
  'Son',
  'Daughter',
  'Brother',
  'Sister',
  'Grand Father',
  'Grand Mother',
  'Nephew',
  'Niece',
  'Aunt',
  'Uncle',
  'Grand Son',
  'Grand Daughter',
];

const rashiData = [
  {id: 1, tname: 'Mesha', ename: 'Aries'},
  {id: 2, tname: 'Vrishabha', ename: 'Taurus'},
  {id: 3, tname: 'Mithuna', ename: 'Gemini'},
  {id: 4, tname: 'Karkataka', ename: 'Cancer'},
  {id: 5, tname: 'Simha', ename: 'Leo'},
  {id: 6, tname: 'Kanya', ename: 'Virgo'},
  {id: 7, tname: 'Tula', ename: 'Libra'},
  {id: 8, tname: 'Vrischika', ename: 'Scorpio'},
  {id: 9, tname: 'Dhanu', ename: 'Sagittarius'},
  {id: 10, tname: 'Makara', ename: 'Capricorn'},
  {id: 11, tname: 'Kumbha', ename: 'Aquarius'},
];

const recurrenceMapping = [
  {recurringEvent: 'Every Day', id: 1},
  {recurringEvent: 'Every Week', id: 2},
  {recurringEvent: 'Every Month', id: 3},
  {recurringEvent: 'Every Year', id: 4},
];

const capitalizeWords = (string) =>
  string
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

const getObjectByShortValue = (category, shortValue) =>
  mappings[category].find((item) => item.short === shortValue) || {};

const getObjectByValue = (category, value) =>
  mappings[category].find((item) => item.value === value) || {};

const getShortValue = (category, value) => {
  const obj = getObjectByValue(category, value);
  return obj.short || '';
};

const getValueByShortValue = (category, shortValue) => {
  const obj = getObjectByShortValue(category, shortValue);
  return obj.value || '';
};

const getCommunicationPrefList = () =>
  mappings.communicationPref.map((item) => ({
    id: item.id,
    display: item.value,
    value: item.short,
  }));

const getRoleList = () =>
  mappings.role.map((item) => ({
    id: item.id,
    display: item.value,
    value: item.short,
  }));

const getGenderList = () =>
  mappings.gender.map((item) => ({
    id: item.id,
    display: item.value,
    value: item.short,
  }));

const getMaritalList = () =>
  mappings.maritalStatus.map((item) => ({
    id: item.id,
    display: item.value,
    value: item.short,
  }));

const getRashiList = () =>
  rashiData.map((item) => ({
    id: item.id,
    display: `${item.tname} (${item.ename})`,
    tname: item.tname,
    ename: item.ename,
  }));

const getNakshatramList = () =>
  nakshatramData.map((item, index) => ({id: index + 1, display: item}));

const getRelationList = () => relationList.map((item, index) => ({id: index + 1, display: item}));

const getPaadamList = () =>
  mappings.paadam.map((item) => ({
    id: item.id,
    display: item.value,
    value: item.short,
  }));

const getRashiValueById = (id) => {
  const rashi = rashiData.find((item) => item.id === id);
  return rashi ? `${rashi.tname} (${rashi.ename})` : '';
};

const getPaadamShortValueById = (id) => {
  const paadam = mappings.paadam.find((item) => item.id === id);
  return paadam ? paadam.short : '';
};

const getPaymentTypeList = () =>
  mappings.paymentType.map((item) => ({
    display: item.value,
  }));

const getRecurringEvent = (eventRecurrenceId) => {
  const recurringEvent =
    recurrenceMapping.find((item) => item.id === eventRecurrenceId)?.recurringEvent || '-';
  return recurringEvent;
};

export {
  capitalizeWords,
  getObjectByShortValue,
  getObjectByValue,
  getShortValue,
  getValueByShortValue,
  getNakshatramList,
  getRoleList,
  getRashiList,
  getGenderList,
  getMaritalList,
  getPaadamList,
  getRashiValueById,
  getCommunicationPrefList,
  getRelationList,
  getPaadamShortValueById,
  getPaymentTypeList,
  getRecurringEvent,
  mappings,
  nakshatramData,
  rashiData,
  relationList
};
