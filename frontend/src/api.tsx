import axios from "axios";
import history from "./history";

/* Change the API base URL based on the environment */
var BASE_URL: string = "";
switch (process.env.NODE_ENV) {
    case "production":
        BASE_URL = "https://snaccs-in-a-van.herokuapp.com/api";
        break;
    case "development":
    default:
        BASE_URL = "http://localhost:48080/api";
        break;
}

function addItemToCart(itemId: String, quantity: number) {
  const endpoint = `${BASE_URL}/customer/cart/add/${itemId}`;
  return axios.patch(endpoint, { itemId, quantity: quantity });
}

function checkoutCart() {
  const endpoint = `${BASE_URL}/customer/cart/checkout`;
  return axios.post(endpoint);
}

function completeOrder(orderId: String) {
  const endpoint = `${BASE_URL}/vendor/order/${orderId}/complete`;
  return axios.patch(endpoint);
}

function customerLogin(email: String, password: String) {
  const endpoint = `${BASE_URL}/customer/login`;
  return axios.patch(endpoint, { email, password }).then(
    (response) => {
      history.push("/customer/profile");
      console.log(response);
    },
    (error) => {
      alert("Please enter a valid email & password");
      console.log(error);
    }
  );
}

function customerLogout() {
  const endpoint = `${BASE_URL}/customer/logout`;
  return axios.patch(endpoint);
}

function customerProfile() {
  const endpoint = `${BASE_URL}/customer/profile`;
  return axios.get(endpoint);
}

function customerProfileAmendName(givenName: String, familyName: String) {
  const endpoint = `${BASE_URL}/customer/profile/amend`;
  return axios.patch(endpoint, { givenName, familyName });
}

function customerProfileAmendPassword(password: String) {
  const endpoint = `${BASE_URL}/customer/profile/amend`;
  return axios.patch(endpoint, { password });
}

function customerRegister(email: String, givenName: String, familyName: String, password: String) {
  const endpoint = `${BASE_URL}/customer/register`;
  return axios.post(endpoint, { email, givenName, familyName, password }).then(
    (response) => {
      history.push("/customer/profile");
      console.log(response);
    },
    (error) => {
      console.log(error);
    }
  );
}

async function emptyCart() {
  const endpoint = `${BASE_URL}/customer/cart/clear`;
  return await axios.patch(endpoint);
}

function fulfillOrder(orderId: String) {
  const endpoint = `${BASE_URL}/vendor/order/${orderId}/fulfill`;
  return axios.patch(endpoint);
}

async function getActiveOrders() {
  const endpoint = `${BASE_URL}/customer/orders/active`;
  return await axios.get(endpoint);
}

async function getCart() {
  const endpoint = `${BASE_URL}/customer/cart`;
  return await axios.get(endpoint);
}

async function getCustomerGeolocation() {   

  if (navigator.geolocation) {

    const successCallback = (position: GeolocationPosition) => {

      const NewgeoLocation = [position.coords.latitude, position.coords.longitude]
      const lat = position.coords.latitude
      const lng = position.coords.longitude
      
      if (NewgeoLocation) {
        return [lat, lng];
        }
  
    else {
      alert("Sorry, browser does not support geolocation!");
      }
    }
  

    const errorCallback = (error: any) => {
      console.log(error);
    }
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    
  }
}

function getDistance(coordinate1: number[], coordinate2: number[]) {
  /**
   * put coordinate1 as customer coordinate, coordinate2 as vendor coordinate
   * This is only accurate in a 2-d plane or small planes of land like melbourne.
   * This does not account for obstacles or road sytems.
   */

  var distance = ((coordinate2[1]-coordinate1[1])^2+(coordinate2[0]-coordinate1[0])^2)^0.5
  return distance;
}

async function getFulfilledOrders() {
  const endpoint = `${BASE_URL}/vendor/orders/fulfilled`;
  return await axios.get(endpoint);
}

function getItemDetails(itemId: String) {
  const endpoint = `${BASE_URL}/menu/item/${itemId}`;
  return axios.get(endpoint);
}

async function getMenu(vendorId: String) {
  const endpoint = `${BASE_URL}/menu/${vendorId}`;
  return await axios.get(endpoint);
}

/* get one order detail */
async function getOrderDetails( orderId: String ) {
  const endpoint = `${BASE_URL}/order/${orderId}`;
  return await axios.get(endpoint);
}

