import { useState, useEffect } from "react";
import axios from 'axios';

const BASE_URL = "http://localhost:48080/api";
// const BASE_URL = "https://snaccs-in-a-van.herokuapp.com/api";

/* get one order detail */
function getOrderDetails(orderId: string) {
    const endpoint = `${BASE_URL}/order/${orderId}`;
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

function checkoutCart() {
    const endpoint = `${BASE_URL}/customer/cart/checkout`;
    return axios.get(endpoint);
}

function emptyCart() {
    const endpoint = `${BASE_URL}/customer/cart/clear`;
    return axios.get(endpoint);
}

function getActiveOrders() {
    const endpoint = `${BASE_URL}/customer/order/active`;
    return axios.get(endpoint);
}

function getPastOrders() {
    const endpoint = `${BASE_URL}/customer/order/past`;
    return axios.get(endpoint);
}

function customerLogin(email: String, password: String) {
    const endpoint = `${BASE_URL}/customer/login`;
    return axios.post(endpoint, { email, password })
            .then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error);
        });
}

function customerLogout() {
    const endpoint = `${BASE_URL}/customer/logout`;
    return axios.get(endpoint);
}

function customerProfile() {
    const endpoint = `${BASE_URL}/customer/profile`;
    return axios.get(endpoint);
}

function customerRegister( email: String, givenName: String, familyName: String, password: String ) {
    const endpoint = `${BASE_URL}/customer/login`;
    return axios.post(endpoint, { email, givenName, familyName, password })
            .then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error);
        });
}