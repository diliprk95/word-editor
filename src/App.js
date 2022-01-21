import react, {useState} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Alert from './Components/Alert';
import Navbar from './Components/Navbar';
import TextEditor from './Components/TextEditor';
import About from './Components/About';
import './App.css';

function App() {

  const [mode, setMode] = useState('info');
  const [alert, setAlert] = useState(null);

  const showAlert = (message,type) =>{
    setAlert({
      msg : message,
      type: type  
    })
    setTimeout(() => {
       setAlert(null);
    }, 1500);
  }

  const toggleMode = () => {
    if(mode === 'info'){
       setMode('dark');
       document.body.style.backgroundColor = '#00101C';
       showAlert("Dark Mode has been Enabled","success");
    }
    else{
      setMode('info');
      document.body.style.backgroundColor = 'white';
      showAlert("Light Mode has been Enabled","success");
    }
  }

  return (
    <>
    <Router>
      <Navbar title='Text Editor' mode={mode} toggleMode = {toggleMode}/>
      <Alert className="my-1" alert={alert}/>
      <div className='container my-3 widthfull' id='myContainer'>
      <Routes>
            <Route exact path='word-editor' element={<TextEditor showAlert={showAlert} label="Enter Text to Edit" mode={mode}/>}/>
            <Route exact path='about' element={<About mode={mode}/>}/>
      </Routes>
      </div>  
    </Router>
    </>

  );
}

export default App;

