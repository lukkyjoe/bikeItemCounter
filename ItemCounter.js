class Ride {
  constructor(startEnd, items){
    this.startEnd = startEnd; //tuple of Date Objects
    this.items = items
  }
}

function checkForAdd(startTime, obj){
  if (!this.histogram.hasOwnProperty(startTime)){
    this.histogram[startTime] = obj.items //initialize positive difference
  } else {
    for (let item in obj.items){
      if (!this.histogram[startTime].hasOwnProperty(item)){
        this.histogram[startTime][item] = item //initialize quantity
      } else {
        this.histogram[startTime][item] += item //add to basket item inside histogram
      }
    }
  }
}

function checkForSubtract(endTime, obj){
  if (!this.histogram.hasOwnProperty(endTime)){
    this.histogram[endTime] = obj.items //initialize positive difference
  } else {
    for (let item in obj.items){
      if (!this.histogram[endTime].hasOwnProperty(item)){
        this.histogram[endTime][item] = item //initialize quantity
      } else {
        this.histogram[endTime][item] -= item //add to basket item inside histogram
      }
    }
  }
}

class ItemCounter {
  constructor(){
    this.histogram = {};
  }
  processRide(anyRideObj){
    checkForAdd(anyRideObj.startEnd[0]);
    checkForSubtract(anyRideObj.startEnd[1]);
  }
  
  // checkForAdd(startTime){
  //   if (!this.histogram.hasOwnProperty(startTime)){
  //     this.histogram[startTime] = anyRideObj.items //initialize positive difference
  //   } else {
  //     for (let item in anyRideObj.items){
  //       if (!this.histogram[startTime].hasOwnProperty(item)){
  //         this.histogram[startTime][item] = item //initialize quantity
  //       } else {
  //         this.histogram[startTime][item] += item //add to basket item inside histogram
  //       }
  //     }
  //   }
  // }
  
  // checkForSubtract(endTime){
  //   if (!this.histogram.hasOwnProperty(endTime)){
  //     this.histogram[endTime] = anyRideObj.items //initialize positive difference
  //   } else {
  //     for (let item in anyRideObj.items){
  //       if (!this.histogram[endTime].hasOwnProperty(item)){
  //         this.histogram[endTime][item] = item //initialize quantity
  //       } else {
  //         this.histogram[endTime][item] -= item //add to basket item inside histogram
  //       }
  //     }
  //   }
  // }

}

class Counter {
  constructor(){
    this.counter = 0;
  }
  add(num){
    this.counter += num;
  }
}