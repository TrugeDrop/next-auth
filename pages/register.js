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
      
    const user = await axios.post("/api/auth/register", credentials);
    
    document.getElementById("output").innerHTML = user.data.message;
      
    if(user.data.status === 200) location.href = "/login";
  };
  
  return (
      <Layouts>
          <div className="mt-3">
              <h1>Register</h1>
              <form onSubmit={e => handleSubmit(e)}>
                <label className="form-label">Username</label>
                <input type="text" className="form-control mb-3" name="username" id="username" onChange={e => setUsername(e.target.value)} />

                <label className="form-label">Password</label>
                <input type="password" className="form-control mb-3" name="password" id="password" onChange={e => setPassword(e.target.value)} />

                <input type="submit" value="Kayıt Ol" className="btn btn-primary me-1" />
              </form>

              <div className="mt-4">
                  <h3 className="text-primary">Output</h3>
                  <span id="output" className="h5">None...</span>
              </div>
          </div>
        </Layouts>
  )
}
