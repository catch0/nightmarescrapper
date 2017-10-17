var jquery = require('jquery');
var Nightmare = require('nightmare');
      nightmare = Nightmare();



nightmare.goto('http://dallas.craigslist.org/search/bia?query=road&hasPic=1&postedToday=1')
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