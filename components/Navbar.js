import Link from "next/Link";
import axios from "axios";
import React, { useState, useEffect } from 'react';

const handleLogout = async () => {
    const result = await axios.get("/api/auth/logout");
    
    if(result.data.status === 200) return location.href = "/"; 
    
    alert(result.data.message);
};

export default function Nav() { 
  const [ isLogin, setIsLogin ] = useState(false);
    
  useEffect(async () => {
    const result = await axios.post("/api/user");
      
    if(result.data.user) setIsLogin(true);
  }, []);
    
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
  <div className="container">
    <a className="navbar-brand">Next Auth</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link href="/">
            <a className="nav-link">Home Page</a>
          </Link>
        </li>
      </ul>
        
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className={"nav-item", isLogin ? "d-none" : "d-block"}>
            <Link href="/login">
                <a className="nav-link">Login</a>
            </Link>
        </li>
        <li className={"nav-item", isLogin ? "d-none" : "d-block"}>
            <Link href="/register">
                <a className="nav-link">Register</a>
            </Link>
        </li>
        <li className={"nav-item", isLogin ? "d-block" : "d-none"}>
            <a className="nav-link" style={{cursor: "pointer"}} onClick={() => handleLogout()}>Logout</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
  ); 
};