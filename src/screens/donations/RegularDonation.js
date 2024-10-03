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

const RegularDonation = ({ changeView }) => {
  
  const [selectedDate, setSelectedDate] = React.useState(null);
  
  const [preview, setPreview] = React.useState(null);
  const [selectedFile, setSelectedFile] = React.useState(null);
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      setPreview(URL.createObjectURL(file)); // Set preview URL for the image
    }
  };

  return (
    <Box sx={{ marginTop: '20px' }}>
    <FormControl component="fieldset">
      <RadioGroup row>
        <FormControlLabel value="Vaidika Trust" control={<Radio />} label="Vaidika Trust" />
        <FormControlLabel value="Charitable Trust" control={<Radio />} label="Charitable Trust" />
      </RadioGroup>
    </FormControl>

    <Box sx={{ display: 'flex', gap: 2, marginTop: '20px' }}>
      <TextField label="Jeevanadi Number" fullWidth />
      <TextField label="Enter Amount" type="number" fullWidth required />
    </Box>

    <Box sx={{ display: 'flex', gap: 2, marginTop: '20px' }}>
      <TextField label="Full Name" fullWidth />
      <TextField label="Email" fullWidth />
    </Box>

    <Box sx={{ display: 'flex', gap: 2, marginTop: '20px' }}>
      <TextField label="Phone" fullWidth />
      <TextField label="Gotram" fullWidth />
    </Box>

    <Box sx={{ display: 'flex', gap: 2, marginTop: '20px' }}>
      <FormControl fullWidth>
        <InputLabel>Nakshatram</InputLabel>
        <Select>
          <MenuItem value={10}>Ashwini</MenuItem>
          <MenuItem value={20}>Bharani</MenuItem>
          {/* Add more options as needed */}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Rashi</InputLabel>
        <Select>
          <MenuItem value={10}>Aries</MenuItem>
          <MenuItem value={20}>Taurus</MenuItem>
          {/* Add more options as needed */}
        </Select>
      </FormControl>
    </Box>

    <Box sx={{ display: 'flex', gap: 2, marginTop: '20px' }}>
      <FormControl fullWidth>
        <InputLabel>Paadam</InputLabel>
        <Select>
          <MenuItem value={10}>1</MenuItem>
          <MenuItem value={20}>2</MenuItem>
          {/* Add more options as needed */}
        </Select>
      </FormControl>
      <TextField
        sx={{ width: '48%', marginBottom: 2 }}
        label="Any special occasions"
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
    </Box>

    <Box sx={{ display: 'flex', gap: 2, marginTop: '20px' }}>
      <TextField label="Transaction Number" fullWidth />
      <TextField
        sx={{ width: '48%', marginBottom: 2 }}
        label="Transaction Date"
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
    </Box>

    <Box sx={{ marginTop: '20px' }}>
      <TextField label="Address" fullWidth multiline rows={4} />
    </Box>

    <Box sx={{ marginTop: '20px' }}>
      <TextField label="Comments" fullWidth multiline rows={4} />
    </Box>

    {/* Upload Attachment and Update Donation Buttons */}
    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px', gap: 2 }}>
      <input
        type="file"
        onChange={handleFileChange}
        style={{ display: 'block' }}
      />

      <Button variant="contained" color="primary">
        Update Donation
      </Button>
    </Box>

    {/* Show Image Preview */}
    {preview && (
      <Box sx={{ marginTop: 2 }}>
        <img
          src={preview}
          alt="Selected Preview"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </Box>
    )}
  </Box>
  );
};

export default RegularDonation;
