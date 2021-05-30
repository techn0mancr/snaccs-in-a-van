/* Import the required libraries and types */
import React from 'react';

/* Import components */
import './profile.css';
import history from '../history';
import leftArrow from '../img/leftArrow.png';
import { customerProfile, customerProfileAmendPassword} from '../api';
import passwordSchema from "../models/passwordSchema";

/* Component for Customer Profile Amend Password Page */
class Profile extends React.Component {

    state = {   
        password: "",
        confirm: ""
    }

    /* Before rendering page */
    componentWillMount() {
        /* Check customer already logged in */
        customerProfile().then(
            (response) => {
                console.log(response);
            },
            (error) => {
                alert("Please login");
                history.push("/customer/login");
                console.log(error);
            }
        )
    }

    /* Set state accordingly to the target */
    handleChange = (event: { target: { name: any; value: String; }; }) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    /* Handle when click on submit button */
    handleSubmit = (event: { preventDefault: () => void; }) => {
        const {password, confirm} = this.state;
        event.preventDefault();

        /* Confirm password is same and validate if it fulfills criteria */
        if (password === confirm) {
            if (passwordSchema.validate(password)) {
                customerProfileAmendPassword(password);
                alert("Password successfuly changed!");
                history.push('/customer/profile');
            } else {
                alert("Please enter at least 1 alphabetical character (upper or lower case A-Z), at least one numerical digit (0-9), length of at least 8 characters")
            }
        } else {
            alert("Please enter the same password");
        }
    }

    render() {
        const {password, confirm} = this.state;

        return (
            <div className="profile">
                <input type="image" className="back" alt="back" src={leftArrow} onClick={() => history.goBack()}/>
                <h1 className="titleLog">Change Password</h1>
                <br></br>
                <h3>New Password</h3>
                <input id="password" type="password" name="Enter new password" placeholder="password" value={password} onChange={this.handleChange} required/><br/><br/>
                <p className="menu-p">Please enter at least 1 alphabet character (upper or lower case A-Z), at least one numerical digit (0-9), length of at least 8 characters</p><br/>
                <h3>Confirm New Password</h3>
                <input id="confirm" type="password" name="Confirm new password" placeholder="confirm password" value={confirm} onChange={this.handleChange} required/><br/><br/>
                <br/>
                <button className="save" type="submit" onClick={this.handleSubmit}>

                    <h2 className="click">Change Password</h2>
                </button>
            </div>
        )
    }
}

export default Profile;