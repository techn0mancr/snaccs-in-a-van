import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// import components
import Nav from "./components/nav";
import OrderCurrent from "./pages/orderCurrent";
import OrderPast from "./pages/orderPast";
import Checkout from "./pages/checkout";
import OrderStatus from "./pages/orderStatus";
import Login from "./pages/customerLogin";
import Signup from "./pages/signup";

function App() {
  return (
    <div>
      <Router>
        <Nav />
        <Switch>

          <Route exact path="/" />
          <Route exact path="/profile/login" component={Login} />
          <Route exact path="/profile/signup" component={Signup} />
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
