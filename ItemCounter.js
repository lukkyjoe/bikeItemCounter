class Ride {
  constructor(startEnd, items){
    this.startEnd = startEnd; //tuple of Date Objects
    this.items = items
  }
}

class ItemCounter {
  constructor(){
    this.differenceLog = {};
    this.histogram = {}
  }
  processRide(anyRideObj){
    this.checkForAdd(anyRideObj.startEnd[0], anyRideObj);
    this.checkForSubtract(anyRideObj.startEnd[1], anyRideObj);
    // console.log(this.differenceLog)
  }
  
  checkForAdd(time, obj){
    if (!this.differenceLog.hasOwnProperty(time)){
      this.differenceLog[time] = Object.assign({}, obj.items) //initialize positive difference
    }  else {
      for (let item in obj.items){
        if (this.differenceLog[time].hasOwnProperty(item)){
          this.differenceLog[time][item] += obj.items[item];
        } else {
          this.differenceLog[time][item] = obj.items[item];
        }
      }
    }

  }

  checkForSubtract(time, obj){
    function reverse(anyObj){
      for (let key in anyObj){
        anyObj[key] = - anyObj[key]
      }
      return anyObj;
    }
    if (!this.differenceLog.hasOwnProperty(time)){
      this.differenceLog[time] = Object.assign({}, reverse(obj.items)) //initialize negative difference
    } else {
      for (let item in obj.items){
        if (this.differenceLog[time].hasOwnProperty(item)){
          this.differenceLog[time][item] -= obj.items[item];
        } else {
          this.differenceLog[time][item] = -obj.items[item];
        }
      }
    }
  }

  printItemsPerInterval(){
    // order differenceLog into array
      // sort array
    // let sortedArray => 
      // transform sorted array into histogram 
    // return histogram;
    let changeToArray = (anyObj) => {
      let arr = [];
      for (let key in anyObj){
        arr.push([key, anyObj[key]])
      }
      return arr;
    }
    let arr = changeToArray(this.differenceLog); 
    console.log(arr)
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

let sampleRide = {
  startEnd: [new Date(2017, 9, 26, 1, 05), new Date(2017, 9, 26, 4, 05)],
  items: {a: 1, b: 2, c: 3}
 }
let sampleRide2 = {
startEnd: [new Date(2017, 9, 26, 2, 05), new Date(2017, 9, 26, 4, 05)],
items: {a: 1, b: 2, c: 3}
}
let instance = new ItemCounter();
instance.processRide(sampleRide)
instance.processRide(sampleRide2)

instance.printItemsPerInterval();