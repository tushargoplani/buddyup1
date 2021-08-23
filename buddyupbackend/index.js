var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var nodemailer = require('nodemailer');
var upload = require('./multerConfig');
var path = require('path');

var connectedUsers=[];


var app = express();
app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);


var client = new MongoClient("mongodb+srv://buddyupuser:buddyupuser@school.ivhuh.mongodb.net/buddyup?retryWrites=true&w=majority", {useNewURLParser:true , useUnifiedTopology: true});
var connection;
client.connect((err,db) => {
    if(!err)
    {
        connection = db;
        console.log("Database Connected Successfully");
    }
    else{
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
    connectedUsers.push({random, socket});
    socket.emit("random",random);
    



});

app.use(express.static(path.join(__dirname,"userImages")));


// APIs

app.get('/list-account' , (req,res)=>{
    var userCollection = connection.db('buddyup').collection('users');
    userCollection.find().toArray((err,docs)=>
    {
        if(!err){
            res.send({status:"OK" , data:docs})
        }
        else{
            res.send({status:"Failed" , data:err})
        }
    })
});

app.post('/create-account', bodyParser.json() ,(req,res)=>{
    var userCollection = connection.db('buddyup').collection('users');
    userCollection.insert(req.body ,(err,result)=>
    {
        if(!err){
            res.send({status:"OK" , data:"Account Created successfully. You can login now. You are redirected to login page."})
            sendMail("buddyup28@gmail.com", "kviuqosaxagajcdi", req.body.uemail, "Welcome to BuddyUp", `<b> Registration successfully </b>   ` )

        }
        else{
            res.send({status:"Failed" , data:err})
        }
    })
});

app.post('/valid-email', bodyParser.json() ,(req, res) => {
    var userCollection = connection.db('buddyup').collection('users');
    userCollection.find({uemail:req.body.uemail}).toArray((err, result) => {
        if (!err && result.length>0) {
            res.send({ status: 'error', data: "this email is already registered :(" });
        } else {
            res.send({ status: 'ok' })
        }
    })
})


app.post('/valid-username', bodyParser.json() ,(req, res) => {
    var userCollection = connection.db('buddyup').collection('users');
        userCollection.find({uusername:req.body.uusername}).toArray((err, result) => {
            if (!err && result.length>0) {
                res.send({ status: 'error', data: "this username is already registered :(" });
            } else {
                res.send({ status: 'ok' })
            }
        })
})


app.post('/check-login', bodyParser.json() ,(req, res) => {
    console.log(req.body);
    var usercollection = connection.db('buddyup').collection('users');
    usercollection.find({uusername:req.body.username, upassword:req.body.password}).toArray((err, result) => {
        if (!err && result.length>0) {
            res.send({ status: 'ok', data: result[0] });
        } else {
            res.send({ status: 'error', data: err })
        }
    })
})



// for forgot password
app.post('/user-by-email',bodyParser.json(),(req,res)=>{
    console.log("email check");
    console.log(req.body.email)
    var UserCollection=connection.db('buddyup').collection('users');
    console.log("var email check three"+ req.body.email)
    UserCollection.find({uemail:(req.body.email)}).toArray((err,result)=>{
        console.log("updated student two")
        if(!err && result.length>0){
            console.log(result);
            res.send({status:"ok" ,data:result})
            console.log("email is match")
            var n=result.map((e)=>{return e.uusername})
            var i=result.map ((e)=>{return e.upassword})
            sendMail("buddyup28@gmail.com", "kviuqosaxagajcdi", req.body.email, "Welcome to BuddyUp", "<h3> your buddyup account  password is</h3>" +i +"<h3> your buddyup account  username is </h3>" +n  ) 
            
        }
        else{
            res.send({status:"failed",data:err})
        }
    })
})


app.post('/update-user', (req,res)=>{
    console.log("103--------------");
    upload(req,res,(err)=>{
        if (err) {
            console.log("Error Occured during upload ");
            console.log(err);
            res.send({status:"failed", data:err});
        }
        else{
            console.log("111---------------")
            var userCollection = connection.db('buddyup').collection('users');
            console.log("files",req.files);
            console.log("line 47"); 
            console.log(req.body);

            userCollection.update({_id:ObjectId(req.body._id)},{$set:{profile:req.files.profile[0].filename, uname:req.body.uname, uemail:req.body.uemail, uusername:req.body.uusername, upassword:req.body.upassword}},(err,result)=>{
                if(!err)
                {
                    res.send({status:"success", data:"user details updated sucessfully"});
                }
                else{
                    res.send({status:"failed", data:err});
                }
            })
        }
    });
})


app.post('/add-friend', bodyParser.json() ,(req,res)=>{ 

    const collection = connection.db('buddyup').collection('users');
    var friend=req.body.friend;
    console.log(friend);
    var myUsername = req.body.userUserName;
    console.log(myUsername);
    console.log(req.body);
    collection.updateOne({'uusername':myUsername},{$push:{friends:{name:friend,status:false,sent:true,recieved:false}}})
    collection.updateOne({'uusername':friend},{$push:{friends:{name:myUsername,status:false,sent:false,recieved:true}}}
            ,(err,result)=>{
            if(!err)
            {
                res.send({status:"ok", data:"Friend Request Sent"});
            }
            else{
                res.send({status:"failed", data:"some error occured"});
            }
        })
        });


app.post('/get-notif', bodyParser.json() ,(req,res)=>{ 

    const collection = connection.db('buddyup').collection('users');
    collection.find(req.body).toArray((err,docs)=>{
        if(!err)
        {
            res.send({status:"ok", data:docs});
        }
        else{
            res.send({status:"failed", data:"some error occured"});
        }
    })
});


app.post('/accept-request', bodyParser.json() ,(req,res)=>{ 
    
        const collection = connection.db('buddyup').collection('users');
        var friend=req.body.friendEmail;
        var username=req.body.uusername;
      
        collection.update({"uusername":uusername,"friends":{$elemMatch:{"name":friend}}}, {$set:{"friends.$.status":true}})
        collection.update({"uusername":friend,"friends":{$elemMatch:{"name":uusername}}}, {$set:{"friends.$.status":true}}
                ,(err,result)=>{
                if(!err)
                {
                    res.send({status:"ok"});
                }
                else{
                    res.send({status:"failed", data:"some error occured"});
                }
            })
        
});










function sendMail(from, appPassword, to, subject,  htmlmsg)
{
    let transporter=nodemailer.createTransport(
        {
            host:"smtp.gmail.com",
            port:587,
            secure:false,
            auth:
            {
             //  user:"weforwomen01@gmail.com",
             //  pass:""
             user:from,
              pass:appPassword
              
    
            }
        }
      );
    let mailOptions=
    {
       from:from ,
       to:to,
       subject:subject,
       html:htmlmsg
    };
    transporter.sendMail(mailOptions ,function(error,info)
    {
      if(error)
      {
        console.log(error);
      }
      else
      {
        console.log('Email sent:'+info.response);
      }
    });
}







server.listen(3000,()=> {
    console.log("Server is started on port 3000");
});
// app.listen(3000,()=> {
//     console.log("Server is started on port 3000");
// })