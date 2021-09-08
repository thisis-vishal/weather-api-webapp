const express=require("express");
const https=require("https");
const app=express();
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res) {
    res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res) {
  console.log(req.body.cityName);
  const query=req.body.cityName;
  const appid="2aa30bf6e59eb44f0330e71e90bb1017";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appid+"&units=metric";
  https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data) {//retrive data
      const weatherData=JSON.parse(data); //covert hex to text
      const temp=weatherData.main.temp;
      const desc=weatherData.weather[0].description;
      const icon=weatherData.weather[0].icon;
      const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png"
      res.write("<p>the weather is currently "+desc+"<p>");
      res.write("<h1>the temperature of "+query+" is "+temp+" degree </h1>")
      res.write("<img src="+imageURL+">");
      //JSON.strinify used to convert js object to string keeping the syntax
    });
  });
});


app.listen(3000,function(){
  console.log("Server is running on port 3000.");
});
