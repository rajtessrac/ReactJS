import React, { useLayoutEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button,
  Switch, IconButton, TextField
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import './CategoriesList.css'; // Import CSS for styling
import eventsService from '../../services/eventsService';
import { useLoader } from '../../provider/LoaderProvider';

const CategoriesList = ({changeView}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const { startLoader, stopLoader } = useLoader();

  const getAllCategories = async () => {
    try {
      startLoader();
      const response = await eventsService.getCategories();
      if (response.data && response.data.length > 0) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error('Error fetching category:', error);
    } finally {
      stopLoader();
    }
  };

  React.useEffect(() => {
    getAllCategories();
  }, [])
  

  // Handle search input
  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  // Toggle status
  const handleStatusToggle = (id) => {
    setCategories(categories.map(category =>
      category.id === id ? { ...category, is_active: !category.is_active } : category
    ));
  };

  // Delete a category
  const handleDelete = (id) => {
    setCategories(categories.filter(category => category.id !== id));
  };

  // Filtered categories based on search term
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="categories-list-container">
      <div className="header">
        <h3 className="title">CATEGORIES LIST</h3>
        <div className="action-buttons">
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search Categories"
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
          <Button onClick={()=>{
            changeView('add-category')
          }} variant="contained" color="primary">Add Category</Button>
        </div>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>SNo</TableCell>
              <TableCell>Category</TableCell>
              <TableCell style={{ width: '100rem' }}>Description</TableCell>
              <TableCell>Events</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCategories.map((category, index) => (
              <TableRow key={category.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <div onClick={()=>{
                    changeView('category-detail')
                  }} className="category-details">
                    {category.cat_image ? (
                      <img src={category.cat_image} alt={category.name} className="category-image" />
                    ) : (
                      <span>No Image</span>
                    )}
                    <span>{category.name}</span>
                  </div>
                </TableCell>
                <TableCell style={{ width: '100rem' }} >{category.cat_desc_text || '-'}</TableCell>
                <TableCell>
                  {category.events.length > 0 ? (
                    category.events.map(event => (
                      <div key={event.id}>{event.title}</div>
                    ))
                  ) : (
                    <span>No Events</span>
                  )}
                </TableCell>
                <TableCell>
                  <Switch
                    checked={category.is_active}
                    onChange={() => handleStatusToggle(category.id)}
                    color="primary"
                  />
                </TableCell>
                <TableCell>
                  <IconButton color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(category.id)}>
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

export default React.memo(CategoriesList);
