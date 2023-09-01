import React, { useRef, useContext,  useEffect , useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from './VerifyEmail.module.css'
import loginContext from "../Store/Login-Context";
const   VerifyEmail = ()=>{

    //   const navigate = useNavigate();
      const loginCtx = useContext(loginContext);
      const code = useRef();
      
      // console.log(code.current.value);
      const navigate = useNavigate();
      
      const getCodeHandler = async () =>{
        
        const token = loginCtx.tokenId
        let url;
        url ="https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAnD99UOERjpJz0ImTtkH8j3TZD7WbvOnM";
        try {
          const res = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
              requestType: 'VERIFY_EMAIL' , 
              idToken: token ,
              returnOobLink: false
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
    
          if (res.ok) {
            const data = await res.json();
            console.log('data recieved',data);
            alert('CODE SENT TO ',data.email);
            navigate('/profile')
            // name.current.value = data.users[0].displayName
            // photourl.current.value = data.users[0].photoUrl

          } else {
            const data = await res.json();
            throw new Error(data.error.message);
          }
        } catch (err) {
          alert(err.message);
          console.log('error message',err.message);
        }
      };



      // const VerifyEmailHandler = async (event) => {
      //   // event.preventDefault();
      //   const token = loginCtx.tokenId
    
      //   let url;
      //   url ="https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAnD99UOERjpJz0ImTtkH8j3TZD7WbvOnM";
      //   try {
      //     const res = await fetch(url, {
      //       method: "POST",
      //       body: JSON.stringify({
      //         oobCode: code.current.value , 
      //       }),
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //     });
    
      //     if (res.ok) {
      //       const data = await res.json();
      //       console.log('email verified',data)
      //       // navigate('/welcome')
      //     } else {
      //       const data = await res.json();
      //       throw new Error(data.error.message);
      //     }
      //   } catch (err) {
      //     alert(err.message);
      //     console.log('error message',err.message);
      //   }
      // };


    return (
        <>
        <div className={classes.title}>
            <span className={classes.h1}>Lionel Messi: "I've failed more times than I've succeeded, but I never gave up."</span>
            <span className={classes.message}>
                    <p>Let's confirm that this email address is yours.</p>
            </span>
        </div>
        <form className={classes.form} 
        // onSubmit={}
        >
        <h2>Click To get a link and verify your email</h2>
        <div>
          <button  onClick={getCodeHandler}>Get Link</button>
        </div>
        {/* <label htmlFor="code">Enter the code recieved:</label> */}
        <input id="code" type="text"  required ref={code}/>
        {/* <div>
          <button  onClick={VerifyEmailHandler}>VERIFY_EMAIL</button>
        </div> */}
      </form>
        </>


    );
};

export default VerifyEmail;