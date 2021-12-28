import React, { useState } from 'react';
import './css/signup.css';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import Login from './login';
import axios from 'axios';

function Signup(props) {

  function goToSignin() {
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
  const [otp, setotp] = useState("");
  const [randomotp, setrandomotp] = useState("")

  function setValue(e) {
    e.target.name === "Uname" && setuname(e.target.value);
    e.target.name === "Uemail" && setuemail(e.target.value);
    e.target.name === "Upassword" && setupassword(e.target.value);
    e.target.name === "Uusername" && setuusername(e.target.value);
    e.target.name === "otp" && setotp(e.target.value);
  }


  //   function EmailAndUsername() {  // existing email and existing username not be repeated
  //     var em = {uemail}
  //     axios.post('http://localhost:3000/valid-email', em).then((res) => {
  //         var a = res.data.status
  //         // console.log(a)
  //         if (a === 'ok') {
  //             var s = {uname,uemail,uusername,upassword};
  //             console.log(s);
  //             axios.post('http://localhost:3000/create-account',s).then((res)=>{
  //             alert(res.data.data);
  //             props.history.push("/");
  //         }) 
  //         } 
  //         else {
  //             alert(res.data.data);
  //         }
  //     })
  // }


  function validate() {
    var isvalid = true;

    // validate for Name 
    if (uname == "" || uname == null) {
      isvalid = false;
      alert("please enter name");
    }
    //validate for email
    var emailregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailregex.test(uemail)) {
      alert("Email is not valid");
      isvalid = false;
    }
    //validate for username   
    if (uusername == "" || uusername == null) {
      isvalid = false;
      alert("please enter username");
    }
    var userregex = /^[a-z0-9_\.]+$/;
    if (!userregex.test(uusername)) {
      alert("Usernames can only have: Lowercase Letters (a-z), Numbers (0-9), Dots (.), Underscores (_)");
      isvalid = false;
    }
    //validate for password
    var passregex = /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/;
    if (!passregex.test(upassword)) {
      alert("Password should have 1 lowercase letter, 1 uppercase letter, 1 number, 1 special character and be at least 8 characters long");
      isvalid = false;
    }

    if (isvalid == true) {
      axios.post('http://localhost:3000/valid-username', { uusername }).then((res) => {
        if (res.data.status == 'ok') {
          axios.post('http://localhost:3000/valid-email', { uemail }).then((res) => {
            if (res.data.status == "ok") {
              var random = Math.floor((Math.random() * 1000000) + 1);
              setrandomotp(random);
              axios.post("http://localhost:3000/send-user-otp", { uemail, otp: random }).then((res) => {
                if (res.data.status == "ok") {
                  alert("OTP sent to your mail id. Check your mail")
                  document.getElementById('login').style.display = "none";
                  document.getElementById('createotp').style.display = "block";
                }
              })
            }
            else{
              alert("Account already created with this email id")
            }
          })
        }
        else{
          alert("Username already taken :( ");
        }
      })

    }

  }

  function otpcheck() {
    if(otp==randomotp){
    var s = { uname, uemail, uusername, upassword };
    console.log(s);
    axios.post('http://localhost:3000/create-account', s).then((res) => {
      alert(res.data.data);
      props.history.push("/");
    })
  }
  else{
    alert("Incorrect otp ");
    setotp('');
  }
  }

  function goback() {
    document.getElementById('login').style.display = "block";
    document.getElementById('createotp').style.display = "none";
  }


  return (
    // <Router>
    <React.Fragment>

      <div id="mainsignup">
        <div class="left leftflex">

          <div id="login">
            <h2>Create your account</h2>
            <form action="">
              <i class="fa fa-vcard"></i>
              <input name="Uname" value={uname} onChange={(e) => { setValue(e); }} type="text" placeholder="Name" /> <br /><br />
              <i class="fa fa-envelope"></i>
              <input name="Uemail" value={uemail} onChange={(e) => { setValue(e); }} type="email" placeholder="Email" /> <br /><br />
              <i class="fa fa-user"></i>
              <input name="Uusername" value={uusername} onChange={(e) => { setValue(e); }} type="text" placeholder="Username" class="lowercase" /><br /> <br />
              <i class="fa fa-key"></i>
              <input name="Upassword" value={upassword} onChange={(e) => { setValue(e); }} type="password" placeholder="Set Password" /> <br /><br />
              {/* <button onClick={sendData}> <NavLink exact to="/" onClick={redirect}>  Sign up  </NavLink>  </button> */}
              <button type="button" onClick={validate}>  Sign up </button>
            </form>   <br /> <br />
            <div id="createact">Have an account? <NavLink exact to="/" onClick={goToSignin} class="text-primary">Sign in</NavLink></div>
          </div>

          <div id="createotp">
            <h2>Enter OTP for Verfication</h2>
            <form action="">
              <i class="fa fa-vcard"></i>
              <input name="otp" value={otp} onChange={(e) => { setValue(e); }} type="text" placeholder="Enter OTP " /> <br /><br />
              <button className='w-25 mr-4' type="button" onClick={goback}>  Edit details </button>
              <button className='w-25 ml-4' type="button" onClick={otpcheck}>  Validate </button>
            </form>
          </div>

        </div>

        {/* <div class="col-md-5 col-lg-4" id="createotp">
          <form className="d-inline-block" style={{ padding: '3%', margin: '4px 0', borderRadius: '2%', boxShadow: '3px 4px 3px 2px #888888' }}>
            <h1 style={{ display: 'inline-block', width: '82%' }}>Confirm Email</h1>
            <button type='button'  className='bg-warning' style={{fontWeight:'600',fontFamily:'sans-serif',padding:'2% 1%',margin:'0',borderRadius:'10%',boxShadow:'2px 3px 2px 3px #888888'}}> Go Back </button>
            <p>Please fill 6alphanumeric code for create your account.</p>
            <hr className="signuphr" />
            <label for="otp" className="inputotp"><b>Otp sent on gievn email-address</b></label>
            <input style={{ fontFamily: 'sans-serif' }} type="text" value={otp} onChange={(e) => { setValue(e); }} placeholder="Enter Verfication Code" name="otp" id="otp" required />
            <hr className="signuphr" />
            <button type="button" class="registerbtn" onClick={otpcheck}> Submit </button>
          </form>
        </div> */}

        <div class="right">
          <div id="signup">
            <h1>Welcome back!</h1> <br /> <br />
            <p>To keep connected with your friends login your <b>BuddyUp</b> account here.</p> <br /> <br />
            <button ><NavLink exact to="/" onClick={goToSignin}>Sign in</NavLink> </button>
          </div>
        </div>
      </div>

      <div>
        <Switch>
          <Route path="/" exact component={Login} />
        </Switch>
      </div>

    </React.Fragment>
    // </Router>
  )
}

export default Signup