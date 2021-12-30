var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var nodemailer = require('nodemailer');
var upload = require('./multerConfig');
var path = require('path');

var connectedUsers = [];


var app = express();
app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);


var client = new MongoClient("mongodb+srv://buddyupuser:buddyupuser@school.ivhuh.mongodb.net/buddyup?retryWrites=true&w=majority", { useNewURLParser: true, useUnifiedTopology: true });
var connection;
client.connect((err, db) => {
    if (!err) {
        connection = db;
        console.log("Database Connected Successfully");
    }
    else {
        console.log("Database could not connect");
    }
})


/**
 * SOCKET
 */
io.on('connection', async (socket) => {
    console.log("some client connected");
    // require('./sockets/chat/joinedUser')(io, socket);
    // require('./sockets/chat/chatMessage')(io, socket);
    // require('./sockets/chat/disconnect')(io, socket);
    // require('./sockets/chat/privateMessage')(io, socket);
    // require('./sockets/chat/joinPrivateRoom')(io, socket);

    var random = Math.random();
    console.log(random);
    connectedUsers.push({ random, socket });
    socket.emit("random", random);




});

app.use(express.static(path.join(__dirname, "userImages")));


// APIs

app.get('/list-account', (req, res) => {
    var userCollection = connection.db('buddyup').collection('users');
    userCollection.find().toArray((err, docs) => {
        if (!err) {
            res.send({ status: "OK", data: docs })
        }
        else {
            res.send({ status: "Failed", data: err })
        }
    })
});

app.post('/create-account', bodyParser.json(), (req, res) => {
    var userCollection = connection.db('buddyup').collection('users');
    userCollection.insert(req.body, (err, result) => {
        if (!err) {
            res.send({ status: "OK", data: "Account Created successfully. You can login now. You are redirected to login page." })
            sendMail("buddyup28@gmail.com", "kviuqosaxagajcdi", req.body.uemail, "Welcome to BuddyUp", `<b> Registration successfully </b>   `)

        }
        else {
            res.send({ status: "Failed", data: err })
        }
    })
});

app.post('/valid-email', bodyParser.json(), (req, res) => {
    var userCollection = connection.db('buddyup').collection('users');
    userCollection.find({ uemail: req.body.uemail }).toArray((err, result) => {
        if (!err && result.length > 0) {
            res.send({ status: 'error', data: "this email is already registered :(" });
        } else {
            res.send({ status: 'ok' })
        }
    })
})

app.post('/valid-username', bodyParser.json(), (req, res) => {
    var userCollection = connection.db('buddyup').collection('users');
    userCollection.find({ uusername: req.body.uusername }).toArray((err, result) => {
        if (!err && result.length > 0) {
            res.send({ status: 'error', data: "this username is already registered :(" });
        } else {
            res.send({ status: 'ok' })
        }
    })
})

app.post("/send-user-otp", bodyParser.json(), (req, res) => {
    console.log(req.body);
    sendMail("buddyup28@gmail.com", "kviuqosaxagajcdi", req.body.uemail, "Welcome to BuddyUp", `Your One Time Password is - <h3>${req.body.otp}</h3><br><h6>We hope you find our service cool.</h6>`)
    res.send({ status: "ok", data: "please verify your email" });
})

app.post('/check-login', bodyParser.json(), (req, res) => {
    // console.log(req.body);
    var usercollection = connection.db('buddyup').collection('users');
    usercollection.find({ uusername: req.body.username, upassword: req.body.password }).toArray((err, result) => {
        if (!err && result.length > 0) {
            res.send({ status: 'ok', data: result[0] });
        } else {
            res.send({ status: 'error', data: err })
        }
    })
})

// for forgot password
app.post('/user-by-email', bodyParser.json(), (req, res) => {
    // console.log("email check");
    // console.log(req.body.email)
    var UserCollection = connection.db('buddyup').collection('users');
    // console.log("var email check three" + req.body.email)
    UserCollection.find({ uemail: (req.body.email) }).toArray((err, result) => {
        // console.log("updated student two")
        if (!err && result.length > 0) {
            console.log(result);
            res.send({ status: "ok", data: result })
            // console.log("email is match")
            var n = result.map((e) => { return e.uusername })
            var i = result.map((e) => { return e.upassword })
            sendMail("buddyup28@gmail.com", "kviuqosaxagajcdi", req.body.email, "Welcome to BuddyUp", "<h3> your buddyup account  password is</h3>" + i + "<h3> your buddyup account  username is </h3>" + n)

        }
        else {
            res.send({ status: "failed", data: err })
        }
    })
})

