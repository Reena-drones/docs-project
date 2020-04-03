import React from 'react';
import {compose, lifecycle, withHandlers, withState} from "recompose";
import '../static/header.css'
import Active from './active'
import UserHistory from './userHistory'
import {withRouter} from 'react-router-dom';

export default compose(
    withRouter,
    withState("activeUsers", "setActiveUsers", []),
    withState("ws", "setws", {}),
    withState("allData", "setAllData", []),
    withState("show", "setShow", false),
    withHandlers({
       logoutUser: ({ history, ws, ...props})=>()=>{
           let id = localStorage.getItem('id');
           if (ws) {
               let d = new Date();
               ws.send(JSON.stringify({'id': id, "time":d.toLocaleString()}));
               localStorage.removeItem('id');
           }
           fetch('http://localhost:8000/insertTime', {
               method: 'POST',
               body: JSON.stringify({"email": id}),
               headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
           })
               .then((response) => {
                   if (response.status !== 200) {
                   }
                   response.json()
                       .then((data) => {
                           if (data.status === 200)
                               console.log("inserted successfully");
                           else
                               props.logoutUser()
                       })
                   }
               );
               history.push('/login')
       },
       showHistory: ({setShow}) => () => {
           setShow(true)
       },
        hideHistory: ({setShow}) => () => {
            setShow(false)
        }
    }),
    lifecycle({
        componentDidMount() {
            try {
                let props = this.props;
                fetch('http://localhost:8000/getAllData', {method: 'GET'})
                    .then((response) => {
                        if (response.status !== 200) {
                            props.logoutUser()
                        }
                        response.json()
                            .then((data) => {
                                if(data.status === 200){
                                    for (let item of data.users) {
                                        let time = new Date(item["time"] * 1000);
                                        item["time"] = time.toLocaleString()
                                    }
                                    props.setAllData(data.users);
                                    let id = localStorage.getItem('id');
                                    if (id){
                                        let websocket = new WebSocket("ws://127.0.0.1:6789/" + id);
                                        props.setws(websocket);
                                        websocket.onmessage = function (event) {
                                            let res = JSON.parse(event.data);
                                            props.setActiveUsers(res["active"]);
                                            if (res["type"] === "remove_users" ) {
                                                for (let item of data.users) {
                                                    console.log(res["update_time"], item["email"]);
                                                    if (res["update_time"].hasOwnProperty(item["email"])) {
                                                        item["time"] = res["update_time"][item["email"]]
                                                    }
                                                }
                                                props.setAllData(data.users)
                                            }
                                        }
                                    }
                                }
                                else
                                    props.logoutUser()
                            })
                        }
                    );

            } catch (ex) {
                console.log(ex);
            }
        },
    })
)(function Profile ({logoutUser, activeUsers, showHistory, hideHistory,show, allData, ...props}) {
    return(
        <React.Fragment>
        <div className={show?"blur-screen":""}>
            <div className="header">
                <h1> Hello </h1>
                <div style={{"position": "absolute", "top": 10, "right": 10, "padding": "10px 10px 10px 10px"}} >
                    <div style={{"display": "inline-block", "paddingRight": 10}}> <Active activeUsers={activeUsers} allData={allData}/> </div>
                    <button style={{"fontSize": 15, "boxShadow": "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)"}} onClick={showHistory}>History</button>
                    <button style={{"fontSize": 15, "boxShadow": "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)"}} onClick={logoutUser}>Logout</button>
                </div>

            </div>
            <div style={{"padding":50}}>
                <h2>Let us read about new life</h2>
                <p style={{"textAlign": "justify"}}>
                    I’m suspicious of those things where more is always supposed to be better. Nature prefers moderation, so good things can harm you when you get too much of them. Drinking more water is good. Too much and you’ll drown.
                    I think “meaning” is one of those things that is usually good, but that can cause you problems when there is too much of it.

                    What Meaning Means
                    Listen to this article

                    Meaning is a slippery word, so it’s hard to be clear we’re using it the same way. However, we all know when a person, thing, goal or idea feels significant to us, and when those same things feel ordinary. The difference is meaning.

                    In addition to being a feeling, meaning is also an idea. When someone asks you what something means, they’re asking for you to explain it in words. They want its definition, cause or likely implications. Meanings are words and ideas you weave together in your head.


                    More meaning tends to be better. A complete absence of meaning usually (although perhaps not always) feels awful. Similarly, a lack of meaning in the conceptual sense is confusion and ignorance. We’d prefer to say what things mean and believe it, than to simply shrug our shoulders and say, “I don’t know.”

                    How Can You Have Too Much Meaning?

                    I think there’s two ways you can have too much meaning.

                    First, you could feel too strongly about the significance of something. We’ve all had anxiety and fears when something is so important to us that we’re unable to function. That relationship that you wanted to hold onto even though the other person wasn’t in love with you. That job which meant everything to you—until you got fired. That conviction you held to desperately, until it started to unravel.

                    Feelings are mental tools. They put our minds into a state that allows certain ideas, actions and thoughts to flow more easily than others. However, to allow some ideas to flow more easily, that must necessarily mean you’re blocking others. The feeling of significance therefore will be useful in some contexts and harmful in others, just like anger, fear, optimism, joy, love, sadness and everything else you feel.

                    The second way you can have too much meaning is related to the intellectual idea of meaning. If you have a strong set of ideas about what something means, either in terms of its definition, explanation or implied effects, that can “lock” you into a certain way of seeing things. Too much meaning can prevent you from seeing something in another way, and other perspectives may be necessary to solve certain problems.

                    How to Tell if You Have Too Much Meaning
                    I suspect that the anxiety and fear we often feel in our daily lives is a result of too much meaning, rather than too little. It’s a combination of a strong feeling of significance, along with a perceived lack of control.


                    If you follow politics, you may feel like the world is going mad, and that the battles over who leads the country and what policies they implement is extremely significant. Yet, at the same time, you may feel nearly powerless to control the results.

                    Similarly, in your personal life, there may be situations where there isn’t much more you can do to overcome a problem, but you can’t stop thinking about it. Although people don’t often see their anxieties and fears as resulting from an excess in meaning, it follows that this is the case because if you genuinely didn’t feel the situation was significant you wouldn’t worry about it.

                    Intellectually an excess of meaning can result in an overly rigid and fixed way of viewing the world. Your ideas, explanations and reasoning about the world is so tight, that you get stuck when you encounter situations that fail to make sense for you.


                    Is Mindfulness the Relaxation of Meaning?
                    I have an explanation of meditation and mindfulness and why it seems to be so popular.

                    Mindfulness, particularly the body-scanning methods popular among Vipassana retreats, are effectively, a way of reducing the emotional and intellectual excesses of meaning.

                    A common experience when you’re practicing, for instance, is to have a pain somewhere in your body. At first this feels very significant and something that you ought to do something about. After twenty minutes though, the pain starts to turn into something more abstract, perhaps an odd pulsation or throbbing that has changing characteristics.


                    At one level, I think what has happened is similar to how if you repeat the same word over and over again (say the word “meaning” a few dozen times out loud to get what I mean). By repetitive attention something that would be processed at a level of meaning dissolves into parts that lack that meaning and you start experiencing something that seems to lack connection to the meanings you had previously.

                    I hesitate to say this is entirely what’s going on with meditation. Many meditators will note the opposite experience: that suddenly the world feels filled with a hidden specialness that was invisible before.

                    However, I also suspect that this may be a consequence of the thorough de-meaning-ization of your regular experience. Dehabituate your normal filters for processing meaning and new ones will start forming again in the vacuum. Those new ones may not have the same obstacles as the old ones and the fresh perspective may be more enjoyable.

                    Should You Take Time to “Relax” Your Meaning of Life?
                    I think meanings, especially intense ones, are an important part of living life well. Don’t confuse what I’m saying for arguing we should all live nihilistically.

                    Rather, I think what’s necessary is that, from time to time, you are able to temporarily “relax” your meanings in life. This relaxation may be necessary to get out of ruts where your current way of viewing the situation is frustrated and can’t allow you to live your best life.

                    These meaningness relaxations may be related to specific situations (i.e. how you think about your future career) or it could be more global (i.e. should you find meaning in ambition at all?).

                    I also suspect that there is no perfect state of meanings, no eternal viewpoint that will be good for all things. Therefore, relaxation of meaning is probably a necessary adjustment that needs to be done every once in awhile. The new meanings you get to may not be any better (in an absolute sense) than the ones you went in with, but they may help you see around obstacles that keep you from living a good life.

                </p>
            </div>
        </div>
            {show ? <UserHistory hideHistory={hideHistory} activeUsers={activeUsers} allData={allData}/>:""}
        </React.Fragment>
    )
})