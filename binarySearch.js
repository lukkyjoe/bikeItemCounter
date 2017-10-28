  function binarySearch(target, anyArray, offset = 0){
    //binary search through the existing diff log to find where the target belongs
    console.log(offset);
    let min = anyArray[0];
    let max = anyArray[anyArray.length - 1];
    let middleIndex = Math.floor(anyArray.length / 2); 
    if (anyArray.length === 1){
      if (target < Object.keys(anyArray[0])){
        console.log('done')
        return offset;
      } else if (target > Object.keys(anyArray[0])) {
        console.log('done')
        offset += 1;
        console.log(offset);
        return offset;
      }
    }
    if (target === Object.keys(anyArray[middleIndex])){ //the target already exists and you found it!
      //do the thing
      console.log('done');
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
console.log('hey');
console.log(binarySearch(5, [{1: 'a'}, {2: 'b'}, {7: 'a'}, {8: 'a'}, {10: 'a'}, {11: 'a'}, {12: 'a'}, {12.5: 'a'}], 0));