import React,{useState,useEffect} from 'react';
import './css/login.css';
import axios from 'axios';
import {BrowserRouter as Router,Switch,Route,NavLink} from 'react-router-dom';
import Nav from './nav';
import Signup from './signup';
import Chatpage from './chatpage'


function Login(props) {

    const [users,setUsers] = useState([])
    useEffect(()=>{
     axios.get('http://localhost:3000/list-account').then((res)=>{
         console.log(res.data.data)

         setUsers(res.data.data)

     })   
    },[])
    function Auth(){
        var username=document.getElementById('username').value;
        var password=document.getElementById('password').value;
        // alert(username);
        // alert(password);
        var check=users.some((s)=>{
            return s.uusername==username && s.upassword==password
        })
        console.log(check);
        if(check==true){
            alert("you have successfully login")

            
            props.history.push("/buddyup-chat");
            
        }
        else{
            alert("please check email or password")
        }
    }

  function goToSignup(){
      var Login = document.getElementById('mainlogin');
      // var Signup = document.getElementById('mainsignup');
      Login.style.display = "none";
      // Signup.style.display = "block";
  }

  // function funSignIn(){
  //   var Login = document.getElementById('mainlogin');
  //   Login.style.display = "none";
  // }

    return (
    // <Router>
    <React.Fragment>

     <div id="mainlogin">
    <div class="left leftflex">

      <div id="login">
        <h2>Sign in your account</h2>
        <form action="">
          <i class="fa fa-user"></i>
          <input id="username" type="text" placeholder="Enter your username" class="lowercase"/><br/> <br/> <br/>
          <i class="fa fa-key"></i>
          <input id="password" type="password" placeholder="Enter your password"/> <br/><br/> 
          <a href="">Forgot Password ?</a><br/><br/>
          <button onClick={Auth}>Sign in  </button>
        </form>  
        <div id="createact">Don't have account? <NavLink exact to="/create-account" onClick={goToSignup} class="text-primary">Create Account</NavLink></div>
      </div>
    </div>
    
    <div class="right">
      <div id="signup">
        <h1>Hello Dear!</h1> <br/> <br/>  
        <p>Enter your personal details and start your journey with <b>BuddyUp</b> today.</p> <br/> <br/> 
        <button ><NavLink exact to="/create-account" onClick={goToSignup}>Sign up</NavLink> </button>

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
// </Router>
    )
}

export default Login