const express = require("express");
const bodyParser = require("body-parser");

const app = express();
let items = ["Solve Paper","Go Market"];
let workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req,res){

let t = new Date();
let c = t.getDay();
 let options = {
   weekday: "long",
   day: "numeric",
   month: "long"
 };
 let day = t.toLocaleDateString("en-US", options);
  res.render("list",{listTitle: day , newItem: items});
});

app.post("/",function(req,res){

  //console.log(req.body);

let item = req.body.newItem;
  if(req.body.list === "Work List"){
    workItems.push(item);
    res.redirect("/work");
  }
  else{
    items.push(item);
    res.redirect("/");
  }
});


app.get("/work", function(req,res){
  res.render("list",{listTitle: "Work List" ,newItem: workItems })
});

app.post("/work",function(req,res){
  let  item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");

})


app.listen(3000,function(){
  console.log("Server started on port 3000");
});
