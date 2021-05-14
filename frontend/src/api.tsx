import axios from "axios";
import history from "./history";

const BASE_URL = "http://localhost:48080/api";
// const BASE_URL = "https://snaccs-in-a-van.herokuapp.com/api";

// function getCart() {
//     const endpoint = `${BASE_URL}/customer/cart`;
//     return axios.get(endpoint);
// }

export function checkoutCart() {
  const endpoint = `${BASE_URL}/customer/cart/checkout`;
  return axios.get(endpoint);
}

export function addItemToCart(itemId: String, quantity: number) {
  const endpoint = `${BASE_URL}/customer/cart/add/${itemId}`;

  return axios.post(endpoint, { itemId, quantity: quantity });
}

// function emptyCart() {
//   const endpoint = `${BASE_URL}/customer/cart/clear`;
//   return axios.get(endpoint);
// }

// export function getActiveOrders() {
//     const endpoint = `${BASE_URL}/customer/order/active`;
//     return axios.get(endpoint)
//         .then(response =>
//             response.data.results.map(order => ({
//             status: `${order.status}`,
//             items: `${order.items}`,
//             total: `${order.total}`,
//             isChanged: `${order.isChanged}`,
//             vendorId: `${order.vendorId}`,
//             placedTimestamp: `${order.placedTimestamp}`
//             })),
//         (error) => {
//             console.log(error);
//         });
// }

// function getPastOrders() {
//     const endpoint = `${BASE_URL}/customer/order/past`;
//     return axios.get(endpoint);
// }

// export async function getPastOrders() {
//     const BASE_URL = "http://localhost:48080/api";
//     const endpoint = `${BASE_URL}/customer/orders/past`;
//     const res = axios.get(endpoint);
//     return res;
// }

export function customerLogin(email: String, password: String) {
  const endpoint = `${BASE_URL}/customer/login`;
  return axios.post(endpoint, { email, password }).then(
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
  return axios.get(endpoint);
}

export function customerProfile() {
  const endpoint = `${BASE_URL}/customer/profile`;

  getVendorGeolocation() ///////////////////////////////////////

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

// function getMenu(vendorId: String) {
//   const endpoint = `${BASE_URL}/menu/${vendorId}`;
//   return axios.get(endpoint);
// }

export function getItemDetails(itemId: String) {
  const endpoint = `${BASE_URL}/menu/item/${itemId}`;
  return axios.get(endpoint);
}

/* get one order detail */
// export async function getOrderDetails( orderId: String ) {
//     const endpoint = `${BASE_URL}/order/${orderId}`;
//     return await axios.get(endpoint);
// }

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

function vendorLogout() {
  const endpoint = `${BASE_URL}/vendor/logout`;
  return axios.patch(endpoint);
}

export function setVendorLocation(locationDescription: string) { ///
  const endpoint = `${BASE_URL}/vendor/update/location`;
  getVendorGeolocation();

  return axios.patch(endpoint, { locationDescription }).then(
    (response) => {
      history.push("/vendor/orders");
      console.log(response);
    },
    (error) => {
      console.log(error);
    }
  );
}


var geoLocation: number[]; ///

export function getVendorGeolocation() { ///
  var geoLocation: number[];
  if (navigator.geolocation) {
    
    const successCallback = (position: GeolocationPosition) => {

      geoLocation = [position.coords.latitude, position.coords.longitude]
      console.log(geoLocation)
    }

    const errorCallback = (error: any) => {
      console.log(error);
    }
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
    setVendorGeolocation()
  }
  else {
    alert("Sorry, browser does not support geolocation!");
 }
}

function setVendorGeolocation() { ///
  if (geoLocation) {
    console.log("hey there pls workk")

    const endpoint = `${BASE_URL}/vendor/update/geolocation`;

    return axios.patch(endpoint, { geoLocation }).then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}

export function getDistance(coordinate1: number[], coordinate2: number[]) {
  /**
   * put coordinate1 as customer coordinate, coordinate2 as vendor coordinate
   * This is only accurate in a 2-d plane or small planes of land like melbourne.
   * This does not account for obstacles or road sytems.
   */

  var distance = ((coordinate2[1]-coordinate1[1])^2+(coordinate2[0]-coordinate1[0])^2)^0.5
  return distance;
}

// export function setVendorLocation(locationDescription: string, geolocation: Array<number> ) {
//   const endpoint = `${BASE_URL}/vendor/update/location`;
//   return axios.patch(endpoint, { locationDescription, geolocation }).then(
//     (response) => {
//       history.push("/vendor/orders");
//       console.log(response);
//     },
//     (error) => {
//       console.log(error);
//     }
//   );
// }

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



// function fulfillOrder(orderId: String) {
//   const endpoint = `${BASE_URL}/order/${orderId}/fulfill`;
//   return axios.get(endpoint);
// }

// function getOutstandingOrders(vendorId: String) {
//   const endpoint = `${BASE_URL}/vendor/${vendorId}/order/outstanding`;
//   return axios.get(endpoint);
// }
