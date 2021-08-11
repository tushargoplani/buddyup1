import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';


function Chatpage(props) {

  const user = useSelector(state => state.user);
  useEffect(() => {
    if(!user){
        props.history.push("/");
    } 
  }, )


    return (
        <div>
        <main>
        <div className="layout">
          {/* Start of Navigation */}
          <div className="navigation">
            <div className="container">
              <div className="inside">
                <div className="nav nav-tab menu">
                  <button className="btn"><img className="avatar-xl" src="dist/img/avatars/avatar-male-1.jpg" alt="avatar" /></button>
                  <a href="#members" data-toggle="tab"><i className="material-icons">account_circle</i></a>
                  <a href="#discussions" data-toggle="tab" className="active"><i className="material-icons active">chat_bubble_outline</i></a>
                  <a href="#notifications" data-toggle="tab" className="f-grow1"><i className="material-icons">notifications_none</i></a>
                  <button className="btn mode"><i className="material-icons">brightness_2</i></button>
                  <a href="#settings" data-toggle="tab"><i className="material-icons">settings</i></a>
                  <button className="btn power" onclick="visitPage();"><i className="material-icons">power_settings_new</i></button>
                </div>
              </div>
            </div>
          </div>
          {/* End of Navigation */}
          {/* Start of Sidebar */}
          <div className="sidebar" id="sidebar">
            <div className="container">
              <div className="col-md-12">
                <div className="tab-content">
                  {/* Start of Contacts */}
                  <div className="tab-pane fade" id="members">
                    <div className="search">
                      <form className="form-inline position-relative">
                        <input type="search" className="form-control" id="people" placeholder="Search for people..." />
                        <button type="button" className="btn btn-link loop"><i className="material-icons">search</i></button>
                      </form>
                      <button className="btn create" data-toggle="modal" data-target="#exampleModalCenter"><i className="material-icons">person_add</i></button>
                    </div>
                    <div className="list-group sort">
                      <button className="btn filterMembersBtn active show" data-toggle="list" data-filter="all">All</button>
                      <button className="btn filterMembersBtn" data-toggle="list" data-filter="online">Online</button>
                      <button className="btn filterMembersBtn" data-toggle="list" data-filter="offline">Offline</button>
                    </div>						
                    <div className="contacts">
                      <h1>Contacts</h1>
                      <div className="list-group" id="contacts" role="tablist">
                        <a href="#" className="filterMembers all online contact" data-toggle="list">
                          <img className="avatar-md" src="dist/img/avatars/avatar-female-1.jpg" data-toggle="tooltip" data-placement="top" title="Janette" alt="avatar" />
                          <div className="status">
                            <i className="material-icons online">fiber_manual_record</i>
                          </div>
                          <div className="data">
                            <h5>Janette Dalton</h5>
                            <p>Sofia, Bulgaria</p>
                          </div>
                          <div className="person-add">
                            <i className="material-icons">person</i>
                          </div>
                        </a>
                        <a href="#" className="filterMembers all online contact" data-toggle="list">
                          <img className="avatar-md" src="dist/img/avatars/avatar-male-1.jpg" data-toggle="tooltip" data-placement="top" title="Michael" alt="avatar" />
                          <div className="status">
                            <i className="material-icons online">fiber_manual_record</i>
                          </div>
                          <div className="data">
                            <h5>Michael Knudsen</h5>
                            <p>Washington, USA</p>
                          </div>
                          <div className="person-add">
                            <i className="material-icons">person</i>
                          </div>
                        </a>
                        <a href="#" className="filterMembers all online contact" data-toggle="list">
                          <img className="avatar-md" src="dist/img/avatars/avatar-female-2.jpg" data-toggle="tooltip" data-placement="top" title="Lean" alt="avatar" />
                          <div className="status">
                            <i className="material-icons online">fiber_manual_record</i>
                          </div>
                          <div className="data">
                            <h5>Lean Avent</h5>
                            <p>Shanghai, China</p>
                          </div>
                          <div className="person-add">
                            <i className="material-icons">person</i>
                          </div>
                        </a>
                        <a href="#" className="filterMembers all online contact" data-toggle="list">
                          <img className="avatar-md" src="dist/img/avatars/avatar-male-2.jpg" data-toggle="tooltip" data-placement="top" title="Mariette" alt="avatar" />
                          <div className="status">
                            <i className="material-icons online">fiber_manual_record</i>
                          </div>
                          <div className="data">
                            <h5>Mariette Toles</h5>
                            <p>Helena, Montana</p>
                          </div>
                          <div className="person-add">
                            <i className="material-icons">person</i>
                          </div>
                        </a>
                        <a href="#" className="filterMembers all online contact" data-toggle="list">
                          <img className="avatar-md" src="dist/img/avatars/avatar-female-3.jpg" data-toggle="tooltip" data-placement="top" title="Harmony" alt="avatar" />
                          <div className="status">
                            <i className="material-icons online">fiber_manual_record</i>
                          </div>
                          <div className="data">
                            <h5>Harmony Otero</h5>
                            <p>Indore, India</p>
                          </div>
                          <div className="person-add">
                            <i className="material-icons">person</i>
                          </div>
                        </a>
                        <a href="#" className="filterMembers all offline contact" data-toggle="list">
                          <img className="avatar-md" src="dist/img/avatars/avatar-female-5.jpg" data-toggle="tooltip" data-placement="top" title="Keith" alt="avatar" />
                          <div className="status">
                            <i className="material-icons offline">fiber_manual_record</i>
                          </div>
                          <div className="data">
                            <h5>Keith Morris</h5>
                            <p>Chisinau, Moldova</p>
                          </div>
                          <div className="person-add">
                            <i className="material-icons">person</i>
                          </div>
                        </a>
                        <a href="#" className="filterMembers all offline contact" data-toggle="list">
                          <img className="avatar-md" src="dist/img/avatars/avatar-female-6.jpg" data-toggle="tooltip" data-placement="top" title="Louis" alt="avatar" />
                          <div className="status">
                            <i className="material-icons offline">fiber_manual_record</i>
                          </div>
                          <div className="data">
                            <h5>Louis Martinez</h5>
                            <p>Vienna, Austria</p>
                          </div>
                          <div className="person-add">
                            <i className="material-icons">person</i>
                          </div>
                        </a>
                        <a href="#" className="filterMembers all offline contact" data-toggle="list">
                          <img className="avatar-md" src="dist/img/avatars/avatar-male-3.jpg" data-toggle="tooltip" data-placement="top" title="Ryan" alt="avatar" />
                          <div className="status">
                            <i className="material-icons offline">fiber_manual_record</i>
                          </div>
                          <div className="data">
                            <h5>Ryan Foster</h5>
                            <p>Oslo, Norway</p>
                          </div>
                          <div className="person-add">
                            <i className="material-icons">person</i>
                          </div>
                        </a>
                        <a href="#" className="filterMembers all offline contact" data-toggle="list">
                          <img className="avatar-md" src="dist/img/avatars/avatar-male-4.jpg" data-toggle="tooltip" data-placement="top" title="Mildred" alt="avatar" />
                          <div className="status">
                            <i className="material-icons offline">fiber_manual_record</i>
                          </div>
                          <div className="data">
                            <h5>Mildred Bennett</h5>
                            <p>London, United Kingdom</p>
                          </div>
                          <div className="person-add">
                            <i className="material-icons">person</i>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                  {/* End of Contacts */}
                  {/* Start of Discussions */}
                  <div id="discussions" className="tab-pane fade active show">
                    <div className="search">
                      <form className="form-inline position-relative">
                        <input type="search" className="form-control" id="conversations" placeholder="Search for conversations..." />
                        <button type="button" className="btn btn-link loop"><i className="material-icons">search</i></button>
                      </form>
                      <button className="btn create" data-toggle="modal" data-target="#startnewchat"><i className="material-icons">create</i></button>
                    </div>
                    <div className="list-group sort">
                      <button className="btn filterDiscussionsBtn active show" data-toggle="list" data-filter="all">All</button>
                      <button className="btn filterDiscussionsBtn" data-toggle="list" data-filter="read">Read</button>
                      <button className="btn filterDiscussionsBtn" data-toggle="list" data-filter="unread">Unread</button>
                    </div>						
                    <div className="discussions">
                      <h1>Discussions</h1>
                      <div className="list-group" id="chats" role="tablist">
                        <a href="#list-chat" className="filterDiscussions all unread single active" id="list-chat-list" data-toggle="list" role="tab">
                          <img className="avatar-md" src="dist/img/avatars/avatar-female-1.jpg" data-toggle="tooltip" data-placement="top" title="Janette" alt="avatar" />
                          <div className="status">
                            <i className="material-icons online">fiber_manual_record</i>
                          </div>
                          <div className="new bg-yellow">
                            <span>+7</span>
                          </div>
                          <div className="data">
                            <h5>Janette Dalton</h5>
                            <span>Mon</span>
                            <p>A new feature has been updated to your account. Check it out...</p>
                          </div>
                        </a>									
                        <a href="#list-empty" className="filterDiscussions all unread single" id="list-empty-list" data-toggle="list" role="tab">
                          <img className="avatar-md" src="dist/img/avatars/avatar-male-1.jpg" data-toggle="tooltip" data-placement="top" title="Michael" alt="avatar" />
                          <div className="status">
                            <i className="material-icons offline">fiber_manual_record</i>
                          </div>
                          <div className="new bg-pink">
                            <span>+10</span>
                          </div>
                          <div className="data">
                            <h5>Michael Knudsen</h5>
                            <span>Sun</span>
                            <p>How can i improve my chances of getting a deposit?</p>
                          </div>
                        </a>									
                        <a href="#list-chat" className="filterDiscussions all read single" id="list-chat-list2" data-toggle="list" role="tab">
                          <img className="avatar-md" src="dist/img/avatars/avatar-female-2.jpg" data-toggle="tooltip" data-placement="top" title="Lean" alt="avatar" />
                          <div className="status">
                            <i className="material-icons offline">fiber_manual_record</i>
                          </div>
                          <div className="data">
                            <h5>Lean Avent</h5>
                            <span>Tus</span>
                            <p>Hey Chris, could i ask you to help me out with variation...</p>
                          </div>
                        </a>
                        <a href="#list-empty" className="filterDiscussions all read single" id="list-empty-list2" data-toggle="list" role="tab">
                          <img className="avatar-md" src="dist/img/avatars/avatar-male-2.jpg" data-toggle="tooltip" data-placement="top" title="Mariette" alt="avatar" />
                          <div className="status">
                            <i className="material-icons offline">fiber_manual_record</i>
                          </div>
                          <div className="data">
                            <h5>Mariette Toles</h5>
                            <span>5 mins</span>
                            <p>By injected humour, or randomised words which...</p>
                          </div>
                        </a>
                        <a href="#list-chat" className="filterDiscussions all read single" id="list-chat-list3" data-toggle="list" role="tab">
                          <img className="avatar-md" src="dist/img/avatars/avatar-female-3.jpg" data-toggle="tooltip" data-placement="top" title="Harmony" alt="avatar" />
                          <div className="status">
                            <i className="material-icons online">fiber_manual_record</i>
                          </div>
                          <div className="data">
                            <h5>Harmony Otero</h5>
                            <span>Mon</span>
                            <p>No more running out of the office at 4pm on Fridays!</p>
                          </div>
                        </a>
                        <a href="#list-empty" className="filterDiscussions all read single" id="list-empty-list3" data-toggle="list" role="tab">
                          <img className="avatar-md" src="dist/img/avatars/avatar-female-5.jpg" data-toggle="tooltip" data-placement="top" title="Keith" alt="avatar" />
                          <div className="status">
                            <i className="material-icons offline">fiber_manual_record</i>
                          </div>
                          <div className="data">
                            <h5>Keith Morris</h5>
                            <span>Fri</span>
                            <p>All your favourite books at your reach! We are now mobile.</p>
                          </div>
                        </a>
                        <a href="#list-request" className="filterDiscussions all unread single" id="list-request-list" data-toggle="list" role="tab">
                          <img className="avatar-md" src="dist/img/avatars/avatar-female-6.jpg" data-toggle="tooltip" data-placement="top" title="Louis" alt="avatar" />
                          <div className="status">
                            <i className="material-icons offline">fiber_manual_record</i>
                          </div>
                          <div className="new bg-gray">
                            <span>?</span>
                          </div>
                          <div className="data">
                            <h5>Louis Martinez</h5>
                            <span>Feb 10</span>
                            <p>Hi Keith, I'd like to add you as a contact.</p>
                          </div>
                        </a>
                        <a href="#list-empty" className="filterDiscussions all read single" id="list-empty-list4" data-toggle="list" role="tab">
                          <img className="avatar-md" src="dist/img/avatars/avatar-male-3.jpg" data-toggle="tooltip" data-placement="top" title="Ryan" alt="avatar" />
                          <div className="status">
                            <i className="material-icons offline">fiber_manual_record</i>
                          </div>
                          <div className="data">
                            <h5>Ryan Foster</h5>
                            <span>Feb 9</span>
                            <p>Dear Deborah, your Thai massage is today at 5pm.</p>
                          </div>
                        </a>
                        <a href="#list-chat" className="filterDiscussions all unread single" id="list-chat-list5" data-toggle="list" role="tab">
                          <img className="avatar-md" src="dist/img/avatars/avatar-male-4.jpg" data-toggle="tooltip" data-placement="top" title="Mildred" alt="avatar" />
                          <div className="status">
                            <i className="material-icons offline">fiber_manual_record</i>
                          </div>
                          <div className="new bg-green">
                            <span>+9</span>
                          </div>
                          <div className="data">
                            <h5>Mildred Bennett</h5>
                            <span>Thu</span>
                            <p>Unfortunately your session today has been cancelled!</p>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                  {/* End of Discussions */}
                  {/* Start of Notifications */}
                  <div id="notifications" className="tab-pane fade">
                    <div className="search">
                      <form className="form-inline position-relative">
                        <input type="search" className="form-control" id="notice" placeholder="Filter notifications..." />
                        <button type="button" className="btn btn-link loop"><i className="material-icons filter-list">filter_list</i></button>
                      </form>
                    </div>
                    <div className="list-group sort">
                      <button className="btn filterNotificationsBtn active show" data-toggle="list" data-filter="all">All</button>
                      <button className="btn filterNotificationsBtn" data-toggle="list" data-filter="latest">Latest</button>
                      <button className="btn filterNotificationsBtn" data-toggle="list" data-filter="oldest">Oldest</button>
                    </div>						
                    <div className="notifications">
                      <h1>Notifications</h1>
                      <div className="list-group" id="alerts" role="tablist">
                        <a href="#" className="filterNotifications all latest notification" data-toggle="list">
                          <img className="avatar-md" src="dist/img/avatars/avatar-female-1.jpg" data-toggle="tooltip" data-placement="top" title="Janette" alt="avatar" />
                          <div className="status">
                            <i className="material-icons online">fiber_manual_record</i>
                          </div>
                          <div className="data">
                            <p>Janette has accepted your friend request on Swipe.</p>
                            <span>Oct 17, 2018</span>
                          </div>
                        </a>
                        <a href="#" className="filterNotifications all latest notification" data-toggle="list">
                          <img className="avatar-md" src="dist/img/avatars/avatar-male-1.jpg" data-toggle="tooltip" data-placement="top" title="Michael" alt="avatar" />
                          <div className="status">
                            <i className="material-icons online">fiber_manual_record</i>
                          </div>
                          <div className="data">
                            <p>Michael, you have a new friend suggestion today.</p>
                            <span>Jun 21, 2018</span>
                          </div>
                        </a>
                        <a href="#" className="filterNotifications all latest notification" data-toggle="list">
                          <img className="avatar-md" src="dist/img/avatars/avatar-male-2.jpg" data-toggle="tooltip" data-placement="top" title="Mariette" alt="avatar" />
                          <div className="status">
                            <i className="material-icons online">fiber_manual_record</i>
                          </div>
                          <div className="data">
                            <p>Mariette have just sent you a new message.</p>
                            <span>Feb 15, 2018</span>
                          </div>
                        </a>
                        <a href="#" className="filterNotifications all latest notification" data-toggle="list">
                          <img className="avatar-md" src="dist/img/avatars/avatar-female-6.jpg" data-toggle="tooltip" data-placement="top" title="Louis" alt="avatar" />
                          <div className="status">
                            <i className="material-icons online">fiber_manual_record</i>
                          </div>
                          <div className="data">
                            <p>Louis has a birthday today. Wish her all the best.</p>
                            <span>Mar 23, 2018</span>
                          </div>
                        </a>
                        <a href="#" className="filterNotifications all latest notification" data-toggle="list">
                          <img className="avatar-md" src="dist/img/avatars/avatar-female-3.jpg" data-toggle="tooltip" data-placement="top" title="Janette" alt="avatar" />
                          <div className="status">
                            <i className="material-icons online">fiber_manual_record</i>
                          </div>
                          <div className="data">
                            <p>Harmony has accepted your friend request on Swipe.</p>
                            <span>Jan 5, 2018</span>
                          </div>
                        </a>
                        <a href="#" className="filterNotifications all oldest notification" data-toggle="list">
                          <img className="avatar-md" src="dist/img/avatars/avatar-female-5.jpg" data-toggle="tooltip" data-placement="top" title="Janette" alt="avatar" />
                          <div className="status">
                            <i className="material-icons offline">fiber_manual_record</i>
                          </div>
                          <div className="data">
                            <p>Keith have just sent you a new message.</p>
                            <span>Dec 22, 2017</span>
                          </div>
                        </a>
                        <a href="#" className="filterNotifications all oldest notification" data-toggle="list">
                          <img className="avatar-md" src="dist/img/avatars/avatar-female-2.jpg" data-toggle="tooltip" data-placement="top" title="Janette" alt="avatar" />
                          <div className="status">
                            <i className="material-icons offline">fiber_manual_record</i>
                          </div>
                          <div className="data">
                            <p>Michael, you have a new friend suggestion today.</p>
                            <span>Nov 29, 2017</span>
                          </div>
                        </a>
                        <a href="#" className="filterNotifications all oldest notification" data-toggle="list">
                          <img className="avatar-md" src="dist/img/avatars/avatar-male-3.jpg" data-toggle="tooltip" data-placement="top" title="Janette" alt="avatar" />
                          <div className="status">
                            <i className="material-icons offline">fiber_manual_record</i>
                          </div>
                          <div className="data">
                            <p>Ryan have just sent you a new message.</p>
                            <span>Sep 31, 2017</span>
                          </div>
                        </a>
                        <a href="#" className="filterNotifications all oldest notification" data-toggle="list">
                          <img className="avatar-md" src="dist/img/avatars/avatar-male-4.jpg" data-toggle="tooltip" data-placement="top" title="Janette" alt="avatar" />
                          <div className="status">
                            <i className="material-icons offline">fiber_manual_record</i>
                          </div>
                          <div className="data">
                            <p>Mildred has a birthday today. Wish him all the best.</p>
                            <span>Jul 19, 2017</span>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                  {/* End of Notifications */}
                  {/* Start of Settings */}
                  <div className="tab-pane fade" id="settings">			
                    <div className="settings">
                      <div className="profile">
                        <img className="avatar-xl" src="dist/img/avatars/avatar-male-1.jpg" alt="avatar" />
                        <h1><a href="#">Michael Knudsen</a></h1>
                        <span>Helena, Montana</span>
                        <div className="stats">
                          <div className="item">
                            <h2>122</h2>
                            <h3>Fellas</h3>
                          </div>
                          <div className="item">
                            <h2>305</h2>
                            <h3>Chats</h3>
                          </div>
                          <div className="item">
                            <h2>1538</h2>
                            <h3>Posts</h3>
                          </div>
                        </div>
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
                              <div className="upload">
                                <div className="data">
                                  <img className="avatar-xl" src="dist/img/avatars/avatar-male-1.jpg" alt="image" />
                                  <label>
                                    <input type="file" />
                                    <span className="btn button">Upload avatar</span>
                                  </label>
                                </div>
                                <p>For best results, use an image at least 256px by 256px in either .jpg or .png format!</p>
                              </div>
                              <form>
                                <div className="parent">
                                  <div className="field">
                                    <label htmlFor="firstName">First name <span>*</span></label>
                                    <input type="text" className="form-control" id="firstName" placeholder="First name" defaultValue="Michael" required />
                                  </div>
                                  <div className="field">
                                    <label htmlFor="lastName">Last name <span>*</span></label>
                                    <input type="text" className="form-control" id="lastName" placeholder="Last name" defaultValue="Knudsen" required />
                                  </div>
                                </div>
                                <div className="field">
                                  <label htmlFor="email">Email <span>*</span></label>
                                  <input type="email" className="form-control" id="email" placeholder="Enter your email address" defaultValue="michael@gmail.com" required />
                                </div>
                                <div className="field">
                                  <label htmlFor="password">Password</label>
                                  <input type="password" className="form-control" id="password" placeholder="Enter a new password" defaultValue="password" required />
                                </div>
                                <div className="field">
                                  <label htmlFor="location">Location</label>
                                  <input type="text" className="form-control" id="location" placeholder="Enter your location" defaultValue="Helena, Montana" required />
                                </div>
                                <button className="btn btn-link w-100">Delete Account</button>
                                <button type="submit" className="btn button w-100">Apply</button>
                              </form>
                            </div>
                          </div>
                        </div>
                        {/* End of My Account */}
                        {/* Start of Chat History */}
                        <div className="category">
                          <a href="#" className="title collapsed" id="headingTwo" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                            <i className="material-icons md-30 online">mail_outline</i>
                            <div className="data">
                              <h5>Chats</h5>
                              <p>Check your chat history</p>
                            </div>
                            <i className="material-icons">keyboard_arrow_right</i>
                          </a>
                          <div className="collapse" id="collapseTwo" aria-labelledby="headingTwo" data-parent="#accordionSettings">
                            <div className="content layer">
                              <div className="history">
                                <p>When you clear your conversation history, the messages will be deleted from your own device.</p>
                                <p>The messages won't be deleted or cleared on the devices of the people you chatted with.</p>
                                <div className="custom-control custom-checkbox">
                                  <input type="checkbox" className="custom-control-input" id="same-address" />
                                  <label className="custom-control-label" htmlFor="same-address">Hide will remove your chat history from the recent list.</label>
                                </div>
                                <div className="custom-control custom-checkbox">
                                  <input type="checkbox" className="custom-control-input" id="save-info" />
                                  <label className="custom-control-label" htmlFor="save-info">Delete will remove your chat history from the device.</label>
                                </div>
                                <button type="submit" className="btn button w-100">Clear blah-blah</button>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* End of Chat History */}
                        {/* Start of Notifications Settings */}
                        <div className="category">
                          <a href="#" className="title collapsed" id="headingThree" data-toggle="collapse" data-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
                            <i className="material-icons md-30 online">notifications_none</i>
                            <div className="data">
                              <h5>Notifications</h5>
                              <p>Turn notifications on or off</p>
                            </div>
                            <i className="material-icons">keyboard_arrow_right</i>
                          </a>
                          <div className="collapse" id="collapseThree" aria-labelledby="headingThree" data-parent="#accordionSettings">
                            <div className="content no-layer">
                              <div className="set">
                                <div className="details">
                                  <h5>Desktop Notifications</h5>
                                  <p>You can set up Swipe to receive notifications when you have new messages.</p>
                                </div>
                                <label className="switch">
                                  <input type="checkbox" defaultChecked />
                                  <span className="slider round" />
                                </label>
                              </div>
                              <div className="set">
                                <div className="details">
                                  <h5>Unread Message Badge</h5>
                                  <p>If enabled shows a red badge on the Swipe app icon when you have unread messages.</p>
                                </div>
                                <label className="switch">
                                  <input type="checkbox" defaultChecked />
                                  <span className="slider round" />
                                </label>
                              </div>
                              <div className="set">
                                <div className="details">
                                  <h5>Taskbar Flashing</h5>
                                  <p>Flashes the Swipe app on mobile in your taskbar when you have new notifications.</p>
                                </div>
                                <label className="switch">
                                  <input type="checkbox" />
                                  <span className="slider round" />
                                </label>
                              </div>
                              <div className="set">
                                <div className="details">
                                  <h5>Notification Sound</h5>
                                  <p>Set the app to alert you via notification sound when you have unread messages.</p>
                                </div>
                                <label className="switch">
                                  <input type="checkbox" defaultChecked />
                                  <span className="slider round" />
                                </label>
                              </div>
                              <div className="set">
                                <div className="details">
                                  <h5>Vibrate</h5>
                                  <p>Vibrate when receiving new messages (Ensure system vibration is also enabled).</p>
                                </div>
                                <label className="switch">
                                  <input type="checkbox" />
                                  <span className="slider round" />
                                </label>
                              </div>
                              <div className="set">
                                <div className="details">
                                  <h5>Turn On Lights</h5>
                                  <p>When someone send you a text message you will receive alert via notification light.</p>
                                </div>
                                <label className="switch">
                                  <input type="checkbox" />
                                  <span className="slider round" />
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* End of Notifications Settings */}
                        {/* Start of Connections */}
                        <div className="category">
                          <a href="#" className="title collapsed" id="headingFour" data-toggle="collapse" data-target="#collapseFour" aria-expanded="true" aria-controls="collapseFour">
                            <i className="material-icons md-30 online">sync</i>
                            <div className="data">
                              <h5>Connections</h5>
                              <p>Sync your social accounts</p>
                            </div>
                            <i className="material-icons">keyboard_arrow_right</i>
                          </a>
                          <div className="collapse" id="collapseFour" aria-labelledby="headingFour" data-parent="#accordionSettings">
                            <div className="content">
                              <div className="app">
                                <img src="dist/img/integrations/slack.svg" alt="app" />
                                <div className="permissions">
                                  <h5>Skrill</h5>
                                  <p>Read, Write, Comment</p>
                                </div>
                                <label className="switch">
                                  <input type="checkbox" defaultChecked />
                                  <span className="slider round" />
                                </label>
                              </div>
                              <div className="app">
                                <img src="dist/img/integrations/dropbox.svg" alt="app" />
                                <div className="permissions">
                                  <h5>Dropbox</h5>
                                  <p>Read, Write, Upload</p>
                                </div>
                                <label className="switch">
                                  <input type="checkbox" defaultChecked />
                                  <span className="slider round" />
                                </label>
                              </div>
                              <div className="app">
                                <img src="dist/img/integrations/drive.svg" alt="app" />
                                <div className="permissions">
                                  <h5>Google Drive</h5>
                                  <p>No permissions set</p>
                                </div>
                                <label className="switch">
                                  <input type="checkbox" />
                                  <span className="slider round" />
                                </label>
                              </div>
                              <div className="app">
                                <img src="dist/img/integrations/trello.svg" alt="app" />
                                <div className="permissions">
                                  <h5>Trello</h5>
                                  <p>No permissions set</p>
                                </div>
                                <label className="switch">
                                  <input type="checkbox" />
                                  <span className="slider round" />
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* End of Connections */}
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
                        {/* Start of Language */}
                        <div className="category">
                          <a href="#" className="title collapsed" id="headingSix" data-toggle="collapse" data-target="#collapseSix" aria-expanded="true" aria-controls="collapseSix">
                            <i className="material-icons md-30 online">language</i>
                            <div className="data">
                              <h5>Language</h5>
                              <p>Select preferred language</p>
                            </div>
                            <i className="material-icons">keyboard_arrow_right</i>
                          </a>
                          <div className="collapse" id="collapseSix" aria-labelledby="headingSix" data-parent="#accordionSettings">
                            <div className="content layer">
                              <div className="language">
                                <label htmlFor="country">Language</label>
                                <select className="custom-select" id="country" required>
                                  <option value>Select an language...</option>
                                  <option>English, UK</option>
                                  <option>English, US</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* End of Language */}
                        {/* Start of Privacy & Safety */}
                        <div className="category">
                          <a href="#" className="title collapsed" id="headingSeven" data-toggle="collapse" data-target="#collapseSeven" aria-expanded="true" aria-controls="collapseSeven">
                            <i className="material-icons md-30 online">lock_outline</i>
                            <div className="data">
                              <h5>Privacy &amp; Safety</h5>
                              <p>Control your privacy settings</p>
                            </div>
                            <i className="material-icons">keyboard_arrow_right</i>
                          </a>
                          <div className="collapse" id="collapseSeven" aria-labelledby="headingSeven" data-parent="#accordionSettings">
                            <div className="content no-layer">
                              <div className="set">
                                <div className="details">
                                  <h5>Keep Me Safe</h5>
                                  <p>Automatically scan and delete direct messages you receive from everyone that contain explict content.</p>
                                </div>
                                <label className="switch">
                                  <input type="checkbox" />
                                  <span className="slider round" />
                                </label>
                              </div>
                              <div className="set">
                                <div className="details">
                                  <h5>My Friends Are Nice</h5>
                                  <p>If enabled scans direct messages from everyone unless they are listed as your friend.</p>
                                </div>
                                <label className="switch">
                                  <input type="checkbox" defaultChecked />
                                  <span className="slider round" />
                                </label>
                              </div>
                              <div className="set">
                                <div className="details">
                                  <h5>Everyone can add me</h5>
                                  <p>If enabled anyone in or out your friends of friends list can send you a friend request.</p>
                                </div>
                                <label className="switch">
                                  <input type="checkbox" defaultChecked />
                                  <span className="slider round" />
                                </label>
                              </div>
                              <div className="set">
                                <div className="details">
                                  <h5>Friends of Friends</h5>
                                  <p>Only your friends or your mutual friends will be able to send you a friend reuqest.</p>
                                </div>
                                <label className="switch">
                                  <input type="checkbox" defaultChecked />
                                  <span className="slider round" />
                                </label>
                              </div>
                              <div className="set">
                                <div className="details">
                                  <h5>Data to Improve</h5>
                                  <p>This settings allows us to use and process information for analytical purposes.</p>
                                </div>
                                <label className="switch">
                                  <input type="checkbox" />
                                  <span className="slider round" />
                                </label>
                              </div>
                              <div className="set">
                                <div className="details">
                                  <h5>Data to Customize</h5>
                                  <p>This settings allows us to use your information to customize Swipe for you.</p>
                                </div>
                                <label className="switch">
                                  <input type="checkbox" />
                                  <span className="slider round" />
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* End of Privacy & Safety */}
                        {/* Start of Logout */}
                        <div className="category">
                          <a href="sign-in.html" className="title collapsed">
                            <i className="material-icons md-30 online">power_settings_new</i>
                            <div className="data">
                              <h5>Power Off</h5>
                              <p>Log out of your account</p>
                            </div>
                            <i className="material-icons">keyboard_arrow_right</i>
                          </a>
                        </div>
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
                      <input type="text" className="form-control" id="user" placeholder="Add recipient..." required />
                      <div className="user" id="contact">
                        <img className="avatar-sm" src="dist/img/avatars/avatar-female-5.jpg" alt="avatar" />
                        <h5>Keith Morris</h5>
                        <button className="btn"><i className="material-icons">close</i></button>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="welcome">Message:</label>
                      <textarea className="text-control" id="welcome" placeholder="Send your welcome message..." defaultValue={"Hi Keith, I'd like to add you as a contact."} />
                    </div>
                    <button type="submit" className="btn button w-100">Send Friend Request</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* End of Add Friends */}
          {/* Start of Create Chat */}
          <div className="modal fade" id="startnewchat" tabIndex={-1} role="dialog" aria-hidden="true">
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
          </div>
          {/* End of Create Chat */}
          <div className="main">
            <div className="tab-content" id="nav-tabContent">
              {/* Start of Babble */}
              <div className="babble tab-pane fade active show" id="list-chat" role="tabpanel" aria-labelledby="list-chat-list">
                {/* Start of Chat */}
                <div className="chat" id="chat1">
                  <div className="top">
                    <div className="container">
                      <div className="col-md-12">
                        <div className="inside">
                          <a href="#"><img className="avatar-md" src="dist/img/avatars/avatar-female-5.jpg" data-toggle="tooltip" data-placement="top" title="Keith" alt="avatar" /></a>
                          <div className="status">
                            <i className="material-icons online">fiber_manual_record</i>
                          </div>
                          <div className="data">
                            <h5><a href="#">Keith Morris</a></h5>
                            <span>Active now</span>
                          </div>
                          <button className="btn connect d-md-block d-none" name={1}><i className="material-icons md-30">phone_in_talk</i></button>
                          <button className="btn connect d-md-block d-none" name={1}><i className="material-icons md-36">videocam</i></button>
                          <button className="btn d-md-block d-none"><i className="material-icons md-30">info</i></button>
                          <div className="dropdown">
                            <button className="btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="material-icons md-30">more_vert</i></button>
                            <div className="dropdown-menu dropdown-menu-right">
                              <button className="dropdown-item connect" name={1}><i className="material-icons">phone_in_talk</i>Voice Call</button>
                              <button className="dropdown-item connect" name={1}><i className="material-icons">videocam</i>Video Call</button>
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
                  <div className="content" id="content">
                    <div className="container">
                      <div className="col-md-12">
                        <div className="date">
                          <hr />
                          <span>Yesterday</span>
                          <hr />
                        </div>
                        <div className="message">
                          <img className="avatar-md" src="dist/img/avatars/avatar-female-5.jpg" data-toggle="tooltip" data-placement="top" title="Keith" alt="avatar" />
                          <div className="text-main">
                            <div className="text-group">
                              <div className="text">
                                <p>We've got some killer ideas kicking about already.</p>
                              </div>
                            </div>
                            <span>09:46 AM</span>
                          </div>
                        </div>
                        <div className="message me">
                          <div className="text-main">
                            <div className="text-group me">
                              <div className="text me">
                                <p>Can't wait! How are we coming along with the client?</p>
                              </div>
                            </div>
                            <span>11:32 AM</span>
                          </div>
                        </div>
                        <div className="message">
                          <img className="avatar-md" src="dist/img/avatars/avatar-female-5.jpg" data-toggle="tooltip" data-placement="top" title="Keith" alt="avatar" />
                          <div className="text-main">
                            <div className="text-group">
                              <div className="text">
                                <p>Coming along nicely, we've got a draft for the client quarries completed.</p>
                              </div>
                            </div>
                            <span>02:56 PM</span>
                          </div>
                        </div>
                        <div className="message me">
                          <div className="text-main">
                            <div className="text-group me">
                              <div className="text me">
                                <p>Roger that boss!</p>
                              </div>
                            </div>
                            <div className="text-group me">
                              <div className="text me">
                                <p>I have already started gathering some stuff for the mood boards, excited to start!</p>
                              </div>
                            </div>
                            <span>10:21 PM</span>
                          </div>
                        </div>
                        <div className="message">
                          <img className="avatar-md" src="dist/img/avatars/avatar-female-5.jpg" data-toggle="tooltip" data-placement="top" title="Keith" alt="avatar" />
                          <div className="text-main">
                            <div className="text-group">
                              <div className="text">
                                <p>Great start guys, I've added some notes to the task. We may need to make some adjustments to the last couple of items - but no biggie!</p>
                              </div>
                            </div>
                            <span>11:07 PM</span>
                          </div>
                        </div>
                        <div className="date">
                          <hr />
                          <span>Today</span>
                          <hr />
                        </div>
                        <div className="message me">
                          <div className="text-main">
                            <div className="text-group me">
                              <div className="text me">
                                <p>Well done all. See you all at 2 for the kick-off meeting.</p>
                              </div>
                            </div>
                            <span>10:21 PM</span>
                          </div>
                        </div>
                        <div className="message">
                          <img className="avatar-md" src="dist/img/avatars/avatar-female-5.jpg" data-toggle="tooltip" data-placement="top" title="Keith" alt="avatar" />
                          <div className="text-main">
                            <div className="text-group">
                              <div className="text">
                                <div className="attachment">
                                  <button className="btn attach"><i className="material-icons md-18">insert_drive_file</i></button>
                                  <div className="file">
                                    <h5><a href="#">Tenacy Agreement.pdf</a></h5>
                                    <span>24kb Document</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <span>11:07 PM</span>
                          </div>
                        </div>
                        <div className="message me">
                          <div className="text-main">
                            <div className="text-group me">
                              <div className="text me">
                                <p>Hope you're all ready to tackle this great project. Let's smash some Brand Concept &amp; Design!</p>
                              </div>
                            </div>
                            <span><i className="material-icons">check</i>10:21 PM</span>
                          </div>
                        </div>
                        <div className="message">
                          <img className="avatar-md" src="dist/img/avatars/avatar-female-5.jpg" data-toggle="tooltip" data-placement="top" title="Keith" alt="avatar" />
                          <div className="text-main">
                            <div className="text-group">
                              <div className="text typing">
                                <div className="wave">
                                  <span className="dot" />
                                  <span className="dot" />
                                  <span className="dot" />
                                </div>
                              </div>
                            </div>
                          </div>
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
                <div className="call" id="call1">
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
                </div>
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
                <div className="chat" id="chat3">
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
                </div>
                {/* End of Chat */}
              </div>
              {/* End of Babble */}
            </div>
          </div>
        </div> {/* Layout */}
      </main>
    </div>
    )
}

export default Chatpage
