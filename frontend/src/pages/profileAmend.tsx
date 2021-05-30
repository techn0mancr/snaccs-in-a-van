/* Import the required libraries and types */
import React from 'react';

/* Import components */
import './profile.css';
import history from '../history';
import leftArrow from '../img/leftArrow.png';
import { customerProfile, customerProfileAmendName} from '../api';

/* Component for Customer Profile Amend Name Page */
class Profile extends React.Component {

    state = {   
        _id: "",
        email: "",
        givenName: "",
        familyName: "",
        password: ""
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

    /* During on page */
    componentDidMount() {
        /* Get customer's profile */
        customerProfile().then(
            (response) => {
                var data = response.data;
                this.setState({ _id: data._id, email: data.email, givenName: data.givenName, familyName: data.familyName });
            }
        )
    }

    /* Set state accordingly to the target */
    handleChange = (event: { target: { name: any; value: String; }; }) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    /* Handle when click on submit button */
    handleSubmit = (event: { preventDefault: () => void; }) => {
        const {givenName, familyName} = this.state;
        event.preventDefault();
        
        /* Change name. Then push new entry to history */
        customerProfileAmendName(givenName, familyName);
        alert("Name successfuly changed!");
        history.push('/customer/profile');
    }

    render() {
        const {_id, email, givenName, familyName} = this.state;

        return (
            <div className="profile">
                <input type="image" className="back" alt="back" src={leftArrow} onClick={() => history.goBack()}/>
                <h1 className="nVan">Change Name</h1>
                <br></br>

                <h3>ID</h3>
                <p className="time">{_id}</p>

                <h3>Email</h3>
                <p className="time">{email}</p>

                <h3>Given Name</h3>
                <input id="first" type="text" name="givenName" placeholder={givenName} value={givenName} onChange={this.handleChange} required/><br/><br/>
                
                <h3>Family Name</h3>
                <input id="last" type="text" name="familyName" placeholder={familyName} value={familyName} onChange={this.handleChange} required/><br/><br/>
                <br />
                <button className="save" type="submit" onClick={this.handleSubmit}>

                    <h2 className="click">Save Changes</h2>
                </button>
            </div>
        )
    }
}

export default Profile;