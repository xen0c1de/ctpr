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
  },
  //clicking the continue button takes you to the next step
  'click .continue' (event) {
    //check that all items have been selected
    if ( $(".profile").hasClass("selected") &&
          $(".lens").hasClass("selected") &&
          $(".endcap").hasClass("selected") &&
          $(".bracket").hasClass("selected") &&
          $(".strip").hasClass("selected") ) {
      //grab all items from cart and copy them to modal window cart
      $( ".item-list li" ).each( function(){
        var item = $(this).text();
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
      //reset ui by removing all greyout items
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
      //select clicked one and greyout the rest
      $("#"+profile_id).addClass("selected");
      $(".profile").addClass("greyout_p");
      $("#"+profile_id).removeClass("greyout_p");
      //add selected to sidebar
      var profile = Products.find({ pn: profile_id }).fetch();
      $(".item-list").append('<li class="profile">'+profile[0].desc+'</li>');
      switch (profile_id) {
        case "1011":
          //greyout non-compatible lens
          $("#wfr").removeClass("lens");
          $("#wfr").addClass("lens_grey");
          $("#wor").removeClass("lens");
          $("#wor").addClass("lens_grey");
          $("#wfs").removeClass("lens");
          $("#wfs").addClass("lens_grey");
          $("#wos").removeClass("lens");
          $("#wos").addClass("lens_grey");
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
          $("#wfr").removeClass("lens");
          $("#wfr").addClass("lens_grey");
          $("#wor").removeClass("lens");
          $("#wor").addClass("lens_grey");
          $("#wfs").removeClass("lens");
          $("#wfs").addClass("lens_grey");
          $("#wos").removeClass("lens");
          $("#wos").addClass("lens_grey");
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
          $("#wfr").removeClass("lens");
          $("#wfr").addClass("lens_grey");
          $("#wor").removeClass("lens");
          $("#wor").addClass("lens_grey");
          $("#wfs").removeClass("lens");
          $("#wfs").addClass("lens_grey");
          $("#wos").removeClass("lens");
          $("#wos").addClass("lens_grey");
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
          $("#wo").removeClass("lens");
          $("#wo").addClass("lens_grey");
          $("#tr").removeClass("lens");
          $("#tr").addClass("lens_grey");
          $("#wf").removeClass("lens");
          $("#wf").addClass("lens_grey");
          $("#fo").removeClass("lens");
          $("#fo").addClass("lens_grey");
          $("#cl").removeClass("lens");
          $("#cl").addClass("lens_grey");
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
      //if a lens was already selected
      if( $(".lens").hasClass("selected") ) {
        //remove other lens selection
        $(".lens").removeClass("selected");
        //remove from sidebar
        $("li.lens").remove();
      }
      //select the clicked lens
      $("#"+lens_id).addClass("selected");
      //add selected to sidebar
      var lens = Products.find({ pn: lens_id }).fetch();
      $(".item-list").append('<li class="lens">'+lens[0].desc+'</li>');
    }
  },
  //when we click on an endcap
  'click .endcap' (event) {
    //get the id of current click target
    var endcap_id = event.currentTarget.id;
    //check that a profile was selected first and that this isn't the already selected endcap
    if( $(".profile").hasClass("selected") && !$("#"+endcap_id).hasClass("selected") ){
      //if a endcap was already selected
      if( $(".endcap").hasClass("selected") ) {
        //remove other endcap selection
        $(".endcap").removeClass("selected");
        //remove from sidebar
        $("li.endcap").remove();
      }
      //select the clicked endcap
      $("#"+endcap_id).addClass("selected");
      //add selected to sidebar
      var endcap = Products.find({ pn: endcap_id }).fetch();
      $(".item-list").append('<li class="endcap">'+endcap[0].desc+'</li>');
    }
  },
  //when we click on a bracket
  'click .bracket' (event) {
    //get the id of current click target
    var bracket_id = event.currentTarget.id;
    //check that a profile was selected first and that this isn't the already selected bracket
    if( $(".profile").hasClass("selected") && !$("#"+bracket_id).hasClass("selected") ){
      //if a bracket was already selected
      if( $(".bracket").hasClass("selected") ) {
        //remove other bracket selection
        $(".bracket").removeClass("selected");
        //remove from sidebar
        $("li.bracket").remove();
      }
      //select the clicked bracket
      $("#"+bracket_id).addClass("selected");
      //add selected to sidebar
      var bracket = Products.find({ pn: bracket_id }).fetch();
      $(".item-list").append('<li class="bracket">'+bracket[0].desc+'</li>');
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
      //select the clicked strip and greyout others
      $(".strip").addClass("greyout_s");
      $("#"+strip_id).removeClass("greyout_s");
      $("#"+strip_id).addClass("selected");
      //add selected to sidebar
      var strip = Products.find({ pn: strip_id }).fetch();
      $(".item-list").append('<li class="strip '+strip_id+'">'+strip[0].desc+'</li>');
    }
  },
  //when a radio change is triggered
  'change input[type=radio]' (event) {
    //get the strip id
    var strip_id = $(event.target).attr('class');
    //remove from sidebar
    $("li.strip").remove();
    //TODO:insert new strip line with updated info from radio change.
    //TODO:get currently selected radio for selected strip to build code
  }
});
