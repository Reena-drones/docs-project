import React, { Component } from 'react';
import {compose, withHandlers, withProps ,withState} from "recompose";
import { withRouter } from "react-router-dom";
import '../App.css';

export default compose(
    withRouter,
    withState("email", "handleEmailChange", ""),
    withState("password", "handlePasswordChange", ""),
    withState('message', 'setMessage', ''),
    withHandlers({
        GoToRegister:({history})=>()=>{
            history.push('/');
        },
    })
)(function login({...props}) {
    return (
        <div>
            <h1>Please Login to continue</h1>
        </div>
    );
});