// app.post('/update-user', (req, res) => {
//     // console.log("103--------------");
//     upload(req, res, (err) => {
//         if (err) {
//             console.log("Error Occured during upload ");
//             console.log(err);
//             res.send({ status: "failed", data: err });
//         }
//         else {
//             console.log("111---------------")
//             var userCollection = connection.db('buddyup').collection('users');
//             console.log("files", req.files);
//             // console.log("line 47");
//             console.log(req.body);

//             userCollection.update({ _id: ObjectId(req.body._id) }, { $set: { profile: req.files.profile[0].filename, uname: req.body.uname, uemail: req.body.uemail, uusername: req.body.uusername, upassword: req.body.upassword } }, (err, result) => {
//                 if (!err) {
//                     res.send({ status: "success", data: "user details updated sucessfully" });
//                 }
//                 else {
//                     res.send({ status: "failed", data: err });
//                 }
//             })
//         }
//     });
// })

app.post('/update-user', bodyParser.json(), (req, res) => {
    var userCollection = connection.db('buddyup').collection('users');
    // console.log(req.body);
    userCollection.update({ _id: ObjectId(req.body.userId) }, { $set: { uname: req.body.uname, uemail: req.body.uemail } }, (err, result) => {
        if (!err) {
            res.send({ status: "success", data: "user details updated sucessfully" });
        }
        else {
            res.send({ status: "failed", data: err });
        }
    })
})

app.post('/update-password', bodyParser.json(), (req, res) => {
    var userCollection = connection.db('buddyup').collection('users');
    // console.log(req.body);
    userCollection.updateOne({ _id: ObjectId(req.body.userId) }, { $set: { upassword: req.body.reenternewpassword } }, (err, result) => {
        if (!err) {
            res.send({ status: "success", data: "Password updated sucessfully" });
        }
        else {
            res.send({ status: "failed", data: err });
        }
    })
})

app.post('/update-profile', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log("Error Occured during upload ");
            console.log(err);
            res.send({ status: "failed", data: err });
        }
        else {
            var userCollection = connection.db('buddyup').collection('users');
            console.log(req.files);
            // console.log(req.files.profile[0].filename);
            // console.log(req.body._id);
            userCollection.update({ _id: ObjectId(req.body._id) }, { $set: { profile: req.files.profile[0].filename } }, (err, result) => {
                if (!err) {
                    res.send({ status: "success", data: "Profile updated sucessfully" });
                }
                else {
                    res.send({ status: "failed", data: err });
                }
            })
        }
    })
})

app.post('/add-friend', bodyParser.json(), (req, res) => {

    const collection = connection.db('buddyup').collection('users');
    var friend = req.body.friend;
    // console.log(friend);
    var myUsername = req.body.userUserName;
    console.log(myUsername);
    console.log(req.body);
    collection.updateOne({ 'uusername': myUsername }, { $push: { friends: { name: friend, status: false, sent: true, recieved: false } } })
    collection.updateOne({ 'uusername': friend }, { $push: { friends: { name: myUsername, status: false, sent: false, recieved: true } } }
        , (err, result) => {
            if (!err) {
                res.send({ status: "ok", data: "Friend Request Sent" });
            }
            else {
                res.send({ status: "failed", data: "some error occured" });
            }
        })
});

app.post('/get-notif', bodyParser.json(), (req, res) => {
    // console.log(req.body);
    const collection = connection.db('buddyup').collection('users');
    collection.find({ uusername: (req.body.userUserName) }).toArray((err, docs) => {
        if (!err) {
            res.send({ status: "ok", data: docs });
        }
        else {
            res.send({ status: "failed", data: "some error occured" });
        }
    })
});

app.post('/get-userlist', bodyParser.json(), (req, res) => {
    // console.log(req.body);
    const collection = connection.db('buddyup').collection('users');
    collection.find({ uusername: (req.body.S) }).toArray((err, docs) => {
        if (!err) {
            res.send({ status: "ok", data: docs });
        }
        else {
            res.send({ status: "failed", data: "some error occured" });
        }
    })
});

app.post('/accept-request', bodyParser.json(), (req, res) => {

    const collection = connection.db('buddyup').collection('users');
    var friend = req.body.friendReq;
    var username = req.body.userUserName;
    // console.log(friend); console.log(username);
    collection.updateOne({ "uusername": username, "friends": { $elemMatch: { "name": friend } } }, { $set: { "friends.$.status": true } })
    collection.updateOne({ "uusername": friend, "friends": { $elemMatch: { "name": username } } }, { $set: { "friends.$.status": true } }
        , (err, result) => {
            if (!err) {
                res.send({ status: "ok", data: "friend request accepted" });
            }
            else {
                res.send({ status: "failed", data: "some error occured" });
            }
        })

});

