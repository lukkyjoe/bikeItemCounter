class Ride {
  constructor(startEnd, items){
    this.startEnd = startEnd; //tuple of Date Objects
    this.items = items
  }
}

class ItemCounter {
  constructor(){
    this.histogram = {};
  }
  processRide(anyRideObj){
    this.checkForAdd(anyRideObj.startEnd[0], anyRideObj);
    this.checkForSubtract(anyRideObj.startEnd[1], anyRideObj);
  }
  
  checkForAdd(time, obj){
    if (!this.histogram.hasOwnProperty(time)){
      this.histogram[time] = Object.assign({}, obj.items) //initialize positive difference
    } 
    // else {
    //   for (let item in anyRideObj.items){
    //     if (!this.histogram[startTime].hasOwnProperty(item)){
    //       this.histogram[startTime][item] = item //initialize quantity
    //     } else {
    //       this.histogram[startTime][item] += item //add to basket item inside histogram
    //     }
    //   }
    // }
  }
  checkForSubtract(time, obj){
    function reverse(anyObj){
      for (let key in anyObj){
        anyObj[key] = - anyObj[key]
      }
      return anyObj;
    }
    if (!this.histogram.hasOwnProperty(time)){
      this.histogram[time] = Object.assign({}, reverse(obj.items)) //initialize positive difference
      console.log(this.histogram)
    } 
  }
  

}

class Counter {
  constructor(){
    this.counter = 0;
  }
  add(num){
    this.counter += num;
  }
}