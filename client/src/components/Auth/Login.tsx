import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import backendApi from "../../services/backend-api";
// import { setCredentials } from "./authSlice";
import { EyeIcon, EyeOffIcon } from "../../assets";

import { useDispatch } from "react-redux";
import { LocalStorage } from "../../api/local-storage";
import LoginDev from "./DevLogin";
import CONFIG from "../../config";
import { Loader } from "../Shared/Loader";

function retriveSearchParams() {
  const queryParams = new URLSearchParams(location.search);
  
  return {
    username: queryParams.get("username"),
    password: queryParams.get("password")
  }
}

// https://www.chromium.org/developers/design-documents/create-amazing-password-forms/

export function Login(props) {
  const location = useLocation();

  const query = retriveSearchParams();

  const propsUsername = props?.username || location?.state?.username || query?.username;
  const propsPassword = props?.username || location?.state?.password || query?.password;

  const [username, setUsername] = useState(propsUsername || "");
  const [password, setPassword] = useState(propsPassword || "");

  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPass] = useState(false);
  const handleShowPass = (e) => {
    e.preventDefault();
    setShowPass((e) => {
      return !e;
    });
  };

  const [isLoading, setIsLoading] = useState(false);

  // const dispatch = useDispatch();

  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    const { data, success } = await backendApi.auth.login({
      username,
      password,
    });

    if (!success) {
      let message = data?.message || data?.error?.message || 'Something went wrong!';

      setErrMsg(message);

      if (message === 'User not found!') setUsernameError(true);
      if (message === 'Invalid credentials') setPasswordError(true);

      return setIsLoading(false);
    }

    if (data.accessToken && data.refreshToken) {
      const { accessToken, refreshToken } = data;

      LocalStorage.setTokens({ accessToken, refreshToken });

      const { data: userData } = await backendApi.users.getByAuthToken();

      if (userData && Object.keys(userData).length > 3) {
        const { id, _id, username, isAdmin } = userData;
        LocalStorage.setUser({
          id,
          assignedId: _id,
          username,
          isAdmin
        });
      }

      // localStorage.setItem('tokens', JSON.stringify({ accessToken, refreshToken }));

      // Redux
      // dispatch(setCredentials({ accessToken, refreshToken }));
    }


    await new Promise((resolve) =>
      setTimeout(() => resolve(console.log("Done!")), 3000)
    );

    setIsLoading(false);

    navigate("/", { replace: true });
  };


  const resetErrMsg = () => {
    if (errMsg) setErrMsg('');
  }

  const handleUserInput = (e) => {
    resetErrMsg();
    if (usernameError) setUsernameError(false);
    setUsername(e.target.value);
  }
  const handlePwdInput = (e) => {
    resetErrMsg();
    if (passwordError) setPasswordError(false);
    setPassword(e.target.value);
  }

  return (
    <div className="login-block">

      {
        CONFIG.inDevMode ? <LoginDev /> : ''
      }

      {errMsg && (
        <div className={`signup-error ${errMsg ? "show" : ""}`}>
          {errMsg}
        </div>
      )}

      {/* <form className="form-middle" onSubmit={(e) => e.preventDefault()}> */}
      <form className="form-middle login-form" onSubmit={handleSubmit}>
        { (isLoading && <Loader />) }
        <div>Login</div>

        <input
          id="username"
          type="text"
          value={username}
          disabled={isLoading}
          placeholder="Username"
          onChange={handleUserInput}
          autoComplete="username"
          className={`form-input ${usernameError ? "signup-input-error" : "" }`}
        />

        <div className="combo">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            disabled={isLoading}
            placeholder="Password"
            onChange={handlePwdInput}
            autoComplete="current-password"
            required={true}
            className={`form-input ${passwordError ? "signup-input-error" : "" }`}
          />
          <span className="combo-in-right">
            <button className="show-pass" onClick={handleShowPass}>
              <img
                src={showPassword ? EyeOffIcon : EyeIcon}
                className="show-password-icon"
                alt=""
              />
            </button>
          </span>
        </div>

        <button type="submit">Login</button>
      </form>
      <p className="login-no-acc">Doesn't have account? </p>
      <Link to="/signup">Sign Up</Link>
    </div>
  );
}

// export default Login
