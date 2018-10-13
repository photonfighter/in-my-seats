// Current testing requests are set to Miami University area/District 53 in Ohio
import './../console-dot-emoji/console.emoji.js'
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const oxfordSURL = 'https://api.propublica.org/congress/v1/members/senate/OH/current.json';
const oxfordHURL = 'https://api.propublica.org/congress/v1/members/house/OH/8/current.json';
const config = require('./config.js');
const PROPUBLICA_API_KEY = config.API_KEY;

var request = new XMLHttpRequest();

function listSenateMembers(){
    request.open('GET', oxfordSURL, true);
    request.setRequestHeader('X-API-Key', PROPUBLICA_API_KEY);
    request.onload = function() {
        console.log(request.response);
    }
    request.send();
}

function listHouseMembers(){
    request.open('GET', oxfordHURL, true);
    request.setRequestHeader('X-API-Key', PROPUBLICA_API_KEY);
    request.onload = function() {
        console.log(request.response);
    }
    request.send();
}

listHouseMembers();
