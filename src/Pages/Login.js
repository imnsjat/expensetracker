import React, { useRef, useContext, useState } from "react";
// import { useHistory, useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import classes from "./Login.module.css";
import loginContext from "../Store/Login-Context";

const Login = () => {
  const [loginAccount, setCreateAccount] = useState(true);
//   const history = useHistory();
  const navigate = useNavigate();
  const loginCtx = useContext(loginContext);
  const email = useRef();
  const password = useRef();

  const createAccountHandler = () => {
    setCreateAccount((previousState) => {
      return !previousState;
    });
  };
  const loginHandler = async (event) => {
    event.preventDefault();

    let url;
    if (loginAccount) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAnD99UOERjpJz0ImTtkH8j3TZD7WbvOnM";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAnD99UOERjpJz0ImTtkH8j3TZD7WbvOnM";
    }

    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: email.current.value,
          password: password.current.value,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        // console.log(history);
        // history.replace("/home");
        
        const data = await res.json();
        // const convertedData = JSON.stringify(data);
        // console.log('converted data go in local' , convertedData);
        // console.log('data go in loginctx token' , data.idToken
        // )
        loginCtx.login(data.idToken);
        if(loginAccount){  
            navigate('/welcome')
        }
        else{
            // createAccountHandler()
            navigate('/verifyemail')

        }
      } else {
        const data = await res.json();
        throw new Error(data.error.message);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const forgotPasswordHandler = async () => {

    let url;
      url ="https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAnD99UOERjpJz0ImTtkH8j3TZD7WbvOnM";
  
    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          requestType:"PASSWORD_RESET", 
          email: email.current.value, 
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        
        const data = await res.json();
        alert('password reset email sent to : '+data.email);
      } else {
        const data = await res.json();
        throw new Error(data.error.message);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  

  return (
    <div className={classes.login}>
      <h1>{loginAccount ?  'Sign In ' : 'Sign Up'}</h1>
      <form className={classes.form} onSubmit={loginHandler}>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" ref={email} required />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" ref={password} required minLength={7}/>
        <p onClick={forgotPasswordHandler}>forgot password ?  get a reset link on email</p>
        <div>
          <button type="submit">
            {loginAccount ? "Login" : "Create Account"}
          </button>
        </div>
        <p onClick={createAccountHandler}>
          {loginAccount
            ? "Create a new Account"
            : "Login with existing account"}
        </p>
      </form>
    </div>
  );
};

export default Login;