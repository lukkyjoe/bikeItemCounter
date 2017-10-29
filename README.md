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

#TODO:
Check that zero qty items are not counted