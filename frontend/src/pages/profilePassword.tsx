import React from 'react';
import './profile.css';
import leftArrow from '../img/leftArrow.png';
import { customerProfile, customerProfileAmendPassword} from '../api';
import history from '../history';
import passwordSchema from "../models/passwordSchema";

class Profile extends React.Component {
    state = {   
        password: "",
        confirm: ""
    }

    componentWillMount() {
        customerProfile().then(
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

    handleChange = (event: { target: { name: any; value: String; }; }) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        const {password, confirm} = this.state;
        if (password === confirm) {
            if (passwordSchema.validate(password)) {
                customerProfileAmendPassword(password);
                alert("Password successfuly changed!");
                history.push('/customer/profile');
            } else {
                alert("Please enter at least 1 alphabet character (upper or lower case A-Z), at least one numerical digit (0-9), length of at least 8 characters")
            }
        } else {
            alert("Please enter the same password");
        }
    }

    render() {
        const {password, confirm} = this.state;
        return (
            <div className="titleLogin">
                <input type="image" className="back" alt="back" src={leftArrow} onClick={() => history.goBack()}/>
                <h1 className="titleLogin">Change Password</h1>
                <h3>Password</h3>
                <input id="password" type="text" name="password" placeholder="password" value={password} onChange={this.handleChange} required/><br/><br/>
                <p className="menu-p">Please enter at least 1 alphabet character (upper or lower case A-Z), at least one numerical digit (0-9), length of at least 8 characters</p><br/>
                <h3>Confirm Password</h3>
                <input id="confirm" type="text" name="confirm" placeholder="confirm password" value={confirm} onChange={this.handleChange} required/><br/><br/>
                <br />
                <button className="login" type="submit" onClick={this.handleSubmit}>
                    <h2 className="click">Change Password</h2>
                </button>
            </div>
        )
    }
}

export default Profile;