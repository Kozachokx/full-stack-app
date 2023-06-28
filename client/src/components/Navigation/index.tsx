import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import './style.css';
import { LocalStorage } from "../../api/local-storage";
import { logout } from "../../features";

export function Navigation() {
  const navigate = useNavigate();
  const [ tokens, setTokens ] = useState(''); 

  const tokenStorage = localStorage.getItem('tokens');

  const checkUser = () => {
    let localTokens = LocalStorage.getTokens();

    if (
        localTokens &&
        JSON.stringify(localTokens) !== tokens
      ) {
        setTokens(JSON.stringify(localTokens));
    }
  }

  useEffect(() => {
    console.log(`[*] Navigation`, !!tokens)
    checkUser();
  }, [])

  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    await logout();

    setIsLoading(false);

    navigate('/', { replace: true });
  };

  return (
    <nav className="nav-bar">
      <div className="nav-block">
      {/* <span style={{ display: "flex" }}> */}
        <ion-icon name="rose"></ion-icon>
        <ion-icon name="flame"></ion-icon>
        <Link to="/" className="nav-item">Home</Link>
      {/* </span> */}
      </div>
      <div className="nav-block">
        <Link to="/reviews" className="nav-item">Reviews</Link>
        <Link to="/tools" className="nav-item">Tools</Link>
        {
          tokenStorage
            // ? <button className="nav-item" onClick={handleSubmit}>Logout</button>
            ? <Link to="/login" className="nav-item" onClick={handleSubmit}>Logout</Link>
            : <Link to="/login" className="nav-item">Login</Link>
        }
      </div>
    </nav>
  );
}

// export default Navigation;
