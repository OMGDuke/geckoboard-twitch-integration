require('dotenv').config();
var rp = require('request-promise');

var channelData = 'https://api.twitch.tv/kraken/channels/' +
  process.env.TWITCH_USERNAME;
var followerData = '/follows?limit=100';
var twitchClientId = process.env.TWITCH_CLIENT_ID;

var API_KEY = process.env.GECKO_API;

var gb = require('geckoboard')(API_KEY);

//Channel Data
gb.datasets.findOrCreate(
  {
    id: 'channel_data',
    fields: {
      followers: {
        type: 'number',
        name: 'Total number of followers'
      },
      views: {
        type: 'number',
        name: 'Total number of views'
      }
    }
  },

  function (err, dataset) {
    if (err) {
      console.error(err);
      return;
    }

    setInterval(function() {
      rp(returnOptions(channelData, twitchClientId))
      .then(function (parsedBody){
        parsedBody = buildChannelData(parsedBody);
        dataset.put(
          [parsedBody],
          function (err) {
            if (err) {
              console.error(err);
              return;
            }
            console.log('Total Followers and viewers updated');
          }
        );
      });
    }, 600000);
  }
);

//Latest Followers
gb.datasets.findOrCreate(
  {
    id: 'follower_data',
    fields: {
      username: {
        type: 'string',
        name: 'Follower Username'
      },
      follow_order: {
        type: 'number',
        name: 'Follow Order'
      },
      follow_date: {
        type: 'date',
        name: 'Follow Date'
      }
    }
  },

  function (err, dataset) {
    if (err) {
      console.error(err);
      return;
    }

    setInterval(function() {
      rp(returnOptions(channelData + followerData, twitchClientId))
      .then(function (parsedBody){
        parsedFollowerData = buildFollowerData(parsedBody);
        dataset.put(
          parsedFollowerData,
          function (err) {
            if (err) {
              console.error(err);
              return;
            }
            console.log('Recent Followers updated');
          }
        );
      });
    }, 600000);
  }
);

function buildChannelData(parsedBody) {
  return {'followers': parsedBody.followers, 'views': parsedBody.views};
}

function buildFollowerData(parsedBody) {
  return parsedBody.follows.reverse().map(function(obj, index) {
    date = obj.created_at.slice(0,10);
    return {'username': obj.user.display_name, 'follow_order': index,
    'follow_date': date};
  });
}

function returnOptions(url, clientId) {
  return {
    uri: url,
    headers: {'CLIENT-ID': clientId},
    json: true
  };
}
