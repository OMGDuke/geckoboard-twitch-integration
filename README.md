# Geckoboard Twitch Integration
A Geckoboard integration to display your Twitch stats.

### Description
This integration uses the Twitch.tv API to display your follower and view data.

It was created in Javascript and tested in Jasmine.

I also used the following Node packages:
- dotenv: To store API and client keys
- geckoboard: to connect and send data to Geckoboard
- request-promise: to handle http requests

A request is made to the Twitch API. The received data is then processed to
only include values that match the data schema. Finally the dataset is pushed
to Geckoboard. This process is set to repeat every 10 minutes to update the
data.

If I were to extend this integration in future:
- I would implement twitch.tv OAuth in order to access more data on the API
such as subscriber numbers.
- I would look into retrieving more followers. Currently the Twitch API only
allows 100 followers to be requested at a time. (Some Twitch users have over 1 million followers.)
- I would look further into custom widgets such as text to display the users
recent posts.

[Dashboard link](https://omgduke.geckoboard.com/dashboards/9B9286D56F84E202)

### Install
- Clone this repo
- Run `npm install`
- Create the file `.env` in the root directory.
- Add the following lines with your Geckoboard API key, Twitch client ID and
Twitch Username.
```
GECKO_API='yourApiKeyHere'
TWITCH_CLIENT_ID='yourTwitchClientIdHere'
TWITCH_USER_NAME='twitchUsernameHere'
```
- Run `node app.js`
- Go to your dashboard and set up some widgets with your datasets


### Running Tests
- Open `./SpecRunner.html`
