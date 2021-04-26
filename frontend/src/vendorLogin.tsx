import React from 'react';
import './vendorLogin.css';

function vendorLogin() {
    return (
      <div className="login">
        <h1>Log In</h1>
          <div className="center">
          <form className="form"> 
            <input type="text" className="name" placeholder="van name"/>
            <br></br>
            <input type="password"  className="pin" placeholder="pin"/>
            <br></br>
            <button type="submit" value="Login" className="buttonLogin">Log in</button>
          </form>
        </div>  
      </div>
    );
  }
    
  export default vendorLogin; 