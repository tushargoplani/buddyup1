import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Picker from 'emoji-picker-react';
import './css/chatpage.css';

function Chatpage(props) {

  const user = useSelector(state => state.user);
  useEffect(() => {
    if (!user) {
      props.history.push("/");
    }
  })

  const userId = useSelector(state => state.user._id);
  const userName = useSelector(state => state.user.uname);
  const userUserName = useSelector(state => state.user.uusername);
  const userPassword = useSelector(state => state.user.upassword);
  const userEmail = useSelector(state => state.user.uemail);
  var userImage = useSelector(state => state.user.profile);

  const [uname, setuname] = useState(userName);
  const [uemail, setuemail] = useState(userEmail);
  const [oldpassword, setoldpassword] = useState("");
  const [newpassword, setnewpassword] = useState("");
  const [reenternewpassword, setreenternewpassword] = useState("");
  const [uusername, setuusername] = useState(userUserName);
  const [friend, setfriend] = useState("");
  // const [profile, setprofile] = useState("");
  var profile;

  const [uploadPercentage, setuploadPercentage] = useState("");
  const [message, setmessage] = useState("");

  function setValue(e) {
    e.target.name === "Uname" && setuname(e.target.value);
    e.target.name === "Uemail" && setuemail(e.target.value);
    e.target.name === "oldpassword" && setoldpassword(e.target.value);
    e.target.name === "newpassword" && setnewpassword(e.target.value);
    e.target.name === "re-enter-new-password" && setreenternewpassword(e.target.value);
    e.target.name === "Uusername" && setuusername(e.target.value);
    e.target.name === "friend" && setfriend(e.target.value);
    e.target.name === "message" && setmessage(e.target.value);
  }


  function setProfile(e) {
    profile = e.target.files[0];
    console.log(profile);
  }

  function updateProfile() {
    if (profile != undefined) {
      var formData = new FormData();
      formData.append("_id", userId);
      formData.append("profile", profile);
      console.log(profile);
      axios.post('http://localhost:3000/update-profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: function (progressEvent) {
          console.log("file Uploading Progresss.......");
          // console.log(progressEvent);
          setuploadPercentage(parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100)));
          //   setfileInProgress(progressEvent.fileName)
        }
      }).then((res) => {
        alert(res.data.data);
        userImage = profile;
      }).catch(res => {
        alert("Some issue occur while updating your profile");
      });
    }
    else {
      alert("please choose profile");
    }
  }

  function updateDetails() {
    var updateUserDetails = { userId, uname, uemail };
    axios.post('http://localhost:3000/update-user', updateUserDetails).then((res) => {
      alert(res.data.data);
    }).catch(res => {
      alert("Edit not saved :(");
    })
  }

  function changePassword() {
    if (userPassword == oldpassword) {
      var isvalid = true;
      //validate for password
      var passregex = /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/;
      if (!passregex.test(newpassword)) {
        alert("Password should have 1 lowercase letter, 1 uppercase letter, 1 number, 1 special character and be at least 8 characters long");
        isvalid = false;
      }
      if (isvalid == true) {
        if (newpassword == reenternewpassword) {
          axios.post('http://localhost:3000/update-password', { userId, reenternewpassword }).then((res) => {
            alert(res.data.data);
            setoldpassword('');
            setnewpassword('');
            setreenternewpassword('');
          }).catch(res => {
            alert("Password not changed :( ");
          })
        }
        else {
          alert("New password not match with re-enter new password")
        }
      }
    }
    else {
      alert("Old password is incorrect")
    }
  }

  function addFriend() {
    if (friend != "") {
      if (friend != userUserName) {
        axios.post('http://localhost:3000/search-for-user', { friend }).then(
          (res) => {
            if (res.data.data.length > 0) {
              axios.post('http://localhost:3000/get-notif', myUsername).then(
                (res) => {
                  if (res.data.data[0].friends) {
                    if (res.data.data[0].friends.length >= 1) {
                      var forUnique = res.data.data[0].friends.map((a) => { return a.name });
                      var status = forUnique.some(elem => elem === friend);
                      if (status == true) {
                        alert("you cant send friend request again")
                      }
                      else {
                        // id validation that user exist or not
                        var addfrnd = { friend, userUserName };
                        axios.post('http://localhost:3000/add-friend', addfrnd).then((res) => {
                          alert(res.data.data);
                          setfriend('');
                        })
                      }
                    }
                  }
                  else {
                    var addfrnd = { friend, userUserName };
                    axios.post('http://localhost:3000/add-friend', addfrnd).then((res) => {
                      alert(res.data.data);
                      setfriend('');
                    })

                  }
                })
            }
            else {
              alert("User not found. Please enter correct username.")
            }
          })
      }
      else {
        alert("You can't send you a request. 🥱")
      }
    }
    else {
      alert("enter frnd's username");
    }
  }

  function accept(friendReq) {
    // console.log(friendReq);
    var acceptFrnd = { friendReq, userUserName };
    // console.log(acceptFrnd);
    axios.post('http://localhost:3000/accept-request', acceptFrnd).then((res) => {
      if (res.data.status == "ok") {
        alert(res.data.data);
      }
    });
  }

  function decline(mine, frnd) {
    axios.post('http://localhost:3000/unfriend-or-decline', { mine, frnd }).then((res) => {
      if (res.data.status == "ok") {
        alert(res.data.data);
      }
    });
  }

  function unfriend(mine, frnd) {
    axios.post('http://localhost:3000/unfriend-or-decline', { mine, frnd }).then((res) => {
      if (res.data.status == "ok") {
        alert(res.data.data);
        setchatUsername('');
      }
    });
  }



  var myUsername = { userUserName };

  // notifications
  const [notification, setnotification] = useState([]);
  useEffect(() => {
    setInterval(() => {
      axios.post('http://localhost:3000/get-notif', myUsername).then(
        (res) => {
          if (res.data.status == "ok") {
            if (res.data.data[0].friends) {
              var notifs = res.data.data[0].friends.filter(function (s) {
                var recieve = s.recieved == true;
                var status = s.status == false;
                return recieve && status;
              });
              // console.log(notifs);
              setnotification(notifs);
            }
          }
        })
    }, 2000)
  }, []);


  var mainnotif = notification.map((S) => {
    return <a key={S.name} href="#" className="filterNotifications all latest notification" data-toggle="list">
      <img className="avatar-md" src="dist/img/avatars/default.png" data-toggle="tooltip" data-placement="top" alt="avatar" />
      {/* <div className="status">
        <i className="material-icons online">fiber_manual_record</i>
      </div> */}
      <div className="data">
        <p>{S.name}, has sent you a friend request.</p>
        <button class="btn button col-sm-5 py-2" onClick={() => { accept(S.name) }} >Accept</button> &nbsp; &nbsp;
        <button class="btn button col-sm-5 py-2" onClick={() => { decline(myUsername.userUserName, S.name) }} >Decline</button>
      </div>
    </a>
  });






  // Friend list
  const [friendlist, setfriendlist] = useState([]);
  useEffect(() => {
    setInterval(() => {
      axios.post('http://localhost:3000/myFriends', myUsername).then(
        (res) => {
          if (res.data.status == "ok") {
            if (res.data.data[0].friends) {
              var friends = res.data.data[0].friends.filter(function (s) {
                var status = s.status == true;
                return status;
              });
              // console.log(friends);
              setfriendlist(friends);
            }
          }
        })
    }, 2000)
  }, []);


  var friendList = friendlist.map((S) => {
    return <div onClick={() => { openChat(S.name) }} className="filterMembers all online contact" data-toggle="list" style={{ cursor: "pointer" }}>
      <img className="avatar-md" src="dist/img/avatars/default.png" data-toggle="tooltip" data-placement="top" title={S.name} alt="avatar" />
      <div className="data">
        <h5>{S.name}</h5>
        {/* <p>will show last message</p> */}
      </div>
      <div className="person-add">
        <i className="material-icons">person</i>
      </div>
    </div>
  });



  const [fname, setfname] = useState([]);
  const [chatName, setchatName] = useState("");
  const [chatProfile, setchatProfile] = useState("");
  const [chatUsername, setchatUsername] = useState("");
  const [sortedMergeMessages, setsortedMergeMessages] = useState([]);
  const [messageList, setmessageList] = useState([]);
  const [messageList2, setmessageList2] = useState([]);
  const [refreshId, setrefreshId] = useState();

  function openChat(fData) {
    setmessage('');
    // console.log(refreshId);
    clearInterval(refreshId);
    axios.post('http://localhost:3000/friendData/?id=' + fData).then(
      (res) => {
        if (res.data.status == "ok") {
          setfname(res.data.data);
          setchatName(res.data.data[0].uname);
          // console.log(chatName);
          setchatUsername(res.data.data[0].uusername);
          setchatProfile(res.data.data[0].profile);
        }
      }
    )

    setrefreshId(setInterval(() => {
      // show friend msg
      axios.post('http://localhost:3000/messages2', { fData }).then(
        (res) => {
          if (res.data.status == "ok") {
            var chat2 = res.data.data.filter(function (s) {
              var friend2 = s.friendUsername === myUsername.userUserName;
              return friend2;
            });
            // console.log(chat2);
            setmessageList2(chat2);
          }
          else {
            setmessageList2([]);
          }
        }
      )

      // Show My Messages
      axios.post('http://localhost:3000/messages1', myUsername).then(
        (res) => {
          if (res.data.status == "ok") {
            var chat = res.data.data.filter(function (s) {
              var friend = s.friendUsername === fData;
              return friend;
            });
            // console.log(chat);
            setmessageList(chat);
          }
          else {
            setmessageList([]);
          }
        }
      )

    }, 300))
  }

  useEffect(() => {
    var mergeMessages = [...messageList2, ...messageList];
    // console.log(mergeMessages);
    function msgSort(a, b) {
      var frst = new Date(a.dateTime);
      var scnd = new Date(b.dateTime);
      return frst - scnd;
    }
    setsortedMergeMessages(mergeMessages.sort(msgSort));
    // console.log(sortedMergeMessages);

  }, [messageList, messageList2])


  // auto scroll messages
  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', inline: 'nearest' });
  }, [sortedMergeMessages.length])

  // send messages
  function sendMessage(friendUsername) {
    if (message != '') {
      var today = new Date();
      var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = today;
      var messageid = Math.random();

      var sendMessage = { userUserName, friendUsername, message, time, date, dateTime, messageid };
      axios.post('http://localhost:3000/send-message', sendMessage).then((res) => {
        // alert(res.data.data);
      })
      setmessage('');
    }
  }


  // emoji picker
  const [showPicker, setShowPicker] = useState(false);
  const onEmojiClick = (event, emojiObject) => {
    setmessage(prevInput => prevInput + emojiObject.emoji);
    setShowPicker(false);
  };


  // delete a message
  function deleteMsg(id) {
    axios.post('http://localhost:3000/delete-a-message', { id }).then(
      (res) => {
        alert(res.data.data);
      })
  }

  // delete chat history
  function deleteHistory(mine, frnd) {
    axios.post('http://localhost:3000/delete-all-message', { mine, frnd }).then(
      (res) => {
        alert(res.data.data);
      })
  }




  return (
    <main>
      <div className="layout">
        {/* Start of Navigation */}
        <div className="navigation">
          <div className="container">
            <div className="inside">
              <div className="nav nav-tab menu">

                <button className="btn"><img className="avatar-xl" src={userImage ? `http://localhost:3000/${userImage}` : "dist/img/avatars/default.png"} alt="avatar" /></button>
                <a href="#members" className="active" data-toggle="tab"><i className="material-icons">people</i></a>
                <a href="#notifications" data-toggle="tab"><i className="material-icons">person_add</i></a>
                <div data-toggle="tab" className="f-grow1"></div>

                {/* <button class="btn mode"><i class="material-icons">brightness_2</i></button> */}
                <a href="#settings" data-toggle="tab"><i className="material-icons">settings</i></a>
                {/* <button className="btn power" onclick="visitPage();"><i className="material-icons">power_settings_new</i></button> */}
              </div>
            </div>
          </div>
        </div>
        {/* End of Navigation */}
        {/* <button onClick={notification}>Check notification</button> */}
        {/* Start of Sidebar */}
        <div className="sidebar" id="sidebar">
          <div className="container">
            <div className="col-md-12">
              <div className="tab-content">
                {/* Start of Contacts */}
                <div className="tab-pane fade active show" id="members">
                  <div className="search">
                    <form className="form-inline position-relative">
                      <input type="search" className="form-control" id="people" placeholder="Search for people..." />
                      <button type="button" className="btn btn-link loop"><i className="material-icons">search</i></button>
                    </form>
                    {/* <button className="btn create" data-toggle="modal" data-target="#exampleModalCenter"><i className="material-icons">person_add</i></button> */}
                  </div>
                  <div className="contacts">
                    <h1>Chats</h1>
                    {friendList.length != 0 && <div className="list-group" id="contacts" role="tablist">
                      {friendList}

                    </div>}
                    {friendList.length == 0 && <div className="list-group" id="contacts" role="tablist" style={{ height: '78vh', fontFamily: 'Seoge UI', fontSize: '20px', fontWeight: '400', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                      <p style={{ textAlign: "center" }}> Start Chatting to friends by sending them friend requests. </p>
                    </div>}
                  </div>
                </div>
                {/* End of Contacts */}

                {/* Start of Notifications */}
                <div id="notifications" className="tab-pane fade">
                  <div className="search">
                    <form className="form-inline position-relative">
                      <input type="search" className="form-control" id="notice" placeholder="Enter Username to add friends..." />
                      <button type="button" className="btn btn-link loop"><i className="material-icons">person_add</i></button>
                    </form>
                    <button className="btn create" data-toggle="modal" data-target="#exampleModalCenter"><i className="material-icons">person_add</i></button>
                  </div>
                  <div className="notifications">
                    <h1>Friend requests</h1>
                    {mainnotif.length != 0 && <div className="list-group" id="alerts" role="tablist">
                      {mainnotif}

                    </div>}

                    {mainnotif.length == 0 && <div className="list-group" id="alerts" role="tablist" style={{ height: '78vh', fontFamily: 'Seoge UI', fontSize: '20px', fontWeight: '400', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                      <p style={{ textAlign: "center" }}>No one sends you a friend request :( </p>
                    </div>}

                  </div>
                </div>
                {/* End of Notifications */}
                {/* Start of Settings */}
                <div className="tab-pane fade" id="settings">
                  <div className="settings">
                    <div className="profile">
                      {/* <img className="avatar-xl"  src="dist/img/avatars/default.png" alt="avatar" /> */}
                      <img className="avatar-xl" src={userImage ? `http://localhost:3000/${userImage}` : "dist/img/avatars/default.png"} alt="avatar" />
                      <h1><a href="#">{userName}</a></h1>
                      <span>{userUserName}</span>
                    </div>
                    <div className="categories" id="accordionSettings">
                      <h1>Settings</h1>
                      {/* Start of My Account */}
                      <div className="category">
                        <a href="#" className="title collapsed" id="headingOne" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                          <i className="material-icons md-30 online">person_outline</i>
                          <div className="data">
                            <h5>My Account</h5>
                            <p>Update your profile details</p>
                          </div>
                          <i className="material-icons">keyboard_arrow_right</i>
                        </a>
                        <div className="collapse" id="collapseOne" aria-labelledby="headingOne" data-parent="#accordionSettings">
                          <div className="content">
                            <form>
                              <div className="upload">
                                <div className="data">
                                  <img className="avatar-xl" src={userImage ? `http://localhost:3000/${userImage}` : "dist/img/avatars/default.png"} alt="image" />
                                  <label>
                                    <input type="file" accept="image/png,image/jpg,image/jpeg" onChange={(e) => { setProfile(e) }} />
                                    <span className="btn button mr-3">Upload</span>  {/* {uploadPercentage} %uploaded */}
                                  </label>
                                  <button type="button" className="btn button w-50 ml-3 bg-green" onClick={updateProfile}>Set</button>
                                </div>
                                <p>For best results, use an image at least 256px by 256px in either .jpg or .png format!</p>
                              </div>
                              {/* <form> */}
                              <div className="parent">
                                <div className="field">
                                  <label htmlFor="Name">Name <span>*</span></label>
                                  <input type="text" name="Uname" value={uname} onChange={(e) => { setValue(e) }} className="form-control" id="Name" placeholder="Name" required />
                                </div>
                                <div className="field">
                                  <label htmlFor="username">username<span>*</span></label>
                                  <input type="text" name="Uusername" value={uusername} onChange={(e) => { setValue(e) }} className="form-control" id="username" placeholder="username" disabled />
                                </div>
                              </div>
                              <div className="field">
                                <label htmlFor="email">Email <span>*</span></label>
                                <input type="email" name="Uemail" value={uemail} onChange={(e) => { setValue(e) }} className="form-control" id="email" placeholder="Enter your email address" required />
                              </div>
                              {/* <div className="field">
                                <label htmlFor="location">Location</label>
                                <input type="text" className="form-control" id="location" placeholder="Enter your location" defaultValue="Helena, Montana" required />
                              </div>
                              <button className="btn btn-link w-100">Delete Account</button> */}
                              <button type="button" className="btn button w-100" onClick={updateDetails} >Apply Changes</button>
                            </form>

                            <details className='text-dark' style={{ marginTop: '2rem', fontSize: '1.2rem', fontWeight: 'bold' }}>
                              <summary style={{ fontSize: '1em' }}>Change Password</summary>
                              <form>
                                <div className="field">
                                  <label htmlFor="password">Old Password</label>
                                  <input type="password" name="oldpassword" value={oldpassword} onChange={(e) => { setValue(e) }} className="form-control" id="password" placeholder="Enter a new password" required />
                                </div>
                                <div className="field">
                                  <label htmlFor="password">New Password</label>
                                  <input type="password" name="newpassword" value={newpassword} onChange={(e) => { setValue(e) }} className="form-control" id="password" placeholder="Enter a new password" required />
                                </div>
                                <div className="field">
                                  <label htmlFor="password">Re-enter New Password</label>
                                  <input type="password" name="re-enter-new-password" value={reenternewpassword} onChange={(e) => { setValue(e) }} className="form-control" id="password" placeholder="Enter a new password" required />
                                </div>
                                <button type="button" className="btn button w-100" onClick={changePassword} >Change Password</button>
                              </form>
                            </details>

                          </div>
                        </div>
                      </div>
                      {/* End of My Account */}
                      {/* Start of Appearance Settings */}
                      <div className="category">
                        <a href="#" className="title collapsed" id="headingFive" data-toggle="collapse" data-target="#collapseFive" aria-expanded="true" aria-controls="collapseFive">
                          <i className="material-icons md-30 online">colorize</i>
                          <div className="data">
                            <h5>Appearance</h5>
                            <p>Customize the look of Swipe</p>
                          </div>
                          <i className="material-icons">keyboard_arrow_right</i>
                        </a>
                        <div className="collapse" id="collapseFive" aria-labelledby="headingFive" data-parent="#accordionSettings">
                          <div className="content no-layer">
                            <div className="set">
                              <div className="details">
                                <h5>Turn Off Lights</h5>
                                <p>The dark mode is applied to core areas of the app that are normally displayed as light.</p>
                              </div>
                              <label className="switch">
                                <input type="checkbox" />
                                <span className="slider round mode" />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End of Appearance Settings */}
                      {/* Start of Logout */}
                      {/* <div className="category">
                      <a href="sign-in.html" className="title collapsed">
                        <i className="material-icons md-30 online">power_settings_new</i>
                        <div className="data">
                          <h5>Power Off</h5>
                          <p>Log out of your account</p>
                        </div>
                        <i className="material-icons">keyboard_arrow_right</i>
                      </a>
                    </div> */}
                      {/* End of Logout */}
                    </div>
                  </div>
                </div>
                {/* End of Settings */}
              </div>
            </div>
          </div>
        </div>
        {/* End of Sidebar */}
        {/* Start of Add Friends */}
        <div className="modal fade" id="exampleModalCenter" tabIndex={-1} role="dialog" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="requests">
              <div className="title">
                <h1>Add your friends</h1>
                <button type="button" className="btn" data-dismiss="modal" aria-label="Close"><i className="material-icons">close</i></button>
              </div>
              <div className="content">
                <form>
                  <div className="form-group">
                    <label htmlFor="user">Username:</label>
                    <input name="friend" value={friend} onChange={(e) => { setValue(e); }} type="text" className="form-control" id="user" placeholder="Add recipient..." required />
                    {/* <div className="user" id="contact">
                      <img className="avatar-sm" src="dist/img/avatars/avatar-female-5.jpg" alt="avatar" />
                      <h5>Keith Morris</h5>
                      <button className="btn"><i className="material-icons">close</i></button>
                    </div> */}
                  </div>
                  {/* <div className="form-group">
                    <label htmlFor="welcome">Message:</label>
                    <textarea className="text-control" id="welcome" placeholder="Send your welcome message..." defaultValue={"Hi Keith, I'd like to add you as a contact."} />
                  </div> */}
                  <button type="button" onClick={addFriend} className="btn button w-100">Send Friend Request</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* End of Add Friends */}
        {/* Start of Create Chat */}
        {/* <div className="modal fade" id="startnewchat" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="requests">
            <div className="title">
              <h1>Start new chat</h1>
              <button type="button" className="btn" data-dismiss="modal" aria-label="Close"><i className="material-icons">close</i></button>
            </div>
            <div className="content">
              <form>
                <div className="form-group">
                  <label htmlFor="participant">Recipient:</label>
                  <input type="text" className="form-control" id="participant" placeholder="Add recipient..." required />
                  <div className="user" id="recipient">
                    <img className="avatar-sm" src="dist/img/avatars/avatar-female-5.jpg" alt="avatar" />
                    <h5>Keith Morris</h5>
                    <button className="btn"><i className="material-icons">close</i></button>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="topic">Topic:</label>
                  <input type="text" className="form-control" id="topic" placeholder="What's the topic?" required />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message:</label>
                  <textarea className="text-control" id="message" placeholder="Send your welcome message..." defaultValue={"Hmm, are you friendly?"} />
                </div>
                <button type="submit" className="btn button w-100">Start New Chat</button>
              </form>
            </div>
          </div>
        </div>
      </div> */}
        {/* End of Create Chat */}
        <div className="main">
          <div className="tab-content" id="nav-tabContent">
            {/* Start of Babble */}
            <div className="babble tab-pane fade active show" id="list-chat" role="tabpanel" aria-labelledby="list-chat-list">
              {/* Start of Chat */}
              {chatUsername != '' && <div className="chat" id="chat1">
                <div className="top">
                  <div className="container">
                    <div className="col-md-12">
                      <div className="inside">
                        <a href="#"><img className="avatar-md" src={chatProfile ? `http://localhost:3000/${chatProfile}` : "dist/img/avatars/default.png"} data-toggle="tooltip" data-placement="top" title="Keith" alt="avatar" /></a>
                        {/* <div className="status">
                          <i className="material-icons online">fiber_manual_record</i>
                        </div> */}
                        <div className="data">
                          <h5><a href="#">{chatName}</a></h5>
                          <span>{chatUsername}</span>
                        </div>
                        {/* <button class="btn connect d-md-block d-none" name="1"><i class="material-icons md-30">phone_in_talk</i></button>
												<button class="btn connect d-md-block d-none" name="1"><i class="material-icons md-36">videocam</i></button> */}
                        <button className="btn d-md-block d-none"><i className="material-icons md-30">info</i></button>
                        <div className="dropdown">
                          <button className="btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="material-icons md-30">more_vert</i></button>
                          <div className="dropdown-menu dropdown-menu-right">
                            <button onClick={() => { deleteHistory(myUsername.userUserName, chatUsername) }} className="dropdown-item"><i className="material-icons">delete_forever</i>Clear Chat History</button>
                            <button onClick={() => { unfriend(myUsername.userUserName, chatUsername) }} className="dropdown-item"><i className="material-icons">remove_circle</i>Unfriend {chatUsername}</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content" id="content">
                  <div className="container">

                    {sortedMergeMessages.length != 0 && <div className="col-md-12 messages">
                      {/* <div className="date">
                        <hr />
                        <span>Yesterday</span>
                        <hr />
                      </div> */}

                      {/* <div className='message'>
                    <div id="popup1" class="overlay">
                      <div class="popup">
                        <h2>Here i am</h2>
                        <a class="close" href="#">&times;</a>
                        <div class="content">
                          Thank to pop me out of that button, but now i'm done so you can close this window.
                        </div>
                      </div>
                    </div>
                    </div> */}


                      {(() => {
                        return sortedMergeMessages.map((s) => {
                          return <div className={s.friendUsername == myUsername.userUserName ? "message" : "message me"}>
                            {s.friendUsername == myUsername.userUserName && <img className="avatar-md" src={chatProfile ? `http://localhost:3000/${chatProfile}` : "dist/img/avatars/default.png"} data-toggle="tooltip" data-placement="top" alt="avatar" />}
                            <div className="text-main">
                              <div className={s.friendUsername == myUsername.userUserName ? "text-group" : "text-group me"}>
                                <div style={{ position: "relative" }} className={s.friendUsername == myUsername.userUserName ? "text" : "text me"}>
                                  <p>
                                    {myUsername.userUserName == s.friendUsername && <span style={{ fontSize: '10px' }}>{s.date}</span>}
                                    {myUsername.userUserName != s.friendUsername && <details>
                                      <summary> {s.date}</summary>
                                      <p>
                                        <button onClick={() => { deleteMsg(s.messageid) }} class="btn button col-sm-5 py-2 text-primary bg-white" style={{ minWidth: '60px' }}>Delete</button>
                                      </p>
                                    </details>}
                                    {/* <i style={{ height: '15px', width: '15px', display: "inline-block", position: "absolute", top: "-1px", right: '7px' }} className='material-icons'> expand_more </i> */}
                                    {s.message.split('\n').map(str => <p className='p-0 m-0' style={{ fontSize: '16px', fontWeight: '400', lineHeight: '1.4', minHeight: '18px' }}>
                                      {str}
                                    </p>)}
                                  </p>
                                </div>
                              </div>
                              <span>{s.time}</span>
                            </div>
                          </div>
                        })
                      })()}
                      <div ref={messagesEndRef}></div>

                      <div className="picker-container" style={{ position: 'relative', width: '100%' }}>
                        {showPicker && <Picker pickerStyle={{ width: '100%', height: '30vh' }} onEmojiClick={onEmojiClick} />}
                      </div>
                    </div>}
                    {sortedMergeMessages.length == 0 && <div className="col-md-12">
                      <div className="no-messages">
                        <i className="material-icons md-48">forum</i>
                        <p>Seems people are shy to start the chat. Break the ice send the first message.</p>
                      </div>
                      <div className="picker-container" style={{ position: 'relative', width: '100%' }}>
                        {showPicker && <Picker pickerStyle={{ width: '100%', height: '30vh' }} onEmojiClick={onEmojiClick} />}
                      </div>
                    </div>}
                  </div>
                </div>

                <div className="container">
                  <div className="col-md-12">
                    <div className="bottom">
                      <div className="position-relative w-100">
                        <textarea name="message" value={message} onChange={(e) => { setValue(e); }} className="form-control" placeholder="Start typing..." rows={1} defaultValue={""} />
                        <button className="btn emoticons" onClick={() => setShowPicker(val => !val)}><i className="material-icons">insert_emoticon</i></button>
                        <button onClick={() => { sendMessage(chatUsername) }} className="btn send"><i className="material-icons">send</i></button>
                      </div>
                      <label>
                        <input type="file" />
                        <span className="btn attach d-sm-block d-none"><i className="material-icons">attach_file</i></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>}

              {/* End of Chat */}

              {/* when login ....this div will show on place of chatpage */}
              {chatUsername == '' && <div className="chat" id="chat1" style={{ height: '100vh', backgroundColor: 'lightgrey', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                <img src="dist\img\homeImg.png" style={{ height: "45vh", width: '22.5vw', }} />
                <h2 style={{ marginTop: '7vh', color: 'black', fontFamily: "Seoge UI", fontWeight: '300', lineHeight: '36px', fontSize: '36px' }}>Keep your device connected</h2>
                <p style={{ marginTop: '2vh', color: 'black', width: '38vw', fontFamily: "Seoge UI", fontWeight: '400', lineHeight: '22px', fontSize: '18px', textAlign: 'center' }}>BuddyUp connects to your device to sync messages. To reduce data usage, connect your device to Wi-Fi.</p>
              </div>}

              {/* Start of Call */}
              {/* <div className="call" id="call1">
              <div className="content">
                <div className="container">
                  <div className="col-md-12">
                    <div className="inside">
                      <div className="panel">
                        <div className="participant">
                          <img className="avatar-xxl" src="dist/img/avatars/avatar-female-5.jpg" alt="avatar" />
                          <span>Connecting</span>
                        </div>
                        <div className="options">
                          <button className="btn option"><i className="material-icons md-30">mic</i></button>
                          <button className="btn option"><i className="material-icons md-30">videocam</i></button>
                          <button className="btn option call-end"><i className="material-icons md-30">call_end</i></button>
                          <button className="btn option"><i className="material-icons md-30">person_add</i></button>
                          <button className="btn option"><i className="material-icons md-30">volume_up</i></button>
                        </div>
                        <button className="btn back" name={1}><i className="material-icons md-24">chat</i></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
              {/* End of Call */}
            </div>
            {/* End of Babble */}
            {/* Start of Babble */}
            <div className="babble tab-pane fade" id="list-empty" role="tabpanel" aria-labelledby="list-empty-list">
              {/* Start of Chat */}
              <div className="chat" id="chat2">
                <div className="top">
                  <div className="container">
                    <div className="col-md-12">
                      <div className="inside">
                        <a href="#"><img className="avatar-md" src="dist/img/avatars/avatar-female-2.jpg" data-toggle="tooltip" data-placement="top" title="Lean" alt="avatar" /></a>
                        <div className="status">
                          <i className="material-icons offline">fiber_manual_record</i>
                        </div>
                        <div className="data">
                          <h5><a href="#">Lean Avent</a></h5>
                          <span>Inactive</span>
                        </div>
                        <button className="btn connect d-md-block d-none" name={2}><i className="material-icons md-30">phone_in_talk</i></button>
                        <button className="btn connect d-md-block d-none" name={2}><i className="material-icons md-36">videocam</i></button>
                        <button className="btn d-md-block d-none"><i className="material-icons md-30">info</i></button>
                        <div className="dropdown">
                          <button className="btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="material-icons md-30">more_vert</i></button>
                          <div className="dropdown-menu dropdown-menu-right">
                            <button className="dropdown-item connect" name={2}><i className="material-icons">phone_in_talk</i>Voice Call</button>
                            <button className="dropdown-item connect" name={2}><i className="material-icons">videocam</i>Video Call</button>
                            <hr />
                            <button className="dropdown-item"><i className="material-icons">clear</i>Clear History</button>
                            <button className="dropdown-item"><i className="material-icons">block</i>Block Contact</button>
                            <button className="dropdown-item"><i className="material-icons">delete</i>Delete Contact</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content empty">
                  <div className="container">
                    <div className="col-md-12">
                      <div className="no-messages">
                        <i className="material-icons md-48">forum</i>
                        <p>Seems people are shy to start the chat. Break the ice send the first message.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container">
                  <div className="col-md-12">
                    <div className="bottom">
                      <form className="position-relative w-100">
                        <textarea className="form-control" placeholder="Start typing for reply..." rows={1} defaultValue={""} />
                        <button className="btn emoticons"><i className="material-icons">insert_emoticon</i></button>
                        <button type="submit" className="btn send"><i className="material-icons">send</i></button>
                      </form>
                      <label>
                        <input type="file" />
                        <span className="btn attach d-sm-block d-none"><i className="material-icons">attach_file</i></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              {/* End of Chat */}
              {/* Start of Call */}
              <div className="call" id="call2">
                <div className="content">
                  <div className="container">
                    <div className="col-md-12">
                      <div className="inside">
                        <div className="panel">
                          <div className="participant">
                            <img className="avatar-xxl" src="dist/img/avatars/avatar-female-2.jpg" alt="avatar" />
                            <span>Connecting</span>
                          </div>
                          <div className="options">
                            <button className="btn option"><i className="material-icons md-30">mic</i></button>
                            <button className="btn option"><i className="material-icons md-30">videocam</i></button>
                            <button className="btn option call-end"><i className="material-icons md-30">call_end</i></button>
                            <button className="btn option"><i className="material-icons md-30">person_add</i></button>
                            <button className="btn option"><i className="material-icons md-30">volume_up</i></button>
                          </div>
                          <button className="btn back" name={2}><i className="material-icons md-24">chat</i></button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End of Call */}
            </div>
            {/* End of Babble */}
            {/* Start of Babble */}
            <div className="babble tab-pane fade" id="list-request" role="tabpanel" aria-labelledby="list-request-list">
              {/* Start of Chat */}
              {/* <div className="chat" id="chat3">
              <div className="top">
                <div className="container">
                  <div className="col-md-12">
                    <div className="inside">
                      <a href="#"><img className="avatar-md" src="dist/img/avatars/avatar-female-6.jpg" data-toggle="tooltip" data-placement="top" title="Louis" alt="avatar" /></a>
                      <div className="status">
                        <i className="material-icons offline">fiber_manual_record</i>
                      </div>
                      <div className="data">
                        <h5><a href="#">Louis Martinez</a></h5>
                        <span>Inactive</span>
                      </div>
                      <button className="btn disabled d-md-block d-none" disabled><i className="material-icons md-30">phone_in_talk</i></button>
                      <button className="btn disabled d-md-block d-none" disabled><i className="material-icons md-36">videocam</i></button>
                      <button className="btn d-md-block disabled d-none" disabled><i className="material-icons md-30">info</i></button>
                      <div className="dropdown">
                        <button className="btn disabled" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" disabled><i className="material-icons md-30">more_vert</i></button>
                        <div className="dropdown-menu dropdown-menu-right">
                          <button className="dropdown-item"><i className="material-icons">phone_in_talk</i>Voice Call</button>
                          <button className="dropdown-item"><i className="material-icons">videocam</i>Video Call</button>
                          <hr />
                          <button className="dropdown-item"><i className="material-icons">clear</i>Clear History</button>
                          <button className="dropdown-item"><i className="material-icons">block</i>Block Contact</button>
                          <button className="dropdown-item"><i className="material-icons">delete</i>Delete Contact</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content empty">
                <div className="container">
                  <div className="col-md-12">
                    <div className="no-messages request">
                      <a href="#"><img className="avatar-xl" src="dist/img/avatars/avatar-female-6.jpg" data-toggle="tooltip" data-placement="top" title="Louis" alt="avatar" /></a>
                      <h5>Louis Martinez would like to add you as a contact. <span>Hi Keith, I'd like to add you as a contact.</span></h5>
                      <div className="options">
                        <button className="btn button"><i className="material-icons">check</i></button>
                        <button className="btn button"><i className="material-icons">close</i></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="col-md-12">
                  <div className="bottom">
                    <form className="position-relative w-100">
                      <textarea className="form-control" placeholder="Messaging unavailable" rows={1} disabled defaultValue={""} />
                      <button className="btn emoticons disabled" disabled><i className="material-icons">insert_emoticon</i></button>
                      <button className="btn send disabled" disabled><i className="material-icons">send</i></button>
                    </form>
                    <label>
                      <input type="file" disabled />
                      <span className="btn attach disabled d-sm-block d-none"><i className="material-icons">attach_file</i></span>
                    </label>
                  </div>
                </div>
              </div>
            </div> */}
              {/* End of Chat */}
            </div>
            {/* End of Babble */}
          </div>
        </div>
      </div> {/* Layout */}
    </main>
  )
}

export default Chatpage
