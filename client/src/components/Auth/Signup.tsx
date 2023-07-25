import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import backendApi from "../../services/backend-api";
import "./styles.css";
import { EyeIcon, EyeOffIcon } from "../../assets";

export function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [showPassword_1, setShowPass_1] = useState(false);
  const [showPassword_2, setShowPass_2] = useState(false);
  const handleShowPass_1 = (e) => {
    e.preventDefault();
    setShowPass_1((e) => {
      return !e;
    });
  };
  const handleShowPass_2 = (e) => {
    e.preventDefault();
    setShowPass_2((e) => {
      return !e;
    });
  };

  const [emailError, setEmailError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);
  const [error, setError] = useState("");
  const cleanError = (sec = 4) => {
    setTimeout(() => {
      setError("");
    }, (Number(sec) || 0) * 1000);
  };

  // To prevent change data when sending request.
  const [isLoading, setIsLoading] = useState(false);

  const handleUserInput = (e) => setUsername(e.target.value);
  const handleEmailInput = (e) => setEmail(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);
  const handlePwdCnfrmInput = (e) => setPasswordConfirm(e.target.value);

  const checkPasswordsOnBlur = (isMainPass = false, t = this) => {
    console.log(isMainPass, passwordConfirm, password !== passwordConfirm);
    if (
      (isMainPass && passwordConfirm && password !== passwordConfirm) ||
      (!isMainPass && password !== passwordConfirm)
    ) {
      setError("Passwords not match!");
      setPasswordConfirmError(true);
    } else {
      setError("");
      setPasswordConfirmError(false);
    }
    // cleanError();
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    // Prevent default form action
    e.preventDefault();

    if (!username) {
      setUsernameError(true);
      setError("Username is required!");
    }

    if (!email) {
      setError("Email is required!");
    }
    if (!password) {
      setError("Password is required!");
    }
    if (!passwordConfirm) {
      setError("Password confirm is required!");
    }

    if (error) return setIsLoading(false);

    const { data, success } = await backendApi.auth.signup({
      username,
      password,
      email,
    });

    if (!success) {
      setError(data.message || data.error.message || "Something went worng!");
    }

    setIsLoading(false);

    if (success) {
      navigate("/login", { state: { username, password }, replace: false });
    }
  };

  useEffect(() => {
    if (password !== passwordConfirm) {
    }
  }, [passwordConfirm]);

  const refErr = React.useRef(null);

  return (
    <>
      <div className="login-block">
        {error && (
          <div
            ref={refErr}
            className={`signup-error ${error ? "show" : ""}`}
            onTransitionEnd={(e) => {
              console.log("Test transition");
            }}
          >
            {error}
          </div>
        )}

        <form className="form-middle login-form" onSubmit={handleSubmit}>
          <div>Sign Up</div>

          <input
            id="username"
            type="text"
            value={username}
            disabled={isLoading}
            placeholder="Username"
            onChange={handleUserInput}
            className={`form-input ${
              usernameError ? "signup-input-error" : ""
            }`}
            required={true}
          />

          <input
            id="email"
            type="email"
            value={email}
            disabled={isLoading}
            placeholder="Email"
            onChange={handleEmailInput}
            required={true}
            className="form-input"
          />

          <div className="combo">
            <input
              id="password"
              type={showPassword_1 ? "text" : "password"}
              value={password}
              disabled={isLoading}
              placeholder="Password"
              onChange={handlePwdInput}
              required={true}
              className="form-input"
              onBlur={(e) => checkPasswordsOnBlur(true, e)}
            />
            <span className="combo-in-right">
              <button className="show-pass" onClick={handleShowPass_1}>
                <img
                  src={showPassword_1 ? EyeOffIcon : EyeIcon}
                  className="show-password-icon"
                  alt=""
                />
              </button>
            </span>
          </div>

          <div className="combo">
            <input
              id="password-confirm"
              type={showPassword_2 ? "text" : "password"}
              value={passwordConfirm}
              disabled={isLoading}
              placeholder="Confirm password"
              onChange={handlePwdCnfrmInput}
              required={true}
              className={`form-input ${
                passwordConfirmError ? "signup-input-error" : ""
              }`}
              onBlur={() => checkPasswordsOnBlur()}
            />
            <span className="combo-in-right">
              <button className="show-pass" onClick={handleShowPass_2}>
                <img
                  src={showPassword_2 ? EyeOffIcon : EyeIcon}
                  className="show-password-icon"
                  alt=""
                />
              </button>
            </span>
          </div>

          <button type="submit">Signup</button>
        </form>
        <p className="login-no-acc">Already have an account? </p>
        <Link to="/login">Login</Link>
      </div>
    </>
  );
}
