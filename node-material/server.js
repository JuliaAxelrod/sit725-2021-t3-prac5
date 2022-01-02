let express = require("express");
let app = express();

//var app = require('express')();
let http = require('http').createServer(app);
let io = require('socket.io')(http);

let dbo = require ("./db/conn");
// const { getDB } = require("./db/conn");
let projectRoute = require("./routes/projects");
let guideRoute = require("./routes/guides");

var cors = require('cors');


var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(express.json({limit: '50mb'}));

app.use('/api/projects',projectRoute);
app.use('/api/guides',guideRoute);

//MongoDB
//AtplXKm0VunfEw91 - julia@deakin.edu.au
// glogal variable for future login - JA
var user_name_supplied;

app.use(cors());

// dbo.connect((err) => {
//   if (err) {
//     console.error(err);
//     process.exit();
//   }

//     http.listen(port, () => {
//       console.log("Listening on port ", port);
//     });
// });

// What is happening here: if user refreshes http://localhost:3000/test before setTimeout() kicks in,
// socket.emit Message will be "Please log in providing your username! Julia"; if not - 
// "Please log in providing your username! undefined"
// -- JA

// app.get("/test", function (request, response) {
//   var user_name = request.query.user_name;
//   if (typeof user_name === 'undefined') {console.log("Please log in providing your username! ");
//   user_name_supplied = "Julia";}
//   response.end("Hello " + user_name_supplied + "!");
// });


//socket test
// io.on('connection', (socket) => {
//   console.log('a user connected');
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
//   setInterval(()=>{
//     socket.emit('number', parseInt(Math.random()*10));
//   }, 1000)

//   console.log('You are here'); // Debugging message 
 
  
//   // use setTimeout to execute only once; display socket.id
//   setTimeout(()=>{  
//     socket.emit('number',"Please log in providing your username " + user_name_supplied )
//     socket.emit('number', "it is not! This is the socket ID! " + socket.id )
//   }, 5000);
  
// });

// Projects
// let id = 1;
 // const projects = [];

// for (let id = 1; id < 21; id++) {
//   projects.push({

//     projectID:id,
//     title: 'project ' +id,
//     info: `This is the info for project number ${id}`,
//     img: 'assets/'+id+'.jpg' 
//     // null,
//   });
// }



// app.get("/projects", function(request, response)
// {
//   // response.json(projects);
//     dbo.getDB().collection("projects").find({}).toArray(function(err,res){
//       if (err)
//         throw err
//       response.send(res);
//       });
// });

// function sendRefresh() {
//   client.write('data: refresh');
// }

// app.post("/projects", function(request,response){
//   const project = request.body;
//   // validation tba
//   if (project) {
//     // projects.push(project);
//     console.log(JSON.stringify(project));
//     dbo.getDB().collection("projects").insertOne(project);
  
//   }
//   else{
//     response.sendStatus(500);
//   }
//  // sendRefresh();
//   response.status(204);
// });


dbo.connectToDatabase(function(err){
  if (err) {
    console.error(err);
    process.exit();
  }

  http.listen(port,()=>{
    console.log("Listening on port ", port);
  });

});
//this is only needed for Cloud foundry 
require("cf-deployment-tracker-client").track();

