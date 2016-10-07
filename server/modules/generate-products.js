let products = [
  //drivers
  {
    pn: '15W',
    desc: 'Driver 15W',
    category: 'drivers',
    cost: 10,
    attributes: [],
    powers: ["15"],
    colors: [],
    ips: []
  },
  {
    pn: '20W',
    desc: 'Driver 20W',
    category: 'drivers',
    cost: 10,
    attributes: [],
    powers: ["20"],
    colors: [],
    ips: []
  },
  {
    pn: '30W',
    desc: 'Driver 30W',
    category: 'drivers',
    cost: 10,
    attributes: [],
    powers: ["30"],
    colors: [],
    ips: []
  },
  {
    pn: '60W',
    desc: 'Driver 60W',
    category: 'drivers',
    cost: 10,
    attributes: [],
    powers: ["60"],
    colors: [],
    ips: []
  },
  {
    pn: '100W',
    desc: 'Driver 100W',
    category: 'drivers',
    cost: 10,
    attributes: [],
    powers: ["100"],
    colors: [],
    ips: []
  },
  {
    pn: '150W',
    desc: 'Driver 150W',
    category: 'drivers',
    cost: 10,
    attributes: [],
    powers: ["150"],
    colors: [],
    ips: []
  },
  {
    pn: '200W',
    desc: 'Driver 200W',
    category: 'drivers',
    cost: 10,
    attributes: [],
    powers: ["200"],
    colors: [],
    ips: []
  },
  {
    pn: '12W dim',
    desc: 'Driver 12W gradable',
    category: 'drivers',
    cost: 10,
    attributes: ["dimmable"],
    powers: ["12"],
    colors: [],
    ips: []
  },
  {
    pn: '20W dim',
    desc: 'Driver 20W gradable',
    category: 'drivers',
    cost: 10,
    attributes: ["dimmable"],
    powers: ["20"],
    colors: [],
    ips: []
  },
  {
    pn: '30W dim',
    desc: 'Driver 30W gradable',
    category: 'drivers',
    cost: 10,
    attributes: ["dimmable"],
    powers: ["30"],
    colors: [],
    ips: []
  },
  {
    pn: '45W dim',
    desc: 'Driver 45W gradable',
    category: 'drivers',
    cost: 10,
    attributes: ["dimmable"],
    powers: ["45"],
    colors: [],
    ips: []
  },
  {
    pn: '60W dim',
    desc: 'Driver 60W gradable',
    category: 'drivers',
    cost: 10,
    attributes: ["dimmable"],
    powers: ["60"],
    colors: [],
    ips: []
  },
  {
    pn: '80W dim',
    desc: 'Driver 80W gradable',
    category: 'drivers',
    cost: 10,
    attributes: ["dimmable"],
    powers: ["80"],
    colors: [],
    ips: []
  },
  {
    pn: '100W dim',
    desc: 'Driver 100W gradable',
    category: 'drivers',
    cost: 10,
    attributes: ["dimmable"],
    powers: ["100"],
    colors: [],
    ips: []
  },
  {
    pn: '150W dim',
    desc: 'Driver 150W gradable',
    category: 'drivers',
    cost: 10,
    attributes: ["dimmable"],
    powers: ["150"],
    colors: [],
    ips: []
  },
  {
    pn: '200W dim',
    desc: 'Driver 200W gradable',
    category: 'drivers',
    cost: 10,
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
    cost: 10,
    attributes: [],
    powers: [],
    colors: [],
    ips: []
  },
  {
    pn: 'cut',
    desc: 'Coupe de profilé et lentilles',
    category: 'other',
    cost: 10,
    attributes: [],
    powers: [],
    colors: [],
    ips: []
  },
  {
    pn: 'starter',
    desc: 'Fil de départ',
    category: 'other',
    cost: 10,
    attributes: [],
    powers: [],
    colors: [],
    ips: []
  },
  {
    pn: 'union',
    desc: 'Fil d\'union',
    category: 'other',
    cost: 10,
    attributes: [],
    powers: [],
    colors: [],
    ips: []
  },
  //profiles
  {
    pn: '1011',
    desc: 'Profilé aluminium 1011',
    category: 'profile',
    cost: 10,
    attributes: [ "Largeur: 18.69 mm", "Hauteur: 6.2 mm" ],
    powers: [],
    colors: [],
    ips: []
  },
  {
    pn: '1012',
    desc: 'Profilé aluminium 1012',
    category: 'profile',
    cost: 10,
    attributes: [ "Largeur: 18.69 mm", "Hauteur: 11.7 mm" ],
    powers: [],
    colors: [],
    ips: []
  },
  {
    pn: '1013',
    desc: 'Profilé aluminium 1013',
    category: 'profile',
    cost: 10,
    attributes: [ "Largeur: 18.69 mm", "Hauteur: 11.45 mm" ],
    powers: [],
    colors: [],
    ips: []
  },
  {
    pn: '2020',
    desc: 'Profilé aluminium 2020',
    category: 'profile',
    cost: 10,
    attributes: [ "Largeur: 20 mm", "Hauteur: 20 mm" ],
    powers: [],
    colors: [],
    ips: []
  },
  //lenses
  {
    pn: 'WO',
    desc: 'Lentille blanche opaline',
    category: 'lens',
    cost: 10,
    attributes: [],
    powers: [],
    colors: [],
    ips: []
  },
  {
    pn: 'TR',
    desc: 'Lentille de diffusion',
    category: 'lens',
    cost: 10,
    attributes: [],
    powers: [],
    colors: [],
    ips: []
  },
  {
    pn: 'WF',
    desc: 'Lentille blanche givrée',
    category: 'lens',
    cost: 10,
    attributes: [],
    powers: [],
    colors: [],
    ips: []
  },
  {
    pn: 'FO',
    desc: 'Lentille de focus',
    category: 'lens',
    cost: 10,
    attributes: [],
    powers: [],
    colors: [],
    ips: []
  },
  {
    pn: 'CL',
    desc: 'Lentille claire',
    category: 'lens',
    cost: 10,
    attributes: [],
    powers: [],
    colors: [],
    ips: []
  },
  {
    pn: 'WFR',
    desc: 'Lentille blanche givrée ronde',
    category: 'lens',
    cost: 10,
    attributes: [],
    powers: [],
    colors: [],
    ips: []
  },
  {
    pn: 'WOR',
    desc: 'Lentille blanche opaline ronde',
    category: 'lens',
    cost: 10,
    attributes: [],
    powers: [],
    colors: [],
    ips: []
  },
  {
    pn: 'WFS',
    desc: 'Lentille blanche givrée carrée',
    category: 'lens',
    cost: 10,
    attributes: [],
    powers: [],
    colors: [],
    ips: []
  },
  {
    pn: 'WOS',
    desc: 'Lentille blanche opaline carrée',
    category: 'lens',
    cost: 10,
    attributes: [],
    powers: [],
    colors: [],
    ips: []
  },
  {
    pn: 'NOL',
    desc: 'Sans lentille',
    category: 'lens',
    cost: 0,
    attributes: [ "Automatiquement sans embout" ],
    powers: [],
    colors: [],
    ips: []
  },
  //endcaps
  {
    pn: '0200',
    desc: 'Embout 0200',
    category: 'endcap',
    cost: 10,
    attributes: [],
    powers: [],
    colors: [],
    ips: []
  },
  {
    pn: '0025',
    desc: 'Embout 0025',
    category: 'endcap',
    cost: 10,
    attributes: [ "Embout pour profilé série 1012" ],
    powers: [],
    colors: [],
    ips: []
  },
  {
    pn: '0050',
    desc: 'Embout 0050',
    category: 'endcap',
    cost: 10,
    attributes: [ "Embout pour profilé série 1012", "Lentille focus seulement" ],
    powers: [],
    colors: [],
    ips: []
  },
  {
    pn: '0075',
    desc: 'Embout 0075',
    category: 'endcap',
    cost: 10,
    attributes: [ "Embout pour profilé série 1013" ],
    powers: [],
    colors: [],
    ips: []
  },
  {
    pn: '0175',
    desc: 'Embout 0175',
    category: 'endcap',
    cost: 10,
    attributes: [ "Embout pour profilé série 2020", "Lentille carrée seulement" ],
    powers: [],
    colors: [],
    ips: []
  },
  {
    pn: '0150',
    desc: 'Embout 0150',
    category: 'endcap',
    cost: 10,
    attributes: [ "Embout pour profilé série 2020", "Lentille ronde seulement" ],
    powers: [],
    colors: [],
    ips: []
  },
  {
    pn: 'NOE',
    desc: 'Sans embouts',
    category: 'endcap',
    cost: 0,
    attributes: [ "Si installation non visible" ],
    powers: [],
    colors: [],
    ips: []
  },
  //brackets
  {
    pn: '2025',
    desc: 'Braquette 2025',
    category: 'bracket',
    cost: 10,
    attributes: [ "Braquette pour profilé série 1011 1012 1013" ],
    powers: [],
    colors: [],
    ips: []
  },
  {
    pn: '2050',
    desc: 'Braquette 2050',
    category: 'bracket',
    cost: 10,
    attributes: [ "Braquette pour profilé série 1011 1012 1013" ],
    powers: [],
    colors: [],
    ips: []
  },
  {
    pn: '2075',
    desc: 'Braquette 2075',
    category: 'bracket',
    cost: 10,
    attributes: [ "Braquette pour profilé série 1011 1012 1013" ],
    powers: [],
    colors: [],
    ips: []
  },
  {
    pn: '2175',
    desc: 'Braquette 2175',
    category: 'bracket',
    cost: 10,
    attributes: [ "Braquette pour profilé série 2020" ],
    powers: [],
    colors: [],
    ips: []
  },
  //strips
  {
    pn: '3528-60',
    desc: 'RUBAN 3528-60',
    category: 'strip',
    cost: 10,
    attributes: [ "60 DEL AU MÈTRE", "312 LM/M", "4.8 W/M", "CHAQUE 3 DEL", "8MM DE LARGEUR", "120 DEGRÉS" ],
    powers: ["12VDC", "24VDC" ],
    colors: [ "3000K", "3500K", "4000K" ],
    ips: [ "IP22", "IP65", "IP68" ]
  },
  {
    pn: '3528-120',
    desc: 'RUBAN 3528-120',
    category: 'strip',
    cost: 10,
    attributes: [ "120 DEL AU MÈTRE", "720 LM/M", "9.6 W/M", "CHAQUE 3 DEL", "9MM DE LARGEUR", "120 DEGRÉS" ],
    powers: [ "12VDC" ],
    colors: [ "3000K", "3500K", "4000K" ],
    ips: [ "IP22", "IP65", "IP68" ]
  },
  {
    pn: '5050-60',
    desc: 'RUBAN 5050-60',
    category: 'strip',
    cost: 10,
    attributes: [ "60 DEL AU MÈTRE", "1250 LM/M", "14.4 W/M", "CHAQUE 3 DEL (12V) - CHAQUE 6 DEL (24V)", "10MM DE LARGEUR", "120 DEGRÉS" ],
    powers: [ "12VDC", "24VDC" ],
    colors: [ "RGB" ],
    ips: [ "IP22", "IP65", "IP68" ]
  },
  {
    pn: '5050-72',
    desc: 'RUBAN 5050-72',
    category: 'strip',
    cost: 10,
    attributes: [ "72 DEL AU MÈTRE", "1602 LM/M", "17.8 W/M", "CHAQUE DEL", "10MM DE LARGEUR", "120 DEGRÉS" ],
    powers: [ "12VDC" ],
    colors: [ "3000K", "3500K", "4000K" ],
    ips: [ "IP22", "IP68" ]
  },
  {
    pn: '5630-60',
    desc: 'RUBAN 5630-60',
    category: 'strip',
    cost: 10,
    attributes: [ "60 DEL AU MÈTRE", "1750 LM/M", "21.7 W/M", "CHAQUE 6 DEL", "14MM DE LARGEUR", "120 DEGRÉS" ],
    powers: [ "24VDC" ],
    colors: [ "3000K", "3500K", "4000K" ],
    ips: [ "IP43", "IP67" ]
  }
];

let prices = [
  {
    multiplierNRG: 0.7,
    multiplierMaster: 0.8,
    multiplierProvincial: 0.75,
    multiplierRegional: 0.7,
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
