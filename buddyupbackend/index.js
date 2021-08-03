var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;





var app = express();
app.use(cors());

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


// APIs

app.get('/list-account' , (req,res)=>{
    var studentCollection = connection.db('buddyup').collection('users');
    studentCollection.find().toArray((err,docs)=>
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
            res.send({status:"OK" , data:"Account Created successfully 💖"})
        }
        else{
            res.send({status:"Failed" , data:err})
        }
    })
});

app.post('/login', bodyParser.json() ,(req,res)=>{ 

    const collection = connection.db('buddyup').collection('users');

    collection.find(req.body).toArray((err,docs)=>{
        if(!err && docs.length>0)
        {

            res.send({status:"ok", data:docs});
        }
        else{
            res.send({status:"failed", data:"some error occured"});
        }
    })
});







app.listen(3000,()=> {
    console.log("Server is started on port 3000");
})