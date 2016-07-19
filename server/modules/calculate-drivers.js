let calculateDrivers = ( options ) => {
  var totalConsumption = 0,
      totalLenght = 0,
      indLenWattArray = options.powerArray,
      dimmable = options.dimmable,
      drivers = options.drivers;

  //loop through array of powerConsumption
  for( let j=0;j<indLenWattArray.length;j++ ) {
    //check if we'd be over 200W (max for drivers) or that the length i greater that 20 feet (max before power loss)
    if( totalConsumption + indLenWattArray[j].watt > 200 || totalLenght + indLenWattArray[j].length > 240 ){
      //select the right driver for the current totalConsumption
      //add to that driver's qty of value in array.
      _.chain(drivers).find(drivers, {'driver':_selectDriver(totalConsumption, dimmable)}).merge({'qty':indLenWattArray[j].qty});
      //reset totalConsumption and add current powerConsumption j
      totalConsumption = indLenWattArray[j].watt;
      //reset totalLenght and add current length
      totalLenght = indLenWattArray[j].length;
    }
    else {
      //increase total consumption
      totalConsumption += indLenWattArray[j].watt;
      //increase total length
      totalLenght += indLenWattArray[j].length;
    }
  }
  //When we exit loop, we calculate driver for the remaining totalConsumption
  //add that driver to the drivers list.
  _.chain(drivers).find(drivers, {'driver':_selectDriver(totalConsumption, dimmable)}).merge({'qty':indLenWattArray[j].qty});

  //return complete updated driver list
  return drivers;
};

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
    return "30W dim";
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
    return "30W";
  }
};

Modules.server.CalculateDrivers = calculateDrivers;
