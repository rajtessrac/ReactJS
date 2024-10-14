import React, { useState } from 'react';
import { Grid, TextField, MenuItem, Select, InputLabel, FormControl, Button, IconButton, Card, CardContent, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { mappings, nakshatramData, rashiData, relationList } from '../../utills/dropdownUtils';
import usersServices from '../../services/usersServices';
import { useLoader } from '../../provider/LoaderProvider';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { isEmailValid, isIndianMobileNumber, validatePassword } from '../../helpers/validation';
import useDidMountEffect from '../../hooks/UseDidMountEffect';

const AddMemberForm = ({ changeView }) => {

  const [relationships, setRelationships] = useState([{ relation: '', name: '', mobilenum: '', dob: '', nakshatram: '', rashi: '', paadam_rel: '' }]);
  const [occasions, setOccasions] = useState([{ occ_name: '', occ_date: '' }]);
  const { startLoader, stopLoader } = useLoader()

  const [email, setEmail] = useState('');
  const [role, setRole] = useState(-1);
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [profession, setProfession] = useState('');
  const [birthDate, setDateOfBirth] = useState('');
  const [anniversaryDate, setAnniversaryDate] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [gothram, setGothram] = useState('');
  const [nakshatram, setNakshatram] = useState('');
  const [rashi, setRashi] = useState('');
  const [paadam, setPaadam] = useState('');
  const [communication_pref, setCommunication_pref] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [referredBy, setReferredBy] = useState('');
  const [pincode, setPinCode] = useState('');
  const [whatsAppNumber, setWhatsappNumber] = useState('');
  const [panNumber, setPanNumber] = useState('');

  const [emailError, setEmailError] = useState(false);
  const [mobileError, setMobileError] = useState(false);

  const { referredByList } = useStoreState(state => state.user);


  // Function to handle adding a new row
  const handleAddRow = () => {
    setRelationships([...relationships, { relation: '', name: '', mobilenum: '', dob: '', nakshatram: '', rashi_rel: null, paadam_rel: '' }]);
  };

  const handleAddOccasion = () => {
    setOccasions([...occasions, { occ_name: '', occ_date: '' }]);
  };

  useDidMountEffect(() => {

    if (!isEmailValid(email)) {
      setEmailError(true)
    }
    else {
      setEmailError(false)
    }
  }, [email])

  useDidMountEffect(() => {

    if (isIndianMobileNumber(phoneNumber)) {
      setMobileError(true)
    }
    else {
      setMobileError(false)
    }
  }, [phoneNumber])


  const addMember = async () => {

    let finalRelationships = relationships.filter(item => item.relation !== '' && item.name !== '');
    let finalOccasions = occasions.filter(item => item.occ_name !== '' && item.occ_date !== '');;


    const user = { "email": email, "role": role, "profile": { "full_name": fullName, "first_name": "", "last_name": "", "phone_number": phoneNumber, "gender": gender, "profession": profession, "date_of_birth": birthDate, "anniv_date": anniversaryDate, "address": address, "country": country, "city": city, "state": state, "gothram": gothram, "nakshatram": nakshatram, "rashi": rashi, "paadam": paadam, "communication_pref": communication_pref, "marital_status": maritalStatus, "referred_by": referredBy, "pincode": pincode, "whatsapp_number": whatsAppNumber, "pan_number": panNumber }, "donation": { "amount": 0, "is_80G_applicable": true, "event_name": "", "payment_type": "" } }

    try {
      startLoader();
      const response = await usersServices.addUser(user);
      if (response?.data === 'successfully added') {
        changeView('members-list');
      }
    }
    catch (e) {
      console.log(e);
      alert(e);
    }
    finally {
      stopLoader();
    }
  }

  // Function to handle removing a row
  const handleRemoveRow = (index) => {
    const newRelationships = [...relationships];
    newRelationships.splice(index, 1);
    setRelationships(newRelationships);
  };



  // Function to handle removing an occasion row
  const handleRemoveOccasion = (index) => {
    const newOccasions = [...occasions];
    newOccasions.splice(index, 1);
    setOccasions(newOccasions);
  };

  // Function to handle field changes
  const handleChange = (index, field, value) => {
    const newRelationships = [...relationships];
    newRelationships[index][field] = value;
    setRelationships(newRelationships);
  };

  const handleOccasionsChange = (index, field, value) => {
    const newOccasions = [...occasions];
    newOccasions[index][field] = value;
    setOccasions(newOccasions);
  };

  return (
    <form style={ { padding: '20px' } }>
      <Typography variant="h5" style={ { marginBottom: '20px' } }>ADD JEEVANADI MEMBER</Typography>

      <Grid container spacing={ 2 }>
        {/* Left Side - Personal Details in Two Columns inside Card */ }
        <Grid item xs={ 12 } sm={ 6 }>
          <Card>
            <CardContent>
              <Typography variant="h6">Personal Details</Typography>
              <Grid container spacing={ 2 }>
                <Grid item xs={ 6 }>
                  <TextField onChange={ (e) => setFullName(e.target.value) } fullWidth label="Full Name" variant="outlined" size="small" />
                </Grid>
                <Grid item xs={ 6 }>
                  <TextField
                    fullWidth
                    label="Date of Birth"
                    type="date"
                    InputLabelProps={ { shrink: true } }
                    variant="outlined"
                    size="small"
                    onChange={ (e) => setDateOfBirth(e.target.value) }
                  />
                </Grid>

                <Grid item xs={ 6 }>
                  <FormControl fullWidth size="small">
                    <InputLabel>Gender</InputLabel>
                    <Select onChange={ (e) => setGender(e.target.value) } >
                      { mappings.gender.map(item => {
                        return <MenuItem value={ item.short }>{ item.value }</MenuItem>
                      }) }
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={ 6 }>
                  <FormControl fullWidth size="small">
                    <InputLabel>Marital Status</InputLabel>
                    <Select onChange={ (e) => setMaritalStatus(e.target.value) } >
                      { mappings.maritalStatus.map(item => {
                        return <MenuItem value={ item.value }>{ item.value }</MenuItem>
                      }) }
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={ 6 }>
                  <TextField onChange={ (e) => setProfession(e.target.value) } fullWidth label="Profession" variant="outlined" size="small" />
                </Grid>
                <Grid item xs={ 6 }>
                  <TextField
                    fullWidth
                    label="Anniversary Date"
                    type="date"
                    InputLabelProps={ { shrink: true } }
                    variant="outlined"
                    size="small"
                    onChange={ (e) => setAnniversaryDate(e.target.value) }
                  />
                </Grid>

                <Grid item xs={ 6 }>
                  <TextField onChange={ (e) => setGothram(e.target.value) } fullWidth label="Gothram" variant="outlined" size="small" />
                </Grid>
                <Grid item xs={ 6 }>
                  <FormControl fullWidth size="small">
                    <InputLabel>Nakshatram</InputLabel>
                    <Select onChange={ (e) => setNakshatram(e.target.value) } >
                      { nakshatramData.map(item => {
                        return <MenuItem value={ item }>{ item }</MenuItem>
                      }) }

                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={ 6 }>
                  <FormControl fullWidth size="small">
                    <InputLabel>Rashi</InputLabel>
                    <Select onChange={ (e) => setRashi(e.target.value) } >
                      { rashiData.map(item => {
                        return <MenuItem value={ item.id }>{ item.tname }</MenuItem>
                      }) }

                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={ 6 }>
                  <FormControl fullWidth size="small">
                    <InputLabel>Paadam</InputLabel>
                    <Select onChange={ (e) => setPaadam(e.target.value) } >
                      { mappings.paadam.map(item => {
                        return <MenuItem value={ item.id }>{ item.value }</MenuItem>
                      }) }

                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={ 6 }>
                  <FormControl fullWidth size="small">
                    <InputLabel>Communication Preference</InputLabel>
                    <Select onChange={ (e) => setCommunication_pref(e.target.value) } >
                      { mappings.communicationPref.map(item => {
                        return <MenuItem value={ item.id }>{ item.value }</MenuItem>
                      }) }
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={ 6 }>
                  <TextField onChange={ (e) => setPanNumber(e.target.value) } fullWidth label="PAN Number" variant="outlined" size="small" />
                </Grid>

                <Grid item xs={ 6 }>
                  <FormControl fullWidth size="small">
                    <InputLabel>Role & Permission</InputLabel>
                    <Select onChange={ (e) => setRole(e.target.value) } >
                      { mappings.role.map(item => {
                        return <MenuItem value={ item.id }>{ item.value }</MenuItem>
                      }) }

                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={ 6 }>
                  <FormControl fullWidth size="small">
                    <InputLabel>Referred By</InputLabel>
                    <Select onChange={ (e) => setReferredBy(e.target.value) } >
                      { referredByList.map(item => {
                        return <MenuItem value={ item.id }>{ item.email }</MenuItem>
                      }) }
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Side - Contact Details and Address Details inside Cards */ }
        <Grid item xs={ 12 } sm={ 6 }>
          {/* Contact Details Section in Two Columns inside Card */ }
          <Card style={ { marginBottom: '20px' } }>
            <CardContent>
              <Typography variant="h6">Contact Details</Typography>
              <Grid container spacing={ 2 }>
                <Grid item xs={ 6 }>
                  <TextField onChange={ (e) => setPhoneNumber(e.target.value) } fullWidth label="Mobile Number" variant="outlined" size="small" required
                    error={ mobileError }
                    helperText={ mobileError ? "Mobile No is required" : "" } />
                </Grid>
                <Grid item xs={ 6 }>
                  <TextField onChange={ (e) => setEmail(e.target.value) } fullWidth label="Email" variant="outlined" size="small" required
                    error={ emailError }
                    helperText={ emailError ? "Email required" : "" } />
                </Grid>

                <Grid item xs={ 6 }>
                  <FormControlLabel
                    control={ <Checkbox /> }
                    label="Same number for WhatsApp"
                    onChange={ (e) => setAddress(e.target.value) }
                  />
                </Grid>
                <Grid item xs={ 6 }>
                  <TextField onChange={ (e) => setWhatsappNumber(e.target.value) } fullWidth label="WhatsApp Number" variant="outlined" size="small" />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Address Details Section inside Card */ }
          <Card>
            <CardContent>
              <Typography variant="h6">Address Details</Typography>
              <TextField fullWidth label="Address" onChange={ (e) => setAddress(e.target.value) } variant="outlined" size="small" />

              <Grid container spacing={ 2 } style={ { marginTop: '16px' } }>
                <Grid item xs={ 6 }>
                  <TextField onChange={ (e) => setCity(e.target.value) } fullWidth label="City" variant="outlined" size="small" />
                </Grid>
                <Grid item xs={ 6 }>
                  <TextField onChange={ (e) => setState(e.target.value) } fullWidth label="State" variant="outlined" size="small" />
                </Grid>
              </Grid>

              <Grid container spacing={ 2 } style={ { marginTop: '16px' } }>
                <Grid item xs={ 6 }>
                  <TextField onChange={ (e) => setCountry(e.target.value) } fullWidth label="Country" variant="outlined" size="small" />
                </Grid>
                <Grid item xs={ 6 }>
                  <TextField onChange={ (e) => setPinCode(e.target.value) } fullWidth label="Pincode" variant="outlined" size="small" />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={ 12 }>
          <Card>
            <CardContent>
              <Typography variant="h6">Your Relationship</Typography>

              { relationships.map((relationship, index) => (
                <Grid container spacing={ 2 } key={ index } alignItems="center">
                  <Grid item xs={ 2 }>
                    <FormControl fullWidth size="small">
                      <InputLabel>Relation</InputLabel>
                      <Select
                        value={ relationship.relation }
                        onChange={ (e) => handleChange(index, 'relation', e.target.value) }
                      >
                        { relationList.map(item => {
                          return <MenuItem value={ item }>{ item }</MenuItem>
                        }) }
                        {/* Add other relation options */ }
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={ 2 }>
                    <TextField
                      fullWidth
                      label="Name"
                      variant="outlined"
                      size="small"
                      value={ relationship.name }
                      onChange={ (e) => handleChange(index, 'name', e.target.value) }
                    />
                  </Grid>
                  <Grid item xs={ 2 }>
                    <TextField
                      fullWidth
                      label="Mobile Number"
                      variant="outlined"
                      size="small"
                      value={ relationship.mobilenum }
                      onChange={ (e) => handleChange(index, 'mobilenum', e.target.value) }
                    />
                  </Grid>
                  <Grid item xs={ 2 }>
                    <TextField
                      fullWidth
                      label="Date of Birth"
                      type="date"
                      InputLabelProps={ { shrink: true } }
                      variant="outlined"
                      size="small"
                      value={ relationship.dob }
                      onChange={ (e) => handleChange(index, 'dob', e.target.value) }
                    />
                  </Grid>
                  <Grid item xs={ 2 }>
                    <FormControl fullWidth size="small">
                      <InputLabel>Nakshatram</InputLabel>
                      <Select
                        value={ relationship.nakshatram_rel }
                        onChange={ (e) => handleChange(index, 'nakshatram_rel', e.target.value) }
                      >
                        { nakshatramData.map(item => {
                          return <MenuItem value={ item }>{ item }</MenuItem>
                        }) }

                        {/* Add other Nakshatram options */ }
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={ 1 }>
                    <FormControl fullWidth size="small">
                      <InputLabel>Rashi</InputLabel>
                      <Select
                        value={ relationship.rashi_rel }
                        onChange={ (e) => handleChange(index, 'rashi_rel', e.target.value) }
                      >
                        { rashiData.map(item => {
                          return <MenuItem value={ item.id }>{ item.tname }</MenuItem>
                        }) }

                        {/* Add other Rashi options */ }
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={ 1 }>
                    <FormControl fullWidth size="small">
                      <InputLabel>Paadam</InputLabel>
                      <Select
                        value={ relationship.paadam_rel }
                        onChange={ (e) => handleChange(index, 'paadam_rel', e.target.value) }
                      >
                        { mappings.paadam.map(item => {
                          return <MenuItem value={ item.id }>{ item.value }</MenuItem>
                        }) }
                        {/* Add other Paadam options */ }
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={ 1 } style={ { display: 'flex', justifyContent: 'center' } }>
                    <IconButton color="secondary" onClick={ () => handleRemoveRow(index) }>
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              )) }

              <Grid container justifyContent="flex-end" style={ { marginTop: '16px' } }>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={ <AddIcon /> }
                  onClick={ handleAddRow }
                >
                  Add Relationship
                </Button>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Occasions Details Section */ }
        <Grid item xs={ 12 } style={ { marginTop: '20px' } }>
          <Card>
            <CardContent>
              <Typography variant="h6">Occasions Details</Typography>

              { occasions.map((occasion, index) => (
                <Grid container spacing={ 2 } key={ index } alignItems="center">
                  <Grid item xs={ 5 }>
                    <TextField
                      fullWidth
                      label="Occasion Name"
                      variant="outlined"
                      size="small"
                      value={ occasion.occ_name }
                      onChange={ (e) => handleOccasionsChange(index, 'occ_name', e.target.value) }
                    />
                  </Grid>
                  <Grid item xs={ 5 }>
                    <TextField
                      fullWidth
                      label="Occasion Date"
                      type="date"
                      InputLabelProps={ { shrink: true } }
                      variant="outlined"
                      size="small"
                      value={ occasion.occ_date }
                      onChange={ (e) => handleOccasionsChange(index, 'occ_date', e.target.value) }
                    />
                  </Grid>
                  <Grid item xs={ 1 }>
                    <IconButton color="secondary" onClick={ () => handleRemoveOccasion(index) }>
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                  { index === occasions.length - 1 && (
                    <Grid item xs={ 1 }>
                      <IconButton color="primary" onClick={ handleAddOccasion }>
                        <AddIcon />
                      </IconButton>
                    </Grid>
                  ) }
                </Grid>
              )) }
            </CardContent>
          </Card>
        </Grid>


        {/* Submit Button */ }
        <Grid item xs={ 12 }>
          <Button onClick={ addMember } variant="contained" color="primary" fullWidth style={ { marginTop: '20px', marginBottom: '120px' } }>
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddMemberForm;
