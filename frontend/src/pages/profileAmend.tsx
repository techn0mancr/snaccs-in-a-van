import React from 'react';
import './profile.css';
import { customerProfile, customerProfileAmend} from '../api';
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
        const {givenName, familyName} = this.state;
        customerProfileAmend(givenName, familyName)
        history.push('/customer/profile');
    }

    render() {
        const {_id, email, givenName, familyName} = this.state;
        return (
            <div className="titleLogin">
                <h1 className="titleLog">Profile</h1>
                <h3>ID</h3>
                <p className="time">{_id}</p>
                <h3>Email</h3>
                <p className="time">{email}</p>
                <h3>Given Name</h3>
                <input id="first" type="text" name="givenName" placeholder={givenName} value={givenName} onChange={this.handleChange} required/><br/><br/>
                <h3>Family Name</h3>
                <input id="last" type="text" name="familyName" placeholder={familyName} value={familyName} onChange={this.handleChange} required/><br/><br/>
                <br />
                <button className="login" type="submit" onClick={this.handleSubmit}>
                    <h2 className="click">Save Changes</h2>
                </button>
            </div>
        )
    }
}

export default Profile;