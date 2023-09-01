
import './App.css';
import { Route , Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Welcome from './Pages/Welcome';
import Profile from './Pages/Profile';
import VerifyEmail from './Pages/VerifyEmail';
import { Provider } from 'react-redux';
import store from './Redux-Store/index';
import { useReducer } from 'react';
import { ThemeReducer } from './Redux-Store/ThemeReducer';
import { useEffect } from 'react';



function App() {
  
    const [state, dispatch] = useReducer(ThemeReducer, { darkTheme: false });

  const handleToggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };
  useEffect(() => {
  if (state.darkTheme) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [state.darkTheme]);
  
  return (
    <>
    <Provider store={store}>
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/welcome' element={< Welcome onToggleTheme={handleToggleTheme}/>} />
      <Route path='/profile' element={<Profile/>} />
      <Route path='/verifyemail' element={<VerifyEmail/>} />
    
    </Routes>
    </Provider>
    </>
  );
}

export default App;
