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
      this.ask("Which would you like me to look up for you?");
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
