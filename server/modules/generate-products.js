let products = [
  //drivers
  {
    pn: '12W',
    desc: 'Driver 12W',
    category: 'drivers',
    cost: 5.6942,
    attributes: [],
    powers: ["12"],
    colors: [],
    ips: []
  },
  {
    pn: '20W',
    desc: 'Driver 20W',
    category: 'drivers',
    cost: 10.1602,
    attributes: [],
    powers: ["20"],
    colors: [],
    ips: []
  },
  {
    pn: '30W',
    desc: 'Driver 30W',
    category: 'drivers',
    cost: 14.1674,
    attributes: [],
    powers: ["30"],
    colors: [],
    ips: []
  },
  {
    pn: '60W',
    desc: 'Driver 60W',
    category: 'drivers',
    cost: 18.6862,
    attributes: [],
    powers: ["60"],
    colors: [],
    ips: []
  },
  {
    pn: '100W',
    desc: 'Driver 100W',
    category: 'drivers',
    cost: 32.6617,
    attributes: [],
    powers: ["100"],
    colors: [],
    ips: []
  },
  {
    pn: '200W',
    desc: 'Driver 200W',
    category: 'drivers',
    cost: 56.2716,
    attributes: [],
    powers: ["200"],
    colors: [],
    ips: []
  },
  {
    pn: '30W dim',
    desc: 'Driver 30W gradable',
    category: 'drivers',
    cost: 12.8531,
    attributes: ["dimmable"],
    powers: ["30"],
    colors: [],
    ips: []
  },
  {
    pn: '45W dim',
    desc: 'Driver 45W gradable',
    category: 'drivers',
    cost: 19.2796,
    attributes: ["dimmable"],
    powers: ["45"],
    colors: [],
    ips: []
  },
  {
    pn: '60W dim',
    desc: 'Driver 60W gradable',
    category: 'drivers',
    cost: 25.2915,
    attributes: ["dimmable"],
    powers: ["60"],
    colors: [],
    ips: []
  },
  {
    pn: '80W dim',
    desc: 'Driver 80W gradable',
    category: 'drivers',
    cost: 33.7221,
    attributes: ["dimmable"],
    powers: ["80"],
    colors: [],
    ips: []
  },
  {
    pn: '100W dim',
    desc: 'Driver 100W gradable',
    category: 'drivers',
    cost: 46.6620,
    attributes: ["dimmable"],
    powers: ["100"],
    colors: [],
    ips: []
  },
  {
    pn: '200W dim',
    desc: 'Driver 200W gradable',
    category: 'drivers',
    cost: 80.1590,
    attributes: ["dimmable"],
    powers: ["200"],
    colors: [],
    ips: []
  },
  //other
  {
    pn: 'labor',
    desc: 'Main d\'oeuvre',
    category: 'other',
    cost: 5.25,
    attributes: [],
    powers: [],
    colors: [],
    ips: []
  },
  {
    pn: 'cutprofile',
    desc: 'Coupe du profilé',
    category: 'other',
    cost: 0.875,
    attributes: [],
    powers: [],
    colors: [],
    ips: []
  },
  {
    pn: 'cutlens',
    desc: 'Coupe de la lentille',
    category: 'other',
    cost: 0.875,
    attributes: [],
    powers: [],
    colors: [],
    ips: []
  },
  {
    pn: 'starter',
    desc: 'Fil de départ',
    category: 'other',
    cost: 0.014,
    attributes: [],
    powers: [],
    colors: [],
    ips: []
  },
  {
    pn: 'union',
    desc: 'Fil d\'union',
    category: 'other',
    cost: 0.014,
    attributes: [],
    powers: [],
    colors: [],
    ips: []
  },
  {
    pn: 'tape',
    desc: 'Tape double face ',
    category: 'other',
    cost: 0.014,
    attributes: [],
    powers: [],
    colors: [],
    ips: []
  },
  {
    pn: 'package',
    desc: 'Packaging for 10 fixtures',
    category: 'other',
    cost: 3.50,
    attributes: [],
    powers: [],
    colors: [],
    ips: []
  },
  //profiles
  {
    pn: '1806',
    desc: 'Profilé aluminium 1806',
    category: 'profile',
    cost: 0.075,
    attributes: [ "Largeur: 18.69 mm", "Hauteur: 6.25 mm" ],
    powers: [],
    colors: [],
    ips: []
  },
  {
    pn: '1811',
    desc: 'Profilé aluminium 1811',
    category: 'profile',
    cost: 0.075,
    attributes: [ "Largeur: 18.69 mm", "Hauteur: 11.43 mm" ],
    powers: [],
    colors: [],
    ips: []
  },
  {
    pn: '2611R',
    desc: 'Profilé aluminium encastré 2611R',
    category: 'profile',
    cost: 0.0911,
    attributes: [ "Largeur: 26.19 mm", "Hauteur: 11.45 mm" ],
    powers: [],
    colors: [],
    ips: []
  },
  {
    pn: '2020C',
    desc: 'Profilé aluminium de coin 2020C',
    category: 'profile',
    cost: 0.115,
    attributes: [ "Largeur: 20 mm", "Hauteur: 20 mm" ],
    powers: [],
    colors: [],
    ips: []
  },
  //lenses
  {
    pn: 'STD',
    desc: 'Lentille standard',
    category: 'lens',
    cost: 0.0417,
    attributes: [],
    powers: [],
    colors: [ "Opaline", "Givrée", "Claire" ],
    ips: []
  },
  {
    pn: 'CSTD',
    desc: 'Lentille standard de coin',
    category: 'lens',
    cost: 0.075,
    attributes: [],
    powers: [],
    colors: [ "Opaline", "Givrée" ],
    ips: []
  },
  {
    pn: 'CCR',
    desc: 'Lentille carré de coin',
    category: 'lens',
    cost: 0.075,
    attributes: [],
    powers: [],
    colors: [ "Opaline", "Givrée" ],
    ips: []
  },
  //endcaps
  {
    pn: '0200',
    desc: 'Embout pour 1806',
    category: 'endcap',
    cost: 0.35,
    attributes: [],
    powers: [],
    colors: [],
    ips: []
  },
  {
    pn: '0025',
    desc: 'Embout pour 1811',
    category: 'endcap',
    cost: 0.35,
    attributes: [],
    powers: [],
    colors: [],
    ips: []
  },
  {
    pn: '0075',
    desc: 'Embout pour 2611R',
    category: 'endcap',
    cost: 0.35,
    attributes: [],
    powers: [],
    colors: [],
    ips: []
  },
  {
    pn: '0175',
    desc: 'Embout pour 2020C avec lentille standard',
    category: 'endcap',
    cost: 0.35,
    attributes: [],
    powers: [],
    colors: [],
    ips: []
  },
  {
    pn: '0150',
    desc: 'Embout pour 2020C avec lentille carré',
    category: 'endcap',
    cost: 0.35,
    attributes: [],
    powers: [],
    colors: [],
    ips: []
  },
  //Brackets
  {
    pn: '2025',
    desc: 'Braquette pour 1806, 1811, et 2611R',
    category: 'bracket',
    cost: 0.55,
    attributes: [],
    powers: [],
    colors: [],
    ips: []
  },
  {
    pn: '2175',
    desc: 'Braquette pour 2020C',
    category: 'bracket',
    cost: 0.55,
    attributes: [],
    powers: [],
    colors: [],
    ips: []
  },
  //strips
  {
    pn: '3528-60',
    desc: 'RUBAN 3528-60',
    category: 'strip',
    cost: 0.1077,
    attributes: [ "60 DEL AU MÈTRE", "312 LM/M", "4.8 W/M", "CHAQUE 3 DEL", "8MM DE LARGEUR", "120 DEGRÉS" ],
    powers: [ "24VDC" ],
    colors: [ "30K", "35K", "40K" ],
    ips: [ "IP20" ]
  },
  {
    pn: '3528-120',
    desc: 'RUBAN 3528-120',
    category: 'strip',
    cost: 0.1767,
    attributes: [ "120 DEL AU MÈTRE", "720 LM/M", "9.6 W/M", "CHAQUE 3 DEL", "9MM DE LARGEUR", "120 DEGRÉS" ],
    powers: [ "24VDC" ],
    colors: [ "30K", "35K", "40K" ],
    ips: [ "IP20" ]
  },
  {
    pn: '2835-120',
    desc: 'RUBAN 2835-120',
    category: 'strip',
    cost: 0.1756,
    attributes: [ "120 DEL AU MÈTRE", "1200 LM/M", "14.4 W/M", "CHAQUE 6 DEL (24V)", "10MM DE LARGEUR", "120 DEGRÉS" ],
    powers: [ "24VDC" ],
    colors: [ "30K", "35K", "40K" ],
    ips: [ "IP20" ]
  },
  {
    pn: '5050-72',
    desc: 'RUBAN 5050-72',
    category: 'strip',
    cost: 0.392,
    attributes: [ "72 DEL AU MÈTRE", "1602 LM/M", "17.8 W/M", "CHAQUE DEL", "10MM DE LARGEUR", "120 DEGRÉS" ],
    powers: [ "24VDC" ],
    colors: [ "30K", "35K", "40K" ],
    ips: [ "IP20" ]
  }
];

let prices = [
  {
    //from cost to get to NRG prices
    multiplierNRG: 0.6,
    //from NRG to get to master prices
    multiplierMaster: 0.7,
    //from NRG to get to provincial prices
    multiplierProvincial: 0.65,
    //from NRG to get to regional prices
    multiplierRegional: 0.6,
    //from any of the levels prices to client prices
    multiplierClient: 0.8
  }
];

let generateProducts = () => {
  for ( let i = 0; i < products.length; i++ ) {
    let productExist = _checkIfProductExist( products[ i ] );
    if ( !productExist ) {
      _createProduct( products[ i ] );
    }
  }
  if( !Prices.findOne() ){
    _createPrices( prices[0] );
  }
};

let _checkIfProductExist = ( product ) => {
  return Products.findOne( { pn: product.pn } );
};

let _createProduct = ( product ) => {
  Products.insert( product );
};

let _createPrices = ( prices ) => {
  Prices.insert( prices );
};

Modules.server.generateProducts = generateProducts;
