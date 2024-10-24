import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, FormControl, InputLabel } from '@mui/material';
import categoryService from '../../services/categoryService';

const AddCategory = ({ initialData,changeView }) => {
  // If initialData is provided, it means we are in "edit" mode
  const [categoryName, setCategoryName] = useState(initialData?.categoryName || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [image, setImage] = useState(null); // To handle image upload, or update if needed
  const [isEditMode, setIsEditMode] = useState(!!initialData); // Check if we are editing

  // To load an existing image for editing (you can customize this based on your data structure)
  useEffect(() => {
    if (initialData?.image) {
      setImage(initialData.image); // Load initial image (if editing)
    }
  }, [initialData]);

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    // Form submission logic
 
    const params = new FormData();
    params.append('name', categoryName);
    if (image)
    params.append('cat_image', image);
    params.append('cat_desc', description);
    params.append('cat_desc_text', description);
    params.append('is_active', true);

    let response;
    response = await categoryService.addCategory(params);
    if (response.success === true) {
      changeView('category-list');
    }
    
  };

  return (
    <Box sx={{ width: '80%', margin: '0 auto', padding: '20px', boxShadow: 3 }}>
      {/* Title */}
      <Typography variant="h5" sx={{ marginBottom: 3 }}>
        {isEditMode ? 'EDIT CATEGORY' : 'ADD CATEGORY'}
      </Typography>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {/* Category Name */}
        <TextField
          label="Category Name"
          variant="outlined"
          fullWidth
          required
          sx={{ marginBottom: 3 }}
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />

        {/* Upload Image */}
        <FormControl sx={{ width: '100%', marginBottom: 3 }} required>
          <InputLabel shrink>Upload Image</InputLabel>
          <Button variant="outlined" component="label" fullWidth>
            {isEditMode && image ? 'Change File' : 'Choose File'}
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
          {image && typeof image === 'object' ? (
            <Typography variant="body2">{image.name}</Typography>
          ) : (
            <Typography variant="body2">Current Image: {image}</Typography>
          )}
          <Typography variant="caption">The recommended image size should be 300 x 300</Typography>
        </FormControl>

        {/* Description */}
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          minRows={4}
          sx={{ marginBottom: 3 }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Save Button */}
        <Button type="submit" variant="contained" color="primary">
          {isEditMode ? 'Update' : 'Save'}
        </Button>
      </form>
    </Box>
  );
};

export default React.memo(AddCategory);
