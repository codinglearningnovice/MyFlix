import React, { useRef } from "react";
import "./Register.css";
import { useState} from "react";
import  {backendUrl}  from "./axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const ref = useRef(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const response = await backendUrl.post("/auth/register", {
        username: username,
        password: password,
      });
      console.log("Registration response:", response);
      if (response.statusText === "OK") {
        alert("Registration successful!",response);
        ref.current.reset(); 
        console.log("Registration successful:", response.data);
        navigate("/login");
      } else {
        alert("Registration failed. Please try again.", response);
        console.error("Registration failed:", response);
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert("there is an error. Please try again.");
    }
  };

  return (
    <div>
      <h1>Registration</h1>
      <div className="form_container">
        <form className="register_form" ref={ref}>
          <label htmlFor="Username">Username</label>
          <input
            type="text"
            id="Username"
            name="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="Password">Password</label>
          <input
            type="password"
            name="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="ConfirmPassword">Confirm Password</label>
          <input
            type="password"
            name="ConfirmPassword"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit" onClick={handleRegister}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
