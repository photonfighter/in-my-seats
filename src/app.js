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

      return this.toIntent('GetCountryAndPostalCodeIntent');

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

        // Just an example of what can be done.
        // Eventually we'll just take the data we need and store it in our own representatives object.
        this.tell(response.offices[0].name);

      } catch(error) {
        // Only show the permission card if needed.
        if (error.code === 'NO_USER_PERMISSION') {
          await this.$alexaSkill.$user.showAskForCountryAndPostalCodeCard();
          this.tell("You done goofed. Get permission");
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
