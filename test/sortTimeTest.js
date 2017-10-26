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
    let instance = new ItemCounter();
    instance.processRide(sampleRide)
    assert.deepEqual(instance.histogram[sampleRide.startEnd[0]], {a: 1, b:2, c:3}) 
  })
})