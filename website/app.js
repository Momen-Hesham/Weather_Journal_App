/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();



// Personal API Key for OpenWeatherMap API
const key='826854fcbcf9bc48b9d48dccdf74068f';
const button=document.getElementById('generate');
const zip=document.getElementById('zip');
const baseurl='https://api.openweathermap.org/data/2.5/weather?zip=';
const feelings = document.getElementById('feelings');
const CurrentDate=document.getElementById('date');
const Temp=document.getElementById('temp');
const content=document.getElementById('content');

// Event listener to add function to existing HTML DOM element
button.addEventListener('click',ListenerFunc);
/* Function called by event listener */
function ListenerFunc(){
    
    const Weather=GetApiData(`${baseurl}${zip.value}&units=metric&appid=${key}`);
    const res=Weather.then(function(PromiseResult)
        {
            postData('/',{
                temp:PromiseResult.main.temp,
                date:newDate,
                feelings:feelings.value,
            });
            UpdateUIDynamically();
            
        }
    );

};


/* Function to GET Web API Data*/
const GetApiData = async function (url=''){
    
    const response = await fetch(url);
    try{
        const newApiData= await response.json();
        return newApiData;
    }
    catch(error){
        console.log("error", error);
    }

};
/* Function to POST data */
const postData = async function ( url = '', data = {}){

    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try{
        const newApiData= await response.json();
        return newApiData;
    }
    catch(error){
        console.log("error", error);
    }
};

/* Function to GET Project Data */
const GetProjectData = async function (url='') {

    const response = await fetch(url);

    try {
        const newUI=await response.json();
        return newUI;
    }
    catch(error) {
        console.log("error", error);
    }
};

function UpdateUIDynamically()
{
    const NewUiData=GetProjectData('/GetUi');
    NewUiData.then(function(response){

       CurrentDate.innerHTML=response.date;
       Temp.innerHTML=`${response.temp} °C`;
       content.innerHTML=response.feelings;
    });

};