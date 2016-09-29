describe('App', function() {
  var unformattedFollowerJson;
  var formattedFollowerJson;
  var unformattedChannelJson;
  var formattedChannelJson;
  var options;

  beforeEach(function() {
    unformattedChannelJson = {
      'followers': 30,
      'views': 100,
      'name': 'John',
      'avatar': 'http://www.twitch.tv/john29/avatar.jpg'
    };
    formattedChannelJson = {
      'followers': 30,
      'views': 100
    };
    unformattedFollowerArray =
    {
      'follows':
        [
          {
            'created_at': '2016-09-29T09:05:15Z',
            'user': {
              'display_name': 'John29',
              'views': 100,
              'name': 'John',
              'avatar': 'http://www.twitch.tv/john29/avatar.jpg'
            }
          },
          {
            'created_at': '2016-09-28T09:03:26Z',
            'user': {
              'display_name': 'Paul26',
              'views': 100,
              'name': 'Paul',
              'avatar': 'http://www.twitch.tv/paul26/avatar.jpg'
            }
          }
        ]
    };
    formattedFollowerArray = [
      {
        'username': 'Paul26',
        'follow_order': 0,
        'follow_date': '2016-09-28',
      },
      {
        'username': 'John29',
        'follow_order': 1,
        'follow_date': '2016-09-29',
      }
    ];
    options = {
      uri: 'http://www.google.com',
      headers: Object({ 'CLIENT-ID': 1234 }),
      json: true
    };
  });

  describe('buildChannelData()', function() {
    it('receives JSON and returns formatted JSON', function() {
      expect(buildChannelData(unformattedChannelJson)).
      toEqual(formattedChannelJson);
    });
  });

  describe('buildFollowerData()', function() {
    it('receives JSON and returns formatted JSON', function() {
      expect(buildFollowerData(unformattedFollowerArray)).
      toEqual(formattedFollowerArray);
    });
  });

  describe('returnOptions(url)', function() {
    it('receives url for request and returns the correct options', function() {
      expect(returnOptions('http://www.google.com', 1234)).toEqual(options);
    });
  });
});
