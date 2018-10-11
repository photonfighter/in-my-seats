// Current testing fetch() requests are set to Miami University area/District 53 in Ohio
import config from './config.js';
import 'isomorphic-fetch';
import './../console-dot-emoji/console.emoji.js'

let oxfordSURL = 'https://api.propublica.org/congress/v1/members/115/OH/current.json';
let oxfordHURL = 'https://api.propublica.org/congress/v1/members/115/OH/53/current.json';
let PROPUBLICA_API_KEY = config.API_KEY;

var ppHeader = new Headers('X-API-Key' : PROPUBLICA_API_KEY);

var myInit = {
    method: 'GET',
    headers: {
        ppHeader
    },
    mode: 'basic',
    cache: 'default'
};

function listSenateMembers(){
  fetch(oxfordSURL, myInit)
    .then(function(response) {
         if (response.status == 401){
             console.poo("Wow, I really fucked up, didn't I? Error code: " + response.status);
             return;
         } else {
             console.beer("At least we fixed that problem...");

    })
    .then(function(myJson) {
    console.rainbow(JSON.stringify(myJson));
    });
}

function listHouseMembers(){
  fetch(oxfordHURL, myInit)
    .then(function(response){
        if (response.status == 401){
            console.poo("Wow, I really fucked up, didn't I? Error code: " + response.status);
            return;
        } else {
            console.beer("At least we fixed that problem...");

    })
    .then(function(myJson) {
        console.rainbow(JSON.stringify(myJson));
    });
}

listSenateMembers();
