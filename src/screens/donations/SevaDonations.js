import React, { useState } from 'react';
import { Box, Button, Grid, Card, CardContent, Typography, TextField, Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';
import RegularDonation from './RegularDonation';

const categories = [
  { id: 1, name: 'Category1', image: 'https://via.placeholder.com/300x200.png?text=Category+1', description: 'Category1 description' },
  { id: 2, name: 'Category2', image: 'https://via.placeholder.com/300x200.png?text=Category+2', description: 'Category2 description' },
  { id: 3, name: 'Category3', image: 'https://via.placeholder.com/300x200.png?text=Category+3', description: 'Category3 description' },
  { id: 4, name: 'Category4', image: 'https://via.placeholder.com/300x200.png?text=Category+4', description: 'Category4 description' },
  { id: 5, name: 'Category5', image: 'https://via.placeholder.com/300x200.png?text=Category+5', description: 'Category5 description' },
];

const donationTypes = {
  1: [
    { id: 101, name: 'Ganesh Chaturthi', amount: 300, image: 'https://via.placeholder.com/300x200.png?text=Ganesh+Chaturthi' },
    { id: 102, name: 'Seva1', amount: 122, image: 'https://via.placeholder.com/300x200.png?text=Seva+1' },
  ],
  2: [
    { id: 201, name: 'Donation Type 1', amount: 500, image: 'https://via.placeholder.com/300x200.png?text=Donation+Type+1' },
    { id: 202, name: 'Donation Type 2', amount: 150, image: 'https://via.placeholder.com/300x200.png?text=Donation+Type+2' },
  ],
  3: [
    { id: 301, name: 'Donation Type 3', amount: 600, image: 'https://via.placeholder.com/300x200.png?text=Donation+Type+3' },
    { id: 302, name: 'Seva2', amount: 200, image: 'https://via.placeholder.com/300x200.png?text=Seva+2' },
  ],
};

const SevaDonations = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDonation, setSelectedDonation] = useState(null);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedDonation(null); // Reset donation type selection when category changes
  };

  const handleDonationClick = (donationId) => {
    setSelectedDonation(donationId);
  };

  return (
    <Box sx={{ padding: '20px', maxWidth: '1200px', margin: 'auto' }}>
      {selectedCategory === null ? (
        <Grid container spacing={2}>
          {categories.map((category) => (
            <Grid item xs={12} sm={6} md={4} key={category.id}>
              <Card onClick={() => handleCategoryClick(category.id)} sx={{ cursor: 'pointer' }}>
                <img src={category.image} alt={category.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                <CardContent>
                  <Typography variant="h5">{category.name}</Typography>
                  <Typography variant="body2">{category.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <>
          <Button onClick={() => setSelectedCategory(null)} sx={{ marginBottom: '20px' }}>
            Back to Categories
          </Button>
          <h3>Selected Category: {categories.find((cat) => cat.id === selectedCategory).name}</h3>
          <Grid container spacing={2}>
            {donationTypes[selectedCategory]?.map((donation) => (
              <Grid item xs={12} sm={6} md={4} key={donation.id}>
                <Card
                  onClick={() => handleDonationClick(donation.id)}
                  sx={{
                    cursor: 'pointer',
                    border: selectedDonation === donation.id ? '2px solid blue' : '1px solid grey',
                    boxShadow: selectedDonation === donation.id ? '0 4px 8px rgba(0, 0, 255, 0.5)' : 'none',
                  }}
                >
                  <img src={donation.image} alt={donation.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                  <CardContent>
                    <Typography variant="h5">{donation.name}</Typography>
                    <Typography variant="body2">Amount: {donation.amount}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Form Section */}
          {selectedDonation && (
            <Box sx={{ marginTop: '20px' }}>
              <Typography variant="h6">
                Selected Donation Type: {donationTypes[selectedCategory].find((donation) => donation.id === selectedDonation).name}
              </Typography>
               <RegularDonation />

              <Button variant="contained" color="primary">Submit</Button>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default SevaDonations;
