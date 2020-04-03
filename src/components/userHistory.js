import React, { Component } from 'react';
import {compose, lifecycle, withHandlers, withProps, withState} from "recompose";
import { withRouter } from "react-router-dom";
import '../App.css';
import '../static/modal.css'
import Avatar from "react-avatar";

export default compose(
    withRouter,
    withState("email", "handleEmailChange", ""),
    withState("password", "handlePasswordChange", ""),
    withState('message', 'setMessage', ''),
    withHandlers({
        GoToRegister:({history})=>()=>{
            history.push('/');
        }
    })

)(function UserHistory({hideHistory, allData, activeUsers, ...props}) {
    // let d = new Date()
    // const all = [{"username":"pop", "email":"joy@mail.com", "time":d.toLocaleString()}];
    return (
        <div className="modal-Section-new">
            <div className="sponsor-map-modal">
                <div className="md2-inner-content">
                <button style={{"cursor": "pointer", "float": "right", "background":"transparent"}} onClick={hideHistory}>Close</button>
                <h1>Previously logged in users</h1>
                <div>
                    <table style={{"width":"100%"}}>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Last Active</th>
                        </tr>
                        {allData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>{(activeUsers.includes(item.email))? "online":item.time}</td>
                            </tr>
                        ))}
                </table>
                 </div>

            </div>
            </div>
        </div>
    );
});
