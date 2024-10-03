import React from 'react';
import { Button, Typography, Grid, Box, Link } from '@mui/material';

const DonationDetails = ({changeView}) => {
  return (
    <Box
      sx={{
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        maxWidth: '1200px',
        margin: 'auto',
      }}
    >
      <Typography variant="h5" gutterBottom>
        DONATION DETAILS OF 0006
      </Typography>
      <Grid container spacing={3} sx={{ marginTop: '10px' }}>
        <Grid item xs={4}>
          <Typography variant="body1" fontWeight="bold">
            AMOUNT DONATED
          </Typography>
          <Typography>₹9.00</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1" fontWeight="bold">
            SEVA NAME
          </Typography>
          <Typography component={Link} href="#">
            Regular Donation
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1" fontWeight="bold">
            FULL NAME
          </Typography>
          <Typography>Shalini B</Typography>
        </Grid>

        <Grid item xs={4}>
          <Typography variant="body1" fontWeight="bold">
            PHONE NUMBER
          </Typography>
          <Typography>9191919191</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1" fontWeight="bold">
            GOTHRAM
          </Typography>
          <Typography>-</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1" fontWeight="bold">
            EMAIL
          </Typography>
          <Typography component={Link} href="mailto:shalini.b@tessrac.com">
            shalini.b@tessrac.com
          </Typography>
        </Grid>

        <Grid item xs={4}>
          <Typography variant="body1" fontWeight="bold">
            PAADAM
          </Typography>
          <Typography>-</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1" fontWeight="bold">
            SPECIAL OCCASION
          </Typography>
          <Typography>-</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1" fontWeight="bold">
            PAYMENT TYPE
          </Typography>
          <Typography component={Link} href="#">
            Offline
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body1" fontWeight="bold">
            COMMENTS
          </Typography>
          <Typography>-</Typography>
        </Grid>
      </Grid>

      <Box mt={4}>
        <Button variant="contained" color="primary">
          Back
        </Button>
      </Box>
    </Box>
  );
};

export default DonationDetails;
