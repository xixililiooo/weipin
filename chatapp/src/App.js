import React from 'react';
import logo from './logo.svg';
// import './App.css';
import {Button} from 'antd-mobile'
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Main from './pages/main/main'
import Login from './pages/login/login'
import Register from './pages/register/register';
function App() {
  return (
         <div className="App">
           <BrowserRouter>
           <Switch>
           <Route path="/login" component={Login}></Route>
                  <Route path="/register" component={Register}></Route>
                  <Route component={Main}></Route>
           </Switch>
           </BrowserRouter>
</div>

  );
}

export default App;
