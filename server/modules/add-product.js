let newProduct = ( options ) => {
  _insertProduct( options );
};

let _insertProduct = ( product ) => {
  Products.insert( product );
};

Modules.server.addProduct = newProduct;
