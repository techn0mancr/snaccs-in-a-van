/* Import the required libraries and types */
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

/* Add an item with quantity to cart */
function addItemToCart(itemId: String, quantity: number) {
  const endpoint = `${BASE_URL}/customer/cart/edit/${itemId}`;
  return axios.patch(endpoint, { itemId, quantity: quantity });
}

/* Checks out the customer's current cart */
function checkoutCart() {
  const endpoint = `${BASE_URL}/customer/cart/checkout`;
  return axios.post(endpoint);
}

/* Sets the status of a given order to "Completed" */
function completeOrder(orderId: String) {
  const endpoint = `${BASE_URL}/vendor/order/${orderId}/complete`;
  return axios.patch(endpoint);
}

/* Logs a customer in */
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

/* Logs a customer out */
function customerLogout() {
  const endpoint = `${BASE_URL}/customer/logout`;
  return axios.patch(endpoint);
}

/* Returns the profile of the current logged-in customer */
function customerProfile() {
  const endpoint = `${BASE_URL}/customer/profile`;
  return axios.get(endpoint);
}

/* Amends the current customer's profile details (name) */
function customerProfileAmendName(givenName: String, familyName: String) {
  const endpoint = `${BASE_URL}/customer/profile/amend`;
  return axios.patch(endpoint, { givenName, familyName });
}

/* Amends the current customer's profile details (password) */
function customerProfileAmendPassword(password: String) {
  const endpoint = `${BASE_URL}/customer/profile/amend`;
  return axios.patch(endpoint, { password });
}

