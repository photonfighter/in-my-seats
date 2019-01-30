'use strict';

// ------------------------------------------------------------------
// APP INITIALIZATION
// ------------------------------------------------------------------

const { App } = require('jovo-framework');
const { Alexa } = require('jovo-platform-alexa');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { JovoDebugger } = require('jovo-plugin-debugger');
const { FileDb } = require('jovo-db-filedb');

const apiConfig = require('./apiconfig.js');
const request = require('request-promise-native');
const jsonparser = require('./json-parser.js');


const app = new App();

app.use(
    new Alexa(),
    new GoogleAssistant(),
    new JovoDebugger(),
    new FileDb()
);




// ------------------------------------------------------------------
// APP LOGIC
// ------------------------------------------------------------------

app.setHandler({
     LAUNCH() {

       this.tell("Hello! I am here to help you get to know your representatives. You can choose between president, senators, house representative, or governor.");

      return this.toIntent('GetCountryAndPostalCodeIntent');

    },

    GetDesiredRepresentativeIntent() {
      this.followUpState('RepOption').ask("Which would you like me to look up for you?", "Which representative would you like to know more about?");
    },

    RepOption: {
      // give info on President
      PresidentIntent() {
        let name = jsonparser.officials.president.name;
        let address = jsonparser.officials.president.address;
        let phone = jsonparser.officials.president.phone;
        let party = jsonparser.officials.president.party;
        this.tell('The president is ' + name + ". They are a member of the " + party + ". Their address is " + address + ". Their phone number is " + phone);
      },
      // give info on Senators
      SenatorsIntent() {
        let name = jsonparser.officials.senatorOne.name;
        let name2 = jsonparser.officials.senatorTwo.name;
        this.followUpState('SenatorOption').ask('Your senators are ' + name + ' and ' + name2 + '. To hear the info for ' + name + ', say senator one. To hear the info for ' + name2 + ', say senator two.');
      },
      // give info on House Rep
      HouseIntent() {
        let name = jsonparser.officials.houseRep.name;
        let address = jsonparser.officials.houseRep.address;
        let phone = jsonparser.officials.houseRep.phone;
        let party = jsonparser.officials.houseRep.party;
        this.tell('The House Representative is ' + name + ". They are a member of the " + party + ". Their address is " + address + ". Their phone number is " + phone);
      }
    },

    SenatorOption: {
      // give info for the first listed Senator
      S1Intent() {
        let name = jsonparser.officials.senatorOne.name;
        let address = jsonparser.officials.senatorOne.address;
        let phone = jsonparser.officials.senatorOne.phone;
        let party = jsonparser.officials.senatorOne.party;
        this.tell(name + " is a member of the " + party + ". Their address is " + address + ". Their phone number is " + phone);
      },
      // give info for the second listed Senator
      S2Intent() {
        let name = jsonparser.officials.senatorTwo.name;
        let address = jsonparser.officials.senatorTwo.address;
        let phone = jsonparser.officials.senatorTwo.phone;
        let party = jsonparser.officials.senatorTwo.party;
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

        var officials = jsonparser.parse(response);


      } catch(error) {
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
    },
});

module.exports.app = app;
