import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import landing from './landing.JPG';
import "./register.css";
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { BACKEND_API } from "../../config";

const Register = () => {
    
    const firebaseConfig = {
         apiKey: "AIzaSyAMi3lLeW6hCqEMHulmafB_ctjVPbT5IKU",
  authDomain: "auth-5793f.firebaseapp.com",
  projectId: "auth-5793f",
  storageBucket: "auth-5793f.appspot.com",
  messagingSenderId: "464378953514",
  appId: "1:464378953514:web:510d66ef524b2e59892853",
  measurementId: "G-5G2HYEQCXT"
    };

    
    const app = initializeApp(firebaseConfig);
    const storage = getStorage();
    let uploadedImage;

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        reEnterPassword: "",
        usertype: "Owner",
        address: "",
        postalcode: "",
        contact: ""
    });

    const navigate = useNavigate();

    const handleChange = e => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const handleImageChange = e => {
        uploadedImage = e.target.files[0];
    };

    const register = () => {
        let storageRef = ref(storage, `Users/${uploadedImage.name}`);

        uploadBytes(storageRef, uploadedImage).then((snapshot) => {
            getDownloadURL(storageRef)
                .then((url) => {
                    user.imageurl = url;

                    const { name, email, password, reEnterPassword, address, postalcode, contact } = user;
                    if (name && email && password && (password === reEnterPassword) && address && postalcode && contact) {
                        
                        const auth = getAuth();
                        createUserWithEmailAndPassword(auth, email, password)
                            .then((userCredential) => {
                                
                                const firebaseUser = userCredential.user;
                                console.log('Registered with:', firebaseUser.email);
                                localStorage.setItem('user', JSON.stringify({ email: firebaseUser.email, uid: firebaseUser.uid }));
                                navigate('/home');
                            })
                            .catch((error) => {
                                console.error('Registration error:', error);
                            });
                    } else {
                        alert("Please check your inputs");
                    }
                });
        });
    };

    return (
          <div className="Login">

            <div className="login-image">
                <img src={landing} alt="Login Page" />
            </div>

            <div className="login-form">


                <h1>Create Your Free Account Here</h1>
                <div className="user-type">
                    <label>User Type   </label>
                    <input type="radio" name="usertype" value="Owner" checked={user.usertype === "Owner" ? "Owner" : ""} onChange={handleChange} />Owner
                    <input type="radio" name="usertype" value="Customer" checked={user.usertype === "Customer" ? "Customer" : ""} onChange={handleChange} />Customer
                </div>
                <label>Name/Store Name  </label>
                <input type="text" name="name" value={user.name} placeholder="Enter your name" onChange={handleChange} ></input>
                <label>Email  </label>
                <input type="email" name="email" value={user.email} placeholder="Enter your email" onChange={handleChange}></input>
                <label>Password  </label>
                <input type="password" name="password" value={user.password} placeholder="Enter your password" onChange={handleChange}></input>
                <label>Re-Enter Password  </label>
                <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-enter your  Password" onChange={handleChange}></input>
                <label>Address  </label>
                <input type="text" name="address" value={user.address} placeholder="Enter your address" onChange={handleChange} ></input>
                <label>Postal Code  </label>
                <input type="text" name="postalcode" value={user.postalcode} placeholder="Enter Postal Code" onChange={handleChange} ></input>
                <label>Contact </label>
                <input type="text" name="contact" value={user.contact} placeholder="Enter your contact" onChange={handleChange} ></input>

                <label>Profile Image</label>
                <input type="file" name="userimage" onChange={handleImageChange} ></input>

                <button className="button" onClick={register}>Register</button>
                <div class="register-link"><Link to="/login">Already have an account?Login Here</Link></div>
            </div>
        </div>

    );
};

export default Register;
