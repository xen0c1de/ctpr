let select = function( pn ) {
  //go fetch product in DB
  var product = Products.find({ pn: pn }).fetch()[0];
  var category = product.category;
  //if a product on same category was selected was already selected
  if( $("."+category).hasClass("selected") ) {
    //remove other selection
    $("."+category).removeClass("selected");
    //remove from sidebar
    $("li."+category).remove();
    //clear part from complete code
    $("."+category"-code").empty();
  }
  //select the clicked item
  $("#"+pn).addClass("selected");
  //add selected to sidebar
  $(".item-list").append('<li class="'+category+'">'+product.desc+'</li>');
}

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
  onePowerLevel: function( pn ) {
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
  //hides the "cart" to better see page when mouse leaves the cart area
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
    $(".cart").animate({'width':'25%','height':'50%'}, 300);
    $(".resume").fadeIn(300);
    $(".footer").fadeIn(300);
  },
  //clicking the reset button resets everything
  'click .reset' () {
    $(".item-list").empty();
    $(".selected").removeClass("selected");
    $(".greyout_p").removeClass("greyout_p");
    $(".lens_grey").addClass("lens");
    $(".lens_grey").removeClass("lens_grey");
    $(".endcap_grey").addClass("endcap");
    $(".endcap_grey").removeClass("endcap_grey");
    $(".bracket_grey").addClass("bracket");
    $(".bracket_grey").removeClass("bracket_grey");
    $(".strip").removeClass("selected");
    $(".strip").removeClass("greyout_s");
    $(".profile-code").empty();
    $(".lens-code").empty();
    $(".endcap-code").empty();
    $(".bracket-code").empty();
    $(".strip-code").empty();
  },
  //clicking the continue button takes you to the next step
  'click .continue' (event) {
    //check that all items have been selected
    if ( $(".profile").hasClass("selected") &&
          $(".lens").hasClass("selected") &&
          $(".bracket").hasClass("selected") &&
          $(".strip").hasClass("selected") ) {
      //grab all items from cart and copy them to modal window cart
      $( ".item-list li" ).each( function(){
        let item = $(this).text();
        $( "#item-list" ).append( "<li>"+item+"</li>" );
      });
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
    if( !$("#"+profile_id).hasClass("selected") ) {
      //reset ui by removing all greyout items except for strips
      $(".selected").removeClass("selected");
      $(".greyout_p").removeClass("greyout_p");
      $(".lens_grey").addClass("lens");
      $(".lens_grey").removeClass("lens_grey");
      $(".endcap_grey").addClass("endcap");
      $(".endcap_grey").removeClass("endcap_grey");
      $(".bracket_grey").addClass("bracket");
      $(".bracket_grey").removeClass("bracket_grey");
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
      //select clicked one and greyout the rest
      $("#"+profile_id).addClass("selected");
      $(".profile").addClass("greyout_p");
      $("#"+profile_id).removeClass("greyout_p");
      //add selected to sidebar
      let profile = Products.find({ pn: profile_id }).fetch();
      $(".item-list").append('<li class="profile">'+profile[0].desc+'</li>');
      //start building complete product code
      $(".profile-code").append(profile_id+'-');
      //do actions depending on which profile selected
      switch (profile_id) {
        case "1011":
          //greyout non-compatible lens
          $("#WFR").removeClass("lens");
          $("#WFR").addClass("lens_grey");
          $("#WOR").removeClass("lens");
          $("#WOR").addClass("lens_grey");
          $("#WFS").removeClass("lens");
          $("#WFS").addClass("lens_grey");
          $("#WOS").removeClass("lens");
          $("#WOS").addClass("lens_grey");
          //greyout non-compatible endcaps
          $(".endcap").addClass("endcap_grey");
          $(".endcap").removeClass("endcap");
          $("#0200").removeClass("endcap_grey");
          $("#0200").addClass("endcap");
          //greyout non-compatible brackets
          $("#2175").addClass("bracket_grey");
          $("#2175").removeClass("bracket");
          break;
        case "1012":
          //greyout non-compatible lens
          $("#WFR").removeClass("lens");
          $("#WFR").addClass("lens_grey");
          $("#WOR").removeClass("lens");
          $("#WOR").addClass("lens_grey");
          $("#WFS").removeClass("lens");
          $("#WFS").addClass("lens_grey");
          $("#WOS").removeClass("lens");
          $("#WOS").addClass("lens_grey");
          //greyout non-compatible endcaps
          $(".endcap").addClass("endcap_grey");
          $(".endcap").removeClass("endcap");
          $("#0025").removeClass("endcap_grey");
          $("#0025").addClass("endcap");
          $("#0050").removeClass("endcap_grey");
          $("#0050").addClass("endcap");
          //greyout non-compatible brackets
          $("#2175").addClass("bracket_grey");
          $("#2175").removeClass("bracket");
          break;
        case "1013":
          //greyout non-compatible lens
          $("#WFR").removeClass("lens");
          $("#WFR").addClass("lens_grey");
          $("#WOR").removeClass("lens");
          $("#WOR").addClass("lens_grey");
          $("#WFS").removeClass("lens");
          $("#WFS").addClass("lens_grey");
          $("#WOS").removeClass("lens");
          $("#WOS").addClass("lens_grey");
          //greyout non-compatible endcaps
          $(".endcap").addClass("endcap_grey");
          $(".endcap").removeClass("endcap");
          $("#0075").removeClass("endcap_grey");
          $("#0075").addClass("endcap");
          //greyout non-compatible brackets
          $("#2175").addClass("bracket_grey");
          $("#2175").removeClass("bracket");
          break;
        case "2020":
          //greyout non-compatible lens
          $("#WO").removeClass("lens");
          $("#WO").addClass("lens_grey");
          $("#TR").removeClass("lens");
          $("#TR").addClass("lens_grey");
          $("#WF").removeClass("lens");
          $("#WF").addClass("lens_grey");
          $("#FO").removeClass("lens");
          $("#FO").addClass("lens_grey");
          $("#CL").removeClass("lens");
          $("#CL").addClass("lens_grey");
          //greyout non-compatible endcaps
          $(".endcap").addClass("endcap_grey");
          $(".endcap").removeClass("endcap");
          $("#0175").removeClass("endcap_grey");
          $("#0175").addClass("endcap");
          $("#0150").removeClass("endcap_grey");
          $("#0150").addClass("endcap");
          //greyout non-compatible brackets
          $(".bracket").addClass("bracket_grey");
          $(".bracket").removeClass("bracket");
          $("#2175").removeClass("bracket_grey");
          $("#2175").addClass("bracket");
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
    //check that a profile was selected first and that this isn't the already selected lens
    if( $(".profile").hasClass("selected") && !$("#"+lens_id).hasClass("selected") ){
      //call selection procedure
      select(lens_id);
      //if no lens option is selected
      if(lens_id === "NOL") {
        $("#NOE").addClass("selected");
      }
      else {
        //building complete product code
        $(".lens-code").append(lens_id+'-');
      }



      var old_lens_id = $(".lens.selected")[0].id;

      //get selected profile id
      var profile_id = $(".profile.selected")[0].id;
      //greyout incompatible endcap 0050 for profile 1012 when not selecting focus lens.
      if (profile_id === "1012") {
        if (!(lens_id === "FO")) {
          $("#0050").removeClass("endcap");
          $("#0050").addClass("endcap_grey");
          if( $("#0050").hasClass("selected") ){
            //remove other endcap selection
            $("#0050").removeClass("selected");
            //remove from sidebar
            $("li.endcap").remove();
            //clear endcap part of the complete code
            $(".endcap-code").empty();
          }
        }

      }
      //greyout incompatible endcap 0150 for profile 2020 when not selecting round lens
      if (profile_id === "2020" && ( lens_id === "WFS" || lens_id === "WOS" ) ) {
        $("#0150").removeClass("endcap");
        $("#0150").addClass("endcap_grey");
        if( $("#0150").hasClass("selected") ){
          //remove other endcap selection
          $("#0150").removeClass("selected");
          //remove from sidebar
          $("li.endcap").remove();
          //clear endcap part of the complete code
          $(".endcap-code").empty();
        }
      }
      //greyout incompatible endcap 0175 for profile 2020 when not selecting square lens
      if (profile_id === "2020" && ( lens_id === "WFR" || lens_id === "WOR" ) ) {
        $("#0175").removeClass("endcap");
        $("#0175").addClass("endcap_grey");
        if( $("#0175").hasClass("selected") ){
          //remove other endcap selection
          $("#0175").removeClass("selected");
          //remove from sidebar
          $("li.endcap").remove();
          //clear endcap part of the complete code
          $(".endcap-code").empty();
        }
      }
    }
  },
  //when we click on an endcap
  'click .endcap' (event) {
    //get the id of current click target
    var endcap_id = event.currentTarget.id;
    //check that a profile was selected first and that this isn't the already selected endcap
    if( $(".profile").hasClass("selected") && !$("#"+endcap_id).hasClass("selected") ){
      //call selection procedure
      select(endcap_id);
      //building complete product code
      $(".endcap-code").append(endcap_id+'-');
    }
  },
  //when we click on a bracket
  'click .bracket' (event) {
    //get the id of current click target
    var bracket_id = event.currentTarget.id;
    //check that a profile was selected first and that this isn't the already selected bracket
    if( $(".profile").hasClass("selected") && !$("#"+bracket_id).hasClass("selected") ){
      //call selection procedure
      select(bracket_id);
      //building complete product code
      $(".bracket-code").append(bracket_id+'-');
    }
  },
  //when we click on a strip
  'click .strip' (event) {
    //get the id of current click target
    var strip_id = event.currentTarget.id;
    if( !$("#"+strip_id).hasClass("selected") ) {
      //remove other strip selection
      $(".strip").removeClass("selected");
      //remove greyout from other strips
      $(".strip").removeClass("greyout_s");
      //remove from sidebar
      $("li.strip").remove();
      //clear strip part of the complete code
      $(".strip-code").empty();
      //select the clicked strip and greyout others
      $(".strip").addClass("greyout_s");
      $("#"+strip_id).removeClass("greyout_s");
      $("#"+strip_id).addClass("selected");
      //add selected to sidebar
      let strip = Products.find({ pn: strip_id }).fetch();
      $(".item-list").append('<li class="strip">'+strip[0].desc+'</li>');
      //building complete product code
      $(".strip-code").append(strip_id+'-');
    }
  },
  //when a radio change is triggered
  'change input[type=radio]' (event) {
    //get the strip id
    let strip_id = $(event.target).attr('class');
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
