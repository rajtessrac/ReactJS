import React from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';

const SevaDetail = ({changeView}) => {
  const seva = {
    name: 'MYSEVA',
    cost: '₹232.00',
    startDate: '16-09-2024',
    endDate: '16-09-2024',
    description: 'Test',
  };

  return (
    <Box sx={{ width: '80%', margin: '0 auto', padding: '20px', boxShadow: 3 }}>
      {/* Seva Name */}
      <Typography variant="h5" gutterBottom>
        {seva.name}
      </Typography>

      {/* Details Section */}
      <Grid container spacing={3} sx={{ marginBottom: 2 }}>
        <Grid item xs={12} sm={4}>
          <Typography variant="body1" fontWeight="bold">
            Cost
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {seva.cost}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography variant="body1" fontWeight="bold">
            Start Date
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {seva.startDate}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography variant="body1" fontWeight="bold">
            End Date
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {seva.endDate}
          </Typography>
        </Grid>
      </Grid>

      {/* Description Section */}
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="body1" fontWeight="bold">
          Description
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {seva.description}
        </Typography>
      </Box>

      {/* Back Button */}
      <Button onClick={()=>{
        changeView('seva-list')
      }} variant="contained" color="primary">
        Back
      </Button>
    </Box>
  );
};

export default React.memo(SevaDetail);
