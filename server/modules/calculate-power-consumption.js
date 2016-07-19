/*
creates the power consumption array to fetch the right drivers
for the qty and size in the input when dealing with individual prfl.

*/
let createPowerArray = ( options ) => {
  //array for lenght and watt value for IND group
  var indLenWattArray,
      len = options.len,
      qty = options.qty,
      pn = options.pn,
      //get the watt per meter from the database removing excess text
      wattMeter = Products.findOne({pn:pn}).attributes[2].replace(/\D+$/g, "");

  console.log(wattMeter);
  //while the len is greater than 20 feet (240in)
  while( len >= 240 ){
    //insert a new object with len of 10 feet (120in) and the watt per meter value for that lenght
    //3.71 = 120/12/3.37/0.8 (120in/12 -> feet /3.37 -> meters /0.8 -> 80% factor for drivers consumption)
    indLenWattArray.push({qty:qty, lenght:120, watt:3.71*wattMeter});
    //reduce the len by 10 feet
    len -= 120;
  }
  if( len < 240 && len >= 120 ){
    let half = len/2,
        //div by 12(feet)/3.37(to meters)/0.8(80% power consumption)
        powerConsumption = half/12/3.37*wattMeter/0.8;
    //push both halves into array
    indLenWattArray.push({qty:qty, lenght:half, watt:powerConsumption});
    indLenWattArray.push({qty:qty, lenght:half, watt:powerConsumption});
  }
  else {
    //when the len falls under 10 feet, push it directly
    //div by 12(feet)/3.37(to meters)/0.8(80% power consumption)
    let powerConsumption = len/12/3.37*wattMeter/0.8;
    indLenWattArray.push({qty:qty, lenght:len, watt:powerConsumption});
  }
  return indLenWattArray;
};

Modules.server.CalculatePowerConsumption = createPowerArray;
