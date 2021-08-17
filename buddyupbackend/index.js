var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var nodemailer = require('nodemailer');


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
});



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

app.post('/update-details',bodyParser.json() , (req,res)=>{
    var userCollection = connection.db('buddyup').collection('users');
    userCollection.update({_id:ObjectId(req.body._id)}, {$set:{uname:req.body.name, uemail:req.body.email , uusername:req.body.username, upassword:req.body.password}} , (err,result)=>
    {
        if(!err){
            res.send({status:"OK" , data:"User Updated successfully"})
        }
        else{
            res.send({status:"Failed" , data:err})
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