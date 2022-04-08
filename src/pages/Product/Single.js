import React from 'react';
import { useHistory, useParams } from 'react-router';
import axios from 'axios';

const Single = () => {
  const history = useHistory();
  const { productId } = useParams();
  const [product, setProduct] = React.useState({
    name: '',
    price: 0,
    stock: 1,
    status: true,
  });

  React.useEffect(() => {
    axios
      .get(`http://localhost:3000/product/${productId}`)
      .then((response) => {
        const { status, message, data } = response.data;
        if (status === 'success') {
          setProduct(data);
        } else {
          alert(message);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, [productId]);

  const handleDelete = async (id) => {
    if (window.confirm('Yakin mau dihapus')) {
      try {
        const response = await axios.delete(
          'http://localhost:3000/product/' + id
        );
        const { message } = response.data;
        alert(message);
        history.push('/product');
      } catch (error) {
        alert('Network error');
      }
    }
  };

  return (
    <div>
      <h2>Halaman Single Product</h2>
      {product && (
        <>
          <div>Name: {product.name}</div>
          <div>Price: {product.price}</div>
          <div>Stock: {product.stock}</div>
          <div>Status: {product.status ? 'on' : 'off'}</div>
          <button onClick={() => handleDelete(product._id)}>Delete</button>
        </>
      )}
      <button onClick={() => history.push('/product')}>&laquo; back</button>
    </div>
  );
};

export default Single;
