_ = lodash;

/*
Calculates the drivers needed to power all the fixtures described in the
rowArray by spliting the lengths to manufacturing standards and calculating
their power consumption depending on the selected strip.
Also calculates the budget price with the drivers calulation information.
*/
let calculatePRFL = ( options ) => {
  var drivers = options.drivers,
      rowArray = options.rowArray,
      stripId = options.stripId,
      profileId = options.profileId,
      lensId = options.lensId,
      endcapId = options.endcapId,
      bracketId = options.bracketId,
      userId = options.userId,
      groups = [],
      individuals = [],
      sortedGroups = [];

  //loop through array of rows
  for( let j=0;j<rowArray.length;j++ ) {
    //create the powerArray to use in calculating the drivers for the current row
    var lenWattArray = _createPowerArray( rowArray[j].len, rowArray[j].qty, rowArray[j].dimmable, stripId );

    //if this is the individual group we calculate the drivers immediatly.
    if ( rowArray[j].group === "ind" ){
      //store the individual split for email
      individuals.push( {group: "ind", lenWattArray: lenWattArray} );
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
    var check = groups.map(e => {return e.group});
    //loop over all the groups
    groups.forEach(function(e) {
      //Check if an array for this group was created already
      if( !this[e.group] ) {
        //if it wasn't, create it now
        this[e.group] = [];
        //put it in the results
        sortedGroups.push(this[e.group]);
      }
      //put the object in the grouping array
      this[e.group].push(e);
    }, {});

    //sortedGroups contains the arrays of objects with matching groups.
    //for example 3 lines with groups a, a and b would form an array of 2 arrays
    //such as [[{group:"a", lenWattArray},{group:"a", lenWattArray}],[{group:"b", lenWattArray}]]

    //update the drivers while looping over the previous sortedGroups
    for(let i=0;i<sortedGroups.length;i++){
      //this is the group fetched in the sortedGroups
      var groupArray = result[i],
          groupLenWattArray = [];
      //loop over each group updating needed drivers for each row
      for(let j=0;j<groupArray.length;j++){
        //loop over each lenght and watt array to create a single lenWattArray for this group
        for(let k=0;k<groupArray[j].lenWattArray.length;k++){
          groupLenWattArray.push({qty:groupArray[j].lenWattArray[k].qty,
                                  len:groupArray[j].lenWattArray[k].len,
                                  watt:groupArray[j].lenWattArray[k].watt,
                                  dimmable: groupArray[j].lenWattArray[k].dimmable});
        }
      }
      //update the drivers array with the required drivers
      drivers = _updateDriversArray( groupLenWattArray, drivers );
    }
  }

  //calulate the price for this PRFL from all fixtures and drivers.
  //using the split lengths lets us calcutate the cuts and labor
  let total = _calculatePrice( rowArray, sortedGroups, individuals, drivers, stripId, profileId, lensId, endcapId, bracketId, userId );

  //return object with updated drivers array, grouped and individual fixtures
  return {drivers: drivers, groups: sortedGroups, individuals: individuals, total: total};
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
    //max is 21.8w/M and we dont go over 20 feet.
    //20ft is 5.93M | 5.93M*21.8W/M=129.38W | 129.38W/.80(20% more)=161.72W (which is well below 200W)
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

/*
Calculates the total price for the selected PRFL customized by the user.
This is calculated with the manufaturer standards lengths so we can
take into account the cuts and labor required for the quote.
Prices are stored in the database and are per inch or per piece depending
on the item. Cuts and labor are stored as special products.
*/
let _calculatePrice = ( rowArray, sortedGroups, individuals, drivers, stripId, profileId, lensId, endcapId, bracketId, userId ) => {
  var total = 0;

  //grab the starts cost
  var startcost = Products.findOne({pn:"starter", category: "other"}).cost,
      cutcost = Products.findOne({pn:"cut", category: "other"}).cost,
      laborcost = Products.findOne({pn:"labor", category: "other"}).cost,
      unioncost = Products.findOne({pn:"union", category: "other"}).cost,
      profilecost = Products.findOne({pn:profileId, category: "profile"}).cost,
      stripcost = Products.findOne({pn:stripId, category: "strip"}).cost,
      lenscost = Products.findOne({pn:lensId, category: "lens"}).cost,
      endcapcost = Products.findOne({pn:endcapId, category: "endcap"}).cost,
      bracketcost = Products.findOne({pn:bracketId, category: "bracket"}).cost;

  //calculate price for each driver needed
  //also calculate the price for starter wires. always will be one per driver.
  for(let i=0;i<drivers.length;i++) {
    var qty = drivers[i].qty;
    //check that we have some of these drivers, no point in calculating prices to multiply by zero afterwards
    if( qty != 0 ){
      //grab this driver from the database
      let driver = Products.findOne({pn:drivers[i].driver, category: "drivers"});
      //increase total by cost of driver and start times value (which is qty)
      total += (driver.cost + startcost) * qty;
    }
  }

  //check if we have any individuals in the entries
  if( individuals.length != 0 ){
    //calcutate price for the individuals
    for(let i=0;i<individuals.length;i++) {
      //this is what a lenWattArray looks like {qty:Number, len:Number, watt:Number, dimmable:boolean}
      //this is split to 10 feet max lengths
      var lenWattArray = individuals[i].lenWattArray[0];
      //price for cuts
      total += lenWattArray.qty * cutcost;
      //price for labor
      total += lenWattArray.qty * laborcost;
      //price for profile
      total += lenWattArray.qty * lenWattArray.len * profilecost
      //price for lens
      total += lenWattArray.qty * lenWattArray.len * lenscost
      //price for strip
      total += lenWattArray.qty * lenWattArray.len * stripcost
      //price for bracket
      total += lenWattArray.qty * (Math.floor(lenWattArray.len/12)) * bracketcost
    }
  }

  //check if we have any groups in the entries
  if( sortedGroups.length != 0 ) {
    //calcutate price for sorted groups
    for(let i=0;i<sortedGroups.length;i++) {
      //each sorted group is also an array with {group, lenWattArray} objects
      let group = sortedGroups[i];
      for(let j=0;j<group.length;j++) {
        //this is what a lenWattArray looks like {qty:Number, len:Number, watt:Number, dimmable:boolean}
        //this is split to 10 feet max lengths
        var lenWattArray = group[j].lenWattArray;
        //price for cuts
        total += lenWattArray.qty * cutcost;
        //price for labor
        total += lenWattArray.qty * laborcost;
        //price for profile
        total += lenWattArray.qty * lenWattArray.len * profilecost;
        //price for lens
        total += lenWattArray.qty * lenWattArray.len * lenscost;
        //price for strip
        total += lenWattArray.qty * lenWattArray.len * stripcost;
        //price for bracket
        total += lenWattArray.qty * (Math.floor(lenWattArray.len/12)) * bracketcost;
      }
      //we calculate the unions needed for these groups, two cables per union
      total += (group.length - 1) * 2 * unioncost;
    }
  }

  //this is rowArray {len,qty,dimmable,group}
  for(let i=0;i<rowArray.length;i++) {
    let qty = rowArray[i].qty,
        len = rowArray[i].len;
    //price for endcaps
    total += qty * 2 * endcapcost;
    //calculate the rest of the possibly needed unions if some individuals
    //or groups have longer than 10 feet fixtures
    //floor(len/120)= # of unions needed (237in / 120 = 1.975 floor-> 1)
    //that's a 19 ish feet fixture which will have to be split in two (1 union)
    total += Math.floor(len/120) * 2 * qty * unioncost
  }

  //cost is directly the calculated total from the database
  let oled_total = total,
      nrg_total = oled_total / Prices.findOne().multiplierNRG,
      lumen_total = nrg_total / Prices.findOne().multiplierLumen,
      others_total = nrg_total / Prices.findOne().multiplierOthers;

  //check if users need to have lumen factor or other factor applied to client price
  if( Roles.userIsInRole( userId, ['admin','manager','oled','nrg','lumen'] ) ) {
    var client_total = lumen_total / Prices.findOne().multiplierClient;
  }
  else if( Roles.userIsInRole( userId, ['user'] ) ) {
    var client_total = others_total / Prices.findOne().multiplierClient;
  }

  //TODO: Hash all prices which user has no privilege for so that we can't send this to email creation with security

  return total;
}

Modules.server.calculatePRFL = calculatePRFL;
