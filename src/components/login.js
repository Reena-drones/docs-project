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
        handleEmailChange: ({handleEmailChange, email}) => {
            return (event) => {
                event.preventDefault();
                return handleEmailChange(email = event.target.value)
            }
        },
        handlePasswordChange: ({handlePasswordChange, password}) => {
            return (event) => {
                event.preventDefault();
                return handlePasswordChange(password = event.target.value)
            };
        },
        GoToRegister:({history})=>()=>{
            history.push('/');
        },

        loginUser: ({email, password, history, setMessage}) => (event) => {
            if (!email || !password){
                setMessage("All field are required")
            }
            let data = {"email": email, "password": password};
            event.preventDefault();
            fetch('http://localhost:8000/signIn', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
            })
                .then(
                    (response) => {
                        if (response.status !== 200) {
                            console.log("problem", response.status)
                        }
                        response.json()
                            .then((data) => {
                                if (data.status === 200) {
                                    setMessage("");
                                    localStorage.setItem('id', data.email);
                                    history.push('/profile');
                                }
                                else
                                    setMessage(data["message"])
                            })
                    }
                )
        }
    })
)(function login({email, handleEmailChange, password, handlePasswordChange,GoToRegister, loginUser, message}) {
    return (
        <div className='App'>
            <h1>Please Log In</h1>
            {message !== "" && <span style={{"color":"red"}}>{message}</span>}
            <label htmlFor="email">Email ID</label>
            <input type="text" id="email" value= {email} placeholder = "email" onChange={ handleEmailChange }/>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value= {password} placeholder="password" onChange={ handlePasswordChange }/>
            <button onClick={loginUser}> Login </button>
            Already a User?<span onClick={GoToRegister}>SignUp</span>
        </div>
    );
});
