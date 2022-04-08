import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const Create = () => {
  const history = useHistory();
  const [product, setProduct] = React.useState({
    name: '',
    price: 0,
    stock: 1,
    status: true,
  });

  const handleChange = (e, name) => {
    const value = e.target.value;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:3000/product',
        product
      );
      const { status, message } = response.data;
      if (status === 'success') {
        alert('Tambah product Success');
        history.push('/product');
      } else {
        alert(message);
      }
    } catch (error) {
      alert('Network Error');
    }
  };

  return (
    <div>
      <CssBaseline />
      <Container maxWidth='sm'>
        <Box
          component='form'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete='off'
        >
          <h2>Halaman Form Create Product</h2>
          <FormControl fullWidth sx={{ alignItems: 'center' }}>
            <TextField
              id='outlined-name'
              label='Name'
              value={product.name}
              onChange={(e) => handleChange(e, 'name')}
            />
            <TextField
              id='outlined-price'
              label='Price'
              type='number'
              value={product.price}
              onChange={(e) => handleChange(e, 'price')}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id='outlined-stock'
              label='Stock'
              type='number'
              value={product.stock}
              onChange={(e) => handleChange(e, 'stock')}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id='demo-simple-select-label'>Status</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                label='Status'
                value={product.status}
                onChange={(e) => handleChange(e, 'status')}
              >
                <MenuItem value={false}>Off</MenuItem>
                <MenuItem value={true}>On</MenuItem>
              </Select>
            </FormControl>
          </FormControl>
          <ButtonGroup
            aria-label='primary button group'
            sx={{ marginTop: '100px' }}
          >
            <Button onClick={handleSubmit}>Submit</Button>
            <Button onClick={() => history.push('/product')}>
              &laquo; Back
            </Button>
          </ButtonGroup>
        </Box>
      </Container>
    </div>
  );
};

export default Create;
