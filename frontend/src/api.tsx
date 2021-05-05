import { useState, useEffect } from "react";
import axios from 'axios';

const BASE_URL = "http://localhost:48080/api";
// const BASE_URL = "https://snaccs-in-a-van.herokuapp.com/api";


function getOrderDetails(orderId: string) {
    const endpoint = `${BASE_URL}/order/${orderId}`;
    return axios.get(endpoint);
} 