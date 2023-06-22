import React, { useState } from "react";
import { Link } from "react-router-dom";
import backendApi from "../../services/backend-api";
import { setCredentials } from "./authSlice";

import { useDispatch } from "react-redux";

export function Login() {
  const [username, setUsername] = useState("johnny");
  const [password, setPassword] = useState("SecretPass");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    // console.warn('Handle pr', e.target)
    const { data } = await backendApi.auth.login({
      username: e.target[0].value,
      password: e.target[1].value,
    });

    console.log("Login logs:");
    console.log(data);
    console.log(data.accessToken && data.refreshToken);

    if (data.accessToken && data.refreshToken) {
      const { accessToken, refreshToken } = data;
      dispatch(setCredentials({ accessToken, refreshToken }));
    }

    setIsLoading(false);

    console.log(data);

    await new Promise((resolve) =>
      setTimeout(() => resolve(console.log("Done!")), 3000)
    );
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
