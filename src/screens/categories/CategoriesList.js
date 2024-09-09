import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button,
  Switch, IconButton, TextField
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import './CategoriesList.css'; // Import CSS for styling

// Sample JSON data for categories and events
const categoriesData = [
    {
      "id": 19,
      "name": "category5",
      "cat_image": "https://test.vidyaranyam.in/media/categories/Nithya-puja-Daily-Puja-at-Home-Vidhi-300x300_OvFHLXy.webp",
      "cat_desc_text": "",
      "is_active": true,
      "events": [
        {
          "id": 30,
          "title": "seva7",
          "description": "",
          "description_text": "",
          "img": "https://test.vidyaranyam.in/media/events/bhagavathi_seva_anarghyaa_1_1200x1200_vdUiNUO.jpg",
          "start_date": "2024-08-05",
          "end_date": "2024-08-09",
          "amount": null,
          "recurrence": null,
          "category": [
            "category5",
            19
          ],
          "is_80G_applicable": null,
          "event_time": "14:23",
          "quantity": 0,
          "is_active": true
        },
        {
          "id": 36,
          "title": "testseva80",
          "description": "",
          "description_text": "",
          "img": "https://test.vidyaranyam.in/media/events/s-letter-logo-design-with-elegant-and-slim-leaves-vector-illustration-creative-ic_lAkifTo.jpg",
          "start_date": "2024-08-30",
          "end_date": "2024-08-31",
          "amount": 678,
          "recurrence": 2,
          "category": [
            "category5",
            19
          ],
          "is_80G_applicable": null,
          "event_time": null,
          "quantity": 0,
          "is_active": true
        },
        {
          "id": 38,
          "title": "Jain samvatsari",
          "description": "",
          "description_text": "",
          "img": "https://test.vidyaranyam.in/media/events/MainAfter.webp",
          "start_date": "2024-09-07",
          "end_date": "2024-09-08",
          "amount": 200,
          "recurrence": 1,
          "category": [
            "category5",
            19
          ],
          "is_80G_applicable": null,
          "event_time": "10:26",
          "quantity": 0,
          "is_active": true
        }
      ]
    },
    {
      "id": 17,
      "name": "category3",
      "cat_image": "https://test.vidyaranyam.in/media/categories/Nithya-puja-Daily-Puja-at-Home-Vidhi-300x300_3lXB1LL.webp",
      "cat_desc_text": "Vedas are like a guidebook for how to be a good person and live a good life.Vedas are like a guidebook for how to be a good person and live a good life.Vedas are like a guidebook for how to be a good person and live a good life.Vedas are like a guidebook for how to be a good person and live a good life.",
      "is_active": true,
      "events": [
        {
          "id": 39,
          "title": "Ganesh Chaturthi",
          "description": "",
          "description_text": "",
          "img": "https://test.vidyaranyam.in/media/events/images.jpeg",
          "start_date": "2024-09-07",
          "end_date": "2024-09-17",
          "amount": 300,
          "recurrence": 1,
          "category": [
            "category3",
            17
          ],
          "is_80G_applicable": null,
          "event_time": "09:47",
          "quantity": 0,
          "is_active": true
        }
      ]
    },
    {
      "id": 20,
      "name": "categorytest1",
      "cat_image": "https://test.vidyaranyam.in/media/categories/my-borosil-puja-thali-7-pc-set-samagri-borosil-puja-thali-34040434819210_7Z5SYVL.webp",
      "cat_desc_text": "Acharya is a guide or a mentor who helps people to understand the wisdom of Vedas.",
      "is_active": true,
      "events": [
        {
          "id": 33,
          "title": "sev909",
          "description": "",
          "description_text": "",
          "img": "https://test.vidyaranyam.in/media/events/diya-puja-bell-themselves-set-unmistakable-context-major-celebration-veneration-_IepR66Z.webp",
          "start_date": null,
          "end_date": null,
          "amount": 7,
          "recurrence": null,
          "category": [
            "categorytest1",
            20
          ],
          "is_80G_applicable": null,
          "event_time": null,
          "quantity": 0,
          "is_active": true
        }
      ]
    },
    {
      "id": 21,
      "name": "Category6",
      "cat_image": "https://test.vidyaranyam.in/media/categories/3.jpg",
      "cat_desc_text": "kajhdkajsh",
      "is_active": true,
      "events": []
    },
    {
      "id": 23,
      "name": "cat789",
      "cat_image": "https://test.vidyaranyam.in/media/categories/my-borosil-puja-thali-7-pc-set-samagri-borosil-puja-thali-34040434819210_l64POQj.webp",
      "cat_desc_text": "",
      "is_active": true,
      "events": []
    },
    {
      "id": 24,
      "name": "caty955",
      "cat_image": "https://test.vidyaranyam.in/media/categories/my-borosil-puja-thali-7-pc-set-samagri-borosil-puja-thali-34040434819210_8WyNZ6W.webp",
      "cat_desc_text": "",
      "is_active": true,
      "events": []
    },
    {
      "id": 16,
      "name": "category2",
      "cat_image": "https://test.vidyaranyam.in/media/categories/large-beautiful-hindu-god-krishna-digital-poster-with-uv-original-imagqz8cmhghegpz.webp",
      "cat_desc_text": "how to be a good person and live a good life.how to be a good person and live a good life.how to be a good person and live a good life.how to be a good person and live a good life.how to be a good person and live a good life.how to be a good person and live a good life.",
      "is_active": true,
      "events": [
        {
          "id": 29,
          "title": "sevas6",
          "description": "",
          "description_text": "",
          "img": "https://test.vidyaranyam.in/media/events/Nithya-puja-Daily-Puja-at-Home-Vidhi-300x300_g1qGk2j.webp",
          "start_date": null,
          "end_date": null,
          "amount": 23,
          "recurrence": null,
          "category": [
            "category2",
            16
          ],
          "is_80G_applicable": null,
          "event_time": null,
          "quantity": 0,
          "is_active": true
        },
        {
          "id": 25,
          "title": "seva5",
          "description": "test",
          "description_text": "test",
          "img": "https://test.vidyaranyam.in/media/events/my-borosil-puja-thali-7-pc-set-samagri-borosil-puja-thali-34040434819210_0yuKijp.webp",
          "start_date": "2024-08-01",
          "end_date": "2024-08-03",
          "amount": 568,
          "recurrence": 3,
          "category": [
            "category2",
            16
          ],
          "is_80G_applicable": null,
          "event_time": "05:40",
          "quantity": 0,
          "is_active": true
        },
        {
          "id": 24,
          "title": "seva4",
          "description": "",
          "description_text": "",
          "img": "https://test.vidyaranyam.in/media/events/diya-puja-bell-themselves-set-unmistakable-context-major-celebration-veneration-_akWyBuD.webp",
          "start_date": "2024-07-31",
          "end_date": "2024-08-02",
          "amount": 1334,
          "recurrence": 2,
          "category": [
            "category2",
            16
          ],
          "is_80G_applicable": null,
          "event_time": "13:09",
          "quantity": 0,
          "is_active": true
        },
        {
          "id": 31,
          "title": "seva11",
          "description": "",
          "description_text": "",
          "img": "https://test.vidyaranyam.in/media/events/pooja_r41gRmI.webp",
          "start_date": "2024-08-06",
          "end_date": "2024-08-10",
          "amount": 300,
          "recurrence": null,
          "category": [
            "category2",
            16
          ],
          "is_80G_applicable": null,
          "event_time": null,
          "quantity": 0,
          "is_active": true
        }
      ]
    },
    {
      "id": 18,
      "name": "category4",
      "cat_image": "https://test.vidyaranyam.in/media/categories/rn_image_picker_lib_temp_21b4a1b5-c0be-4c85-ab76-cd2e6387ea5e.jpg",
      "cat_desc_text": "how to be a good person and live a good life.how to be a good person and live a good life.how to be a good person and live a good life.vhow to be a good person and live a good life.how to be a good person and live a good life.vhow to be a good person and live a good life.how to be a good person and live a good life.how to be a good person and live a good life.",
      "is_active": true,
      "events": [
        {
          "id": 32,
          "title": "seva12",
          "description": "<p class=\"ql-align-center\"><br></p>",
          "description_text": "",
          "img": "https://test.vidyaranyam.in/media/events/flower.jpeg",
          "start_date": "2024-08-08",
          "end_date": "2024-08-10",
          "amount": 2600,
          "recurrence": null,
          "category": [
            "category4",
            18
          ],
          "is_80G_applicable": null,
          "event_time": null,
          "quantity": 0,
          "is_active": true
        }
      ]
    },
    {
      "id": 22,
      "name": "cat90",
      "cat_image": "https://test.vidyaranyam.in/media/categories/my-borosil-puja-thali-7-pc-set-samagri-borosil-puja-thali-34040434819210_zgqQJ32.webp",
      "cat_desc_text": "how to be a good person and live a good life.how to be a good person and live a good life.how to be a good person and live a good life.how to be a good person and live a good life.how to be a good person and live a good life.how to be a good person and live a good life.v",
      "is_active": true,
      "events": [
        {
          "id": 35,
          "title": "testfinal3",
          "description": "",
          "description_text": "",
          "img": "https://test.vidyaranyam.in/media/events/my-borosil-puja-thali-7-pc-set-samagri-borosil-puja-thali-34040434819210_xXZrlgM.webp",
          "start_date": null,
          "end_date": null,
          "amount": 33,
          "recurrence": null,
          "category": [
            "cat90",
            22
          ],
          "is_80G_applicable": null,
          "event_time": null,
          "quantity": 0,
          "is_active": true
        },
        {
          "id": 37,
          "title": "sevaaug29",
          "description": "",
          "description_text": "",
          "img": "https://test.vidyaranyam.in/media/events/tumblr_7c2f991fbb4dce43d5d0be37277728fc_4ed3cea6_640.jpg",
          "start_date": "2024-09-27",
          "end_date": "2024-09-28",
          "amount": null,
          "recurrence": null,
          "category": [
            "cat90",
            22
          ],
          "is_80G_applicable": null,
          "event_time": null,
          "quantity": 0,
          "is_active": true
        }
      ]
    },
    {
      "id": 15,
      "name": "category1",
      "cat_image": "https://test.vidyaranyam.in/media/categories/my-borosil-puja-thali-7-pc-set-samagri-borosil-puja-thali-34040434819210_3tJMReD.webp",
      "cat_desc_text": "Vedas are like a guidebook for how to be a good person and live a good life.",
      "is_active": true,
      "events": [
        {
          "id": 22,
          "title": "seva2",
          "description": "",
          "description_text": "",
          "img": "https://test.vidyaranyam.in/media/events/my-borosil-puja-thali-7-pc-set-samagri-borosil-puja-thali-34040434819210.webp",
          "start_date": "2024-08-01",
          "end_date": "2024-08-03",
          "amount": 99,
          "recurrence": 2,
          "category": [
            "category1",
            15
          ],
          "is_80G_applicable": null,
          "event_time": "13:03",
          "quantity": 0,
          "is_active": true
        },
        {
          "id": 21,
          "title": "seva1",
          "description": "",
          "description_text": "",
          "img": "https://test.vidyaranyam.in/media/events/Nithya-puja-Daily-Puja-at-Home-Vidhi-300x300_vKVbnha.webp",
          "start_date": "2024-07-31",
          "end_date": "2024-08-03",
          "amount": 88,
          "recurrence": null,
          "category": [
            "category1",
            15
          ],
          "is_80G_applicable": null,
          "event_time": null,
          "quantity": 0,
          "is_active": true
        },
        {
          "id": 34,
          "title": "sevanewtest1",
          "description": "<p>test1</p>",
          "description_text": "test1",
          "img": "https://test.vidyaranyam.in/media/events/diya-puja-bell-themselves-set-unmistakable-context-major-celebration-veneration-_rxrPheM.webp",
          "start_date": "2024-08-08",
          "end_date": "2024-08-09",
          "amount": 445,
          "recurrence": 2,
          "category": [
            "category1",
            15
          ],
          "is_80G_applicable": null,
          "event_time": "17:43",
          "quantity": 0,
          "is_active": true
        },
        {
          "id": 28,
          "title": "seva4",
          "description": "yes",
          "description_text": "",
          "img": "https://test.vidyaranyam.in/media/events/rn_image_picker_lib_temp_d06d34b8-bd57-4fc2-8bf8-ab04749c06cd.jpg",
          "start_date": "2024-08-03",
          "end_date": "2024-08-10",
          "amount": 666,
          "recurrence": 4,
          "category": [
            "category1",
            15
          ],
          "is_80G_applicable": null,
          "event_time": "12:22",
          "quantity": 0,
          "is_active": true
        },
        {
          "id": 23,
          "title": "seva3",
          "description": "",
          "description_text": "",
          "img": "https://test.vidyaranyam.in/media/events/diya-puja-bell-themselves-set-unmistakable-context-major-celebration-veneration-_GLvTGDl.webp",
          "start_date": "2024-07-31",
          "end_date": "2024-08-01",
          "amount": 558,
          "recurrence": 1,
          "category": [
            "category1",
            15
          ],
          "is_80G_applicable": null,
          "event_time": "12:06",
          "quantity": 0,
          "is_active": true
        }
      ]
    }
  ];

const CategoriesList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState(categoriesData);

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
          <Button variant="contained" color="primary">Add Category</Button>
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
                  <div className="category-details">
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

export default CategoriesList;
