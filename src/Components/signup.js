import React,{useState} from 'react';
import './css/signup.css';
import {BrowserRouter as Router,Switch,Route,NavLink} from 'react-router-dom';
import Login from './login';
import axios from 'axios';

function Signup(props) {

    function goToSignin(){
        var Signup = document.getElementById('mainsignup');
        Signup.style.display = "none";
        // var Signup = document.getElementById('mainlogin');
        // Login.style.display = "block";
    }

    // function redirect(){
    //   var Signup = document.getElementById('mainsignup');
    //   Signup.style.display = "none";
    // }

    const [uname, setuname] = useState("");
    const [uemail, setuemail] = useState("");
    const [upassword, setupassword] = useState("");
    const [uusername, setuusername] = useState("");

    function setValue(e) {
      e.target.name==="Uname" && setuname(e.target.value);
      e.target.name==="Uemail" && setuemail(e.target.value);
      e.target.name==="Upassword" && setupassword(e.target.value);
      e.target.name==="Uusername" && setuusername(e.target.value);
  }


  function validate(){
    var isvalid=true;

    // validate for Name
    // var name = document.getElementsByName('Uname').value;       
    if(uname=="" || uname==null)
    {
        isvalid=false;
        alert("please enter name");
    }

    //validate for email
    var emailregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // var email = document.getElementsByName('Uemail').value;
    // console.log(emailregex.test(email));
    if(!emailregex.test(uemail)){
      alert("Email is not valid");
      isvalid=false;
    }
    
    //validate for username
    // var username = document.getElementsByName('Uusername').value;       
    if(uusername=="" || uusername==null)
    {
        isvalid=false;
        alert("please enter username");
    }

    //validate for password
    var passregex = /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/ ;
    // var password = document.getElementsByName('Upassword').value;
    // console.log(passregex.test(password));
    if(!passregex.test(upassword)){
        alert("Password should have 1 lowercase letter, 1 uppercase letter, 1 number, 1 special character and be at least 8 characters long");
        isvalid=false;
    }




    if(isvalid==true){
      var s = {uname,uemail,uusername,upassword};
      console.log(s);

      axios.post('http://localhost:3000/create-account',s).then((res)=>{
            alert(res.data.data);
            props.history.push("/");
        }) 
    }
}



  // function sendData() {
  //     // alert(uname);
  //     // alert(uemail);
  //     // alert(upassword);
  //     // alert(uusername);
  //     var s = {uname,uemail,uusername,upassword};
  //     console.log(s);

  //     axios.post('http://localhost:3000/create-account',s).then((res)=>{
  //           alert(res.data.data);
  //       }) 
  
  // }
    return (
      // <Router>
      <React.Fragment>
    
    <div id="mainsignup">
      <div class="left leftflex">

        <div id="login">
        <h2>Create your account</h2>
        <form action="">
          <i class="fa fa-vcard"></i>
          <input name="Uname" value={uname} onChange={(e)=>{setValue(e);}} type="text" placeholder="Name"/> <br/><br/>
          <i class="fa fa-envelope"></i>
          <input name="Uemail" value={uemail} onChange={(e)=>{setValue(e);}} type="email" placeholder="Email"/> <br/><br/>
          <i class="fa fa-user"></i>
          <input name="Uusername" value={uusername} onChange={(e)=>{setValue(e);}} type="text" placeholder="Username"/><br/> <br/>
          <i class="fa fa-key"></i>
          <input name="Upassword" value={upassword} onChange={(e)=>{setValue(e);}} type="password" placeholder="Set Password"/> <br/><br/> 
          {/* <button onClick={sendData}> <NavLink exact to="/" onClick={redirect}>  Sign up  </NavLink>  </button> */}
          <button onClick={validate}>  Sign up </button>
        </form>   <br/> <br/> 
        <div id="createact">Have an account? <NavLink exact to="/" onClick={goToSignin} class="text-primary">Sign in</NavLink></div>
      </div>
    </div>
    
    <div class="right">
      <div id="signup">
        <h1>Welcome back!</h1> <br/> <br/>  
        <p>To keep connected with your friends login your <b>BuddyUp</b> account here.</p> <br/> <br/> 
        <button ><NavLink exact to="/" onClick={goToSignin}>Sign in</NavLink> </button>
      </div>
    </div>
  </div>

<div>
<Switch>
    <Route path="/" exact component = {Login}/>
</Switch>
</div>

</React.Fragment>
// </Router>
    )
}

export default Signup