import React, { useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Box, Typography } from '@mui/material';
import { useEditor, EditorContent } from '@tiptap/react';
import 'draft-js/dist/Draft.css';
import StarterKit from '@tiptap/starter-kit';
import eventsService from '../../services/eventsService';
import { Editable, Slate, withReact } from 'slate-react';
import { createEditor } from 'slate';
import { useLoader } from '../../provider/LoaderProvider';
// import RichTextEditor from '../../components/RichTextEditor';

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
]

const AddSevaForm = ({ editMode, initialData, changeView }) => {

  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello World!</p>',
  });

  const recurrence = [
    { recurringEvent: 'Select Recurring Sevas', id: -1 },
    { recurringEvent: 'Every Day', id: 1 },
    { recurringEvent: 'Every Week', id: 2 },
    { recurringEvent: 'Every Month', id: 3 },
    { recurringEvent: 'Every Year', id: 4 },
  ];



  // Form fields state
  const [sevaName, setSevaName] = useState('');
  const [category, setCategory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [sevaTime, setSevaTime] = useState('');
  const [price, setPrice] = useState('');
  const [recurringSeva, setRecurringSeva] = useState('');
  const [image, setImage] = useState(null);
  const [categoryList, setCategoryList] = React.useState([]);

  // Validation states
  const [sevaNameError, setSevaNameError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { startLoader, stopLoader } = useLoader();

  // Handle form input changes
  const handleEditorChange = (state) => {
    // setEditorState(state);
  };

  const handleImageChange = (event) => {
    console.log('image', event.target.files[0]);
    setImage(event.target.files[0]);
  };

  const getCategories = async () => {
    const response = await eventsService.getCategories();
    
    console.log('response', response);
    if (response.data && response.data.length > 0) {
      setCategoryList(response.data);
    }
  }

  const handleSubmit = async (event) => {

    try {
      startLoader();
      event.preventDefault();

      setSevaNameError(!sevaName);
      setCategoryError(!category);
      setImageError(!image);
      
      if (sevaName && category && image) {
        const formData = new FormData();
        formData.append('title', sevaName);
        formData.append('category', category);
        formData.append('startDate', startDate);
        formData.append('endDate', endDate);
        formData.append('time', sevaTime);
        formData.append('amount', price);
        formData.append('recurrence', recurringSeva);
        formData.append('description', '<p>test</p>');
        formData.append('descriptionText', '');
        formData.append('img', image);

        const response = await eventsService.addEvent(formData);

        if (response.success === true) {
          
          changeView('seva-list');
        }
      }
    }
    catch (e) {
      console.log(e);
    }
    finally {
      stopLoader();
    }
  };

  useEffect(() => {
    getCategories();
  }, [])


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
      // setEditorState(EditorState.createWithContent(convertFromRaw(initialData.description)));
      setImage(initialData.image); // You may need to handle file previews for image
    }
  }, [editMode, initialData]);

  return (
    <Box sx={ { width: '80%', margin: '0 auto', padding: '20px', boxShadow: 3 } }>
      <Typography variant="h5" gutterBottom>
        { editMode ? 'EDIT SEVA' : 'ADD SEVA' }
      </Typography>
      <Box sx={ { width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: 2 } }>
        <Button onClick={ () => {
          changeView('seva-list')
        } } variant="contained" color="primary" type="submit">
          { 'Back' }
        </Button>
      </Box>
      <Box component="form" sx={ { display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' } } onSubmit={ handleSubmit }>
        {/* Category Field */ }
        <FormControl sx={ { width: '48%', marginBottom: 2 } } required error={ categoryError }>
          <InputLabel>Select Category</InputLabel>
          <Select value={ category } onChange={ (e) => setCategory(e.target.value) }>

            <MenuItem value="">Select Category</MenuItem>
            { categoryList.map(category => <MenuItem value={ category.id }>{ category.name }</MenuItem>) }


          </Select>
          { categoryError && <Typography color="error">Category is required</Typography> }
        </FormControl>

        {/* Seva Name */ }
        <TextField
          sx={ { width: '48%', marginBottom: 2 } }
          label="Seva Name"
          variant="outlined"
          value={ sevaName }
          onChange={ (e) => setSevaName(e.target.value) }
          required
          error={ sevaNameError }
          helperText={ sevaNameError ? "Seva Name is required" : "" }
        />

        {/* Start Date */ }
        <TextField
          sx={ { width: '48%', marginBottom: 2 } }
          label="Start Date"
          type="date"
          value={ startDate }
          onChange={ (e) => setStartDate(e.target.value) }
          InputLabelProps={ { shrink: true } }
        />

        {/* End Date */ }
        <TextField
          sx={ { width: '48%', marginBottom: 2 } }
          label="End Date"
          type="date"
          value={ endDate }
          onChange={ (e) => setEndDate(e.target.value) }
          InputLabelProps={ { shrink: true } }
        />

        {/* Seva Start Time */ }
        <TextField
          sx={ { width: '48%', marginBottom: 2 } }
          label="Seva Start Time"
          type="time"
          value={ sevaTime }
          onChange={ (e) => setSevaTime(e.target.value) }
          InputLabelProps={ { shrink: true } }
        />

        {/* Price INR */ }
        <TextField
          sx={ { width: '48%', marginBottom: 2 } }
          label="Price INR"
          type="number"
          value={ price }
          onChange={ (e) => setPrice(e.target.value) }
          InputLabelProps={ { shrink: true } }
        />

        {/* Recurring Sevas */ }
        <FormControl sx={ { width: '48%', marginBottom: 2 } }>
          <InputLabel>Recurring Sevas</InputLabel>
          <Select value={ recurringSeva } onChange={ (e) => setRecurringSeva(e.target.value) }>

            { recurrence.map(item => <MenuItem value={ item.id }>{ item.recurringEvent }</MenuItem>) }

          </Select>
        </FormControl>

        {/* Upload Image */ }
        <TextField
          sx={ { width: '48%', marginBottom: 2 } }
          type="file"
          InputLabelProps={ { shrink: true } }
          onChange={ handleImageChange }
          error={ imageError }
          helperText={ imageError ? "Image is required" : "" }
          required
        />

        {/* Description - Rich Text Editor */ }
        <Box sx={ { width: '100%', marginBottom: 2 } }>
          <Typography variant="body1">Description</Typography>
          <Box sx={ { border: '1px solid #ccc', minHeight: '150px', padding: 1 } }>
            <EditorContent editor={ editor } />

          </Box>
        </Box>

        {/* Save Button */ }
        <Box sx={ { width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: 2 } }>
          <Button variant="contained" color="primary" type="submit">
            { editMode ? 'Update' : 'Save' }
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(AddSevaForm);
