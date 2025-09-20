const express = require ("express")
const cors = require ("cors")
const mongoose = require("mongoose")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

mongoose.connect("mongodb+srv://karthikthangaduraik_db_user:123@cluster0.b6iojfq.mongodb.net/passkey?retryWrites=true&w=majority&appName=Cluster0").then(function(){
    console.log("Connected to DB")
}).catch(function(){
    console.log("Failed to Connect")
})

const credential = mongoose.model("credential",{},"bulkmail")



const nodemailer = require("nodemailer");

// Create a test account or replace with real credentials.



app.post("/sendemail",function(req,res){

    let msg = req.body.msg
    let emailList = req.body.emailList

    credential.find().then(function(data){
    console.log(data[0].toJSON())

    const transporter = nodemailer.createTransport({
        service:"gmail",
  auth: {
    user: data[0].toJSON().user,
    pass: data[0].toJSON().pass,
  },
});

    new Promise(async function(resolve,reject){
    try
    {
        for(let i=0;i<emailList.length;i++)
    {
        
      await  transporter.sendMail(
    { 
        from:"karthikthangaduraik@gmail.com",
        to:emailList[i],
        subject:"A message from Bulk Mail App",
        text:msg
    },
)

console.log("Email sent to:"+emailList[i])
}

resolve("Success")
}

catch(error)
{
    reject("Failed")
}

}).then(function(){
    res.send(true)
}).catch(function(){
    res.send(false)
})


}).catch(function(error){
    console.log(error)
})

})

app.listen(3000,function(){
    console.log("Server Started.....")
})
