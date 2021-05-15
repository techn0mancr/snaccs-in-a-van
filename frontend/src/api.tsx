import axios from "axios";
import history from "./history";

const BASE_URL = "http://localhost:48080/api";
// const BASE_URL = "https://snaccs-in-a-van.herokuapp.com/api";

export async function getCart() {
    const endpoint = `${BASE_URL}/customer/cart`;
    return await axios.get(endpoint);
}

export function addItemToCart(itemId: String, quantity: number) {
  const endpoint = `${BASE_URL}/customer/cart/add/${itemId}`;
  return axios.patch(endpoint, { itemId, quantity: quantity });
}

export function checkoutCart() {
  const endpoint = `${BASE_URL}/customer/cart/checkout`;
  return axios.post(endpoint);
}

export async function emptyCart() {
  const endpoint = `${BASE_URL}/customer/cart/clear`;
  return await axios.patch(endpoint);
}

export async function getActiveOrders() {
    const endpoint = `${BASE_URL}/customer/orders/active`;
    return await axios.get(endpoint);
}

export async function getPastOrders() {
    const endpoint = `${BASE_URL}/customer/orders/past`;
    return await axios.get(endpoint);
}

export function customerLogin(email: String, password: String) {
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

export function customerLogout() {
  const endpoint = `${BASE_URL}/customer/logout`;
  return axios.patch(endpoint);
}

export function customerProfile() {
  const endpoint = `${BASE_URL}/customer/profile`;
  return axios.get(endpoint).then(
    (response) => {
      console.log(response);
    },
    (error) => {
      alert("Please login");
      history.push("/customer/login");
      console.log(error);
    }
  );
}

// function customerRegister(
//   email: String,
//   givenName: String,
//   familyName: String,
//   password: String
// ) {
//   const endpoint = `${BASE_URL}/customer/register`;
//   return axios.post(endpoint, { email, givenName, familyName, password }).then(
//     (response) => {
//       console.log(response);
//     },
//     (error) => {
//       console.log(error);
//     }
//   );
// }

// function selectVendor(vendorId: String) {
//   const endpoint = `${BASE_URL}/vendor/${vendorId}/select`;
//   return axios.patch(endpoint);
// }

export async function getMenu(vendorId: String) {
  const endpoint = `${BASE_URL}/menu/${vendorId}`;
  return await axios.get(endpoint);
}

export function getItemDetails(itemId: String) {
  const endpoint = `${BASE_URL}/menu/item/${itemId}`;
  return axios.get(endpoint);
}

/* get one order detail */
export async function getOrderDetails( orderId: String ) {
    const endpoint = `${BASE_URL}/order/${orderId}`;
    return await axios.get(endpoint);
}

export function vendorLogin(email: String, password: String) {
  const endpoint = `${BASE_URL}/vendor/login`;
  return axios.patch(endpoint, {email, password}).then(
    (response) => {
      history.push("/vendor/profile");
      console.log(response);
    },
    (error) => {
      alert("Please enter a valid email & password");
      console.log(error);
    }
  );
  
}

// function vendorLogout() {
//   const endpoint = `${BASE_URL}/vendor/logout`;
//   return axios.patch(endpoint);
// }

export function fulfillOrder(orderId: String) {
  const endpoint = `${BASE_URL}/vendor/orders/${orderId}/fulfill`;
  return axios.patch(endpoint);
}

export function completeOrder(orderId: String) {
  const endpoint = `${BASE_URL}/vendor/orders/${orderId}/complete`;
  return axios.patch(endpoint);
}

export async function getPlacedOrders() {
  const endpoint = `${BASE_URL}/vendor/orders/placed`;
  return await axios.get(endpoint);
}

export async function getFulfilledOrders() {
  const endpoint = `${BASE_URL}/vendor/orders/fulfilled`;
  return await axios.get(endpoint);
}

// function getCompletedOrders() {
//   const endpoint = `${BASE_URL}/orders/completed`;
//   return axios.get(endpoint);
// }

export function setVendorLocation(locationDescription: string, geolocation: Array<number> ) {
  const endpoint = `${BASE_URL}/vendor/update/location`;
  return axios.patch(endpoint, { locationDescription, geolocation }).then(
    (response) => {
      history.push("/vendor/orders");
      console.log(response);
    },
    (error) => {
      console.log(error);
    }
  );
}

// function setVendorAvailability(vendorId: String) {
//   const endpoint = `${BASE_URL}/vendor/${vendorId}/update/status`;
//   return axios.post(endpoint, { vendorId }).then(
//     (response) => {
//       console.log(response);
//     },
//     (error) => {
//       console.log(error);
//     }
//   );
// }
