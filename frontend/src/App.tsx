import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// import components
import Nav from "./components/nav";
import OrderCurrent from "./pages/orderCurrent";
import OrderPast from "./pages/orderPast";
import Checkout from "./pages/checkout";
import OrderStatus from "./pages/orderStatus";
// import Login from "./pages/customerLogin";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Profile from "./pages/profile";

function App() {

  return (
    <div>
      <Router>
        <Nav />
        <Switch>

          <Route exact path="/" />
          <Route exact path="/profile/login" component={Login} />
          <Route exact path="/profile/signup" component={Signup} />
          <Route exact path="/profile/proof" component={Profile} />
          <Route exact path="/cart/orderstatus" component={OrderStatus} />
          <Route exact path="/cart" component={OrderCurrent} />
          <Route exact path="/cart/past" component={OrderPast} />
          <Route exact path="/cart/checkout" component={Checkout} />
        </Switch>
        
      </Router>
      
    </div>
  );
}

export default App;
