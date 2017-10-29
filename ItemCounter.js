class ItemCounter {
  constructor(){
    this.differenceLog = [];
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
      if (target === anyArray[middleIndex][0]){
        insertionIndex = offset + middleIndex;
        replace = true;
        return;
      } else {
          if (anyArray.length === 1){
            if (target < anyArray[middleIndex][0]){
              insertionIndex += offset;
              return;
            } else {
              insertionIndex += offset + 1
              return;
            }
          } else {
              if (target < anyArray[middleIndex][0]){
                let shorterArray = anyArray.slice(0, middleIndex)
                recurse(target, shorterArray, offset);
                return;
              }
              if (target > anyArray[middleIndex][0]){
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

  processRide(anyRideObj){
    // break anyRideObj into two times; start and end
    let startInSeconds = anyRideObj.startEnd[0].getTime();
    let endInSeconds = anyRideObj.startEnd[1].getTime();
    let ActionFromStartTime = this.binarySearch(startInSeconds, this.differenceLog);
    if (ActionFromStartTime[1] === true){ //if should replace
      //do the replacing inside differenceLog
      let replacementIndex = ActionFromStartTime[0]
      for (let key in anyRideObj.items){
        if (this.differenceLog[replacementIndex][1].hasOwnProperty(key)){ 
          this.differenceLog[replacementIndex][1][key] += anyRideObj.items[key]
        } else {
          this.differenceLog[replacementIndex][1][key] = anyRideObj.items[key]
        }
      }
    } else {
      // ADD the diff into differenceLog
      let insertionIndex = ActionFromStartTime[0]; 
      let diffLogObj = [];
      diffLogObj.push(anyRideObj.startEnd[0].getTime())
      diffLogObj.push(Object.assign({}, anyRideObj.items))
      this.differenceLog.splice(insertionIndex, 0, diffLogObj)
    }
    let ActionFromEndTime = this.binarySearch(endInSeconds, this.differenceLog)
    if (ActionFromEndTime[1] === true){ //if should replace
      //do the replacing
      let replacementIndex = ActionFromEndTime[0]
      for (let key in anyRideObj.items){
        if (this.differenceLog[replacementIndex][1].hasOwnProperty(key)){ 
          this.differenceLog[replacementIndex][1][key] -= anyRideObj.items[key]
        } else {
          this.differenceLog[replacementIndex][1][key] = - anyRideObj.items[key]
        }
      }
    } else {
      // add diff in
      let insertionIndex = ActionFromEndTime[0]
      let clone = Object.assign({}, anyRideObj.items)
      for (let key in clone){
        clone[key] = - clone[key]
      } 
      let diffLogObj = [];
      diffLogObj.push(anyRideObj.startEnd[1].getTime())
      diffLogObj.push(clone)
      this.differenceLog.splice(insertionIndex, 0, diffLogObj)
    }
  }
  
  printItemsPerInterval(){
    let histogram = []
    let netItems = {}
    let mapOfDiffs = this.differenceLog.map((item) => item[1])
    let holder = []
    mapOfDiffs.reduce((sum, value) => {
      for (let key in value){
        if (sum.hasOwnProperty(key)){
          sum[key] += value[key]
          if (sum[key] === 0){
            delete sum[key]
          }
        } else {
          sum[key] = value[key]
          if (sum[key] === 0){
            delete sum[key]
          }
        }
      }
      let netItems = Object.assign({}, sum);
      let verbalizeNetItems = (someObj) => { //to pluralize item words if necessary
        let list = []
        for (let key in someObj){
          if (someObj[key] > 1){
            list.push(`${someObj[key]} ${key}s`)
          } else {
            list.push(`${someObj[key]} ${key}`)           
          }
        }
        return list
      }
      let sentence = verbalizeNetItems(netItems);
      let joinedSentence = sentence.join(', ');
      holder.push(joinedSentence);
      return sum;
    }, {})
    holder.pop();
    for (let i = 0; i < this.differenceLog.length - 1; i++){
      let start = new Date(this.differenceLog[i][0])
      let end = new Date(this.differenceLog[i + 1][0]);
      let itemsInTimeBlock = {};
      itemsInTimeBlock.timeBlock = `${start} - ${end}`;
      itemsInTimeBlock.items = holder[i]
      histogram.push(itemsInTimeBlock);
    }
    let nonEmptyHistogram = histogram.filter((obj) => {
      if (obj.items.length){
        return obj
      }
    })
    nonEmptyHistogram.map((obj) => {
      console.log(`${obj.timeBlock} -> ${obj.items}`)
    })
  }
}

/* TEST CASES
let counter = new ItemCounter();
let sampleRide = {
  startEnd: [new Date(2017, 10, 26, 1, 05), new Date(2017, 10, 26, 4, 05)],
  items: {apple: 1, banana: 2, carrot: 3}
 }
let sampleRide2 = {
  startEnd: [new Date(2017, 9, 26, 1, 05), new Date(2017, 9, 26, 4, 05)],
  items: {apple: 1, banana: 1, carrot: 1}
}
let sampleRide3 = {
  startEnd: [new Date(2017, 8, 26, 1, 05), new Date(2017, 11, 26, 4, 05)],
  items: {apple: 1, banana: 1, carrot: 1}
}
counter.processRide(sampleRide);
counter.processRide(sampleRide2);
counter.processRide(sampleRide3);
counter.printItemsPerInterval();
*/

/*
#Data format assumptions
Start / End Times: I assumed I can use javascript Date objects to represent the start and end times respectively. 
For simplicity, my sample values will only take in times down to the minute. 
The full value for the combined 'start/end times' key will be a tuple, with the first Date object representing start, and the last Date object representing end. 

Items: I assumed I can pass in an object with the name (String) of an item representing a key and the quantity (Number) of the item representing the value. 
E.g. {'Apple': 1, 'Banana', 3}
I will assume I don't have to deal with pluralization spelling logic when I receive the data, and will implement that only for the desired print function. 

#Data fetching order assumptions
I assumed that I can receive ride objects that represent start/end times out of order. 
E.g. I might receive a Ride object with start/end time of 8pm / 9pm. 
THEN I might receive a Ride object with start/end time of 6pm / 7pm. 

#Data integrity assumptions
I assumed that all ride objects are processed by my function, and that therefore, I can maintain a sorted array as data gets passed in. 
*/

