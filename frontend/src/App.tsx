import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Router, Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Vue from 'vue';

import history from './history';

// import components
import Nav from "./components/nav";
import OrderCurrent from "./pages/orderCurrent";
import OrderPast from "./pages/orderPast";
import Checkout from "./pages/checkout";
import OrderStatus from "./pages/orderStatus";
import CustomerLogin from "./pages/customerLogin";
import Signup from "./pages/signup";
import Profile from "./pages/profile";


axios.defaults.withCredentials = true;
Vue.use(VueAxios, axios);

function App() {

  return (
    <div>
      <Router history={history}>
        <Nav />
        <Switch>

          <Route exact path="/" />
          <Route exact path="/customer/login" component={CustomerLogin} />
          <Route exact path="/customer/register" component={Signup} />
          <Route exact path="/customer/profile" component={Profile} />
          <Route exact path="/cart/order" component={OrderStatus} />
          <Route exact path="/cart/order/active" component={OrderCurrent} />
          <Route exact path="/cart/order/past" component={OrderPast} />
          <Route exact path="/cart/checkout" component={Checkout} />
        </Switch>
        
      </Router>  
    </div>
  );
}

export default App;
