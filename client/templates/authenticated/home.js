/*
Unselects the selected product in passed category if there was one.
Checks for special case in strip products
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
    //empty cart
    $(".item-list").empty();
    //remove all selection
    $(".selected").removeClass("selected");
    //ungreyout all items
    $(".greyout").removeClass("greyout");
    //reset options checked on radios
    $( "input[type=radio]:checked" ).prop('checked', false);
    //empty complete code section
    $(".profile-code").empty();
    $(".lens-code").empty();
    $(".endcap-code").empty();
    $(".bracket-code").empty();
    $(".strip-code").empty();
    //save ids to session
    Session.set("strip_id","");
    Session.set("profile_id","");
    Session.set("endcap_id","");
    Session.set("lens_id","");
    Session.set("bracket_id","");
  },
  //clicking the continue button takes you to the next step
  'click .continue' (event) {
    //get the selected ids
    var strip_id = $(".strip.selected")[0].id;
    var profile_id = $(".profile.selected")[0].id;
    var lens_id = $(".lens.selected")[0].id;
    var endcap_id = $(".endcap.selected")[0].id;
    var bracket_id = $(".bracket.selected")[0].id;
    //save ids to session
    Session.set("strip_id",strip_id);
    Session.set("profile_id",profile_id);
    Session.set("endcap_id",endcap_id);
    Session.set("lens_id",lens_id);
    Session.set("bracket_id",bracket_id);
    //check that all items have been selected
    if ( $(".profile").hasClass("selected") &&
          $(".lens").hasClass("selected") &&
          $(".endcap").hasClass("selected") &&
          $(".bracket").hasClass("selected") &&
          $(".strip").hasClass("selected") &&
          $("input[type=radio][name=power]."+strip_id+":checked").length == 1 &&
          $("input[type=radio][name=color]."+strip_id+":checked").length == 1 &&
          $("input[type=radio][name=ip]."+strip_id+":checked").length == 1 ) {
      //grab all items from cart and copy them to modal window cart
      $( ".item-list li" ).each( function(){
        let item = $(this).text();
        $( "#item-list" ).append( "<li>"+item+"</li>" );
      });
      //save the product code for the email
      $("#codeId").append(
        $(".profile-code").text() +
        $(".lens-code").text() +
        $(".endcap-code").text() +
        $(".bracket-code").text() +
        $(".strip-code").text()
      );
    }
    else {
      //else don't open modal window and show message
      event.stopPropagation()
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
    //if this isn't the selected profile
    if( !$("#"+profile_id).hasClass("selected") ) {
      //reset ui by removing all greyout items except for strips
      $(".profile").removeClass("selected");
      $(".lens").removeClass("selected");
      $(".bracket").removeClass("selected");
      $(".profile").removeClass("greyout");
      $(".lens").removeClass("greyout");
      $(".bracket").removeClass("greyout");
      //hide all endcaps aside from no-endcap option
      $(".endcap").hide();
      $("#NOE:hidden").show();
      //clear cart except for strips
      $("li.profile").remove();
      $("li.lens").remove();
      $("li.endcap").remove();
      $("li.bracket").remove();
      //clear profile part of the complete code except for strips
      $(".profile-code").empty();
      $(".lens-code").empty();
      $(".endcap-code").empty();
      $(".bracket-code").empty();
      //select clicked one
      select( profile_id );
      //do actions depending on which profile selected
      switch (profile_id) {
        case "1011":
          //greyout non-compatible lens
          $("#FO").addClass("greyout");
          $("#WFR").addClass("greyout");
          $("#WOR").addClass("greyout");
          $("#WFS").addClass("greyout");
          $("#WOS").addClass("greyout");
          //greyout non-compatible brackets
          $("#2175").addClass("greyout");
          break;
        case "1012":
          //greyout non-compatible lens
          $("#WFR").addClass("greyout");
          $("#WOR").addClass("greyout");
          $("#WFS").addClass("greyout");
          $("#WOS").addClass("greyout");
          //greyout non-compatible brackets
          $("#2175").addClass("greyout");
          break;
        case "1013":
          //greyout non-compatible lens
          $("#FO").addClass("greyout");
          $("#WFR").addClass("greyout");
          $("#WOR").addClass("greyout");
          $("#WFS").addClass("greyout");
          $("#WOS").addClass("greyout");
          //greyout non-compatible brackets
          $("#2175").addClass("greyout");
          break;
        case "2020":
          //greyout non-compatible lens
          $("#WO").addClass("greyout");
          $("#TR").addClass("greyout");
          $("#WF").addClass("greyout");
          $("#FO").addClass("greyout");
          $("#CL").addClass("greyout");
          //greyout non-compatible brackets
          $("#2025").addClass("greyout");
          $("#2050").addClass("greyout");
          $("#2075").addClass("greyout");
          break;
        default:
          break;
      }
    }
  },
  //when we click on a lens
  'click .lens' (event) {
    //get the id of current click target
    var lens_id = event.currentTarget.id;
        profile_id = $(".profile.selected")[0].id;

    //if this is not a greyout item (which we do nothing with)
    if( !$("#"+lens_id).hasClass("greyout") ) {
      //check that a profile was selected first and that this isn't the already selected lens
      if( $(".profile").hasClass("selected") && !$("#"+lens_id).hasClass("selected") ){
        //call selection procedure
        select(lens_id);

        //hide all endcaps except the no endcap option
        $(".endcap").hide();
        $("#NOE:hidden").show();
        //if no lens option is selected
        if(lens_id === "NOL") {
          select("NOE");
        }
        else {
          //if NOE was selected unselect it
          if( $("#NOE").hasClass("selected") ) {
            unselect("endcap");
          }
          //depending on which profile was selected
          switch (profile_id) {
            case "1011":
              //show endcap that fit selection
              $("#0200:hidden").show();
              break;
            case "1012":
              if( lens_id === "FO" ){
                //show endcap that fit selection
                $("#0050:hidden").show();
              }
              else {
                //show endcap that fit selection
                $("#0025:hidden").show();
              }
              break;
            case "1013":
              //show endcap that fit selection
              $("#0075:hidden").show();
              break;
            case "2020":
              if( lens_id === "WFS" || lens_id === "WOS" ){
                //show endcap that fit selection
                $("#0175:hidden").show();
              }
              else if( lens_id === "WFR" || lens_id === "WOR" ) {
                //show endcap that fit selection
                $("#0150:hidden").show();
              }
              break;
            default:
              break;
          }
        }
      }
    }
  },
  //when we click on an endcap
  'click .endcap' (event) {
    //get the id of current click target
    var endcap_id = event.currentTarget.id;

    //if this is not a greyout item (which we do nothing with)
    if( !$("#"+endcap_id).hasClass("greyout") ) {
      //check that a profile was selected first and that this isn't the already selected endcap
      if( $(".profile").hasClass("selected") && !$("#"+endcap_id).hasClass("selected") ){
        //call selection procedure
        select(endcap_id);
      }
    }
  },
  //when we click on a bracket
  'click .bracket' (event) {
    //get the id of current click target
    var bracket_id = event.currentTarget.id;

    //if this is not a greyout item (which we do nothing with)
    if( !$("#"+bracket_id).hasClass("greyout") ) {
      //check that a profile was selected first and that this isn't the already selected bracket
      if( $(".profile").hasClass("selected") && !$("#"+bracket_id).hasClass("selected") ){
        //call selection procedure
        select(bracket_id);
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
    //get the strip id
    let strip_id = $(event.target).prop('class');
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
});
