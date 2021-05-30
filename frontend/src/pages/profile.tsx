/* Import the required libraries and types */
import React from 'react';

/* Import components */
import './profile.css';
import history from '../history';
import penEdit from '../img/penEdit.svg';
import { customerProfile, customerLogout } from '../api';

/* Component for Customer Profile Page */
class Profile extends React.Component {

    state = {   
        details: [] as any
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
                this.setState({ details: data });
            }
        )
    }

    /* Handle when click on submit button */
    handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        /* Logout customer. Then push new entry to history */
        customerLogout();
        history.push('/customer/login');
    }

    render() {
        const {details} = this.state;

        return (
            <div className="profile">
                <h1 className="nVan">Profile</h1>
                <br></br>

                <h3>ID</h3>
                <p className="time">{details._id}</p>

                <h3>Email</h3>
                <p className="time">{details.email}</p>

                <h3>Name</h3>
                <span className="Change">
                <button className="cancel" type="submit" value="edit" onClick={() => history.push(`/customer/profile/amend/name`)}>
                <input type="image" className="edit" alt="Edit" src={penEdit}/>
                Change Name
                </button>
                </span>
                <p className="time">{details.givenName} {details.familyName}</p>
                
                <h3>Password</h3>
                <span className="Change">
                <button className="cancel" type="submit" value="edit" onClick={() => history.push(`/customer/profile/amend/password`)}>
                    <input type="image" className="edit" alt="Edit" src={penEdit}/>
                    Change Password
                </button>
                </span>

                <p className="time">********</p>
                <br />
                <button className="login" type="submit" onClick={this.handleSubmit}>
                    <h2 className="click">Log out</h2>
                </button>
            </div>
        )
    }
}

export default Profile;