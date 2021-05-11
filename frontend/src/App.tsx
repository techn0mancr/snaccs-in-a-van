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
import VendorOrders from "./pages/vendorOrders";

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
        <Route exact path="/vendor/login" component={VendorLogin} />
        <Route exact path="/vendor/profile" component={VendorProfile} />
        <Route exact path="/vendor/orders" component={VendorOrders} />
          <div>
            <Nav />
            <Route exact path="/" />
            <Route exact path="/customer/login" component={CustomerLogin} />
            <Route exact path="/customer/register" component={Signup} />
            <Route exact path="/customer/profile" component={Profile} />
            <Route path="/order/active/status" component={OrderStatus}/>
            <Route exact path="/cart/order/active" component={OrderCurrent} />
            <Route exact path="/cart/order/past" component={OrderPast} />
            <Route exact path="/order/checkout" component={Checkout} />
            <Route path="/order/details" component={OrderDetails} />
            <Route exact path="/menu" component={Menu} />
            <Route path="/menu/item" component={AddToCart} />
          </div>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
