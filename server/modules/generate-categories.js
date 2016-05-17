let categories = [
  {
    name: 'Psycotherapeute'
  },
  {
    name: 'Phisiotherapeute'
  },
  {
    name: 'Psycologue'
  },
  {
    name: 'Dentiste'
  },
  {
    name: 'Travailleuse Sociale'
  },
  {
    name: 'Diethétiste'
  }
];

let generateCategories = () => {
  categoriesExist = _checkIfCategoriesExist();

  if ( !categoriesExist ) {
    _createCategories( categories );
  }
};

let _checkIfCategoriesExist = () => {
  let categoryCount = Categories.find().count();
  return categoryCount = 0 ? false : true;
};

let _createCategories = ( categories ) => {
  for ( let i = 0; i < categories.length; i++ ) {
    let category = categories[ i ],
        categoryExists = _checkIfcategoryExists( category.name );

    if ( !categoryExists ) {
      Categories.insert( category );
    }
  }
};

let _checkIfcategoryExists = ( name ) => {
  return Categories.findOne( { 'name': name } );
};

Modules.server.generateCategories = generateCategories;
