import React from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

// import { useHistory } from 'react-router-dom';

const List = () => {
  const [products, setProducts] = React.useState([]);
  // const history = useHistory();

  React.useEffect(() => {
    axios
      .get('http://localhost:3000/products')
      .then((response) => {
        const { status, message, data } = response.data;
        if (status === 'success') {
          setProducts(data);
        } else {
          alert(message);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  return (
    <div>
      <h2>Halaman List Product</h2>
      {/* <a href='/product/create'>+ CREATE</a> */}
      <Box mb={5}>
        <Button href='/product/create' variant='contained'>
          + CREATE
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Name</TableCell>
              <TableCell align='center'>Price</TableCell>
              <TableCell align='center'>Stock</TableCell>
              <TableCell align='center'>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products &&
              products.map((product, index) => (
                <TableRow key={index}>
                  <TableCell align='center'>
                    <a href={`/product/single/${product._id}`}>
                      {product.name}
                    </a>
                  </TableCell>
                  <TableCell align='center'>{product.price}</TableCell>
                  <TableCell align='center'>{product.stock}</TableCell>
                  <TableCell align='center'>
                    <a href={`/product/update/${product._id}`}>Update</a>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default List;
