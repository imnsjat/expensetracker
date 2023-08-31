import { useContext } from 'react';
import classes from './Welcome.module.css'
import { Link, useNavigate } from 'react-router-dom';
import loginContext from '../Store/Login-Context';

const Welcome = ()=>{
    const navigate = useNavigate();
    const logincntx = useContext(loginContext)
    const loginHandler =()=>{
        if(!logincntx.isloggedIn){
            navigate('/');
        }
    };
    loginHandler();
    const logoutHandler = ()=>{
        logincntx.logout();
        navigate('/');
    }
    return (
        <div className={classes.title}>
            <span className={classes.h1}>Welcome to expense Tracker</span>
            <button className={classes.button} onClick={logoutHandler}>Logout</button>
            <span className={classes.message}>
                    <span>If Your Profile is Incomplete ... </span>
                    <span className={classes.sp}><Link to='/Profile'>Complete Now</Link></span>
            </span>
            
        </div>
    )
};
export default Welcome;