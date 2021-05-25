import React from 'react';
import './profile.css';
import { customerProfile, customerProfileAmendPassword} from '../api';
import history from '../history';

class Profile extends React.Component {
    state = {   
        _id: "",
        email: "",
        givenName: "",
        familyName: "",
        password: ""
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

    componentDidMount() {
        customerProfile().then(
            (response) => {
                var data = response.data;
                this.setState({ _id: data._id, email: data.email, givenName: data.givenName, familyName: data.familyName });
                console.log(response);
            }
        );
    }

    handleChange = (event: { target: { name: any; value: String; }; }) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const {password} = this.state;
        customerProfileAmendPassword(password);
        history.push('/customer/profile');
    }

    render() {
        const {givenName, familyName} = this.state;
        return (
            <div className="titleLogin">
                <h1 className="titleLog">Change Password</h1>
                <h3>Password</h3>
                <input id="first" type="text" name="givenName" placeholder={givenName} value={givenName} onChange={this.handleChange} required/><br/><br/>
                <h3>Confirm Password</h3>
                <input id="last" type="text" name="familyName" placeholder={familyName} value={familyName} onChange={this.handleChange} required/><br/><br/>
                <br />
                <button className="login" type="submit" onClick={this.handleSubmit}>
                    <h2 className="click">Change Password</h2>
                </button>
            </div>
        )
    }
}

export default Profile;