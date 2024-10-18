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
} from '@mui/material';
import { mappings, nakshatramData, rashiData } from '../../utills/dropdownUtils';
import moment from 'moment/moment';
import { useLoader } from '../../provider/LoaderProvider';
import donationService from '../../services/donationService';
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";

const RegularDonation = React.forwardRef(({ changeView, donationType, type, getData }, ref) => {

  const { error, isLoading, Razorpay } = useRazorpay();

  const [preview, setPreview] = React.useState(null);
  const [selectedFile, setSelectedFile] = React.useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      setPreview(URL.createObjectURL(file)); // Set preview URL for the image
    }
  };



  const [jeevanadiNo, setJeevanadiNo] = React.useState('');
  const [trustName, setTrustName] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [fullName, setFullName] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [gothram, setGothram] = React.useState('');
  const [comments, setComments] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [transactionNo, setTransactionNo] = React.useState('');
  const [transactionDate, setTransactionDate] = React.useState('');
  const { startLoader, stopLoader } = useLoader();
  const [occationDate, setOccationDate] = React.useState('');
  const [paadam, setPaadam] = React.useState('');
  const [nakshatram, setNakstram] = React.useState('');
  const [rashi, setRashi] = React.useState('');

  React.useImperativeHandle(ref, () => ({
    getData() {
      const formattedDateTime = transactionDate
        ? moment(transactionDate).utc().format('YYYY-MM-DDTHH:mm')
        : '';
      const formDate = new FormData();
      formDate.append('jeevanadi_no', jeevanadiNo);
      formDate.append('trust_name', trustName);
      // formDate.append('pan_number', panNo);
      formDate.append('amount', amount);
      formDate.append('email', email);
      formDate.append('full_name', fullName);
      formDate.append('phone_number', phoneNumber);
      formDate.append('gothram', gothram);
      formDate.append('nakshatram', nakshatram);
      formDate.append('rashi', rashi);
      formDate.append('paadam', paadam);
      formDate.append('payment_type', donationType === 'online' ? '2' : '1');
      formDate.append('payment_mode', 'Online Transfer');
      formDate.append('payment_id', transactionNo);
      formDate.append('payment_datetime', formattedDateTime);
      formDate.append('comments', comments);
      formDate.append('address', address);
      if (selectedFile) {
        formDate.append('attachment', selectedFile);
      }

      return formDate;
    }
  }));


  const addRegularDonation = async () => {

    const formattedDateTime = transactionDate
      ? moment(transactionDate).utc().format('YYYY-MM-DDTHH:mm')
      : '';
    const formDate = new FormData();
    formDate.append('jeevanadi_no', jeevanadiNo);
    formDate.append('trust_name', trustName);
    // formDate.append('pan_number', panNo);
    formDate.append('amount', amount);
    formDate.append('email', email);
    formDate.append('full_name', fullName);
    formDate.append('phone_number', phoneNumber);
    formDate.append('gothram', gothram);
    formDate.append('nakshatram', nakshatram);
    formDate.append('rashi', rashi);
    formDate.append('paadam', paadam);
    formDate.append('payment_type', donationType === 'online' ? '2' : '1');
    formDate.append('payment_mode', donationType === 'online' ? '' : 'Online Transfer');
    formDate.append('event_name', 'Regular Donation');
    formDate.append('payment_id', transactionNo);
    formDate.append('payment_datetime', formattedDateTime);
    formDate.append('comments', comments);
    formDate.append('address', address);
    //formDate.append('payment_datetime', '');

    startLoader();
    try {
      const response = await donationService.addRegularDonationList(formDate, donationType);
      console.log('response', response);
      if(donationType=== 'online') {
        doRozarpay(response);
      } else {
        changeView('donation-list')
      }
    } catch (error) {
      alert('Please try again or contact IT team')
    } finally {
      stopLoader();
    }

  }

  const doRozarpay = (payment) => {

    const options = {
      currency: 'INR',
      key: payment.razorpay_key,
      amount: amount * 100,
      name: payment.name,
      order_id: payment.order.id,
      handler: (response) => {
        changeView('donation-list')
        
      },

      theme: {
        color: "#F37254",
      },
    };

    const razorpayInstance = new Razorpay(options);
    razorpayInstance.open();

  };

  return (
    <Box sx={ { marginTop: '20px' } }>
      <FormControl component="fieldset">
        <RadioGroup onChange={ (e) => setTrustName(e.target.value) } row>
          <FormControlLabel value="Vaidika Trust" control={ <Radio /> } label="Vaidika Trust" />
          <FormControlLabel value="Charitable Trust" control={ <Radio /> } label="Charitable Trust" />
        </RadioGroup>
      </FormControl>

      <Box sx={ { display: 'flex', gap: 2, marginTop: '20px' } }>
        <TextField onChange={ (e) => setJeevanadiNo(e.target.value) } label="Jeevanadi Number" fullWidth />
        <TextField onChange={ (e) => setAmount(e.target.value) } label="Enter Amount" type="number" fullWidth required />
      </Box>

      <Box sx={ { display: 'flex', gap: 2, marginTop: '20px' } }>
        <TextField onChange={ (e) => setFullName(e.target.value) } label="Full Name" fullWidth />
        <TextField onChange={ (e) => setEmail(e.target.value) } label="Email" fullWidth />
      </Box>

      <Box sx={ { display: 'flex', gap: 2, marginTop: '20px' } }>
        <TextField onChange={ (e) => setPhoneNumber(e.target.value) } label="Phone" fullWidth />
        <TextField onChange={ (e) => setGothram(e.target.value) } label="Gotram" fullWidth />
      </Box>

      <Box sx={ { display: 'flex', gap: 2, marginTop: '20px' } }>
        <FormControl fullWidth>
          <InputLabel>Nakshatram</InputLabel>
          <Select onChange={ (e) => setNakstram(e.target.value) } >
            { nakshatramData.map(item => {
              return <MenuItem value={ item }>{ item }</MenuItem>
            }) }
            {/* Add more options as needed */ }
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Rashi</InputLabel>
          <Select onChange={ (e) => setRashi(e.target.value) } >
            { rashiData.map(item => {
              return <MenuItem value={ item.id }>{ item.tname }</MenuItem>
            }) }

            {/* Add more options as needed */ }
          </Select>
        </FormControl>
      </Box>

      <Box sx={ { display: 'flex', gap: 2, marginTop: '20px' } }>
        <FormControl fullWidth>
          <InputLabel>Paadam</InputLabel>
          <Select onChange={ (e) => setPaadam(e.target.value) } >
            { mappings.paadam.map(item => {
              return <MenuItem value={ item.id }>{ item.value }</MenuItem>
            }) }

            {/* Add more options as needed */ }
          </Select>
        </FormControl>
        <TextField
          sx={ { width: '48%', marginBottom: 2 } }
          label="Any special occasions"
          type="date"
          value={ occationDate }
          onChange={ (e) => setOccationDate(e.target.value) }
          InputLabelProps={ { shrink: true } }
        />
      </Box>

      <Box sx={ { display: 'flex', gap: 2, marginTop: '20px' } }>
        <TextField onChange={ (e) => setTransactionNo(e.target.value) } label="Transaction Number" fullWidth />
        <TextField
          sx={ { width: '48%', marginBottom: 2 } }
          label="Transaction Date"
          type="date"
          value={ transactionDate }
          onChange={ (e) => setTransactionDate(e.target.value) }
          InputLabelProps={ { shrink: true } }
        />
      </Box>

      <Box sx={ { marginTop: '20px' } }>
        <TextField onChange={ (e) => setAddress(e.target.value) } label="Address" fullWidth multiline rows={ 4 } />
      </Box>

      <Box sx={ { marginTop: '20px' } }>
        <TextField onChange={ (e) => setComments(e.target.value) } label="Comments" fullWidth multiline rows={ 4 } />
      </Box>

      {/* Upload Attachment and Update Donation Buttons */ }
      <Box sx={ { display: 'flex', alignItems: 'center', marginTop: '20px', gap: 2 } }>
        <input
          type="file"
          onChange={ handleFileChange }
          style={ { display: 'block' } }
        />

      </Box>

      { type === 'regular' ?
        <Button onClick={ () => {
          addRegularDonation();
        } } style={ { marginTop: 20 } } variant="contained" color="primary">
          Update Donation
        </Button> : null }
      {/* Show Image Preview */ }
      { preview && (
        <Box sx={ { marginTop: 2 } }>
          <img
            src={ preview }
            alt="Selected Preview"
            style={ { maxWidth: '100%', height: 'auto' } }
          />
        </Box>
      ) }
    </Box>
  );
});

export default RegularDonation;
