_ = lodash;
feetToMeter =  3.28084;

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
    //such as [[{group:"a", lenWattArray},{group:"a", lenWattArray}],
    //         [{group:"b", lenWattArray},{group:"b", lenWattArray},etc...],etc...]
    //update the drivers while looping over the previous sortedGroups
    for(let i=0;i<sortedGroups.length;i++){
      //this is the group fetched in the sortedGroups (ex: group a above ->
      //  [{group:"a", lenWattArray},{group:"a", lenWattArray}])
      var groupArray = sortedGroups[i],
          groupLenWattArray = [];
      //loop over each element in that group (ex: so first {group:"a", lenWattArray} then the next )
      for(let j=0;j<groupArray.length;j++){
        var lenWattArray = groupArray[j].lenWattArray;
        //loop over each lenght and watt array (meaning in case we have some
        //lengths that have been split because they were longer than 10 feet)
        //(ex: a 13feet would be a 10ft + a 3ft, making a length 2 array)
        for(let k=0;k<lenWattArray.length;k++){
          //we want to split the groups up so we have single fixtures per lenWattArray
          //we'll loop over the qty to get there. so in this exemple we'll take the following
          //group a has 2 x 45in and 3 x 36in -> would make 5 entries.
          for(let l=0;l<lenWattArray[k].qty;l++){
            //the point is that for grouped fixtures, we can't calculate driver requirements
            //as the individuals. (ie. 2x45in does not mean they both need a driver, they'll be put together
            //and so may be powered by the same driver depending on powerConsumption)
            groupLenWattArray.push({qty:1,
                                    len:lenWattArray[k].len,
                                    watt:lenWattArray[k].watt,
                                    dimmable: lenWattArray[k].dimmable});
          }
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
    //(120in/12 -> feet /3.28084 -> meters /0.8 -> 80% factor for drivers consumption)
    lenWattArray.push({qty:qty, len:120, watt:(10/feetToMeter*wattMeter/0.8).toFixed(2), dimmable: dimmable});
    //reduce the len by 10 feet
    len -= 120;
  }
  if( len < 240 && len > 120 ){
    let half = len/2,
        //div by 12(feet)/3.37(to meters)/0.8(80% power consumption)
        powerConsumption = half/12/feetToMeter*wattMeter/0.8;
    //push both halves into array
    lenWattArray.push({qty:qty, len:half, watt:powerConsumption.toFixed(2), dimmable: dimmable});
    lenWattArray.push({qty:qty, len:half, watt:powerConsumption.toFixed(2), dimmable: dimmable});
  }
  else {
    //when the len falls under 10 feet, push it directly
    //div by 12(feet)/3.37(to meters)/0.8(80% power consumption)
    let powerConsumption = len/12/feetToMeter*wattMeter/0.8;
    lenWattArray.push({qty:qty, len:len, watt:powerConsumption.toFixed(2), dimmable: dimmable});
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
      totalLength = 0;

  //loop through array of powerConsumption
  for( let j=0;j<lenWattArray.length;j++ ) {
    let watt = Number(lenWattArray[j].watt),
        len = Number(lenWattArray[j].len),
        qty = Number(lenWattArray[j].qty),
        dimmable = lenWattArray[j].dimmable;
    //check if we'd be over 200W (max for drivers) or that the length i greater that 20 feet (max before power loss)
    if( totalConsumption + watt > 200 || totalLength + len > 240 ){
      //select the right driver for the current totalConsumption
      let driver = _selectDriver(totalConsumption, dimmable);
      //add to that driver's qty of value in array.
      _.find(drivers, ['driver',driver]).qty += qty;
      //reset totalConsumption and add current powerConsumption j
      totalConsumption = watt;
      //reset totalLenght and add current length
      totalLength = len;
    }
    else {
      //increase total consumption
      totalConsumption += watt;
      //increase total length
      totalLength += len;
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
  let dimDrivers = [];
  let nonDimDrivers = [];

  //get all the dimmable drivers (only the powers field, we don't need the rest)
  let drivers = Products.find({category: "drivers"}, {fields: {powers: 1, attributes: 1}});
  //loop over them and push the power value in number format into the array.
  drivers.forEach(function(driver){
    //push them into proper array based on dimmable attribute
    if( driver.attributes[0] === "dimmable" ){
      dimDrivers.push(Number(driver.powers[0]));
    } else {
      nonDimDrivers.push(Number(driver.powers[0]));
    }
  });
  //sort descending order
  dimDrivers.sort(function(a, b){return b-a});
  nonDimDrivers.sort(function(a, b){return b-a});

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
      var lenWattArray = individuals[i].lenWattArray;
      //this is what a lenWattArray looks like {qty:Number, len:Number, watt:Number, dimmable:boolean}
      //this is split to 10 feet max lengths (which is why we need to loop over it in case we have a split)
      for(let k=0;k<lenWattArray.length;k++) {
        let qty = Number(lenWattArray[k].qty),
            len = Number(lenWattArray[k].len);
        //price for cuts
        total += qty * cutcost;
        //price for labor
        total += qty * laborcost;
        //price for profile
        total += qty * len * profilecost
        //price for lens
        total += qty * len * lenscost
        //price for strip
        total += qty * len * stripcost
        //price for bracket (1 every 3 feet)
        total += qty * (Math.ceil(len/36)) * bracketcost
      }
    }
  }

  //check if we have any groups in the entries
  if( sortedGroups.length != 0 ) {
    //calcutate price for sorted groups
    for(let i=0;i<sortedGroups.length;i++) {
      //each sorted group is also an array with {group, lenWattArray} objects
      let group = sortedGroups[i];

      for(let j=0;j<group.length;j++) {
        var lenWattArray = group[j].lenWattArray;
        //this is what a lenWattArray looks like {qty:Number, len:Number, watt:Number, dimmable:boolean}
        //this is split to 10 feet max lengths (which is why we need to loop over it in case we have a split)
        for(let k=0;k<lenWattArray.length;k++) {
          let qty = Number(lenWattArray[k].qty),
              len = Number(lenWattArray[k].len);
          //price for cuts
          total += qty * cutcost;
          //price for labor
          total += qty * laborcost;
          //price for profile
          total += qty * len * profilecost;
          //price for lens
          total += qty * len * lenscost;
          //price for strip
          total += qty * len * stripcost;
          //price for bracket (1 every 3 feet)
          total += qty * (Math.ceil(len/36)) * bracketcost;
        }
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
  let oled_total = total.toFixed(2),
      nrg_total = (oled_total / Prices.findOne().multiplierNRG).toFixed(2),
      master_total = (nrg_total / Prices.findOne().multiplierMaster).toFixed(2),
      provincial_total = (nrg_total / Prices.findOne().multiplierProvincial).toFixed(2);
      regional_total = (nrg_total / Prices.findOne().multiplierRegional).toFixed(2);

  //check which factor we need to apply to the nrg price to get client pricing
  if( Roles.userIsInRole( userId, ['admin','manager','oled','nrg','master'] ) ) {
    var client_total = (master_total / Prices.findOne().multiplierClient).toFixed(2);
  } else if( Roles.userIsInRole( userId, ['provincial'] ) ) {
    var client_total = (provincial_total / Prices.findOne().multiplierClient).toFixed(2);
  } else if( Roles.userIsInRole( userId, ['regional'] ) ) {
    var client_total = (regional_total / Prices.findOne().multiplierClient).toFixed(2);
  }

  //encrypt totals which logged in user has no access to
  //in case of admins or oled employees
  if( Roles.userIsInRole( userId, ['admin','manager','oled'] ) ) {
    //return all values in clear
    return {oled_total: oled_total, nrg_total: nrg_total, master_total: master_total, provincial_total: provincial_total, regional_total: regional_total, client_total: client_total};
  }
  //in case of nrg employee
  else if( Roles.userIsInRole( userId, ['nrg'] ) ) {
    //encrypt oled cost
    oled_total = CryptoJS.AES.encrypt(oled_total, Meteor.settings.private.secretPassphrase).toString();
    return {oled_total: oled_total, nrg_total: nrg_total, master_total: master_total, provincial_total: provincial_total, regional_total: regional_total, client_total: client_total};
  }
  //in case of lumen employee
  else if( Roles.userIsInRole( userId, ['master'] ) ) {
    //encrypt oled, nrg costs and dont include other prices since they are the competition
    oled_total = CryptoJS.AES.encrypt(oled_total, Meteor.settings.private.secretPassphrase).toString();
    nrg_total = CryptoJS.AES.encrypt(nrg_total, Meteor.settings.private.secretPassphrase).toString();
    return {oled_total: oled_total, nrg_total: nrg_total, master_total: master_total, client_total: client_total};
  }
  //in case of user which is provincial
  else if( Roles.userIsInRole( userId, ['provincial'] ) ) {
    //we encrypt oled and nrg costs and dont include master or regional prices
    oled_total = CryptoJS.AES.encrypt(oled_total, Meteor.settings.private.secretPassphrase).toString();
    nrg_total = CryptoJS.AES.encrypt(nrg_total, Meteor.settings.private.secretPassphrase).toString();
    return {oled_total: oled_total, nrg_total: nrg_total, provincial_total: provincial_total, client_total: client_total};
  }
  //in case of user which is regional
  else if( Roles.userIsInRole( userId, ['regional'] ) ) {
    //we encrypt oled and nrg costs and dont include master or provincial prices
    oled_total = CryptoJS.AES.encrypt(oled_total, Meteor.settings.private.secretPassphrase).toString();
    nrg_total = CryptoJS.AES.encrypt(nrg_total, Meteor.settings.private.secretPassphrase).toString();
    return {oled_total: oled_total, nrg_total: nrg_total, regional_total: regional_total, client_total: client_total};
  }
  else {
    //should the user be any other ROLES (impossible unless some strange bug/hack) we return only the client price for safety
    return {oled_total: 0, nrg_total: 0, lumen_total: 0, others_total: 0, client_total: client_total};
  }
}

Modules.server.calculatePRFL = calculatePRFL;
