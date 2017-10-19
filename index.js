var fs = require('fs');
var path = require('path');
var config = JSON.parse(fs.readFileSync("package.json"));

//what we need for scraping
var jquery = require('jquery');
var Nightmare = require('nightmare');
      nightmare = Nightmare();

require('dotenv').load();
//what we need for nodemailer
var nodemailer = require('nodemailer');
var xoath2 = require('xoauth2');
//setting environmental variables
var account = process.env.ACCOUNT ;
var password = process.env.PASS ;
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth:{
    user: account,
    pass: password
  }
});
const mailOptions = {
  from:'lumanwalters@gmail.com',
  to: 'spencerpeacock@gmail.com',
  subject: "bikes",
  html: '',
}


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
    console.log([bike].title)
    console.log([bike].link)
  }
})

transporter.sendMail(mailOptions, function (err, info) {
   if(err)
     console.log(err)
   else
     console.log(info);
});
