// Current testing fetch() requests are set to Miami University area/District 53 in Ohio
import config from './config.js';
import 'isomorphic-fetch'; // LOOK INTO SWITCHING TO AXIOS CALLS
import './../console-dot-emoji/console.emoji.js'

let oxfordSURL = 'https://api.propublica.org/congress/v1/members/senate/OH/current.json';
let oxfordHURL = 'https://api.propublica.org/congress/v1/members/house/OH/8/current.json';
let PROPUBLICA_API_KEY = config.API_KEY;

const ppHeader = {'X-API-Key' : PROPUBLICA_API_KEY};
const publicaHeaders = new Headers(ppHeader);

var myInit = {
    method: 'GET',
    headers: {
        publicaHeaders
    },
    mode: 'basic',
    cache: 'default'
};

function listSenateMembers(){ // LOOK INTO SWITCHING TO AXIOS CALLS
  fetch(oxfordSURL, myInit)
    .then(function(response) {
         if (response.status == 401){
             console.poo("Wow, I really fucked up, didn't I? Error code: " + response.status);
             return;
         } else {
             console.beer("Hey, we fixed that issue!");
             return;
         }
    })
    .then(function(myJson) {
    console.rainbow(JSON.stringify(myJson));
    });
}

function listHouseMembers(){ // LOOK INTO SWITCHING TO AXIOS CALLS
  fetch(oxfordHURL, myInit)
    .then(function(response){
        if (response.status == 401){
            console.poo("Wow, I really fucked up, didn't I? Error code: " + response.status);
            return;
        } else {
            console.beer("Hey, we fixed that issue!");
            return;
        }
    })
    .then(function(myJson) {
        console.rainbow(JSON.stringify(myJson));
    });
}

listHouseMembers();
