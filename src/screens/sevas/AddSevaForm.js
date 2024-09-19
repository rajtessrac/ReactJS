import React, { useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Box, Typography } from '@mui/material';
import { Editor, EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
// import RichTextEditor from '../../components/RichTextEditor';

const AddSevaForm = ({ editMode, initialData, changeView }) => {
  
  const initialEditorState = [
    {
      type: 'paragraph',
      children: [{ text: 'Enter some rich text here!' }],
    },
  ];

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  

  // Form fields state
  const [sevaName, setSevaName] = useState('');
  const [category, setCategory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [sevaTime, setSevaTime] = useState('');
  const [price, setPrice] = useState('');
  const [recurringSeva, setRecurringSeva] = useState('');
  const [image, setImage] = useState(null);

  // Validation states
  const [sevaNameError, setSevaNameError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Handle form input changes
  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validation checks
    setSevaNameError(!sevaName);
    setCategoryError(!category);
    setImageError(!image);

    if (sevaName && category && image) {
      const formData = {
        sevaName,
        category,
        startDate,
        endDate,
        sevaTime,
        price,
        recurringSeva,
        description: convertToRaw(editorState.getCurrentContent()), // Save editor content
        image,
      };
      console.log("Form submitted:", formData);
      // Handle form submission logic here (e.g., send formData to API)
    }
  };

  // Set initial form values in edit mode
  useEffect(() => {
    if (editMode && initialData) {
      setSevaName(initialData.sevaName);
      setCategory(initialData.category);
      setStartDate(initialData.startDate);
      setEndDate(initialData.endDate);
      setSevaTime(initialData.sevaTime);
      setPrice(initialData.price);
      setRecurringSeva(initialData.recurringSeva);
      setEditorState(EditorState.createWithContent(convertFromRaw(initialData.description)));
      setImage(initialData.image); // You may need to handle file previews for image
    }
  }, [editMode, initialData]);

  return (
    <Box sx={{ width: '80%', margin: '0 auto', padding: '20px', boxShadow: 3 }}>
      <Typography variant="h5" gutterBottom>
        {editMode ? 'EDIT SEVA' : 'ADD SEVA'}
      </Typography>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
          <Button onClick={()=>{
            changeView('seva-list')
          }} variant="contained" color="primary" type="submit">
            {'Back'}
          </Button>
        </Box>
      <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }} onSubmit={handleSubmit}>
        {/* Category Field */}
        <FormControl sx={{ width: '48%', marginBottom: 2 }} required error={categoryError}>
          <InputLabel>Select Category</InputLabel>
          <Select value={category} onChange={(e) => setCategory(e.target.value)}>
            <MenuItem value="">Select Category</MenuItem>
            <MenuItem value="category1">Category 1</MenuItem>
            <MenuItem value="category2">Category 2</MenuItem>
          </Select>
          {categoryError && <Typography color="error">Category is required</Typography>}
        </FormControl>

        {/* Seva Name */}
        <TextField
          sx={{ width: '48%', marginBottom: 2 }}
          label="Seva Name"
          variant="outlined"
          value={sevaName}
          onChange={(e) => setSevaName(e.target.value)}
          required
          error={sevaNameError}
          helperText={sevaNameError ? "Seva Name is required" : ""}
        />

        {/* Start Date */}
        <TextField
          sx={{ width: '48%', marginBottom: 2 }}
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />

        {/* End Date */}
        <TextField
          sx={{ width: '48%', marginBottom: 2 }}
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />

        {/* Seva Start Time */}
        <TextField
          sx={{ width: '48%', marginBottom: 2 }}
          label="Seva Start Time"
          type="time"
          value={sevaTime}
          onChange={(e) => setSevaTime(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />

        {/* Price INR */}
        <TextField
          sx={{ width: '48%', marginBottom: 2 }}
          label="Price INR"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />

        {/* Recurring Sevas */}
        <FormControl sx={{ width: '48%', marginBottom: 2 }}>
          <InputLabel>Recurring Sevas</InputLabel>
          <Select value={recurringSeva} onChange={(e) => setRecurringSeva(e.target.value)}>
            <MenuItem value="">Select</MenuItem>
            <MenuItem value="recurring1">Recurring 1</MenuItem>
            <MenuItem value="recurring2">Recurring 2</MenuItem>
          </Select>
        </FormControl>

        {/* Upload Image */}
        <TextField
          sx={{ width: '48%', marginBottom: 2 }}
          type="file"
          InputLabelProps={{ shrink: true }}
          onChange={handleImageChange}
          error={imageError}
          helperText={imageError ? "Image is required" : ""}
          required
        />

        {/* Description - Rich Text Editor */}
        {/* <Box sx={{ width: '100%', marginBottom: 2 }}>
          <Typography variant="body1">Description</Typography>
          <Box sx={{ border: '1px solid #ccc', minHeight: '150px', padding: 1 }}>
          <RichTextEditor value={editorState} onChange={handleEditorChange} />

          </Box>
        </Box> */}

        {/* Save Button */}
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
          <Button variant="contained" color="primary" type="submit">
            {editMode ? 'Update' : 'Save'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(AddSevaForm);
