var request = require('request')
var cheerio = require('cheerio');

request('https://wikimania2017.wikimedia.org/wiki/Programme/Friday', function(err, response, body){
  if(!err && response.statusCode == 200){
    var $ = cheerio.load(body);
    $("br").remove()
    $('b').each(function() {
      $(this).replaceWith($(this).text());
    });
    $('small').each(function() {
      $(this).replaceWith($(this).text());
    });
    $('p').each(function() {
      $(this).replaceWith($(this).text());
    });
    $('a').each(function() {
      $(this).replaceWith($(this).text());
    });
    var tableData = $('.wikitable.schedule.schedule-main.schedule-11').children().children()
    // Getting list of rooms
    var venueRoomsHTML = tableData.first().children().toArray()
    venueRoomsHTML = venueRoomsHTML.slice(1, venueRoomsHTML.length-1)
    var venueRoomsArray = new Array(venueRoomsHTML.length)
    venueRoomsArray.fill("")
    for(var x in venueRoomsHTML){
      for(var y in venueRoomsHTML[x].children){
        if(venueRoomsHTML[x].children[y].data && venueRoomsHTML[x].children[y].data != '\n'){
          venueRoomsArray[x] += venueRoomsHTML[x].children[y].data.trim()
        }
      }
    }

    //Removing list of rooms data from HTML
    $('.wikitable.schedule.schedule-main.schedule-11').children().children().first().remove()

    // Getting list of times
    var timeDataHTML = $('.wikitable.schedule.schedule-main.schedule-11 tbody tr th:not(.time,.room)').toArray()
    timeDataHTML = timeDataHTML.slice(1, timeDataHTML.length-1)
    var timeDataArray = []
    for(var x in timeDataHTML){
      timeDataArray.push(timeDataHTML[x].children[0].data.trim())
    }
    // Sketchy way of dealing with duplicated
    timeDataArray = timeDataArray.filter(function(item, index, self){
      return self.indexOf(item) == index;
    })

    // Getting list of events and their timings
    var eventDataHTML = $('.wikitable.schedule.schedule-main.schedule-11 tbody tr td')
    var eventDataArray = []
    eventDataHTML.each(function(i, elem){
      for(var x in elem.children){
        var eventData = elem.children[x].data
        if(eventData && eventData != '' && eventData != '\n'){
          eventData = eventData.trim()
          if(x == 0){
            eventDataArray.push(eventData)
          }else{
            eventDataArray[eventDataArray.length - 1] += ' ' + (elem.children[x].data.trim())
          }
        }
      }
    })
    console.log(eventDataArray)
    var events = []
  }
})
