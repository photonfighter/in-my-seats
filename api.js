// Current testing requests are set to Miami University area/District 53 in Ohio
import './../console-dot-emoji/console.emoji.js'
import 'isomorphic-fetch'

const oxfordSURL = 'https://api.propublica.org/congress/v1/members/senate/OH/current.json';
const oxfordHURL = 'https://api.propublica.org/congress/v1/members/house/OH/8/current.json';
const config = require('./config.js');
const PROPUBLICA_API_KEY = config.API_KEY;

function listSenateMembers(){

}

function listHouseMembers(){

}

listHouseMembers();
