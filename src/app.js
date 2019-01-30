'use strict';

// ------------------------------------------------------------------
// APP INITIALIZATION
// ------------------------------------------------------------------

const {
  App
} = require('jovo-framework');
const {
  Alexa
} = require('jovo-platform-alexa');

const {
  JovoDebugger
} = require('jovo-plugin-debugger');
 require('jovo-db-filedb');

const apiConfig = require('./apiconfig.js');
const request = require('request-promise-native');
const jsonparser = require('./json-parser.js');


const app = new App();

app.use(
  new Alexa(),
  new JovoDebugger(),
);

var officials;


// ------------------------------------------------------------------
// APP LOGIC
// ------------------------------------------------------------------

app.setHandler({
  LAUNCH() {

    // this.tell("Hello! I am here to help you get to know your representatives. You can choose between president, senators, house representative, or governor.");

    this.toIntent('GetCountryAndPostalCodeIntent');

  },

  GetDesiredRepresentativeIntent() {
    this.followUpState('RepOption').ask("Which would you like me to look up for you?", "Which representative would you like to know more about?");
  },

  RepOption: {
    // give info on President
    PresidentIntent() {
      let name = officials.president.name;
      let address = officials.president.address;
      let phone = officials.president.phone;
      let party = officials.president.party;
      this.tell('The president is ' + name + ". They are a member of the " + party + ". Their address is " + address + ". Their phone number is " + phone);
    },
    // give info on Senators
    SenatorsIntent() {
      let name = officials.senatorOne.name;
      let name2 = officials.senatorTwo.name;
      this.followUpState('SenatorOption').ask('Your senators are ' + name + ' and ' + name2 + '. To hear the info for ' + name + ', say senator one. To hear the info for ' + name2 + ', say senator two.');
    },
    // give info on House Rep
    HouseIntent() {
      let name = officials.houseRep.name;
      let address = officials.houseRep.address;
      let phone = officials.houseRep.phone;
      let party = officials.houseRep.party;
      this.tell('The House Representative is ' + name + ". They are a member of the " + party + ". Their address is " + address + ". Their phone number is " + phone);
    },
    // give info on Governor
    GovernorIntent() {
      let name =  officials.governor.name;
      let address =  officials.governor.address;
      let phone =  officials.governor.phone;
      let party =  officials.governor.party;
      this.tell('The governor is ' + name + ". They are a member of the " + party + ". Their address is " + address + ". Their phone number is " + phone);
    }

  },

  SenatorOption: {
    // give info for the first listed Senator
    SenatorOneIntent() {
      let name = officials.senatorOne.name;
      let address =  officials.senatorOne.address;
      let phone =  officials.senatorOne.phone;
      let party =  officials.senatorOne.party;
      this.tell(name + " is a member of the " + party + ". Their address is " + address + ". Their phone number is " + phone);
    },
    // give info for the second listed Senator
    SenatorTwoIntent() {
      let name =  officials.senatorTwo.name;
      let address =  officials.senatorTwo.address;
      let phone =  officials.senatorTwo.phone;
      let party =  officials.senatorTwo.party;
      this.tell(name + " is a member of the " + party + ". Their address is " + address + ". Their phone number is " + phone);
    }
  },

  async PermissionsErrorIntent() {
    await this.$alexaSkill.$user.showAskForCountryAndPostalCodeCard();
    this.tell("You done goofed. Get permission");
  },

  async GetCountryAndPostalCodeIntent() {

    try {
      // Gets the user's location from ASK
      const countryAndPostalCode = await this.$alexaSkill.$user.getCountryAndPostalCode();
      var pc = countryAndPostalCode.postalCode;

      // Setting up the request
      var requestOptions = {
        uri: 'https://www.googleapis.com/civicinfo/v2/representatives',
        // queries
        qs: {
          key: apiConfig.CivicInfoAPIKey,
          address: pc,
        },
        // Automatically parse JSON
        json: true
      }

      // Stores the request body (JSON is already parsed) in response. The "await" is key, because
      // it makes sure that the asynchronous function request() finishes before storing its response.
      var response = await request(requestOptions);

      officials = jsonparser.parse(response);

      this.toIntent("GetDesiredRepresentativeIntent");



    } catch (error) {
      // Only show the permission card if needed.
      if (error.code === 'NO_USER_PERMISSION') {
        this.toIntent('PermissionsErrorIntent');
      } else {
        // ????????????????????????????
        // This theoretically shouldn't happen
        console.log(error);
        this.tell("I don't know what happened, and I bet you don't either.");

      }
    }

    this.toIntent('GetDesiredRepresentativeIntent');
  },
});

module.exports.app = app;
