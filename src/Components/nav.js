import React from 'react';
// import { Router } from 'react-router-dom';
import '../App.css';
import {BrowserRouter as Router,Switch,Route,NavLink} from 'react-router-dom';
import './css/nav.css';
import Login from './login';
import Signup from './signup';
import Chatpage from './chatpage';
import { useSelector} from 'react-redux';

function Nav() {

    const user = useSelector(state => state.user);

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
                    <li class="nav-link"><NavLink activeClassName="Active" class="text-muted" exact to="/">Logout</NavLink></li>
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

             {/* <Login></Login> */}
        </div>
        </Router>
    )
}

export default Nav
