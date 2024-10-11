import React from 'react';
import {
  TextField,
  Button,
  Box,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
} from '@mui/material';
import RegularDonation from './RegularDonation';
import SevaDonations from './SevaDonations';

const DonationForm = ({ changeView, donationType }) => {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {

    setTabValue(newValue);
  };


  return (
    <Box sx={ { padding: '20px', maxWidth: '1200px', margin: 'auto', marginBottom: 300 } }>

      <Tabs value={ tabValue } onChange={ handleTabChange }>
        <Tab label="Regular Donations" />
        <Tab label="Sevas" />
      </Tabs>

      { tabValue === 0 ? <RegularDonation donationType={ donationType } changeView={ changeView } type={ 'regular' } /> : <SevaDonations donationType={ donationType } changeView={ changeView } type={ 'seva' } /> }


    </Box>
  );
};

export default DonationForm;
