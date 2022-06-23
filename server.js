const express = require('express');
const app = express();

app.get("/",function(req,res){
  console.log(res);
})

app.post("/",function(req,res){
  res.sendFile("index.html")
})

app.listen(3000,function(){
  console.log("Server started on port 3000")
});
