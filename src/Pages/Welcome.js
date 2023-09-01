import { useContext } from 'react';
import classes from './Welcome.module.css';
import { Link, useNavigate } from 'react-router-dom';
import loginContext from '../Store/Login-Context';
import ExpenseForm from '../Components/ExpenseForm';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../Redux-Store';

const Welcome = () => {
  const navigate = useNavigate();
  const logincntx = useContext(loginContext);
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses);
  console.log('expenses',expenses);

  const loginHandler = () => {
    if (!logincntx.isloggedIn) {
      navigate('/');
    }
  };
  loginHandler();

  const logoutHandler = () => {
    dispatch(authActions.logout());
    navigate('/');
  };

  return (
    <>
      <div className={classes.title}>
        <span className={classes.h1}>Welcome to expense Tracker</span>
        <button className={classes.button} onClick={logoutHandler}>
          Logout
        </button>
        <span className={classes.message}>
          <span>If Your Profile is Incomplete ... </span>
          <span className={classes.sp}>
            <Link to="/Profile">Complete Now</Link>
          </span>
        </span>
      </div>
      <ExpenseForm className={classes.form} />
      
    </>
  );
};
export default Welcome;