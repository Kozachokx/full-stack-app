import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './style.css';
import { LocalStorage } from "../../api/local-storage";
import { logout } from "../../features";

enum LocationEnum {
  Login = 'login',
  SignUp = 'signup',
}

export function Navigation() {
  const navigate = useNavigate();

  const location = useLocation();
  const [path, setPath] = useState('')

  useEffect(() => {
    const path = location.pathname.split('/').pop();
    setPath(`${path}`);
  }, [location])

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
        <ion-icon name="flame" style={{ display: 'none'}}></ion-icon>
        <Link to="/" className="nav-item a-scale">Home</Link>
      {/* </span> */}
      </div>
      <div className="nav-block">
        <Link to="/reviews" className="nav-item a-scale">Reviews</Link>
        {/* <Link to="/tools" className="nav-item a-scale">Tools</Link> */}
        {
          tokenStorage
            // ? <button className="nav-item a-scale" onClick={handleSubmit}>Logout</button>
            ? <Link to="/login" className="nav-item a-scale" onClick={handleSubmit}>Logout</Link>
            : path === LocationEnum.Login
              ? <Link to="/signup" className="nav-item a-scale">SignUp</Link>
              : <Link to="/login" className="nav-item a-scale">Login</Link>
        }
      </div>
    </nav>
  );
}

// export default Navigation;
