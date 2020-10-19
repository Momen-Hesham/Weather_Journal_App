// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const port=8000;
// Start up an instance of app
const app=express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// POST route
app.post('/',function(req,res)
{
    projectData=req.body;
});

// GET route
app.get('/GetUi',function(req,res){
    res.send(projectData);
})

// Setup Server
const server=app.listen(port,function(request,respond){
    console.log(`Server is running on port : ${port}`);
}
)

