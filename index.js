var jquery = require('jquery');
var Nightmare = require('nightmare');
      nightmare = Nightmare();
      //bringing in twillio
var accountSid = 'AC92bc1a2280f373b36fe52a516fe47845';
var authToken = 'b409ac38d2cd9f72d3d74a0fb2226b68';
var twilio = require('twilio')
var client = new twilio(accountSid,authToken);
// sending messages
client.messages.create({
  from: '+4698888235',
  to: '+12142457207',
  body: 'twilio works'
}).then((message)=>console.log(message.sid));


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
