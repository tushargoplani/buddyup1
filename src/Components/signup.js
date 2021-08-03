import React from 'react';
import './css/signup.css';
import {BrowserRouter as Router,Switch,Route,NavLink} from 'react-router-dom';
import Login from './login';

function Signup() {
    return (
      <Router>
      <React.Fragment>
    
        <div id="mainsignup">
    <div class="left leftflex">

      <div id="login">
        <h2>Create your account</h2>
        <form action="">
          <i class="fa fa-vcard"></i>
          <input type="text" placeholder="Name"/> <br/><br/>
          <i class="fa fa-envelope"></i>
          <input type="email" placeholder="Email"/> <br/><br/>
          <i class="fa fa-user"></i>
          <input type="text" placeholder="Username"/><br/> <br/>
          <i class="fa fa-key"></i>
          <input type="password" placeholder="Set Password"/> <br/><br/> 
          <button>Sign up</button>
        </form>   <br/> <br/> 
        <div id="createact">Have an account? <a href="#">Sign in</a></div>
      </div>
    </div>
    
    <div class="right">
      <div id="signup">
        <h1>Welcome back!</h1> <br/> <br/>  
        <p>To keep connected with your friends login your <b>BuddyUp</b> account here.</p> <br/> <br/> 
        <button ><NavLink exact to="/" onClick={() => {
                                var Signup = document.getElementById('mainsignup');
                                Signup.style.display = "none";
                            }}>Sign in</NavLink> </button>
      </div>
    </div>
  </div>

<div>
<Switch>
    <Route path="/" exact component = {Login}/>
</Switch>
</div>

</React.Fragment>
</Router>
    )
}

export default Signup
