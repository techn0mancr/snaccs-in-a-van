import React from 'react';
import {
    BrowserRouter as Router,
    Link,
    useLocation
  } from "react-router-dom";

const UseQueryParam = (paramName: string, defaultName: any) => {
    const query = new URLSearchParams(useQuery());
    const param = query.get(paramName) || defaultName;
   
    function useQuery() {
     return new URLSearchParams(useLocation().search);
    }
   
    // return param
    return query
}

export default UseQueryParam;