'use strict';

// ------------------------------------------------------------------
// APP INITIALIZATION
// ------------------------------------------------------------------

const { App } = require('jovo-framework');
const { Alexa } = require('jovo-platform-alexa');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { JovoDebugger } = require('jovo-plugin-debugger');
const { FileDb } = require('jovo-db-filedb');

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
      this.$alexaSkill.showAskForCountryAndPostalCodeCard();
      return this.toIntent('GetCountryAndPostalCodeIntent');




      this.tell("Heck yeah mother hecker");
  

    },

    async GetCountryAndPostalCodeIntent() {
      await this.$alexaSkill.$user.getCountryAndPostalCode();
      try {
        const countryAndPostalCode = await this.$alexaSkill.$user.getCountryAndPostalCode();
        var pc = countryAndPostalCode.postalCode;
        this.tell(pc);
      } catch(error) {
        if (error.code === 'NO_USER_PERMISSION') {
          this.tell("You done goofed. Get permission");
        } else {
          this.tell("I don't know what happened, and I bet you don't either.");
        }
      }
    },


});

module.exports.app = app;
