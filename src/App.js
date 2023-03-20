import React, {useState} from 'react'
import Navbar from './components/Navbar';
import './App.css';
import TextForm from './components/TextForm';
import About from './components/About';
import Alert from './components/Alert';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
 
function App() {

  const [mode, setMode] = useState('light');
  const [modeText, setModeText] = useState('Dark Mode');
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })

    setTimeout(() => {
      setAlert(null);
    }, 2000)
  }

  const toggleMode = () => {
    if (mode == 'light') 
    {
      setMode('dark');
      setModeText('Light Mode');
      document.body.style.backgroundColor = '#042743'
      showAlert('Dark mode has been enabled!', 'success');
      document.title = 'TextUtils - DarkMode';
      // setInterval(() => {
      //   document.title = 'TextUtils - Amazing App';
      // }, 2000);

      // setInterval(() => {
      //   document.title = 'TextUtils - Install Now';
      // }, 1500);
    } 
    else 
    {
      setMode('light');
      setModeText('Dark Mode');
      document.body.style.backgroundColor = 'white'
      showAlert('Light mode has been enabled!', 'success');
      document.title = 'TextUtils - LightMode';
    }
  }

  return (
    <>
    <Navbar title="TextUtils" aboutText="About Us" mode={mode} toggleMode={toggleMode} modeText={modeText}/>
    <Alert alert={alert}/>
    <div className="container my-3">
      <TextForm heading='Enter the text below' mode={mode} showAlert={showAlert}/>
      <About/>
    </div>
    </>
  );
}

export default App;