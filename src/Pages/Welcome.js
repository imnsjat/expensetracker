import classes from './Welcome.module.css'
import { Link } from 'react-router-dom';

const Welcome = ()=>{

    return (
        <div className={classes.title}>
            <span className={classes.h1}>Welcome to expense Tracker</span>
            <span className={classes.message}>
                    <span>Your Profile is Incomplete ... </span>
                    <span className={classes.sp}><Link to='/Profile'>Complete Now</Link></span>
            </span>
            
        </div>
    )
};
export default Welcome;