let products = [
  //profiles
  {
    pn: '1011',
    desc: 'Profilé aluminium 1011',
    category: 'profile',
    price: 10,
    properties: ["Largeur: Xmm", "Hauteur: Xmm"]
  },
  {
    pn: '1012',
    desc: 'Profilé aluminium 1012',
    category: 'profile',
    price: 10,
    properties: ["Largeur: Xmm", "Hauteur: Xmm"]
  },
  {
    pn: '1013',
    desc: 'Profilé aluminium 1013',
    category: 'profile',
    price: 10,
    properties: ["Largeur: Xmm", "Hauteur: Xmm"]
  },
  {
    pn: '2020',
    desc: 'Profilé aluminium 2020',
    category: 'profile',
    price: 10,
    properties: ["Largeur: Xmm", "Hauteur: Xmm"]
  },
  //lenses
  {
    pn: 'wo',
    desc: 'Lentille blanche opaline',
    category: 'lens',
    price: 10,
    properties: []
  },
  {
    pn: 'tr',
    desc: 'Lentille de diffusion',
    category: 'lens',
    price: 10,
    properties: []
  },
  {
    pn: 'wf',
    desc: 'Lentille blanche givrée',
    category: 'lens',
    price: 10,
    properties: []
  },
  {
    pn: 'fo',
    desc: 'Lentille de focus',
    category: 'lens',
    price: 10,
    properties: []
  },
  {
    pn: 'cl',
    desc: 'Lentille claire',
    category: 'lens',
    price: 10,
    properties: []
  },
  {
    pn: 'wfr',
    desc: 'Lentille blanche givrée ronde',
    category: 'lens',
    price: 10,
    properties: []
  },
  {
    pn: 'wor',
    desc: 'Lentille blanche opaline ronde',
    category: 'lens',
    price: 10,
    properties: []
  },
  {
    pn: 'wfs',
    desc: 'Lentille blanche givrée carrée',
    category: 'lens',
    price: 10,
    properties: []
  },
  {
    pn: 'wos',
    desc: 'Lentille blanche opaline carrée',
    category: 'lens',
    price: 10,
    properties: []
  },
  //endcaps
  {
    pn: '0200',
    desc: 'Embout 0200',
    category: 'endcap',
    price: 1,
    properties: ["Embout pour profilé série 1011"]
  },
  {
    pn: '0025',
    desc: 'Embout 0025',
    category: 'endcap',
    price: 1,
    properties: ["Embout pour profilé série 1012"]
  },
  {
    pn: '0050',
    desc: 'Embout 0050',
    category: 'endcap',
    price: 1,
    properties: ["Embout pour profilé série 1012","Lentille focus seulement"]
  },
  {
    pn: '0075',
    desc: 'Embout 0075',
    category: 'endcap',
    price: 1,
    properties: ["Embout pour profilé série 1013"]
  },
  {
    pn: '0175',
    desc: 'Embout 0175',
    category: 'endcap',
    price: 1,
    properties: ["Embout pour profilé série 2020","Lentille carrée seulement"]
  },
  {
    pn: '0150',
    desc: 'Embout 0150',
    category: 'endcap',
    price: 1,
    properties: ["Embout pour profilé série 2020","Lentille ronde seulement"]
  },
  //brackets
  {
    pn: '2025',
    desc: 'Braquette 2025',
    category: 'bracket',
    price: 1,
    properties: ["Braquette pour profilé série 1011 1012 1013"]
  },
  {
    pn: '2050',
    desc: 'Braquette 2050',
    category: 'bracket',
    price: 1,
    properties: ["Braquette pour profilé série 1011 1012 1013"]
  },
  {
    pn: '2075',
    desc: 'Braquette 2075',
    category: 'bracket',
    price: 1,
    properties: ["Braquette pour profilé série 1011 1012 1013"]
  },
  {
    pn: '2175',
    desc: 'Braquette 2175',
    category: 'bracket',
    price: 1,
    properties: ["Braquette pour profilé série 2020"]
  },
  //strips
  {
    pn: '3528-60',
    desc: 'RUBAN 3528-60',
    category: 'strip',
    price: 1,
    properties: [
      "60 DEL AU MÈTRE",
      "12V DC (24V DC DISPONIBLE)",
      "CHAQUE 3 DEL",
      "8MM DE LARGEUR",
      "120 DEGRÉS",
      "3000K - 3500K - 4000K",
      "312 LM/M",
      "4.8 W/M",
      "22 - 65 - 68"
    ]
  },
  {
    pn: '3528-120',
    desc: 'RUBAN 3528-120',
    category: 'strip',
    price: 1,
    properties: [
      "120 DEL AU MÈTRE",
      "12V DC",
      "CHAQUE 3 DEL",
      "9MM DE LARGEUR",
      "120 DEGRÉS",
      "3000K - 3500K - 4000K",
      "720 LM/M",
      "9.6 W/M",
      "22 - 65 - 68"
    ]
  },
  {
    pn: '5050-60-RGB',
    desc: 'RUBAN 5050-60-RGB',
    category: 'strip',
    price: 1,
    properties: [
      "60 DEL AU MÈTRE",
      "12-24V DC",
      "CHAQUE 6 DEL (24V) - CHAQUE 3 DEL (12V)",
      "10MM DE LARGEUR",
      "120 DEGRÉS",
      "RGB = Rouge, vert et bleu",
      "1250 LM/M",
      "14.4 W/M",
      "22 - 65 - 68"
    ]
  },
  {
    pn: '5050-72',
    desc: 'RUBAN 5050-72',
    category: 'strip',
    price: 1,
    properties: [
      "72 DEL AU MÈTRE",
      "12V DC",
      "CHAQUE DEL",
      "10MM DE LARGEUR",
      "120 DEGRÉS",
      "3000K - 3500K - 4000K",
      "1602 LM/M",
      "17.8 W/M",
      "22 - 68"
    ]
  },
  {
    pn: '5630-60',
    desc: 'RUBAN 5630-60',
    category: 'strip',
    price: 1,
    properties: [
      "60 DEL AU MÈTRE",
      "24V DC",
      "CHAQUE 6 DEL",
      "14MM DE LARGEUR",
      "120 DEGRÉS",
      "3000K - 3500K - 4000K",
      "1750 LM/M",
      "21.7 W/M",
      "43 - 67"
    ]
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
