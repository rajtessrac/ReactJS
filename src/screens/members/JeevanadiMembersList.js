import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Switch, IconButton, TextField, Button, Pagination } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import './JeevanadiList.css';
import usersServices from '../../services/usersServices';
import { useLoader } from '../../provider/LoaderProvider';
import { useStoreActions } from 'easy-peasy';

const JeevanadiMembersList = ({changeView}) => {

  const { setReferredByList } = useStoreActions(actions=>actions.user);

  const [members, setMembers] = useState([]);
  const {startLoader, stopLoader} = useLoader();
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const rowsPerPage = 50;
  

  const getAllUsers = async () => {
    try {
      startLoader();
      const response = await usersServices.getUsers();
      if (response.success === true) {
        
        setFilteredMembers(response.users);
        setReferredByList(response.users);
        setMembers()
        setTotalCount(response.users.length)
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      stopLoader();
      
    }
  };



  React.useEffect(() => {
    getAllUsers();
  }, [])
  

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = members.filter((member) =>
      member.profile.full_name.toLowerCase().includes(term) ||
      member.jeevanadi_no.toLowerCase().includes(term) ||
      member.email.toLowerCase().includes(term)
    );
    setFilteredMembers(filtered);
  };

  const handleStatusChange = (id) => {
    const updatedMembers = filteredMembers.map((member) =>
      member.id === id ? { ...member, is_active: !member.is_active } : member
    );
    setFilteredMembers(updatedMembers);
  };

  // Pagination Logic
  const indexOfLastMember = currentPage * rowsPerPage;
  const indexOfFirstMember = indexOfLastMember - rowsPerPage;
  const currentMembers = filteredMembers.slice(indexOfFirstMember, indexOfLastMember);
  const totalPages = Math.ceil(totalCount / rowsPerPage);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="jeevanadi-list-container">
      <div className="header">
        <h3 className="title">JEEVANADI MEMBERS LIST</h3>
        <div className="search-add-member">
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search Members"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Button onClick={()=>{
            changeView('add-member');
          }} variant="contained" color="primary" className="add-member-btn">Add Jeevanadi Member</Button>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>SNo</TableCell>
              <TableCell>JN-ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Joined</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentMembers.map((member, index) => (
             <TableRow key={member.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                <TableCell>{index + 1 + (currentPage - 1) * rowsPerPage}</TableCell>
                <TableCell onClick={()=>{
                    changeView('user-detail', {userId:member.id});
                }} >{member.jeevanadi_no}</TableCell>
                <TableCell>{member.profile.full_name}</TableCell>
                <TableCell>{member.profile.joined_date}</TableCell>
                <TableCell>{member.profile.phone_number}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>{member.role}</TableCell>
                <TableCell>
                  <Switch
                    checked={member.is_active}
                    onChange={() => handleStatusChange(member.id)}
                    color="primary"
                  />
                </TableCell>
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

export default JeevanadiMembersList;