async function getPastOrders() {
  const endpoint = `${BASE_URL}/customer/orders/past`;
  return await axios.get(endpoint);
}

async function getPlacedOrders() {
  const endpoint = `${BASE_URL}/vendor/orders/placed`;
  return await axios.get(endpoint);
}

async function getVendors() {
  const endpoint = `${BASE_URL}/customer/getVendors`;
  return await axios.get(endpoint);
}

function getVendorGeolocation() { ///  

  if (navigator.geolocation) {

    const successCallback = (position: GeolocationPosition) => {

      const NewgeoLocation = [position.coords.latitude, position.coords.longitude]
      const lat = position.coords.latitude
      const lng = position.coords.longitude
      
      if (NewgeoLocation) {
      
          // console.log(NewgeoLocation);
          return setVendorGeolocation(lat, lng);
        }
        //mapbox 
  
    
    else {
      alert("Sorry, browser does not support geolocation!");
      }
    }
  
    const errorCallback = (error: any) => {
      console.log(error);
    }
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    
  }
}

async function rateOrder(orderId: String, rating: number, comment: string) {
  const endpoint = `${BASE_URL}/customer/order/${orderId}/rate`;
  return await axios.patch(endpoint, { orderId, rating: rating, comments: comment });
}

function selectVendor(vendorId: String) {
  const endpoint = `${BASE_URL}/customer/vendor/${vendorId}/select`;
  return axios.patch(endpoint);
}

function setVendorAvailability() {
  const endpoint = `${BASE_URL}/vendor/status/toggle`;
  return axios.patch(endpoint);
}

function setVendorGeolocation(latitude: number, longitude: number) {
  const endpoint = `${BASE_URL}/vendor/location/update/coordinates`;
  return axios.patch(endpoint, { latitude, longitude }).then(
    (response) => {
      console.log(response);
    },
    (error) => {
      console.log(error);
    }
  );
}

function setVendorLocationDescription(locationDescription: string) {
  const endpoint = `${BASE_URL}/vendor/location/update/description`;
  return axios.patch(endpoint, { locationDescription }).then(
    (response) => {
      console.log(response);
    },
    (error) => {
      console.log(error);
    }
  );
}

function vendorLogin(email: String, password: String) {
  const endpoint = `${BASE_URL}/vendor/login`;
  return axios.patch(endpoint, {email, password}).then(
    (response) => {
      history.push("/vendor/geolocation");
      console.log(response);
    },
    (error) => {
      alert("Please enter a valid email & password");
      console.log(error);
    }
  );
  
}

function vendorLogout() {
  const endpoint = `${BASE_URL}/vendor/logout`;
  return axios.patch(endpoint);
}

async function vendorProfile() {
  const endpoint = `${BASE_URL}/vendor/profile`;
  return await axios.get(endpoint);
}

// async function amendFinalize(orderId: String) {
//     const endpoint = `${BASE_URL}/customer/order/${orderId}/amend/finalize`;
//     return await axios.get(endpoint);
// }

// async function amendInitialize(orderId: String) {
//   const endpoint = `${BASE_URL}/customer/order/${orderId}/amend/initialize`;
//   return await axios.get(endpoint);
// }

// async function cancelOrder(orderId: String) {
//   const endpoint = `${BASE_URL}/customer/order/${orderId}/cancel`;
//   return await axios.get(endpoint);
// }

// function getCompletedOrders() {
//   const endpoint = `${BASE_URL}/orders/completed`;
//   return axios.get(endpoint);
// }

/* Export api functions */
export {
  addItemToCart,
  checkoutCart,
  completeOrder, 
  customerLogin,
  customerLogout,
  customerProfile,
  customerProfileAmendName,
  customerProfileAmendPassword,
  customerRegister,
  emptyCart,
  fulfillOrder,
  getActiveOrders,
  getCart,
  getCustomerGeolocation,
  getDistance,
  getFulfilledOrders,
  getItemDetails,
  getMenu,
  getOrderDetails,
  getPastOrders,
  getPlacedOrders,
  getVendors,
  getVendorGeolocation,
  rateOrder,
  selectVendor,
  setVendorAvailability,
  setVendorGeolocation,
  setVendorLocationDescription,
  vendorLogin,
  vendorLogout,
  vendorProfile
}
