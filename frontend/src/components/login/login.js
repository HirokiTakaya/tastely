import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './login.css'; 
import landing from './landing.JPG'; 
import { BACKEND_API } from '../../config'; 
import { auth }  from '../../firebase'; 
import { FcGoogle } from 'react-icons/fc';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'; // GoogleAuthProvider を直接インポート

const Login = (props) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const textStyle = {
    color: 'black',
    fontSize: '40px',
    fontWeight: 'bold'
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = () => {
    axios({
      method: 'post',
      url: `${BACKEND_API}/login`,
      data: user,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      props.setLoginUser(res.data.user);
      alert('Congrats ' + res.data.user.email + ' Login Successful');
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/home');
    })
    .catch((error) => {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    });
  };

  
const loginWithFirebase = async () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      
      const user = result.user;
      console.log("Login successful:", user);
      
      
      props.setLoginUser(user);
      
      localStorage.setItem('user', JSON.stringify(user));
      
      navigate('/home');
    })
    .catch((error) => {
      
      console.error("Login failed:", error);
    });
};

  return (
    <div className="Login">
      <div className="login-image">
        <img src={landing} alt="Login Page" />
      </div>
      <div className="login-form">
        <h1 style={textStyle}>Welcome to Tastley</h1>
        <label className="input-label">Email</label>
        <input 
          type="email"
          name="email"
          value={user.email}
          placeholder="Enter your email"
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={user.password}
          placeholder="Enter your password"
          onChange={handleChange}
        />
        <button className="button" onClick={login}>Login</button>
        <div className="register-link">
          <Link to="/register"> No Account? Register Here</Link>
        </div>
        <div className="login-icon" onClick={loginWithFirebase}>
           <FcGoogle />
        </div>
      </div>
    </div>
  );
};

export default Login;
