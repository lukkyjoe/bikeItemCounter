function binarySearch(target, fullArray){
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

console.log(binarySearch(5, [{1: 'a'}, {2: 'b'}, {7: 'a'}, {8: 'a'}, {10: 'a'}, {11: 'a'}, {12: 'a'}, {12.5: 'a'}])) 
console.log(binarySearch(50, [{1: 'a'}, {2: 'b'}, {7: 'a'}, {8: 'a'}, {10: 'a'}, {11: 'a'}, {12: 'a'}, {12.5: 'a'}]))
console.log(binarySearch(7, [{1: 'a'}, {2: 'b'}, {7: 'a'}, {8: 'a'}, {10: 'a'}, {11: 'a'}, {12: 'a'}, {12.5: 'a'}]))
console.log(binarySearch(0.5, [{1: 'a'}, {2: 'b'}, {7: 'a'}, {8: 'a'}, {10: 'a'}, {11: 'a'}, {12: 'a'}, {12.5: 'a'}]))
console.log(binarySearch(2, []));
//ZERO QTY ITEMS SHOULD NOT BE COUNTED


