Template.managers.onCreated( () => {
  Template.instance().subscribe( 'products' );
  Template.instance().subscribe( 'prices' );
});

Template.managers.helpers({
  profiles: function() {
    let profiles = Products.find({ category: "profile" });

    if ( profiles ) {
      return profiles;
    }
  },
  lenses: function() {
    let lenses = Products.find({ category: "lens" });

    if ( lenses ) {
      return lenses;
    }
  },
  endcaps: function() {
    let endcaps = Products.find({ category: "endcap" });

    if ( endcaps ) {
      return endcaps;
    }
  },
  brackets: function() {
    let brackets = Products.find({ category: "bracket" });

    if ( brackets ) {
      return brackets;
    }
  },
  strips: function() {
    let strips = Products.find({ category: "strip" });

    if ( strips ) {
      return strips;
    }
  },
  drivers: function() {
    let drivers = Products.find({ category: "drivers" });

    if ( drivers ) {
      return drivers;
    }
  },
  others: function() {
    let others = Products.find({ category: "other" });

    if ( others ) {
      return others;
    }
  },
  prices: function() {
    let prices = Prices.find();

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
  //save for profiles
  'click .profiles-save' (event) {
    $("tr.profile").each( function() {
      let attributes = [];
      //find all attribute in subtable
      $(this).find('td.attribute').each( function() {
        //save all attributes for the method call
        attributes.push($(this).text());
      });
      //call method to update profile with elements on page
      Meteor.call( "updateProduct", {
        pn: $(this).find('td.id').text(),
        desc: $(this).find('td.description').text(),
        category: $(this).find('td.category').text(),
        cost: Number($(this).find('td.cost').text()),
        attributes: attributes,
        powers: [],
        colors: [],
        ips: []
      }, ( error, response ) => {
        if ( error ) {
          Bert.alert({
            message: error.reason,
            type: 'warning',
            style: 'growl-top-right'
          });
        } else {
          //send out message
          Bert.alert({
            message: "Profilés sauvegardés!",
            type: 'success',
            style: 'growl-top-right'
          });
        }
      });
    });
  },
  //save the lens
  'click .lens-save' (event) {
    $("tr.lens").each( function() {
      let attributes = [];
      //find all attribute in subtable
      $(this).find('td.attribute').each( function() {
        //save all attributes for the method call
        attributes.push($(this).text());
      });
      //call method to update lens with elements on page
      Meteor.call( "updateProduct", {
        pn: $(this).find('td.id').text(),
        desc: $(this).find('td.description').text(),
        category: $(this).find('td.category').text(),
        cost: Number($(this).find('td.cost').text()),
        attributes: attributes,
        powers: [],
        colors: [],
        ips: []
      }, ( error, response ) => {
        if ( error ) {
          Bert.alert({
            message: error.reason,
            type: 'warning',
            style: 'growl-top-right'
          });
        } else {
          //send out message
          Bert.alert({
            message: "Lentilles sauvegardés!",
            type: 'success',
            style: 'growl-top-right'
          });
        }
      });
    });
  },
  //save the endcaps
  'click .endcaps-save' (event) {
    $("tr.endcaps").each( function() {
      let attributes = [];
      //find all attribute in subtable
      $(this).find('td.attribute').each( function() {
        //save all attributes for the method call
        attributes.push($(this).text());
      });
      //call method to update endcaps with elements on page
      Meteor.call( "updateProduct", {
        pn: $(this).find('td.id').text(),
        desc: $(this).find('td.description').text(),
        category: $(this).find('td.category').text(),
        cost: Number($(this).find('td.cost').text()),
        attributes: attributes,
        powers: [],
        colors: [],
        ips: []
      }, ( error, response ) => {
        if ( error ) {
          Bert.alert({
            message: error.reason,
            type: 'warning',
            style: 'growl-top-right'
          });
        } else {
          //send out message
          Bert.alert({
            message: "Embouts sauvegardés!",
            type: 'success',
            style: 'growl-top-right'
          });
        }
      });
    });
  },
  //save the brackets
  'click .brackets-save' (event) {
    $("tr.brackets").each( function() {
      let attributes = [];
      //find all attribute in subtable
      $(this).find('td.attribute').each( function() {
        //save all attributes for the method call
        attributes.push($(this).text());
      });
      //call method to update brackets with elements on page
      Meteor.call( "updateProduct", {
        pn: $(this).find('td.id').text(),
        desc: $(this).find('td.description').text(),
        category: $(this).find('td.category').text(),
        cost: Number($(this).find('td.cost').text()),
        attributes: attributes,
        powers: [],
        colors: [],
        ips: []
      }, ( error, response ) => {
        if ( error ) {
          Bert.alert({
            message: error.reason,
            type: 'warning',
            style: 'growl-top-right'
          });
        } else {
          //send out message
          Bert.alert({
            message: "Braquettes sauvegardés!",
            type: 'success',
            style: 'growl-top-right'
          });
        }
      });
    });
  },
  //save the strips
  'click .strips-save' (event) {
    $("tr.strips").each( function() {
      let attributes = [],
          powers = [],
          colors = [],
          ips = [];
      //find all attribute in subtable
      $(this).find('td.attribute').each( function() {
        //save all attributes for the method call
        attributes.push($(this).text());
      });
      //find all powers in subtable
      $(this).find('td.power').each( function() {
        //save all powers for the method call
        powers.push($(this).text());
      });
      //find all colors in subtable
      $(this).find('td.color').each( function() {
        //save all colors for the method call
        colors.push($(this).text());
      });
      //find all ips in subtable
      $(this).find('td.ip').each( function() {
        //save all ips for the method call
        ips.push($(this).text());
      });
      //call method to update strips with elements on page
      Meteor.call( "updateProduct", {
        pn: $(this).find('td.id').text(),
        desc: $(this).find('td.description').text(),
        category: $(this).find('td.category').text(),
        cost: Number($(this).find('td.cost').text()),
        attributes: attributes,
        powers: powers,
        colors: colors,
        ips: ips
      }, ( error, response ) => {
        if ( error ) {
          Bert.alert({
            message: error.reason,
            type: 'warning',
            style: 'growl-top-right'
          });
        } else {
          //send out message
          Bert.alert({
            message: "Rubans sauvegardés!",
            type: 'success',
            style: 'growl-top-right'
          });
        }
      });
    });
  },
  //save the drivers
  'click .drivers-save' (event) {
    $("tr.drivers").each( function() {
      let attributes = [],
          powers = [];
      //find all attribute in subtable
      $(this).find('td.attribute').each( function() {
        //save all attributes for the method call
        attributes.push($(this).text());
      });
      //find all powers in subtable
      $(this).find('td.power').each( function() {
        //save all powers for the method call
        powers.push($(this).text());
      });
      //call method to update drivers with elements on page
      Meteor.call( "updateProduct", {
        pn: $(this).find('td.id').text(),
        desc: $(this).find('td.description').text(),
        category: $(this).find('td.category').text(),
        cost: Number($(this).find('td.cost').text()),
        attributes: attributes,
        powers: powers,
        colors: [],
        ips: []
      }, ( error, response ) => {
        if ( error ) {
          Bert.alert({
            message: error.reason,
            type: 'warning',
            style: 'growl-top-right'
          });
        } else {
          //send out message
          Bert.alert({
            message: "Transformateurs sauvegardés!",
            type: 'success',
            style: 'growl-top-right'
          });
        }
      });
    });
  },
  //save the others
  'click .others-save' (event) {
    $("tr.others").each( function() {
      //call method to update others with elements on page
      Meteor.call( "updateProduct", {
        pn: $(this).find('td.id').text(),
        desc: $(this).find('td.description').text(),
        category: $(this).find('td.category').text(),
        cost: Number($(this).find('td.cost').text()),
        attributes: [],
        powers: [],
        colors: [],
        ips: []
      }, ( error, response ) => {
        if ( error ) {
          Bert.alert({
            message: error.reason,
            type: 'warning',
            style: 'growl-top-right'
          });
        } else {
          //send out message
          Bert.alert({
            message: "Autres sauvegardés!",
            type: 'success',
            style: 'growl-top-right'
          });
        }
      });
    });
  },
  //save the prices
  'click .prices-save' (event) {
    //get the prices factors ID in the DB since we know there is only one entry
    //call method to update prices with elements on page
    Meteor.call( "updatePrices", {
      id: Prices.findOne()._id,
      multiplierNRG: Number($('td.multiplierNRG').text()),
      multiplierMaster: Number($('td.multiplierMaster').text()),
      multiplierProvincial: Number($('td.multiplierProvincial').text()),
      multiplierRegional: Number($('td.multiplierRegional').text()),
      multiplierClient: Number($('td.multiplierClient').text())
    }, ( error, response ) => {
      if ( error ) {
        Bert.alert({
          message: error.reason,
          type: 'warning',
          style: 'growl-top-right'
        });
      } else {
        //send out message
        Bert.alert({
          message: "Facteurs sauvegardés!",
          type: 'success',
          style: 'growl-top-right'
        });
      }
    });
  }
});
