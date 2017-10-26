class Ride {
  constructor(startEnd, items){
    this['Start/End times'] = startEnd; //tuple of Date Objects
    this.Items = items
  }
}


class ItemCounter {
  processRide(anyRideObj){
    console.log('processing', anyRideObj)
  }
}

//console.log(ride1);

let instance = new ItemCounter();
instance.processRide('sup')