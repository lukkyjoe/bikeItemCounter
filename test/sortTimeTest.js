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
  } )
})