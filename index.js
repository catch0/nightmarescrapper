var jquery = require('jquery');
var Nightmare = require('nightmare');
      nightmare = Nightmare();
      //bringing in twillio
var twilio = require('twilio');
var client = twilio(process.env.Twilio_Account_SID, process.env.TWILIO_AUTH_TOKEN)
//sending messages
client.sendMessage.create({
  to: '12142457207',

})


var city = process.argv[2]
nightmare.goto('http://' + city + '.craigslist.org/search/bia?query=road&hasPic=1&postedToday=1')
//visits the city specified
.wait(2000)
.evaluate(function(){
  var bikes = [];
  //create an array for bikes to be gathered
  $('.hdrlnk').each(function(){
    item = {}
    item["title"] = $(this).text()
    item["link"] = $(this).attr("href")
    bikes.push(item)
  })
  //create the bike object with title and link then push it on in
  return bikes
})
.end()
.then(function(result){
  for(bike in result){
    console.log(result[bike].title)
    console.log(result[bike].link)
    console.log("\n")
  }

})
