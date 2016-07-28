_ = lodash;

/*
Calculates the drivers needed to power all the fixtures described in the
rowArray by spliting the lengths to manufacturing standards and calculating
their power consumption depending on the selected strip.
*/
let calculateDrivers = ( options ) => {
  var drivers = options.drivers,
      rowArray = options.rowArray,
      pn = options.pn,
      groups = [];

  //loop through array of rows
  for( let j=0;j<rowArray.length;j++ ) {
    //create the powerArray to use in calculating the drivers for the current row
    var lenWattArray = _createPowerArray( rowArray[j].len, rowArray[j].qty, rowArray[j].dimmable, pn );

    //if this is the individual group we calculate the drivers immediatly.
    if ( rowArray[j].group === "ind" ){
      //update the drivers array with the required drivers
      drivers = _updateDriversArray( lenWattArray, drivers );
    }
    //else we store the group until we've sorted all the groups out
    else {
      groups.push( {group: rowArray[j].group, lenWattArray: lenWattArray} );
    }
  }

  //if there were any groups, else we skip this
  if( groups.length != 0 ){
    //grab the value to be checked by mapping them into an array
    //this value is the group selected by the user
    var check = groups.map(e => {return e.group}),
        result = [];
    //loop over all the groups
    groups.forEach(function(e) {
      //Check if an array for this group was created already
      if( !this[e.group] ) {
        //if it wasn't, create it now
        this[e.group] = [];
        //put it in the results
        result.push(this[e.group]);
     }
     //put the object in the grouping array
     this[e.group].push(e);
    }, {});

    //results contains the arrays of objects with matching groups.
    //for example 3 lines with groups a, a and b would form an array of 2 arrays
    //such as [[{group:"a", lenWattArray},{group:"a", lenWattArray}],[{group:"b", lenWattArray}]]
    for(let i=0;i<result.length;i++){
      //this is the group fetched in the results
      var groupArray = result[i];
      //loop over each group updating needed drivers for each row
      for(let j=0;j<groupArray.length;j++){
        //update the drivers array with the required drivers
        drivers = _updateDriversArray( groupArray[j].lenWattArray, drivers );
      }
    }
  }

  //return complete updated driver list
  return drivers;
};

/*
creates the power consumption array to fetch the right drivers
for the qty and size in the input.
*/
let _createPowerArray = ( len, qty, dimmable, pn ) => {
  //array for lenght and watt value for IND group
  var lenWattArray = [],
      //get the watt per meter from the database removing excess text
      wattMeter = Number(Products.findOne({pn:pn}).attributes[2].replace(/\D+$/g, ""));

  //split the lengths into max and/or possible cuts
  lenWattArray = _splitLengths( len, qty, dimmable, wattMeter, lenWattArray );

  //return the powerArray for all values for driver selection
  return lenWattArray;
};

/*
Splits the lengths of the fixtures to manufacturing standards of 10' max
and calculates the powerConsumption of each split length for use in finding the
right driver.
*/
let _splitLengths = ( len, qty, dimmable, wattMeter, lenWattArray ) => {
  //while the len is greater than 20 feet (240in)
  while( len >= 240 ){
    //insert a new object with len of 10 feet (120in) and the watt per meter value for that lenght
    //3.71 = 120/12/3.37/0.8 (120in/12 -> feet /3.37 -> meters /0.8 -> 80% factor for drivers consumption)
    lenWattArray.push({qty:qty, len:120, watt:3.71*wattMeter, dimmable: dimmable});
    //reduce the len by 10 feet
    len -= 120;
  }
  if( len < 240 && len > 120 ){
    let half = len/2,
        //div by 12(feet)/3.37(to meters)/0.8(80% power consumption)
        powerConsumption = half/12/3.37*wattMeter/0.8;
    //push both halves into array
    lenWattArray.push({qty:qty, len:half, watt:powerConsumption, dimmable: dimmable});
    lenWattArray.push({qty:qty, len:half, watt:powerConsumption, dimmable: dimmable});
  }
  else {
    //when the len falls under 10 feet, push it directly
    //div by 12(feet)/3.37(to meters)/0.8(80% power consumption)
    let powerConsumption = len/12/3.37*wattMeter/0.8;
    lenWattArray.push({qty:qty, len:len, watt:powerConsumption, dimmable: dimmable});
  }
  //return array for this lenght
  return lenWattArray;
};

/*
takes the array of power consumption and calculates the drivers needed.
This is done by going no more than 200W or 20' long. In the case of individual
this will mean that unless the fixture is more than 20 feet long, most likely
there will only be 1 driver for the fixture. (multiply by qty for total).
In the case of groups, we try and have the most contiguous fixtures powered
by the same driver. (to max of 200W and 20')
*/
let _updateDriversArray = ( lenWattArray, drivers ) => {
  var totalConsumption = 0,
      totalLenght = 0;

  //loop through array of powerConsumption
  for( let j=0;j<lenWattArray.length;j++ ) {
    //check if we'd be over 200W (max for drivers) or that the length i greater that 20 feet (max before power loss)
    if( totalConsumption + lenWattArray[j].watt > 200 || totalLenght + lenWattArray[j].len > 240 ){
      //select the right driver for the current totalConsumption
      let driver = _selectDriver(totalConsumption, lenWattArray[j].dimmable);
      //add to that driver's qty of value in array.
      _.find(drivers, ['driver',driver]).qty += lenWattArray[j].qty;
      //reset totalConsumption and add current powerConsumption j
      totalConsumption = lenWattArray[j].watt;
      //reset totalLenght and add current length
      totalLenght = lenWattArray[j].len;
    }
    else {
      //increase total consumption
      totalConsumption += lenWattArray[j].watt;
      //increase total length
      totalLenght += lenWattArray[j].len;
    }
  }
  //When we exit loop, we calculate driver for the remaining totalConsumption
  let driver = _selectDriver(totalConsumption, lenWattArray[lenWattArray.length-1].dimmable);
  //add that driver to the drivers list.
  _.find(drivers, ['driver',driver]).qty += lenWattArray[lenWattArray.length-1].qty;

  return drivers;
}

/*
Select the right driver based on the watt consumption provided
and the dimmable boolean.
Drivers are 30 60 100 200 watts non-dimmable
and 30 45 60 80 100 200 watts dimmable
*/
let _selectDriver = ( powerConsumption, dimmable ) => {
  //driver lists
  var dimDrivers = [200, 100, 80, 60, 45, 30],
      nonDimDrivers = [200, 100, 60, 30];

  if( dimmable ) {
    //no point in starting at 200w because we'll never reach it
    for( let k=1;k<dimDrivers.length;k++ ){
      //if the power is greater than the current driver in the list
      if( powerConsumption > dimDrivers[k] ){
        //return the greater driver before
        return dimDrivers[k-1]+"W dim";
      }
    }
    //Last possible case.
    return dimDrivers[dimDrivers.length-1]+"W dim";
  }
  else {
    //no point in starting at 200w because we'll never reach it
    for( let k=1;k<nonDimDrivers.length;k++ ){
      //if the power is greater than the current driver in the list
      if( powerConsumption > nonDimDrivers[k] ){
        //return the greater driver before
        return nonDimDrivers[k-1]+"W";
      }
    }
    //Last possible case.
    return nonDimDrivers[nonDimDrivers.length-1]+"W";
  }
};

Modules.server.calculateDrivers = calculateDrivers;
