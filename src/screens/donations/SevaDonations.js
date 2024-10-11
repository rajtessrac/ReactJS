import React, { useState } from 'react';
import { Box, Button, Grid, Card, CardContent, Typography } from '@mui/material';
import RegularDonation from './RegularDonation';
import eventsService from '../../services/eventsService';


const SevaDonations = ({type, donationType}) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [categoryList, setCategoryList] = React.useState([]);

  const getCategories = async () => {
    const response = await eventsService.getCategories();
    if (response.data && response.data.length > 0) {
      setCategoryList(response.data);
    }
  }
  
  
  React.useEffect(() => {
    getCategories();
  }, [])

  
  const setData = ()=>{

  }

  const handleCategoryClick = (cat) => {
    if(cat.events.length > 0)
    {
      setSelectedCategory(cat);
      // setSelectedEvent(null); 
    }
    
    
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  return (
    <Box sx={{ padding: '20px', maxWidth: '1200px', margin: 'auto' }}>
      {selectedCategory === null ? (
        <Grid container spacing={2}>
          {categoryList.map((category) => (
            <Grid item xs={6} sm={3} md={2} key={category.id}>
              <Card onClick={() => handleCategoryClick(category)} sx={{ cursor: 'pointer' }}>
                <img src={category.cat_image} alt={category.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                <CardContent>
                  <Typography variant="h5">{category.name}</Typography>
                  
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
          <h3>Selected Category: {selectedCategory.name}</h3>
          <Grid container spacing={2}>
            {selectedCategory.events?.map((event) => (
              <Grid item xs={6} sm={3} md={2} key={event.id}>
                <Card
                  onClick={() => handleEventClick(event)}
                  sx={{
                    cursor: 'pointer',
                    border: selectedEvent?.id === event.id ? '2px solid blue' : '1px solid grey',
                    boxShadow: selectedEvent?.id === event.id ? '0 4px 8px rgba(0, 0, 255, 0.5)' : 'none',
                  }}
                >
                  <img src={event.img} alt={event.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                  <CardContent>
                    <Typography variant="h5">{event.title}</Typography>
                    <Typography variant="body2">Amount: {event.amount}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Form Section */}
          {selectedEvent && (
            <Box sx={{ marginTop: '20px' }}>
              <Typography variant="h6">
                Selected Donation Type: {selectedEvent.title}
              </Typography>
               <RegularDonation donationType={donationType} type={type} getData={setData} />
              <Button style={{marginTop: 22}}  variant="contained" color="primary">Update Donation</Button>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default SevaDonations;
