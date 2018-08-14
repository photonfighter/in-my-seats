# In My Seat (TITLE SUBJECT TO CHANGE)
An Alexa Skill that tells you which House and Senate members represent you + some information about them

# API Key
You'll get it if deemed necessary for development 🤷

### What to do with API Key
1. Create a file in the root repo folder called *config.js*
2. Structure *config.js* like shown below
```javascript
export var config = {
  API_KEY : [API KEY GOES HERE IN SINGLE QUOTES]
}
```
3. Add the following to *api.js*
```javascript
import config from './config.js';
let apikey = config.API_KEY;
```
4. Make sure you have the .gitignore
