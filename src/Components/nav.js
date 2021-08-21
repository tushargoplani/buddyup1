import React from 'react';
import '../App.css';
import {BrowserRouter as Router,Switch,Route,NavLink} from 'react-router-dom';
import './css/nav.css';
import Login from './login';
import Signup from './signup';
import Chatpage from './chatpage';
import {useDispatch, useSelector} from 'react-redux';

function Nav(props) {

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    function logout(){
            dispatch({type:"LOGOUT_USER"});
            // props.history.push("/");
    }

    return (
        <Router>
        <div>
        
            <nav class="navbar navbar-expand-md  navbar-dark" style={{backgroundColor: "black"}}>
            <a class="navbar-brand" href="#"><div id="logo">Buddy<span>Up</span></div></a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="collapsibleNavbar">
                <ul class="navbar-nav ml-auto">
                {user && <li class="nav-item">
                    <li class="nav-link text-white font-weight-bold"><NavLink class="text-white font-weight-bold" onClick={logout} exact to="/">Logout</NavLink></li>
                </li>}
                </ul>
            </div>  
            </nav>

            <div>
                <Switch>
                    <Route path="/" exact component = {Login}/>  
                    <Route path="/create-account" exact component = {Signup}/>
                    <Route path="/buddyup-chat" exact component = {Chatpage}/>
                </Switch>
                </div>

        </div>
        </Router>
    )
}

export default Nav
