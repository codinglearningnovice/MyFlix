import React from "react";
import "./Login.css";
import { useState , useRef} from "react";
import { useNavigate } from "react-router-dom";
import {backendUrl} from "./axios";




function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const ref = useRef(null);

  const HandleLogin =async (e) => {
        e.preventDefault();
        try {
          const response = await backendUrl.post("/auth/Login", {
            username: username,
            password: password,
          });
          console.log(response.data);
          if (response.statusText === "OK") {
            ref.current.reset();
            localStorage.setItem("token", response.data.accesstoken);
            localStorage.setItem("username", username);
            navigate("/");
          } else {
            alert("Login failed. Please check your credentials.");
          }
        } catch (error) {
          alert("Login failed. Please check your credentials.");
          console.error("Login failed:", error);
          
        }
    }
  return (
    <div>
      <h1>Login Page</h1>
      <div className="form_container">
        <form className="login_form" ref={ref}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            name="username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={HandleLogin}>Sign in</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
