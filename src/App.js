
import './App.css';
import { Route , Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Welcome from './Pages/Welcome';
import Profile from './Pages/Profile';


function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/welcome' element={<Welcome/>} />
      <Route path='/profile' element={<Profile/>} />
    
    </Routes>
    </>
  );
}

export default App;
