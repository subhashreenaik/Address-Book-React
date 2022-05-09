import React from 'react';
import './App.css';
import Registration from './component/registration';
import Home from './component/home';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
function App() {
  return (
    <div>
      <Router>
      
     
        <Route exact path="/" component={Home}/>
        <Route exact path="/registration" component={Registration}/> 
        <Route exact path="/registration/:id" component={Registration}/>
      
      
      </Router>
    </div>
  );
}

export default App;
