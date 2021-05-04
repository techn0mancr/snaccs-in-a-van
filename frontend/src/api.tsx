import { useState, useEffect } from "react";

const BASE_URL = "localhost:48080/api";
// const BASE_URL = "https://snaccs-in-a-van.herokuapp.com/api";


function getOrderDetails(orderId: string) {
    const endpoint = BASE_URL + '/:' + orderId;
    return fetch(endpoint).then(res => res.json());
} 