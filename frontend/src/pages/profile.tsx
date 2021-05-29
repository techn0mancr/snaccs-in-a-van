import React from 'react';
import './profile.css';
import { customerProfile, customerLogout } from '../api';
import history from '../history';
import penEdit from '../img/penEdit.svg';

class Profile extends React.Component {
    state = {   
        details: [] as any,
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
                this.setState({ details: data });
                console.log(response);
            }
        );
    }

    handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
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