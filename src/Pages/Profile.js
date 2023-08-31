import React, { useRef, useContext,  useEffect , useState} from "react";
import classes from './Profile.module.css'
import loginContext from "../Store/Login-Context";
import { useNavigate } from "react-router-dom";
const   Profile = ()=>{

    //   const navigate = useNavigate();
      const loginCtx = useContext(loginContext);
      const name = useRef();
      const photourl = useRef();
      const navigate = useNavigate();
      
      const profileLoadHandler = async () =>{
        const token = loginCtx.tokenId
    
        let url;
        url ="https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAnD99UOERjpJz0ImTtkH8j3TZD7WbvOnM";
        try {
          const res = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
              idToken: token ,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
    
          if (res.ok) {
            const data = await res.json();
            // console.log('data recieved',data)
            let namee = data.users[0].displayName 
            let purl = data.users[0].photoUrl
            name.current.value = (namee) ? namee : ''
            photourl.current.value = (purl)  ? purl : ''
            

          } else {
            const data = await res.json();
            throw new Error(data.error.message);
          }
        } catch (err) {
          alert(err.message);
          console.log('error message',err.message);
        }
      };


      useEffect(()=>{
        profileLoadHandler();
      },[]);


      const profileUpdateHandler = async (event) => {
        event.preventDefault();
        const token = loginCtx.tokenId
    
        let url;
        url ="https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAnD99UOERjpJz0ImTtkH8j3TZD7WbvOnM";
        try {
          const res = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
              idToken: token , 
              displayName: name.current.value ,
              photoUrl: photourl.current.value ,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
    
          if (res.ok) {
            const data = await res.json();
            console.log('data recieved update',data)
            navigate('/welcome')
          } else {
            const data = await res.json();
            throw new Error(data.error.message);
          }
        } catch (err) {
            console.log(JSON.stringify({
                idToken: token , 
                displayName: name.current.value ,
                photoUrl: photourl.current.value ,
                returnSecureToken: true,
              }))
          alert(err.message);
          console.log('error message',err.message);
        }
      };


    return (
        <>
        <div className={classes.title}>
            <span className={classes.h1}>"The journey of a thousand miles begins with a single step." - Lao Tzu</span>
            <span className={classes.message}>
                    <p>A completed profile has higher chances of landing a job</p>
            </span>
        </div>
        <form className={classes.form} 
        // onSubmit={}
        >
        <h2>Contact Details</h2>
        <label htmlFor="name">FullName:</label>
        <input id="name" type="text"  required ref={name}/>
        <label htmlFor="photourl">Profile Photo Url</label>
        <input id="photourl" type="text"  required ref={photourl} />
        <div>
          <button type="submit" onClick={profileUpdateHandler}>Update</button>
        </div>
      </form>
        </>


    );
};

export default Profile;