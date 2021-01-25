import React from 'react';
import './App.css';
import { NavLink, Route, Switch } from 'react-router-dom';
import CategoryView from './components/containers/category/category';
import LocationView from './components/containers/location/location';

function App() {
  return (
    <div className="App">
      <div className="body-container">
        <Switch>
          <Route path="/location" exact component={LocationView} />
          <Route path="/category" exact component={CategoryView} />
        </Switch>
      </div>

      <div className="footer-container">
        <NavLink activeClassName="active" exact to="/category">
          <div className="link-object">
            <p>Category</p>
          </div>
        </NavLink>
        <NavLink activeClassName="active" exact to="/location">
          <div className="link-object">
            <p>Location</p>
          </div>
        </NavLink>
      </div>
    </div>
  );
}

export default App;
