import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Pagination, IconButton } from '@mui/material';
import { Edit as EditIcon, Download as DownloadIcon } from '@mui/icons-material';
import './DonationsList.css'; // Import CSS for styling
import donationService from '../../services/donationService';
import { useLoader } from '../../provider/LoaderProvider';


const DonationsList = ({ changeView }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [donationsData, setDonationData] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [currentDonations, setCurrentDonations] = useState([]);
  const { startLoader, stopLoader } = useLoader();
  const [totalPages, setTotalPages] = useState(0);
  const rowsPerPage = 10;

  // Function to handle search input
  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  // Function to check and return a string for the fields (in case they're null/undefined)
  const safeString = (value) => (value ? value.toString().toLowerCase() : '');

  const getDonationList = async () => {
    try {
      startLoader();
      const response = await donationService.getDonationList();
      if (response.success === true) {
        setDonationData(response.data);
        setFilteredDonations(response.data);
      }
    } catch (e) {
      console.log(e);
    } finally {
      stopLoader();
    }
  };

  // Fetch the donation list when the component loads
  useEffect(() => {
    getDonationList();
  }, []);

  // Update filtered donations when the search term changes
  useEffect(() => {
    setFilteredDonations(
      donationsData.filter((donation) =>
        safeString(donation.full_name).includes(searchTerm) ||
        safeString(donation.phone_number).includes(searchTerm) ||
        safeString(donation.jeevanadi_no).includes(searchTerm)
      )
    );
  }, [searchTerm, donationsData]);

  // Update pagination when filteredDonations or currentPage changes
  useEffect(() => {
    const indexOfLastDonation = currentPage * rowsPerPage;
    const indexOfFirstDonation = (currentPage - 1) * rowsPerPage;
    setCurrentDonations(filteredDonations.slice(indexOfFirstDonation, indexOfLastDonation));
    setTotalPages(Math.ceil(filteredDonations.length / rowsPerPage));
  }, [filteredDonations, currentPage]);

  // Handle page change
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="donations-list-container">
      <div className="header">
        <h3 className="title">DONATIONS LIST</h3>
        <div className="action-buttons">
          <input
            type="text"
            placeholder="Search by Name, Mobile, JN-ID"
            className="search-input"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Button
            style={{ marginRight: '16px' }}
            onClick={() => {
              changeView('add-donation', { donationType: 'offline' });
            }}
            variant="contained"
            color="primary"
          >
            Add Donation
          </Button>
          <Button
            onClick={() => {
              changeView('add-donation', { donationType: 'online' });
            }}
            variant="contained"
            color="primary"
          >
            Donate Online
          </Button>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>SNo</TableCell>
              <TableCell>Receipt</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>JN-ID</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Donation Date</TableCell>
              <TableCell>Seva</TableCell>
              <TableCell>Payment Type</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentDonations.length > 0 && currentDonations.map((donation, index) => (
              <TableRow key={donation.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                <TableCell>{index + 1 + (currentPage - 1) * rowsPerPage}</TableCell>
                <TableCell>
                  {donation.receipt_pdf ? (
                    <IconButton href={donation.receipt_pdf} target="_blank">
                      <DownloadIcon />
                    </IconButton>
                  ) : (
                    '-'
                  )}
                </TableCell>
                <TableCell>{donation.full_name}</TableCell>
                <TableCell>{donation.jeevanadi_no}</TableCell>
                <TableCell>{donation.phone_number}</TableCell>
                <TableCell sx={{ color: '#1E90FF', fontWeight: '900' }} onClick={() => {
                  changeView('donation-detail', {donation});
                }}>₹{donation.amount.toFixed(2)}</TableCell>
                <TableCell>{new Date(donation.payment_datetime).toLocaleString()}</TableCell>
                <TableCell>{donation.event_name}</TableCell>
                <TableCell>{donation.payment_type}</TableCell>
                <TableCell>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="pagination-container">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          shape="rounded"
          showFirstButton
          showLastButton
        />
      </div>
    </div>
  );
};

export default DonationsList;
