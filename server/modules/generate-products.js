let products = [
  //profiles
  {
    pn: '1011',
    desc: 'Profilé aluminium 1011',
    category: 'profile',
    price: 10,
    attributes: [ "Largeur: Xmm", "Hauteur: Xmm" ],
    powers: [],
    colors: [],
    ips: []
  },
  {
    pn: '1012',
    desc: 'Profilé aluminium 1012',
    category: 'profile',
    price: 10,
    attributes: [ "Largeur: Xmm", "Hauteur: Xmm" ],
    powers: [],
    colors: [],
    ips: []
  },
  {
    pn: '1013',
    desc: 'Profilé aluminium 1013',
    category: 'profile',
    price: 10,
    attributes: [ "Largeur: Xmm", "Hauteur: Xmm" ],
    powers: [],
    colors: [],
    ips: []
  },
  {
    pn: '2020',
    desc: 'Profilé aluminium 2020',
    category: 'profile',
    price: 10,
    attributes: [ "Largeur: Xmm", "Hauteur: Xmm" ],
    powers: [],
    colors: [],
    ips: []
  },
  //lenses
  {
    pn: 'wo',
    desc: 'Lentille blanche opaline',
    category: 'lens',
    price: 10,
    attributes: [],
    powers: [],
    colors: [],
    ips: []
  },
  {
    pn: 'tr',
    desc: 'Lentille de diffusion',
    category: 'lens',
    price: 10,
    attributes: [],
    powers: [],
    colors: [],
    ips: []
  },
  {
    pn: 'wf',
    desc: 'Lentille blanche givrée',
    category: 'lens',
    price: 10,
    attributes: [],
    powers: [],
    colors: [],
    ips: []
  },
  {
    pn: 'fo',
    desc: 'Lentille de focus',
    category: 'lens',
    price: 10,
    attributes: [],
    powers: [],
    colors: [],
    ips: []
  },
  {
    pn: 'cl',
    desc: 'Lentille claire',
    category: 'lens',
    price: 10,
    attributes: [],
    powers: [],
    colors: [],
    ips: []
  },
  {
    pn: 'wfr',
    desc: 'Lentille blanche givrée ronde',
    category: 'lens',
    price: 10,
    attributes: [],
    powers: [],
    colors: [],
    ips: []
  },
  {
    pn: 'wor',
    desc: 'Lentille blanche opaline ronde',
    category: 'lens',
    price: 10,
    attributes: [],
    powers: [],
    colors: [],
    ips: []
  },
  {
    pn: 'wfs',
    desc: 'Lentille blanche givrée carrée',
    category: 'lens',
    price: 10,
    attributes: [],
    powers: [],
    colors: [],
    ips: []
  },
  {
    pn: 'wos',
    desc: 'Lentille blanche opaline carrée',
    category: 'lens',
    price: 10,
    attributes: [],
    powers: [],
    colors: [],
    ips: []
  },
  //endcaps
  {
    pn: '0200',
    desc: 'Embout 0200',
    category: 'endcap',
    price: 1,
    attributes: [],
    powers: [],
    colors: [],
    ips: []
  },
  {
    pn: '0025',
    desc: 'Embout 0025',
    category: 'endcap',
    price: 1,
    attributes: [ "Embout pour profilé série 1012" ],
    powers: [],
    colors: [],
    ips: []
  },
  {
    pn: '0050',
    desc: 'Embout 0050',
    category: 'endcap',
    price: 1,
    attributes: [ "Embout pour profilé série 1012", "Lentille focus seulement" ],
    powers: [],
    colors: [],
    ips: []
  },
  {
    pn: '0075',
    desc: 'Embout 0075',
    category: 'endcap',
    price: 1,
    attributes: [ "Embout pour profilé série 1013" ],
    powers: [],
    colors: [],
    ips: []
  },
  {
    pn: '0175',
    desc: 'Embout 0175',
    category: 'endcap',
    price: 1,
    attributes: [ "Embout pour profilé série 2020", "Lentille carrée seulement" ],
    powers: [],
    colors: [],
    ips: []
  },
  {
    pn: '0150',
    desc: 'Embout 0150',
    category: 'endcap',
    price: 1,
    attributes: [ "Embout pour profilé série 2020", "Lentille ronde seulement" ],
    powers: [],
    colors: [],
    ips: []
  },
  //brackets
  {
    pn: '2025',
    desc: 'Braquette 2025',
    category: 'bracket',
    price: 1,
    attributes: [ "Braquette pour profilé série 1011 1012 1013" ],
    powers: [],
    colors: [],
    ips: []
  },
  {
    pn: '2050',
    desc: 'Braquette 2050',
    category: 'bracket',
    price: 1,
    attributes: [ "Braquette pour profilé série 1011 1012 1013" ],
    powers: [],
    colors: [],
    ips: []
  },
  {
    pn: '2075',
    desc: 'Braquette 2075',
    category: 'bracket',
    price: 1,
    attributes: [ "Braquette pour profilé série 1011 1012 1013" ],
    powers: [],
    colors: [],
    ips: []
  },
  {
    pn: '2175',
    desc: 'Braquette 2175',
    category: 'bracket',
    price: 1,
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
    price: 1,
    attributes: [ "60 DEL AU MÈTRE", "312 LM/M", "4.8 W/M", "CHAQUE 3 DEL", "8MM DE LARGEUR", "120 DEGRÉS" ],
    powers: ["12V DC", "24V DC" ],
    colors: [ "3000K", "3500K", "4000K" ],
    ips: [ "22", "65", "68" ]
  },
  {
    pn: '3528-120',
    desc: 'RUBAN 3528-120',
    category: 'strip',
    price: 1,
    attributes: [ "120 DEL AU MÈTRE", "720 LM/M", "9.6 W/M", "CHAQUE 3 DEL", "9MM DE LARGEUR", "120 DEGRÉS" ],
    powers: [ "12V DC" ],
    colors: [ "3000K", "3500K", "4000K" ],
    ips: [ "22", "65", "68" ]
  },
  {
    pn: '5050-60-RGB',
    desc: 'RUBAN 5050-60-RGB',
    category: 'strip',
    price: 1,
    attributes: [ "60 DEL AU MÈTRE", "1250 LM/M", "14.4 W/M", "CHAQUE 3 DEL (12V) - CHAQUE 6 DEL (24V)", "10MM DE LARGEUR", "120 DEGRÉS" ],
    powers: [ "12V DC", "24V DC" ],
    colors: [ "RGB = Rouge, vert et bleu" ],
    ips: [ "22", "65", "68" ]
  },
  {
    pn: '5050-72',
    desc: 'RUBAN 5050-72',
    category: 'strip',
    price: 1,
    attributes: [ "72 DEL AU MÈTRE", "1602 LM/M", "17.8 W/M", "CHAQUE DEL", "10MM DE LARGEUR", "120 DEGRÉS" ],
    powers: [ "12V DC" ],
    colors: [ "3000K", "3500K", "4000K" ],
    ips: [ "22", "68" ]
  },
  {
    pn: '5630-60',
    desc: 'RUBAN 5630-60',
    category: 'strip',
    price: 1,
    attributes: [ "60 DEL AU MÈTRE", "1750 LM/M", "21.7 W/M", "CHAQUE 6 DEL", "14MM DE LARGEUR", "120 DEGRÉS" ],
    powers: [ "24V DC" ],
    colors: [ "3000K", "3500K", "4000K" ],
    ips: [ "43", "67" ]
  }
];

let generateProducts = () => {
  for ( let i = 0; i < products.length; i++ ) {
    let productExist = _checkIfProductExist( products[ i ] );
    if ( !productExist ) {
      _createProduct( products[ i ] );
    }
  }
};

let _checkIfProductExist = ( product ) => {
  return Products.findOne( { pn: product.pn } );
};

let _createProduct = ( product ) => {
  Products.insert( product );
};

Modules.server.generateProducts = generateProducts;
