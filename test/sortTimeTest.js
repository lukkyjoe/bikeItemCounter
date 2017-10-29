const assert = chai.assert;

describe('Diff log', () => {
  it('Should be empty to begin with', () => {
    let expectedObject = [];
    let counter = new ItemCounter();
    assert.deepEqual(counter.differenceLog, expectedObject);
  });

  it('Should process into correct number of timeblocks', () => {
    let expected = 2
    let counter = new ItemCounter();
    let sampleRide = {
      startEnd: [new Date(2017, 9, 26, 1, 05), new Date(2017, 9, 26, 4, 05)],
      items: {apple: 1, banana: 2, carrot: 3}
     }
    counter.processRide(sampleRide);
    assert.deepEqual(counter.differenceLog.length, expected);
  });

  it('Should handle identical start time overlaps correctly', () => {
    let expected = 3
    let counter = new ItemCounter();
    let sampleRide = {
      startEnd: [new Date(2017, 9, 26, 1, 05), new Date(2017, 9, 26, 4, 05)],
      items: {apple: 1, banana: 2, carrot: 3}
     }
    let sampleRide2 = {
      startEnd: [new Date(2017, 9, 26, 1, 05), new Date(2017, 9, 26, 5, 05)],
      items: {apple: 1, banana: 1, carrot: 1}
    }
    counter.processRide(sampleRide);
    counter.processRide(sampleRide2);
    assert.deepEqual(counter.differenceLog.length, expected);
  });

  it('Should handle identical end time overlaps correctly', () => {
    let expected = 3
    let counter = new ItemCounter();
    let sampleRide = {
      startEnd: [new Date(2017, 9, 26, 1, 05), new Date(2017, 9, 26, 4, 05)],
      items: {apple: 1, banana: 2, carrot: 3}
     }
    let sampleRide2 = {
      startEnd: [new Date(2017, 9, 26, 2, 05), new Date(2017, 9, 26, 4, 05)],
      items: {apple: 1, banana: 1, carrot: 1}
    }
    counter.processRide(sampleRide);
    counter.processRide(sampleRide2);
    assert.deepEqual(counter.differenceLog.length, expected);
  });

  it('Should handle start and end time overlaps correctly', () => {
    let expected = 2
    let counter = new ItemCounter();
    let sampleRide = {
      startEnd: [new Date(2017, 9, 26, 1, 05), new Date(2017, 9, 26, 4, 05)],
      items: {apple: 1, banana: 2, carrot: 3}
     }
    let sampleRide2 = {
      startEnd: [new Date(2017, 9, 26, 1, 05), new Date(2017, 9, 26, 4, 05)],
      items: {apple: 1, banana: 1, carrot: 1}
    }
    counter.processRide(sampleRide);
    counter.processRide(sampleRide2);
    assert.deepEqual(counter.differenceLog.length, expected);
  });

  it('Should update diff log correctly', () => {
    let expected = {apple: 2, banana: 3, carrot: 4}
    let counter = new ItemCounter();
    let sampleRide = {
      startEnd: [new Date(2017, 9, 26, 1, 05), new Date(2017, 9, 26, 4, 05)],
      items: {apple: 1, banana: 2, carrot: 3}
     }
    let sampleRide2 = {
      startEnd: [new Date(2017, 9, 26, 1, 05), new Date(2017, 9, 26, 4, 05)],
      items: {apple: 1, banana: 1, carrot: 1}
    }
    counter.processRide(sampleRide);
    counter.processRide(sampleRide2);
    assert.deepEqual(counter.differenceLog[0][1], expected);
  });
})

class Ride {
  constructor(startEnd, items){
    this.startEnd = startEnd; //tuple of Date Objects
    this.items = items
  }
}

