import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Login } from './components/login';
import { Signup } from './components/signup';
function App() {
  return (
    <div className="App">
      <Routes>
            <Route path={"/"} Component={Login}/>
            <Route path={"/signup"} Component={Signup}/>
        </Routes>
    </div>
  );
}

export default App;
