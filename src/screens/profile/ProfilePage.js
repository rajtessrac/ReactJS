import React from 'react';
import {
  Paper, Grid, Typography, Button, IconButton, LinearProgress
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import './ProfilePage.css'; // Importing the CSS file
import { useStoreActions, useStoreState } from 'easy-peasy';
import authServices from '../../services/authServices';


const ProfilePage = ({userId}) => {
  const {user} = useStoreState((state) => state.auth);
  const {setUser} = useStoreActions((action) => action.auth);

  React.useEffect(() => {
    getProfile();
  }, [])
  

  const getProfile = async () => {
    try {
      
      const response = await authServices.getProfile(userId);
      
      if (response.success && response.success === true) {
            console.log(response.users);
                setUser(response.users);
      }
    } catch (error) {
      // Utils.showToast('Please try again or contact IT team');
      // Utils.writeConsole(error, 'Error:');
    } 
  };

  return (
    <div className="profile-container">
      
      <>
      {user.profile? <><Paper className="profile-header">
          <Grid container spacing={ 2 }>
            <Grid item xs={ 12 } sm={ 8 }>
              <Typography variant="h6" component="h2">{ user.profile.full_name }</Typography>
              <Typography variant="body2">Jeevanadi Id: { user.jeevanadi_no }</Typography>
              <Typography variant="body2">Joined: { user.profile.joined_date }</Typography>
              <Typography variant="body2">Role: { user.role }</Typography>
              <Typography variant="body2">Referred: 1</Typography>
            </Grid>
            <Grid item xs={ 12 } sm={ 4 } className="progress-section">
              <LinearProgress variant="determinate" value={ user.profile.fill_percentage } />
              <Button variant="contained" startIcon={ <EditIcon /> } className="edit-btn">
                Edit
              </Button>
            </Grid>
          </Grid>
        </Paper><Grid container spacing={ 2 }>
            <Grid item xs={ 12 } sm={ 8 }>
              <Paper className="profile-details">
                <Typography variant="h6" component="h2">Profile View</Typography>
                <Grid container spacing={ 2 }>
                  <Grid item xs={ 6 }>
                    <Typography><b>Full Name:</b> { user.profile.full_name }</Typography>
                    <Typography><b>Email:</b> { user.email }</Typography>
                    <Typography><b>Country:</b> { user.profile.country }</Typography>
                    <Typography><b>Pincode:</b> { user.profile.pincode }</Typography>
                    <Typography><b>Nakshatram:</b> { user.profile.nakshatram }</Typography>
                  </Grid>
                  <Grid item xs={ 6 }>
                    <Typography><b>Mobile Number:</b> { user.profile.phone_number }</Typography>
                    <Typography><b>Address:</b> { user.profile.address }</Typography>
                    <Typography><b>State:</b> { user.profile.state }</Typography>
                    <Typography><b>City:</b> { user.profile.city }</Typography>
                    <Typography><b>Gothram:</b> { user.profile.gothram }</Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* Donations History */ }
            <Grid item xs={ 12 } sm={ 4 }>
              <Paper className="donation-history">
                <Typography variant="h6" component="h2">Donations History</Typography>
                <div>
                  { user.donation.map((item) => (
                    <Grid container key={ item.id } spacing={ 2 }>
                      <Grid item xs={ 8 }>
                        <Typography>₹{ item.amount.toFixed(2) } - { item.event_name || 'Donation' }</Typography>
                      </Grid>
                      <Grid item xs={ 4 } style={ { textAlign: 'right' } }>
                        <IconButton href={ item.receipt_pdf } download><DownloadIcon /></IconButton>
                      </Grid>
                    </Grid>
                  )) }
                </div>
              </Paper>
            </Grid>
          </Grid><Grid container spacing={ 2 }>
            {/* Relations Details */ }
            <Grid item xs={ 12 } sm={ 8 }>
              <Paper className="relations-details">
                <Typography variant="h6" component="h2">Relations Details</Typography>
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Relation</th>
                      <th>DOB</th>
                      <th>Mobile Number</th>
                      <th>Nakshatram</th>
                      <th>Rashi</th>
                      <th>Paadam</th>
                    </tr>
                  </thead>
                  <tbody>
                    { user.relations.map((rel, index) => (
                      <tr key={ rel.id }>
                        <td>{ index + 1 }</td>
                        <td>{ rel.name }</td>
                        <td>{ rel.relation }</td>
                        <td>{ rel.dob }</td>
                        <td>{ rel.mobilenum }</td>
                        <td>{ rel.nakshatram_rel }</td>
                        <td>{ rel.rashi_rel }</td>
                        <td>{ rel.paadam_rel }</td>
                      </tr>
                    )) }
                  </tbody>
                </table>
              </Paper>
            </Grid>

            {/* Special Occasions */ }
            <Grid item xs={ 12 } sm={ 4 }>
              <Paper className="special-occasions">
                <Typography variant="h6" component="h2">Special Occasions</Typography>
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Occasion Name</th>
                      <th>Occasion Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    { user.occassions.map((occ, index) => (
                      <tr key={ occ.id }>
                        <td>{ index + 1 }</td>
                        <td>{ occ.occ_name }</td>
                        <td>{ occ.occ_date }</td>
                      </tr>
                    )) }
                  </tbody>
                </table>
              </Paper>
            </Grid>
          </Grid></>:null}
      </>
     
    </div>
  );
};

export default ProfilePage;
