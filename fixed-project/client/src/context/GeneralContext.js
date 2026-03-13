import React, { createContext, useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const GeneralContext = createContext();

const GeneralContextProvider = ({children}) => {

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usertype, setUsertype] = useState('');
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    fetchCartCount();
  }, []);

  const fetchCartCount = async () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      try {
        const response = await axios.get('http://localhost:6001/api/cart/fetch-cart');
        const items = Array.isArray(response.data) ? response.data : [];
        const count = items.reduce((acc, item) => acc + (parseInt(item.quantity) || 0), 0);
        setCartCount(count);
      } catch (err) {
        console.error("Cart fetch error:", err);
      }
    }
  };

  // LOGIN — simple: find user in DB, store _id in localStorage
  const login = async () => {
    if (!email || !password) {
      alert("Email and password are required!");
      return;
    }
    try {
      const res = await axios.post('http://localhost:6001/api/users/login', {
        email: email.trim(),
        password
      });
      localStorage.setItem('userId', res.data._id);
      localStorage.setItem('userType', res.data.usertype);
      localStorage.setItem('username', res.data.username);
      localStorage.setItem('email', res.data.email);

      if (res.data.usertype === 'customer') {
        navigate('/');
      } else if (res.data.usertype === 'admin') {
        navigate('/admin');
      }
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Login failed!!");
    }
  };

  // REGISTER
  const register = async () => {
    try {
      const res = await axios.post('http://localhost:6001/api/users/register', {
        username, email, usertype, password
      });
      localStorage.setItem('userId', res.data._id);
      localStorage.setItem('userType', res.data.usertype);
      localStorage.setItem('username', res.data.username);
      localStorage.setItem('email', res.data.email);

      if (res.data.usertype === 'customer') {
        navigate('/');
      } else if (res.data.usertype === 'admin') {
        navigate('/admin');
      }
    } catch (err) {
      alert("Registration failed!!");
      console.error(err.response?.data || err.message);
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.clear();
    setCartCount(0);
    navigate('/');
  };

  return (
    <GeneralContext.Provider value={{
      login, register, logout,
      username, setUsername,
      email, setEmail,
      password, setPassword,
      usertype, setUsertype,
      cartCount, setCartCount,
      fetchCartCount
    }}>
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;
