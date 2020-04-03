import React from 'react';
import {compose, withHandlers, withProps, withState, lifecycle} from "recompose";
import Avatar from 'react-avatar';

export default compose(
    withState("hover","setHover",false),
    withState("currentHover","setCurrentHover",{}),
    withHandlers({
        showDiv:({setHover, currentHover, allData}) => (event) => {
            console.log("event in active",event.target.id);
            event.preventDefault();
            setHover(false)
        },
        hideDiv:({setHover}) => (event) => {
            event.preventDefault();
            setHover(false)
        }

    })
)(function Active ({activeUsers, hover, showDiv, hideDiv, allData, ...props}) {
    return(
        <div style={{"display": "flex"}}>
            {activeUsers.map((item, index) => (
            <div id={index} onMouseOver={showDiv} onMouseLeave={hideDiv}>
                <Avatar round={true} size="40px" name={item}/>
                </div>
            ))}
            {hover?<div className= "ul-value-lang">
                <span>reena</span>
                <span>reena@mail.com</span>
            </div>:""}
        </div>



    )
})

