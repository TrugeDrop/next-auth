import React, { useState } from "react";
import Head from "next/head";
import axios from "axios";
import Layouts from "../components/Layouts";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
    
  const handleSubmit = async (e) => {
    e.preventDefault();
      
    const credentials = { username, password };
      
    const user = await axios.post("/api/auth/login", credentials);
    
    document.getElementById("output").innerHTML = user.data.message;
      
    if(user.data.status === 200) location.href = "/";
  };
    
  const handleGetUser = async () => {
    const user = await axios.get("/api/user");
      
    document.getElementById("output").innerHTML = user.data.user ? user.data.user.username : user.data.message;
  };
  
  return (
      <Layouts>
          <div className="mt-3">
              <h1>Login</h1>
              <form onSubmit={e => handleSubmit(e)}>
                <label className="form-label">Username</label>
                <input type="text" className="form-control mb-3" name="username" id="username" onChange={e => setUsername(e.target.value)} />

                <label className="form-label">Password</label>
                <input type="password" className="form-control mb-3" name="password" id="password" onChange={e => setPassword(e.target.value)} />

                <input type="submit" value="Login" className="btn btn-primary me-1" />
                <button type="button" className="btn btn-success me-1" onClick={() => handleGetUser()}>
                    Get User
                </button>
              </form>

              <div className="mt-4">
                  <h3 className="text-primary">Output</h3>
                  <span id="output" className="h5">None...</span>
              </div>
          </div>
        </Layouts>
  )
}
