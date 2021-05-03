import React from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// import components
import Nav from "./components/nav";
import OrderCurrent from "./pages/orderCurrent";
import OrderPast from "./pages/orderPast";
import Checkout from "./pages/checkout";
import OrderStatus from "./pages/orderStatus";

function App() {
  return (
    <div>
      <Router>
        <Nav />
        <Switch>

          <Route exact path="/" />

          <Route exact path="/cart" component={OrderCurrent} />
          <Route exact path="/cart/past" component={OrderPast} />
          <Route exact path="/cart/checkout" component={Checkout} />
        </Switch>
        
      </Router>
      
    </div>
  );
}

export default App;
