import React from 'react';
import './css/login.css';
import {BrowserRouter as Router,Switch,Route,NavLink} from 'react-router-dom';
import Nav from './nav';
import Signup from './signup';
import Chatpage from './chatpage'


function Login() {

  function funSignIn(){
    var Login = document.getElementById('mainlogin');
    Login.style.display = "none";
  }

    return (
    <Router>
    <React.Fragment>

     <div id="mainlogin">
    <div class="left leftflex">

      <div id="login">
        <h2>Sign in your account</h2>
        <form action="">
          <i class="fa fa-user"></i>
          <input type="text" placeholder="Enter your username"/><br/> <br/> <br/>
          <i class="fa fa-key"></i>
          <input type="password" placeholder="Enter your password"/> <br/><br/> 
          <a href="">Forgot Password ?</a><br/><br/>
          <button> <NavLink exact to="/buddyup-chat" onClick={funSignIn}>Sign in </NavLink> </button>
        </form>  
        <div id="createact">Don't have account? <a href="#">Create Account</a></div>
      </div>
    </div>
    
    <div class="right">
      <div id="signup">
        <h1>Hello Dear!</h1> <br/> <br/>  
        <p>Enter your personal details and start your journey with <b>BuddyUp</b> today.</p> <br/> <br/> 
        {/* <button><NavLink class="text-muted" to="/create-account">Sign up</NavLink></button> */}

        <button ><NavLink exact to="/create-account" onClick={() => {
                                var Login = document.getElementById('mainlogin');
                                // var Signup = document.getElementById('mainsignup');
                                Login.style.display = "none";
                                // Signup.style.display = "block";
                            }}>Sign up</NavLink> </button>

      </div>
    </div>
  </div>

<div>
<Switch>
    <Route path="/create-account" exact component = {Signup}/>
    <Route path="/buddyup-chat" exact component = {Chatpage}/>
</Switch>
</div>

</React.Fragment>
</Router>
    )
}

export default Login