class Ride {
  constructor(startEnd, items){
    this.startEnd = startEnd; //tuple of Date Objects
    this.items = items
  }
}

class Diff { // for the diff log
  constructor(timeStamp, itemsDiff){
    this.timeStamp = timeStamp;
    this.itemsDiff = itemsDiff;
  }
}

class ItemCounter {
  constructor(){
    this.differenceLog = [];
    this.histogram = {}
  }
  processRide(anyRideObj){

  }
  
  binarySearch(target, anyArray, offset = 0){
    //binary search through the existing diff log to find where the target belongs
    let min = anyArray[0];
    let max = anyArray[length - 1];
    let middleIndex = Math.floor(anyArray.length / 2); 
    if (anyArray.length === 1){
      if (target < Object.keys(anyArray[0])){
        return offset;
      } else if (target > Object.keys(anyArray[0])) {
        return offset + 1;
      }
    }
    if (target === Object.keys(anyArray[middleIndex])){ //the target already exists and you found it!
      //do the thing
      return offset + middleIndex;
    } else {
      if (target < Object.keys(anyArray[middleIndex])){
        let shorterArray = anyArray.slice(0, middleIndex)
        binarySearch(target, shorterArray, offset)
      } else {
        offset += middleIndex;
        let shorterArray = anyArray.slice(middleIndex)
        binarySearch(target, shorterArray, offset)
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