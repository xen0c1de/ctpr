Template.managers.onCreated( () => {
  Template.instance().subscribe( 'products' );
  Template.instance().subscribe( 'prices' );
});

Template.managers.helpers({
  profiles: function() {
    var profiles = Products.find({ category: "profile" });

    if ( profiles ) {
      return profiles;
    }
  },
  lenses: function() {
    var lenses = Products.find({ category: "lens" });

    if ( lenses ) {
      return lenses;
    }
  },
  endcaps: function() {
    var endcaps = Products.find({ category: "endcap" });

    if ( endcaps ) {
      return endcaps;
    }
  },
  brackets: function() {
    var brackets = Products.find({ category: "bracket" });

    if ( brackets ) {
      return brackets;
    }
  },
  strips: function() {
    var strips = Products.find({ category: "strip" });

    if ( strips ) {
      return strips;
    }
  },
  drivers: function() {
    var drivers = Products.find({ category: "drivers" });

    if ( drivers ) {
      return drivers;
    }
  },
  others: function() {
    var others = Products.find({ category: "other" });

    if ( others ) {
      return others;
    }
  },
  prices: function() {
    var prices = Prices.find();

    if ( prices ) {
      return prices;
    }
  }
});

Template.managers.events({
  //Remove table row with delete button
  'click .table-remove' (event) {
    //call method to remove product
    Meteor.call( "removeProduct", this.pn, ( error, response ) => {
      if ( error ) {
        Bert.alert({
          message: error.reason,
          type: 'warning',
          style: 'growl-top-right'
        });
      } else {
        //remove item in interface
        $(event.currentTarget).parents('tr').remove();
        //send out message
        Bert.alert({
          message: "Produit supprimé!",
          type: 'success',
          style: 'growl-top-right'
        });
      }
    });
  },

  //SAVE BY SECTION!!
  'click .profiles-save' (event) {

  }
});
