import React from 'react';
// import { Router } from 'react-router-dom';
import '../App.css';
import {BrowserRouter as Router,Switch,Route,NavLink} from 'react-router-dom';
import './css/nav.css';
import Login from './login';
import Signup from './signup';
import Chatpage from './chatpage';

function Nav() {
    return (
        <Router>
        <div>
        
            <nav class="navbar navbar-expand-md bg-dark navbar-dark">
            <a class="navbar-brand" href="#"><div id="logo">Buddy<span>Up</span></div></a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>
            {/* <div class="collapse navbar-collapse" id="collapsibleNavbar">
                <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <li class="nav-link"><NavLink activeClassName="Active" class="text-muted" exact to="/">Sign in</NavLink></li>
                </li>
                <li class="nav-item">
                    <li class="nav-link"><NavLink activeClassName="Active" class="text-muted" to="/create-account">Sign up</NavLink></li>
                </li>
                </ul>
            </div>   */}
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
