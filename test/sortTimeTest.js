const assert = chai.assert;

describe('Times', () => {
  it('should dates into order', () => {
    let date4 = new Date(2017, 9, 26, 14, 70);
    let date1 = new Date(2017, 9, 26, 1, 05);
    let date2 = new Date(2017, 9, 26, 4, 05);
    let date3 = new Date(2017, 9, 26, 4, 15);
    let unorderedDates = [date3, date2, date4, date1]
    let result = unorderedDates.sort((a,b) => {return a - b})
    let expectedResult = [date1, date2, date3, date4]
    
    assert.deepEqual(result, expectedResult)
  } );
  it('should show correct added value', () => {
    let instance = new Counter;
    instance.add(1);
    instance.add(2);
    instance.add(1);
    assert.equal(instance.counter, 4);
  });

  it('should histogram obj when there is not existing items data', () => {
    let sampleRide = {
      startEnd: [new Date(2017, 9, 26, 1, 05), new Date(2017, 9, 26, 4, 05)],
      items: {a: 1, b: 2, c: 3}
     }
    let expectedObj = {};
    expectedObj[sampleRide.startEnd[0]] = {a: 1, b: 2, c: 3};
    expectedObj[sampleRide.startEnd[1]] = {a: -1, b: -2, c: -3}
    let instance = new ItemCounter();
    instance.processRide(sampleRide)
    assert.deepEqual(instance.differenceLog, expectedObj) 
  });

  it('should update histogram obj when timestamp already exists (add)', () => {
    let sampleRide = {
      startEnd: [new Date(2017, 9, 26, 1, 05), new Date(2017, 9, 26, 4, 05)],
      items: {a: 1, b: 2, c: 3}
     }
    let sampleRide2 = {
    startEnd: [new Date(2017, 9, 26, 1, 05), new Date(2017, 9, 26, 3, 05)],
    items: {a: 1, b: 2, c: 3}
    }
    let expectedObj = {};
    expectedObj[sampleRide.startEnd[0]] = {a: 2, b: 4, c: 6};
    expectedObj[sampleRide2.startEnd[1]] = {a: -1, b: -2, c: -3};
    expectedObj[sampleRide.startEnd[1]] = {a: -1, b: -2, c: -3}
    let instance = new ItemCounter();
    instance.processRide(sampleRide)
    instance.processRide(sampleRide2)
    assert.deepEqual(instance.differenceLog, expectedObj) 
  })

  it('should update histogram obj when timestamp already exists (subtract)', () => {
    let sampleRide = {
      startEnd: [new Date(2017, 9, 26, 1, 05), new Date(2017, 9, 26, 4, 05)],
      items: {a: 1, b: 2, c: 3}
     }
    let sampleRide2 = {
    startEnd: [new Date(2017, 9, 26, 2, 05), new Date(2017, 9, 26, 4, 05)],
    items: {a: 1, b: 2, c: 3}
    }
    let expectedObj = {};
    expectedObj[sampleRide.startEnd[0]] = {a: 1, b: 2, c: 3};
    expectedObj[sampleRide2.startEnd[0]] = {a: 1, b: 2, c: 3};
    expectedObj[sampleRide.startEnd[1]] = {a: -2, b: -4, c: -6}
    let instance = new ItemCounter();
    instance.processRide(sampleRide)
    instance.processRide(sampleRide2)
    assert.deepEqual(instance.differenceLog, expectedObj) 
  })

})