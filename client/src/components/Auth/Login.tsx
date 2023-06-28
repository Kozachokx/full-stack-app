import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import backendApi from "../../services/backend-api";
// import { setCredentials } from "./authSlice";

import { useDispatch } from "react-redux";
import { LocalStorage } from "../../api/local-storage";

export function Login() {
  const [username, setUsername] = useState("johnny");
  const [password, setPassword] = useState("SecretPass");

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const [errMsg, setErrMsg] = useState("");


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    const { data } = await backendApi.auth.login({
      username,
      password,
    });

    if (data.accessToken && data.refreshToken) {
      const { accessToken, refreshToken } = data;

      LocalStorage.setTokens({ accessToken, refreshToken });

      const { data: userData } = await backendApi.users.getByAuthToken();

      if (userData?.user) {
        const { id, _id, username } = userData.user;
        LocalStorage.setUser({
          id,
          assignedId: _id,
          username,
        })
      }
      
      // localStorage.setItem('tokens', JSON.stringify({ accessToken, refreshToken }));

      // Redux
      // dispatch(setCredentials({ accessToken, refreshToken }));
    }

    setIsLoading(false);

    await new Promise((resolve) =>
      setTimeout(() => resolve(console.log("Done!")), 3000)
    );

    navigate('/', { replace: true });
  };


  const handleUserInput = (e) => setUsername(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);
  // const handleToggle = () => setPersist((prev) => !prev);

  return (
    <div className="login-block">
      {/* <form className="form-middle" onSubmit={(e) => e.preventDefault()}> */}
      <form className="form-middle" onSubmit={handleSubmit}>
        <div>Login</div>

        <label htmlFor="username">Username: </label>

        <input
          id="username"
          type="text"
          value={username}
          disabled={isLoading}
          placeholder="username"
          onChange={handleUserInput}
        />

        <input
          id="password"
          type="password"
          value={password}
          disabled={isLoading}
          placeholder="password"
          onChange={handlePwdInput}
        />

        <button type="submit">Login</button>
      </form>
      <p>Doesn't have account? </p>
      <Link to="/signup">Sign Up</Link>
    </div>
  );
}

// export default Login
