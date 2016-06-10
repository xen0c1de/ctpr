let products = [
  {
    pn: '1011',
    desc: 'Profilé aluminium 1011',
    category: 'profile',
    price: 10,
    properties: ["Largeur: Xmm", "Hauteur: Xmm"]
  },
  {
    pn: '0200',
    desc: 'Embout 0200',
    category: 'endcap',
    price: 1,
    properties: []
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
