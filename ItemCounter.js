let sampleRide = {
 startEnd: [new Date(), new Date()],
 items: {a: 1, b: 2, c: 3}
}


module.exports.ride = class Ride {
  constructor(startEnd, items){
    this.startEnd = startEnd; //tuple of Date Objects
    this.items = items
  }
}

function checkForAdd(startTime){
  if (!this.histogram.hasOwnProperty(startTime)){
    this.histogram[startTime] = items //initialize positive difference
  } else {
    for (let item in items){
      if (!this.histogram[startTime].hasOwnProperty(item)){
        this.histogram[startTime][item] = item //initialize quantity
      } else {
        this.histogram[startTime][item] += item
      }
    }
  }
}

function checkForSubtract(endTime){
  if (!this.histogram.hasOwnProperty(startTime)){
    this.histogram[anyRideObj.startEnd[1]] = items; //initialize negative difference
  }
}

module.exports.ItemCounter = class ItemCounter {
  constructor(){
    this.histogram = {};
  }
  processRide(anyRideObj){


    // if (!histogram.hasOwnProperty(anyRideObj.startEnd[0])){ //check startTime to see if it should be created or added
    //   histogram[anyRideObj.startEnd[0]] = anyRideObj.items // add those items in at the startTime instant
    // } 
    // if (!histogram.hasOwnProperty(anyRideObj.startEnd[1])){ //check endTime
    //   histogram[anyRideObj.startEnd[1]] = anyRideObj.items // add those items in at the endTime instant
    // }
  }
}
let originalObj = {a: 1, b: 2, c:3}
let secondObj = {a: 1, b: 1, c:1}
let resultObj = Object.assign(originalObj, secondObj)

console.log(resultObj);