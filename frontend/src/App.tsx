/* Import the required libraries and types */
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import "./index.css";

/* Import components */
import history from "./history";
import Nav from "./components/nav";
import OrderCurrent from "./pages/orderCurrent";
import OrderPast from "./pages/orderPast";
import Checkout from "./pages/checkout";
import OrderStatus from "./pages/orderStatus";
import CustomerLogin from "./pages/customerLogin";
import Signup from "./pages/signup";
import Profile from "./pages/profile";
import OrderDetails from "./pages/orderDetails";
import Menu from "./pages/menu";
import AddToCart from "./components/addToCart";
import VendorLogin from "./pages/vendorLogin";
import VendorProfile from "./pages/vendorProfile";
import VendorOrder from "./pages/vendorOrder";
import VendorGeolocation from "./pages/vendorGeolocation";
import Home from "./pages/home";
import Rate from "./pages/customerRate";
import ListNearest from "./pages/nearest";
import ProfileAmendName from "./pages/profileAmend";
import ProfileAmendPassword from "./pages/profilePassword";
import Map from "./pages/map";
import Vue from "vue";
import VueAxios from "vue-axios";

/* Enable credentials to be shared among pages */
axios.defaults.withCredentials = true;

/* Change the Axios base URL based on the environment */
switch (process.env.NODE_ENV) {
  case "production":
    axios.defaults.baseURL = "https://snaccs-in-a-van.herokuapp.com";
    break;
  case "development":
  default:
    axios.defaults.baseURL = "http://localhost:48080/api";
    break;
}

Vue.use(VueAxios, axios);

function App() {
  const [open, setOpen] = useState(false);
  const [cartEmpty, setCartEmpty] = useState(true);
  const [itemId, setItemId] = useState<string>("");

  return (
    <div>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/vendor/login" component={VendorLogin} />
          <Route
            exact
            path="/vendor/geolocation"
            component={VendorGeolocation}
          />
          <Route exact path="/vendor/profile" component={VendorProfile} />
          <Route exact path="/vendor/orders" component={VendorOrder} />
          <div>
            <Nav />
            <Route exact path="/map" component={Map} />
            <Route exact path="/customer/login" component={CustomerLogin} />
            <Route exact path="/customer/register" component={Signup} />
            <Route exact path="/customer/profile" component={Profile} />
            <Route
              exact
              path="/customer/profile/amend/name"
              component={ProfileAmendName}
            />
            <Route
              exact
              path="/customer/profile/amend/password"
              component={ProfileAmendPassword}
            />
            <Route exact path="/order/active/status" component={OrderStatus} />
            <Route exact path="/cart/order/active" component={OrderCurrent} />
            <Route exact path="/cart/order/past" component={OrderPast} />
            <Route exact path="/order/rate" component={Rate} />
            <Route exact path="/order/checkout" component={Checkout} />
            <Route exact path="/order/details" component={OrderDetails} />
            <Route exact path="/menu" component={ListNearest} />
            <Route
              exact
              path="/menu/vendor"
              render={() => (
                <Menu
                  openModalForAddingItemWithId={(id: string) => {
                    setItemId(id);
                    setOpen(true);
                  }}
                  cartEmpty={cartEmpty}
                />
              )}
            />
          </div>
        </Switch>
      </Router>
      {open && (
        <AddToCart
          id={itemId}
          open={open}
          handleClose={() => setOpen(false)}
          setCartEmpty={setCartEmpty}
        />
      )}
    </div>
  );
}

export default App;
