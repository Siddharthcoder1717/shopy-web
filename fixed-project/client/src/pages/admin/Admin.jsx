import React, { useEffect, useState } from 'react'
import '../../styles/Admin.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Admin = () => {

  const navigate = useNavigate();

  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);

  useEffect(() => {
    fetchCountData();
  }, []);

  const fetchCountData = async () => {
    try {
      const usersRes = await axios.get('http://localhost:6001/api/users/fetch-users');
      setUserCount(usersRes.data.filter(u => u.usertype === 'customer').length);

      const productsRes = await axios.get('http://localhost:6001/api/products/fetch-products');
      setProductCount(productsRes.data.length);

      const ordersRes = await axios.get('http://localhost:6001/api/orders/fetch-orders');
      setOrdersCount(ordersRes.data.length);
    } catch (err) {
      console.error("Admin dashboard fetch error:", err);
    }
  };

  const [banner, setBanner] = useState('');
  const updateBanner = async () => {
    try {
      await axios.post('http://localhost:6001/api/admin/update-banner', { banner });
      alert("Banner updated");
      setBanner('');
    } catch (err) {
      alert("Banner update failed! Make sure you are logged in as admin.");
    }
  };

  return (
    <div className="admin-page">

      <div>
        <div className="admin-home-card">
          <h5>Total users</h5>
          <p>{userCount}</p>
          <button onClick={() => navigate('/all-users')}>View all</button>
        </div>
      </div>

      <div>
        <div className="admin-home-card">
          <h5>All Products</h5>
          <p>{productCount}</p>
          <button onClick={() => navigate('/all-products')}>View all</button>
        </div>
      </div>

      <div>
        <div className="admin-home-card">
          <h5>All Orders</h5>
          <p>{ordersCount}</p>
          <button onClick={() => navigate('/all-orders')}>View all</button>
        </div>
      </div>

      <div>
        <div className="admin-home-card">
          <h5>Add Product</h5>
          <p>(new)</p>
          <button onClick={() => navigate('/new-product')}>Add now</button>
        </div>
      </div>

      <div>
        <div className="admin-banner-input admin-home-card">
          <h5>Update banner</h5>
          <div className="form-floating">
            <input type="text" className="form-control" id="floatingURLInput" value={banner} onChange={(e) => setBanner(e.target.value)} />
            <label htmlFor="floatingURLInput">Banner url</label>
          </div>
          <button onClick={updateBanner}>Update</button>
        </div>
      </div>

    </div>
  )
}

export default Admin
