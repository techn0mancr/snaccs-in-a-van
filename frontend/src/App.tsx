import "bootstrap/dist/css/bootstrap.min.css";
import { Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import VueAxios from "vue-axios";
import Vue from "vue";
import history from "./history";

// import components
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

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:48080/api";
// axios.defaults.baseURL = "https://snaccs-in-a-van.herokuapp.com";
Vue.use(VueAxios, axios);

export function getId() {
  const query = history.location.search;
  const id = query.replace("?id=", "");
  return id;
}

function App() {
  return (
    <div>
      <Router history={history}>
        <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/vendor/login" component={VendorLogin} />
        <Route exact path="/vendor/geolocation" component={VendorGeolocation}/>
        <Route exact path="/vendor/profile" component={VendorProfile} />
        <Route exact path="/vendor/orders" component={VendorOrder} />
          <div>
            <Nav />
            <Route exact path="/customer/login" component={CustomerLogin} />
            <Route exact path="/customer/register" component={Signup} />
            <Route exact path="/customer/profile" component={Profile} />
            <Route exact path="/order/active/status" component={OrderStatus}/>
            <Route exact path="/cart/order/active" component={OrderCurrent} />
            <Route exact path="/cart/order/past" component={OrderPast} />
            <Route exact path="/order/checkout" component={Checkout} />
            <Route exact path="/order/details" component={OrderDetails} />
            <Route exact path="/order/rate" component={Rate} />
            <Route exact path="/menu/vendor" component={Menu} />
            <Route exact path="/menu/item" component={AddToCart} />
            <Route exact path="/menu" component={ListNearest} />
          </div>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
