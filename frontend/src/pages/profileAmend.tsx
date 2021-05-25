import React from 'react';
import './profile.css';
import { customerProfile, customerProfileAmmend} from '../api';
import history from '../history';

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
        history.push('/customer/profile');
    }

    render() {
        const {details} = this.state;
        return (
            <div className="titleLogin">
                <h1 className="titleLog">Profile</h1>
                <h3>ID</h3>
                <p className="time">{details._id}</p>
                <h3>Email</h3>
                <p className="time">{details.email}</p>
                <h3>Given Name</h3>
                <p className="time">{details.givenName}</p>
                <h3>Family Name</h3>
                <p className="time">{details.familyName}</p>
                <br />
                <button className="login" type="submit" onClick={this.handleSubmit}>
                    <h2 className="click">Save Changes</h2>
                </button>
            </div>
        )
    }
}

export default Profile;