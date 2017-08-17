/*
Unselects the selected product in argument category if there was one.
Checks for special case in strip and lens products
*/
let unselect = function( category ) {
  //if a product of same category was already selected
  if( $("."+category).hasClass("selected") ) {
    var old_pn = $("."+category+".selected")[0].id;
    //remove other selection
    $("."+category).removeClass("selected");
    //remove from sidebar
    $("li."+category).remove();
    //clear part from complete code
    $("."+category+"-code").empty();
    //if category is strip, do extra cleanup
    if( category === "strip" ) {
      //remove greyout from other strips
      $(".strip").removeClass("greyout");
      //reset options checked on radios
      $( "input[type=radio]."+old_pn+":checked" ).prop('checked', false);
    }
    //if category is lens, do extra cleanup
    if( category === "lens" ) {
      //reset options checked on radios
      $( "input[type=radio]."+old_pn+":checked" ).prop('checked', false);
    }
  }
}

/*
Selects a clicked product by highlighting it. In the case of profile and strips
it also grey's out the other items.
*/
let select = function( pn ) {
  //go fetch product in DB
  var product = Products.find({ pn: pn }).fetch()[0];
      category = product.category;

  //unselect item selected in category
  unselect(category);
  //select the clicked item
  $("#"+pn).addClass("selected");
  //special greyout of other products listed if profile or strip
  if( category === "profile" || category === "strip" ) {
    //greyout other items
    $("."+category).addClass("greyout");
    $("#"+pn).removeClass("greyout");
  }
  //add selected to sidebar
  $(".item-list").append('<li class="'+category+'">'+product.desc+'</li>');
  //start building complete product code
  $("."+category+"-code").append(pn+'-');
};

Template.home.onCreated( () => {
  Template.instance().subscribe( 'products' );
});

Template.home.helpers({
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
  strips: function() {
    var strips = Products.find({ category: "strip" });

    if ( strips ) {
      return strips;
    }
  },
  onePower: function( pn ) {
    let strip = Products.findOne({ pn: pn });
    return strip.powers.length == 1
  },
  oneColor: function( pn ) {
    let strip = Products.findOne({ pn: pn });
    return strip.colors.length == 1
  },
  oneIp: function( pn ) {
    let strip = Products.findOne({ pn: pn });
    return strip.ips.length == 1
  }
});

