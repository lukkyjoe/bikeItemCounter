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
    // break anyRideObj into two times; start and end
    let ActionFromStartTime = this.binarySearch(anyRideObj.startEnd[0], this.differenceLog);
    // console.log('actionFromStartTime', ActionFromStartTime)
    if (ActionFromStartTime[1] === true){ //if should replace
      //do the replacing inside differenceLog
      let replacementIndex = ActionFromStartTime[0]
      for (let key in anyRideObj.items){
        if (this.differenceLog[replacementIndex].hasOwnProperty(key)){ 
          this.differenceLog[replacementIndex][key] += anyRideObj.items[key]
        } else {
          this.differenceLog[replacementIndex][key] = anyRideObj.items[key]
        }
      }
    } else {
      // ADD the diff into differenceLog
      let insertionIndex = ActionFromStartTime[0]; 
      let diffLogObj = {};
      diffLogObj[anyRideObj.startEnd[0]] = anyRideObj.items
      this.differenceLog.splice(insertionIndex, 0, diffLogObj)
    }
    let ActionFromEndTime = this.binarySearch(anyRideObj.startEnd[1], this.differenceLog)
    //REMEMBER THAT ALL END TIMES THINGS SHOULD BE NEGATIVE
    if (ActionFromEndTime[1] === true){ //if should replace
      //do the replacing
      let replacementIndex = ActionFromEndTime[0]
      for (let key in anyRideObj.items){
        if (this.differenceLog[replacementIndex].hasOwnProperty(key)){ 
          this.differenceLog[replacementIndex][key] -= anyRideObj.items[key]
        } else {
          this.differenceLog[replacementIndex][key] = - anyRideObj.items[key]
        }
      }
    } else {
      // ADD the diff in
      console.log('hello')
      let insertionIndex = ActionFromEndTime[0]
      let clone = Object.assign({}, anyRideObj.items)
      for (let key in clone){
        clone[key] = - clone[key]
      } // make clone negative
      let diffLogObj = {};
      diffLogObj[anyRideObj.startEnd[1]] = clone
      this.differenceLog.splice(insertionIndex, 0, diffLogObj)
    }
    console.log('diffLog', this.differenceLog);
  }
  
  binarySearch(target, fullArray){
    let insertionIndex = 0;
    let replace = false;
    if (!fullArray.length){
      return [0, replace]
    }
    function recurse(target, anyArray, offset = 0){
      let min = anyArray[0];
      let max = anyArray[anyArray.length - 1];
      let middleIndex = Math.floor(anyArray.length / 2); 
      if (target === Number(Object.keys(anyArray[middleIndex])[0])){
        insertionIndex = offset + middleIndex;
        replace = true;
        return;
      } else {
          if (anyArray.length === 1){
            if (target < Object.keys(anyArray[middleIndex])){
              insertionIndex += offset;
              return;
            } else {
              insertionIndex += offset + 1
              return;
            }
          } else {
              if (target < Object.keys(anyArray[middleIndex])){
                let shorterArray = anyArray.slice(0, middleIndex)
                recurse(target, shorterArray, offset);
                return;
              }
              if (target > Object.keys(anyArray[middleIndex])){
                offset += middleIndex;
                let shorterArray = anyArray.slice(middleIndex)
                recurse(target, shorterArray, offset)
                return;
              }
          }        
      }
  
    }
    recurse(target, fullArray);
    return [insertionIndex, replace];
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

// instance.printItemsPerInterval();