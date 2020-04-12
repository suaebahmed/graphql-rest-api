import React from 'react';
import './App.css';
import { Switch, Redirect, Route } from 'react-router-dom';
import Auth from './pages/Auth';
import Booking from './pages/Booking';
import Events from './pages/Events';
import Nav from './components/navigation/Nav';

function App() {
  return (
    <div className="App">
      <Nav/>
      <Switch>
        <Redirect from='/' to='/' exact />
        <Route path='/auth' component={Auth}/>
        <Route path='/booking' component={Booking}/>
        <Route path='/events' component={Events}/>
      </Switch>
    </div>
  );
}

export default App;
