import React from 'react';
import { Button, Typography, Grid, Box, Link } from '@mui/material';

const DonationDetails = ({changeView,donation}) => {

  return (
    <Box
      sx={{
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        maxWidth: '1200px',
        margin: '32px',
      }}
    >
      <Typography variant="h5" gutterBottom>
        {`DONATION DETAILS OF ${donation.jeevanadi_no}`}
      </Typography>
      <Grid container spacing={3} sx={{ marginTop: '10px' }}>
        <Grid item xs={4}>
          <Typography variant="body1" fontWeight="bold">
            AMOUNT DONATED
          </Typography>
          <Typography>{`${donation?.amount.toFixed(2) || ''}`}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1" fontWeight="bold">
            SEVA NAME
          </Typography>
          <Typography component={Link} href="#">
            {`${donation?.event_name ||  'Regular Donation'}`}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1" fontWeight="bold">
            FULL NAME
          </Typography>
          <Typography>{`${donation?.full_name || ''}`}</Typography>
        </Grid>

        <Grid item xs={4}>
          <Typography variant="body1" fontWeight="bold">
            PHONE NUMBER
          </Typography>
          <Typography>{`${donation?.phone_number || ''}`}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1" fontWeight="bold">
            GOTHRAM
          </Typography>
          <Typography>{`${donation?.full_name || ''}`}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1" fontWeight="bold">
            EMAIL
          </Typography>
          <Typography component={Link} href={`${donation?.email || ''}`}>
          {`${donation?.email || ''}`}
          </Typography>
        </Grid>

        <Grid item xs={4}>
          <Typography variant="body1" fontWeight="bold">
            PAADAM
          </Typography>
          <Typography>{`${donation?.full_name || ''}`}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1" fontWeight="bold">
            SPECIAL OCCASION
          </Typography>
          <Typography>{`${donation?.full_name || ''}`}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1" fontWeight="bold">
            PAYMENT TYPE
          </Typography>
          <Typography component={Link} href="#">
          {`${donation?.full_name || ''}`}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body1" fontWeight="bold">
            COMMENTS
          </Typography>
          <Typography>{`${donation?.full_name || ''}`}</Typography>
        </Grid>
      </Grid>

      <Box mt={4}>
        <Button onClick={()=>changeView('donation-list')} variant="contained" color="primary">
          Back
        </Button>
      </Box>
    </Box>
  );
};

export default DonationDetails;
