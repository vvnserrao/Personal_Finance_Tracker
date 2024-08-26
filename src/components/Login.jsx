import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig"; 
import '../styles/Login.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard'); // Redirect to dashboard on successful login
    } catch (error) {
      console.error("Authentication failed:", error.message);
    }
  };

  return (
    <div className="container-login">
      <div className="login-box">
          <h2 className="login-title"> Login</h2>
          <p className="login-description">Welcome back, please log in with your personal info</p>
          <form className="form" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
            />
            <button type="submit" className="submit-button">
              Sign In
            </button>
            <p>Don't have an account? <a href="/signup">Sign Up</a></p>

          </form>
        {/* <div className="login-illustration">
          <img src={img2} alt="Finance Illustration" />
          <p>Get All Your Finances At One Place.</p>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
