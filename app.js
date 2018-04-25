var express=require("express");
var app=express();
var request=require("request");
app.set("view engine", "ejs");

app.get("/",function(req,res){
    res.render("search");
});

app.get("/results",function(req,res){
    var urlfetch=req.query.inp; 
   request("https://query.yahooapis.com/v1/public/yql?q=select%20wind%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22chicago%2C%20il%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",function(error,response,body){
       if(!error && response.statusCode==200)
       {
            var parsedData=JSON.parse(body);
            console.log(parsedData["query"]["results"]["channel"]["wind"]);
            res.render("results",{data:parsedData,url:urlfetch});
       }
   })
});
app.listen(process.env.PORT,process.env.IP,function()
{
    console.log("The server has started");
});