/* Registers a new customer */
function customerRegister(
  email: String,
  givenName: String,
  familyName: String,
  password: String
) {
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

/* Empties the customer's current cart */
async function emptyCart() {
  const endpoint = `${BASE_URL}/customer/cart/clear`;
  return await axios.patch(endpoint);
}

/* Sets the status of a given order to "Fulfilled" and applies the fulfillment
 * discount if a certain amount of time has passed since the order was placed */
function fulfillOrder(orderId: String) {
  const endpoint = `${BASE_URL}/vendor/order/${orderId}/fulfill`;
  return axios.patch(endpoint);
}

/* Returns the logged in customer's active orders */
async function getActiveOrders() {
  const endpoint = `${BASE_URL}/customer/orders/active`;
  return await axios.get(endpoint);
}

/* Returns the customer's current cart */
async function getCart() {
  const endpoint = `${BASE_URL}/customer/cart`;
  return await axios.get(endpoint);
}

/* Get vendor's geolocation and store it */
async function getCustomerGeolocation() {
  if (navigator.geolocation) {
    const successCallback = async (position: GeolocationPosition) => {
      const NewgeoLocation = [
        position.coords.latitude,
        position.coords.longitude,
      ];
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      if (NewgeoLocation) {
        await window.sessionStorage.setItem(
          "customerLat",
          lat as any as string
        );
        await window.sessionStorage.setItem(
          "customerLng",
          lng as any as string
        );

        // window.sessionStorage.setItem("CustomerLocation",result_location);
      } else {
        alert("Sorry, browser does not support geolocation!");
      }
    };
    const errorCallback = (error: any) => {
      console.log(error);
    };
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }
}

/* Get the given vendor's fulfilled orders */
async function getFulfilledOrders() {
  const endpoint = `${BASE_URL}/vendor/orders/fulfilled`;
  return await axios.get(endpoint);
}

/* Get ID from the URL */
/* function getId() {
  const query = history.location.search;
  const id = query.replace("?id=", "");
  return id;
} */

function getId(otherParamsToo?: boolean) {
  const params: any = new URLSearchParams(window.location.search);
  const actualParams: any = {};
  for (const key of params.keys()) {
    actualParams[key] = params.get(key);
  }

  if (otherParamsToo) {
    return actualParams;
  }
  return actualParams.id;
}

/* Returns the item details associated with the given itemId */
function getItemDetails(itemId: String) {
  const endpoint = `${BASE_URL}/menu/item/${itemId}`;
  return axios.get(endpoint);
}

/* Gets the menu of the van associated with the given vendorId */
async function getMenu(vendorId: String) {
  const endpoint = `${BASE_URL}/menu/${vendorId}`;
  return await axios.get(endpoint);
}

/* Returns the details of an order */
async function getOrderDetails(orderId: String) {
  const endpoint = `${BASE_URL}/order/${orderId}`;
  return await axios.get(endpoint);
}

/* Returns the logged in customer's past orders */
async function getPastOrders() {
  const endpoint = `${BASE_URL}/customer/orders/past`;
  return await axios.get(endpoint);
}

/* Get the given vendor's placed orders */
async function getPlacedOrders() {
  const endpoint = `${BASE_URL}/vendor/orders/placed`;
  return await axios.get(endpoint);
}

/* Get the nearest MAX_NEAREST_VENDORS open vendors to the given geolocation tuple */
async function getVendors() {
  getCustomerGeolocation();
  const lat = window.sessionStorage.getItem("customerLat") as any as number;
  const lng = window.sessionStorage.getItem("customerLng") as any as number;
  const endpoint = `${BASE_URL}/vendor/nearest/${lat},${lng}`;
  return await axios.get(endpoint);
}

/* Get vendor's geolocation and set it to database */
function getVendorGeolocation() {
  if (navigator.geolocation) {
    var result_location;

    const successCallback = async (position: GeolocationPosition) => {
      const NewgeoLocation = [
        position.coords.latitude,
        position.coords.longitude,
      ];
      const lat = position.coords.latitude as unknown as string;
      const lng = position.coords.longitude as unknown as string;

      if (NewgeoLocation) {
        window.sessionStorage.setItem("vendorLat", lat as any as string);
        window.sessionStorage.setItem("vendorLng", lng as any as string);

        setVendorGeolocation(lat as any as number, lng as any as number);
      } else {
        alert("Sorry, browser does not support geolocation!");
      }
    };
    const errorCallback = (error: any) => {
      console.log(error);
    };
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }
  return result_location;
}

function getDistance(geolocation1: number[], geolocation2: number[]) {
  return Math.pow(
    Math.pow(geolocation2[0] - geolocation1[0], 2) +
      Math.pow(geolocation2[1] - geolocation1[1], 2),
    0.5
  ).toFixed(2);
}

/* Submits a rating and comment for a completed order */
async function rateOrder(orderId: String, rating: number, comment: string) {
  const endpoint = `${BASE_URL}/customer/order/${orderId}/rate`;
  return await axios.patch(endpoint, {
    orderId,
    rating: rating,
    comments: comment,
  });
}

/* Submits a rating for a completed order */
async function rateOrderStar(orderId: String, rating: number) {
  const endpoint = `${BASE_URL}/customer/order/${orderId}/rate`;
  return await axios.patch(endpoint, { orderId, rating: rating });
}

/* Selects the given vendor */
function selectVendor(vendorId: String) {
  const endpoint = `${BASE_URL}/customer/vendor/${vendorId}/select`;
  return axios.patch(endpoint);
}

/* Toggles the given vendor's availability */
function setVendorAvailability() {
  const endpoint = `${BASE_URL}/vendor/status/toggle`;
  return axios.patch(endpoint);
}

/* Sets a vendor's geolocation coordinates */
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

/* Sets a vendor's location description */
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

/* Logs a vendor in */
function vendorLogin(name: String, password: String) {
  const endpoint = `${BASE_URL}/vendor/login`;
  return axios.patch(endpoint, { name, password }).then(
    (response) => {
      history.push("/vendor/geolocation");
      console.log(response);
    },
    (error) => {
      alert("Please enter a valid van name & password");
      console.log(error);
    }
  );
}

/* Logs a vendor out */
function vendorLogout() {
  const endpoint = `${BASE_URL}/vendor/logout`;
  return axios.patch(endpoint);
}

/* Returns the profile of the current logged-in vendor */
async function vendorProfile() {
  const endpoint = `${BASE_URL}/vendor/profile`;
  return await axios.get(endpoint);
}

// async function amendFinalize(orderId: String) {
//     const endpoint = `${BASE_URL}/customer/order/${orderId}/amend/finalize`;
//     return await axios.get(endpoint);
// }

async function amendInitialize(orderId: String) {
  const endpoint = `${BASE_URL}/customer/order/${orderId}/amend/initialize`;
  return await axios.get(endpoint);
}

/* Cancels the customer's given order */
async function cancelOrder(orderId: String) {
  const endpoint = `${BASE_URL}/customer/order/${orderId}/cancel`;
  return await axios.get(endpoint);
}

/* Get the given vendor's completed orders */
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
  getId,
  getItemDetails,
  getMenu,
  getOrderDetails,
  getPastOrders,
  getPlacedOrders,
  getVendors,
  getVendorGeolocation,
  rateOrder,
  rateOrderStar,
  selectVendor,
  setVendorAvailability,
  setVendorGeolocation,
  setVendorLocationDescription,
  vendorLogin,
  vendorLogout,
  vendorProfile,
  amendInitialize,
  cancelOrder,
};
