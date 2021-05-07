import { useState, useEffect } from "react";
import axios from 'axios';
import history from './history';

const BASE_URL = "http://localhost:48080/api";
// const BASE_URL = "https://snaccs-in-a-van.herokuapp.com/api";

function getCart() {
    const endpoint = `${BASE_URL}/customer/cart`;
    return axios.get(endpoint);
}

function addItemToCart(itemId: String) {
    const endpoint = `${BASE_URL}/customer/cart/add/${itemId}`;
    return axios.post(endpoint, { itemId })
            .then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error);
        });
}

export function checkoutCart() {
    const endpoint = `${BASE_URL}/customer/cart/checkout`;
    return axios.get(endpoint);
}

function emptyCart() {
    const endpoint = `${BASE_URL}/customer/cart/clear`;
    return axios.get(endpoint);
}

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
    return axios.post(endpoint, { email, password })
            .then((response) => {
                history.push('/customer/profile');
                console.log(response);
            }, (error) => {
                alert("Please enter a valid email & password")
                console.log(error);
        });
}

export function customerLogout() {
    const endpoint = `${BASE_URL}/customer/logout`;
    return axios.get(endpoint);
}

export function customerProfile() {
    const endpoint = `${BASE_URL}/customer/profile`;
    return axios.get(endpoint)
    .then((response) => {
        console.log(response);
    }, (error) => {
        history.push('/customer/login');
        console.log(error);
    });
}

function customerRegister( email: String, givenName: String, familyName: String, password: String ) {
    const endpoint = `${BASE_URL}/customer/register`;
    return axios.post(endpoint, { email, givenName, familyName, password })
            .then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error);
        });
}

function getMenu( vendorId: String ) {
    const endpoint = `${BASE_URL}/menu/${vendorId}`;
    return axios.get(endpoint);
}

function getItemDetails( itemId: String ) {
    const endpoint = `${BASE_URL}/menu/${itemId}`;
    return axios.get(endpoint);
}

/* get one order detail */
// export async function getOrderDetails( orderId: String ) {
//     const endpoint = `${BASE_URL}/order/${orderId}`;
//     return await axios.get(endpoint);
// }

function fulfillOrder( orderId: String ) {
    const endpoint = `${BASE_URL}/order/${orderId}/fulfill`;
    return axios.get(endpoint);
}

function getOutstandingOrders( vendorId: String ) {
    const endpoint = `${BASE_URL}/vendor/${vendorId}/order/outstanding`;
    return axios.get(endpoint);
}

function setVendorLocation( vendorId: String ) {
    const endpoint = `${BASE_URL}/vendor/${vendorId}/update/location`;
    return axios.post(endpoint, { vendorId })
            .then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error);
        });
}

function setVendorAvailability( vendorId: String ) {
    const endpoint = `${BASE_URL}/vendor/${vendorId}/update/status`;
    return axios.post(endpoint, { vendorId })
            .then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error);
        });
}