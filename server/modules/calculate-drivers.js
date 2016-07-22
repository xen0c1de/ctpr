_ = lodash;

let calculateDrivers = ( options ) => {
  var totalConsumption = 0,
      totalLenght = 0,
      drivers = options.drivers;

  var lenWattArray = _createPowerArray( options.rowArray, options.pn );

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
  //return complete updated driver list
  return drivers;
};

/*
creates the power consumption array to fetch the right drivers
for the qty and size in the input.
*/
let _createPowerArray = ( rowArray, pn ) => {
  //array for lenght and watt value for IND group
  var lenWattArray = [],
      //get the watt per meter from the database removing excess text
      wattMeter = Number(Products.findOne({pn:pn}).attributes[2].replace(/\D+$/g, ""));

  //loop ever each row in array
  for( let i=0;i<rowArray.length;i++ ){
    let len = rowArray[i].len,
        qty = rowArray[i].qty,
        dimmable = rowArray[i].dimmable,
        group = rowArray[i].group;

    if( group === "ind" ){
      //split the lengths into max and/or possible cuts
      lenWattArray = _splitLengthsForIndGroup( len, qty, dimmable, wattMeter, lenWattArray );
    }
    else {
      //split the lengths into max and/or possible cuts
      lenWattArray = _splitLengthsForOtherGroups( len, qty, dimmable, wattMeter, lenWattArray );
    }
  }
  //return the powerArray for all values for driver selection
  return lenWattArray;
};

/*
*/
let _splitLengthsForIndGroup = ( len, qty, dimmable, wattMeter, lenWattArray ) => {
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

let _splitLengthsForOtherGroups = ( len, qty, dimmable, wattMeter, lenWattArray ) => ­{
  //return array for this lenght
  return lenWattArray;
};*/

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
