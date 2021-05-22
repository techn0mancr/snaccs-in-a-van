import React from 'react';
import leftArrow from '../img/leftArrow.png';
import history from "../history";
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

class Header extends React.Component {
    render() {
        return (
            <div className="titleOrder">
                <br></br><br></br>
                <input type="image" className="back" alt="back" src={leftArrow} onClick={() => history.goBack()}/>
                <h1>Rate your experience</h1>
            </div>
        )
    }
}

class Content extends React.Component {
    render() {
        return (
            <div></div>
        )
    }
}

class Rating extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Content />
            </div>
        )
    }
}

export default Rating;