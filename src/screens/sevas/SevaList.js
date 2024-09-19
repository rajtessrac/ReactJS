import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, Switch, IconButton, TextField
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Visibility as ViewIcon } from '@mui/icons-material';
import './SevasList.css'; // Import CSS for styling
import eventsService from '../../services/eventsService';

// Original object format

const SevasList = ({changeView}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sevas, setSevas] = useState([]);


  const getAllEvents = async () => {
    try {
      
      const response = await eventsService.getEvents();
      if (response.events && response.events.length > 0) {
        setSevas(response.events.map((obj) => ({...obj, isSelected: false})));
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      
    }
  };

   React.useEffect(() => {
    getAllEvents();
  }, [])
  

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleStatusToggle = (id) => {
    setSevas(sevas.map(seva =>
      seva.id === id ? { ...seva, is_active: !seva.is_active } : seva
    ));
  };

  const handleDelete = (id) => {
    setSevas(sevas.filter(seva => seva.id !== id));
  };

  // Filtering the sevas based on the search term
  const filteredSevas = sevas.filter((seva) =>
    seva.title.toLowerCase().includes(searchTerm) ||
    seva.category[0].toLowerCase().includes(searchTerm)
  );

  return (
    <div className="sevas-list-container">
      <div className="header">
        <h3 className="title">SEVAS LIST</h3>
        <div className="action-buttons">
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search Sevas"
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
          <Button variant="contained" onClick={()=>{
            changeView('add-seva')
          }} color="primary">Add Sevas</Button>
        </div>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>SNo</TableCell>
              <TableCell>Seva</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSevas.map((seva, index) => (
              <TableRow key={seva.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <div onClick={()=>{changeView('seva-detail')}} className="seva-details">
                    <img src={seva.img} alt={seva.title} className="seva-image" />
                    <span>{seva.title}</span>
                  </div>
                </TableCell>
                <TableCell>{seva.category[0]}</TableCell>
                <TableCell>{seva.description_text || seva.description || '-'}</TableCell>
                <TableCell>
                  <Switch
                    checked={seva.is_active}
                    onChange={() => handleStatusToggle(seva.id)}
                    color="primary"
                  />
                </TableCell>
                <TableCell>{seva.start_date || '-'}</TableCell>
                <TableCell>{seva.end_date || '-'}</TableCell>
                <TableCell>
                  <IconButton color="primary">
                    <ViewIcon />
                  </IconButton>
                  <IconButton color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(seva.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default React.memo(SevasList);