app.post('/unfriend-or-decline', bodyParser.json(), (req, res) => {
    const collection = connection.db('buddyup').collection('users');
    console.log(req.body);
    // collection.deleteOne({"friends.$.name": (req.body.frnd) , uusername: (req.body.mine)});
    // collection.deleteOne({"friends.$.name": (req.body.mine) , uusername: (req.body.frnd)}
    collection.updateOne({ "uusername": req.body.mine, "friends": { $elemMatch: { "name": req.body.frnd } } }, { $set: { "friends.$.name": "", "friends.$.status": false, "friends.$.recieved": false, "friends.$.sent": false } })
    collection.updateOne({ "uusername": req.body.frnd, "friends": { $elemMatch: { "name": req.body.mine } } }, { $set: { "friends.$.name": "", "friends.$.status": false, "friends.$.recieved": false, "friends.$.sent": false } }
        , (err, result) => {
            if (!err) {
                res.send({ status: "ok", data: "friend unfriend or request declined" });
            }
            else {
                res.send({ status: "failed", data: "some error occured" });
            }
        })
});

app.post('/myFriends', bodyParser.json(), (req, res) => {
    // console.log(req.body);
    const collection = connection.db('buddyup').collection('users');
    collection.find({ uusername: (req.body.userUserName) }).toArray((err, docs) => {
        if (!err) {
            res.send({ status: "ok", data: docs });
        }
        else {
            res.send({ status: "failed", data: "some error occured" });
        }
    })
});

app.post('/friendData', bodyParser.json(), (req, res) => {
    // console.log("friend data = " + req.query.id);
    const collection = connection.db('buddyup').collection('users');
    collection.find({ uusername: (req.query.id) }).toArray((err, docs) => {
        if (!err) {
            res.send({ status: "ok", data: docs });
        }
        else {
            res.send({ status: "failed", data: "some error occured" });
        }
    })
});

app.post('/send-message', bodyParser.json(), (req, res) => {
    const collection = connection.db('buddyup').collection('messages');
    collection.insertOne(req.body, (err, result) => {
        if (!err) {
            res.send({ status: "ok", data: "Message Sent" });
        }
        else {
            res.send({ status: "failed", data: "some error occured" });
        }
    })
});

// for retrieving messages
app.post('/messages1', bodyParser.json(), (req, res) => {
    // console.log(req.body);
    const collection = connection.db('buddyup').collection('messages');
    collection.find({ userUserName: (req.body.userUserName) }).toArray((err, docs) => {
        if (!err) {
            res.send({ status: "ok", data: docs });
        }
        else {
            res.send({ status: "failed", data: "some error occured" });
        }
    })
});

// for retrieving messages
app.post('/messages2', bodyParser.json(), (req, res) => {
    // console.log(req.body);
    const collection2 = connection.db('buddyup').collection('messages');
    collection2.find({ userUserName: (req.body.fData) }).toArray((err, docs) => {
        if (!err) {
            res.send({ status: "ok", data: docs });
        }
        else {
            res.send({ status: "failed", data: "some error occured" });
        }
    })
});

// for delete a messages
app.post('/delete-a-message', bodyParser.json(), (req, res) => {
    const collection = connection.db('buddyup').collection('messages');
    // console.log(req.body.id);
    collection.deleteOne({ messageid: (req.body.id) }, (err, result) => {
        if (!err) {
            res.send({ status: "OK", data: "Message Deleted successfully" })
        }
        else {
            res.send({ status: "Failed", data: err })
        }
    })
});

// delete all msg between two persons
app.post('/delete-all-message', bodyParser.json(), (req, res) => {
    const collection = connection.db('buddyup').collection('messages');
    // console.log(req.body);
    collection.deleteMany({ userUserName: (req.body.frnd), friendUsername: (req.body.mine) })
    collection.deleteMany({ userUserName: (req.body.mine), friendUsername: (req.body.frnd) }, (err, result) => {
        if (!err) {
            res.send({ status: "OK", data: "All Messages Deleted" })
        }
        else {
            res.send({ status: "Failed", data: err })
        }
    })
});





function sendMail(from, appPassword, to, subject, htmlmsg) {
    let transporter = nodemailer.createTransport(
        {
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth:
            {
                //  user:"weforwomen01@gmail.com",
                //  pass:""
                user: from,
                pass: appPassword


            }
        }
    );
    let mailOptions =
    {
        from: from,
        to: to,
        subject: subject,
        html: htmlmsg
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Email sent:' + info.response);
        }
    });
}







server.listen(3000, () => {
    console.log("Server is started on port 3000");
});
// app.listen(3000,()=> {
//     console.log("Server is started on port 3000");
// })