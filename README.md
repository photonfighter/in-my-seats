# In My Seats (Jovo Edition)
An Alexa Skill made with Jovo that tells you which House and Senate members represent you + some information about them

# API Key
You'll need to get an API key for Google's Civic Info API.

### What to do with API Key
1. Create a file in /src called *apiconfig.js*
2. Structure *apiconfig.js* like shown below
```javascript
module.exports = {
  "CivicInfoAPIKey" : "Your API key here",
}
```
3. Make sure to include *apiconfig.js* in your .gitignore!!!
