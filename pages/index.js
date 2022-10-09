import Link from "next/Link";
import Layouts from "../components/Layouts";
import axios from "axios";
import { useEffect, useState } from "react";

const handleLogout = async () => {
    const result = await axios.get("/api/auth/logout");
    
    if(result.data.status === 200) return location.href = "/"; 
    
    alert(result.data.message);
};

export default function Home() {
  const [ isLogin, setIsLogin ] = useState(false);
  const [ user, setUser ] = useState(false);
    
  useEffect(async () => {
      const result = await axios.post("/api/user");
      
      if(!result.data.user) return;
      
      setIsLogin(true);      
      setUser(result.data.user);
  }, []);
     
  return (
      <Layouts>
          <div className="mt-5 text-center">
              <h1 className="text-primary mb-5">Welcome, <span className="text-danger">{ isLogin ? user.username : "NextJS Auth" }</span>!</h1>
              
              <div className={ "d-flex justify-content-center", isLogin ? "d-none" : "d-block" }>
                  <Link href="/login">
                      <a className="btn btn-primary me-1">
                          Login
                      </a>
                  </Link>
                  <Link href="/register">
                      <a className="btn btn-success">
                          Register
                      </a>
                  </Link>
              </div>
              <div className={ "d-flex justify-content-center", isLogin ? "d-block" : "d-none" }>
                  <a className="btn btn-primary me-1" onClick={() => handleLogout()}>
                      Logout
                  </a>
              </div>
          </div>
      </Layouts>
  )
}
