var request = require('request')
var cheerio = require('cheerio');

request('https://wikimania2017.wikimedia.org/wiki/Programme/Friday', function(err, response, body){
  if(!err && response.statusCode == 200){
    var $ = cheerio.load(body);
    $("br").remove()
    $("b").remove()
    var tableData = $('.wikitable.schedule.schedule-main.schedule-11').children().children()
    // Getting list of rooms
    var venueRoomsHTML = tableData.first().children().toArray()
    venueRoomsHTML = venueRoomsHTML.slice(1, venueRoomsHTML.length-1)
    var venueRoomsArray = []
    for(var x in venueRoomsHTML){
      for(var y in venueRoomsHTML[x].children){
        if(y == 0){
          venueRoomsArray.push(venueRoomsHTML[x].children[0].data)
        }
        if(venueRoomsHTML[x].children[y].name == 'small'){
          venueRoomsArray[x] += ' ' + venueRoomsHTML[x].children[y].children[0].data;
        }
      }
    }
    // Getting list of times
    var timeDataHTML = $('.wikitable.schedule.schedule-main.schedule-11 tbody tr th').toArray()
    timeDataHTML = timeDataHTML.slice(1, timeDataHTML.length-1)
    var timeDataArray = []
    for(var x in timeDataHTML){
      timeDataArray.push(timeDataHTML[x].children[0].data)
    }
    console.log(timeDataArray)
  }
})