Template.home.events({
  //hides the "cart" to better see page
  'click .cart-hide' (event) {
    $(".cart-show:hidden").show();
    $(".cart-hide").hide();
    $(".resume").fadeOut(300);
    $(".footer").fadeOut(300);
    $(".cart").animate({'width':'130px','height':'120px'}, 300);
  },
  //shows the cart on click
  'click .cart-show' (event) {
    $(".cart-hide").show();
    $(".cart-show").hide();
    $(".cart").css('width','25%');
    $(".cart").css('height','auto');
    $(".resume").fadeIn(300);
    $(".footer").fadeIn(300);
  },
  //clicking the reset button resets everything
  'click .reset' () {
    //save ids to session
    Session.set("strip_id","");
    Session.set("profile_id","");
    Session.set("endcap_id","");
    Session.set("bracket_id","");
    Session.set("lens_id","");
    //refresh page
    location.reload();
  },
  //clicking the continue button takes you to the next step
  'click .continue' (event) {
    //check items have been selected
    if ( $(".profile").hasClass("selected") && $(".lens").hasClass("selected") &&
         $(".strip").hasClass("selected") ) {

      //get the selected ids
      var strip_id = $(".strip.selected")[0].id;
      var profile_id = $(".profile.selected")[0].id;
      var lens_id = $(".lens.selected")[0].id;
    } else {
      //else don't open modal window and show message
      event.stopPropagation();
      Bert.alert({
        hideDelay: 4000,
        message: 'Vous devez faire un choix dans chaque catégorie avant de continuer.',
        type: 'warning',
        style: 'growl-top-right'
      });
    }
    //check that all inputs have been selected
    if ( $("input[type=radio][name=power]."+strip_id+":checked").length == 1 &&
         $("input[type=radio][name=color]."+strip_id+":checked").length == 1 &&
         $("input[type=radio][name=ip]."+strip_id+":checked").length == 1 ) {

      //save ids to session
      Session.set("strip_id",strip_id);
      Session.set("profile_id",profile_id);
      Session.set("lens_id",lens_id);

      //grab all items from cart and copy them to modal window cart
      $( ".item-list li" ).each( function(){
        let item = $(this).text();
        $( "#item-list" ).append( "<li>"+item+"</li>" );
      });
      //save the product code for the email
      $("#codeId").append(
        $(".profile-code").text() +
        $(".lens-code").text() +
        $(".strip-code").text()
      );
    }
    else {
      //else don't open modal window and show message
      event.stopPropagation();
      Bert.alert({
        hideDelay: 4000,
        message: 'Vous devez faire un choix dans chaque catégorie avant de continuer.',
        type: 'warning',
        style: 'growl-top-right'
      });
    }
  },
  //when we select a profilé
  'click .profile' (event) {
    //get the id of current click target
    var profile_id = event.currentTarget.id;
    //if this isn't the already selected profile
    if( !$("#"+profile_id).hasClass("selected") ) {
      //reset ui by removing all greyout items except for strips
      $(".profile").removeClass("selected");
      $(".lens").removeClass("selected");
      $(".profile").removeClass("greyout");
      $(".lens").removeClass("greyout");
      //clear cart except for strips
      $("li.profile").remove();
      $("li.lens").remove();
      //clear profile part of the complete code except for strips
      $(".profile-code").empty();
      $(".lens-code").empty();
      //select clicked one
      select( profile_id );
      //show the lens section
      $("#lens").show();
      $(".lens").show();
      //do actions depending on which profile selected
      switch (profile_id) {
        case "2020C":
          //greyout non-compatible lens
          $("#STD").addClass("greyout");
          //set bracket
          Session.set("bracket_id","2175");
          break;
        default:
          //greyout non-compatible lens
          $("#CSTD").addClass("greyout");
          $("#CCR").addClass("greyout");
          //call selection procedure since only one lens is available
          $("#STD").trigger("click");
          //set bracket
          Session.set("bracket_id","2025");
          break;
      }
    }
  },
  //when we click on a lens
  'click .lens' (event) {
    //get the id of current click target
    var lens_id = event.currentTarget.id;
        profile_id = $(".profile.selected")[0].id;

    //check that a profile was selected first
    //and that this isn't the already selected lens
    //and that it isn't greyed out (invalid selection)
    if( $(".profile").hasClass("selected") && !$("#"+lens_id).hasClass("selected") && !$("#"+lens_id).hasClass("greyout") ){
      //call selection procedure
      select(lens_id);

      //check if this lens has only one radio option
      if( $( 'input[type=radio][name="color"].'+lens_id ).length === 1 ) {
        //if so, select it automatically
        $( 'input[type=radio][name="color"].'+lens_id ).prop('checked', true).trigger("change");
      }

      //depending on which profile was selected
      switch (profile_id) {
        case "1806":
          //set endcap
          Session.set("endcap_id","0200");
          break;
        case "1811":
          //set endcap
          Session.set("endcap_id","0025");
          break;
        case "2611R":
          //set endcap
          Session.set("endcap_id","0075");
          break;
        case "2020C":
          if( lens_id === "CSTD" ){
            //set endcap
            Session.set("endcap_id","0150");
          }
          else if( lens_id === "CCR" ) {
            //set endcap
            Session.set("endcap_id","0175");
          }
          break;
        default:
          break;
      }
    }
  },
  //when we click on a strip
  'click .strip' (event) {
    //get the id of current click target
    var strip_id = event.currentTarget.id;
    //check if this isn't the one that's already selected
    if( !$("#"+strip_id).hasClass("selected") ) {
      //select the clicked strip_id
      select(strip_id);
      //if strip has single radio options, select them.
      if( $('input[type=radio][name="power"].'+strip_id ).length === 1 ) {
        $( 'input[type=radio][name="power"].'+strip_id ).prop('checked', true).trigger("change");
      }
      if( $( 'input[type=radio][name="color"].'+strip_id ).length === 1 ) {
        $( 'input[type=radio][name="color"].'+strip_id ).prop('checked', true).trigger("change");
      }
      if( $( 'input[type=radio][name="ip"].'+strip_id ).length === 1 ) {
        $( 'input[type=radio][name="ip"].'+strip_id ).prop('checked', true).trigger("change");
      }
    }
  },
  //when a radio change is triggered
  'change input[type=radio]' (event) {
    //get the clicked element's id
    let element_id = $(event.target).prop('class');
    //check if this is a strip click
    if( $(event.target).closest("#"+element_id).hasClass('strip') ) {
      let strip_id = element_id;
      //remove from sidebar
      $("li.strip").remove();
      //clear strip part of the complete code
      $(".strip-code").empty();
      //get strip for Description and also get current changed value
      let strip = Products.find({ pn: strip_id }).fetch();

      //grab currently selected options on this strip if any
      var options = $( "input[type=radio]."+strip_id+":checked" );
          toAppend = '<li class="strip">'+strip[0].desc+' ';
          productCodeAppend = ""+strip_id;

      //grab all options selected and append them to the string
      for( let i=0;i<options.length;i++ ) {
        toAppend = toAppend + options[i].value + ' ';
        productCodeAppend = productCodeAppend + '-' + options[i].value
      }
      $(".item-list").append(toAppend+'</li>');
      //building complete product code
      $(".strip-code").append(productCodeAppend);
    }
    //else is it a lens click
    else if ( $(event.target).closest("#"+element_id).hasClass('lens') ) {
      let lens_id = element_id;
      //remove from sidebar
      $("li.lens").remove();
      //clear lens part of the complete code
      $(".lens-code").empty();
      //get lens for Description and also get current changed value
      let lens = Products.find({ pn: lens_id }).fetch();

      //grab currently selected options on this lens if any
      var options = $( "input[type=radio]."+lens_id+":checked" );
          toAppend = '<li class="lens">'+lens[0].desc+' ' + options[0].value + ' ';
          lensMaterial = "";
      //adding item to list
      $(".item-list").append(toAppend+'</li>');

      //check lens material value to put abreviation in code instead of full name
      //TODO this is ugly, should be in database but lacking time
      switch (options[0].value) {
        case "Opaline":
            lensMaterial = "OP";
          break;
        case "Givrée":
            lensMaterial = "FR";
          break;
        case "Claire":
            lensMaterial = "CL";
          break;
        default:
          break;
      }

      //building complete product code
      var productCodeAppend = ""+lens_id + '-' + lensMaterial + '-';
      $(".lens-code").append(productCodeAppend);
    }
  }
});
