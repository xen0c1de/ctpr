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
  }
});

Template.home.events({
  //hides the "cart" to better see page
  'click .cart-hide' (event) {
    $("button:hidden").show();
    $(".cart-hide").hide();
    $(".resume").fadeOut(300);
    $(".footer").fadeOut(300);
    $(".cart").animate({'width':'130px','height':'120px'}, 300);
  },
  //shows the cart again
  'click .cart-show' (event) {
    $(".cart-hide").show();
    $(".cart-show").hide();
    $(".cart").animate({'width':'25%','height':'40%'}, 300);
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
  'click .continue' () {
    //check that all items have been selected
    if ( $(".profile").hasClass("selected") &&
          $(".lens").hasClass("selected") &&
          $(".endcap").hasClass("selected") &&
          $(".bracket").hasClass("selected") &&
          $(".strip").hasClass("selected") ) {
      //open finishing touches modal window
      Bert.alert( "bravo", 'success' );
    }
    else {
      Bert.alert({
        hideDelay: 4000,
        message: 'Vous devez faire un choix dans chaque catégorie avant de continuer.',
        type: 'info',
        style: 'growl-top-right'
      });
    }
  },
  //when we select the 1011 profilé
  'click #1011' (event) {
    if ( $("#1011").hasClass("selected") ){
      return;
    }
    else {
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

      //select clicked one and greyout the rest
      $("#1011").addClass("selected");
      $("#1012").addClass("greyout_p");
      $("#1013").addClass("greyout_p");
      $("#2020").addClass("greyout_p");
      //add selected to sidebar
      var profile = Products.find({ pn: "1011" }).fetch();
      $(".item-list").append('<li>'+profile[0].desc+'</li>');
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
    }
  },
  //when we select the 1012 profilé
  'click #1012' () {
    if ($("#1012").hasClass("selected")){
      return;
    }
    else {
      //reset ui by removing all greyout items
      $(".selected").removeClass("selected");
      $(".greyout_p").removeClass("greyout_p");
      $(".lens_grey").addClass("lens");
      $(".lens_grey").removeClass("lens_grey");
      $(".endcap_grey").addClass("endcap");
      $(".endcap_grey").removeClass("endcap_grey");
      $(".bracket_grey").addClass("bracket");
      $(".bracket_grey").removeClass("bracket_grey");
      $(".item-list").empty();
      //select clicked one and greyout the rest
      $("#1012").addClass("selected");
      $("#1011").addClass("greyout_p");
      $("#1013").addClass("greyout_p");
      $("#2020").addClass("greyout_p");
      //add selected to sidebar
      var profile = Products.find({ pn: "1012" }).fetch();
      $(".item-list").append('<li>'+profile[0].desc+'</li>');
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
    }
  },
  //when we select the 1012 profilé
  'click #1013' () {
    if ($("#1013").hasClass("selected")){
      return;
    }
    else {
      //reset ui by removing all greyout items
      $(".selected").removeClass("selected");
      $(".greyout_p").removeClass("greyout_p");
      $(".lens_grey").addClass("lens");
      $(".lens_grey").removeClass("lens_grey");
      $(".endcap_grey").addClass("endcap");
      $(".endcap_grey").removeClass("endcap_grey");
      $(".bracket_grey").addClass("bracket");
      $(".bracket_grey").removeClass("bracket_grey");
      $(".item-list").empty();
      //select clicked one and greyout the rest
      $("#1013").addClass("selected");
      $("#1011").addClass("greyout_p");
      $("#1012").addClass("greyout_p");
      $("#2020").addClass("greyout_p");
      //add selected to sidebar
      var profile = Products.find({ pn: "1013" }).fetch();
      $(".item-list").append('<li>'+profile[0].desc+'</li>');
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
    }
  },
  //when we select the 2020 profilé
  'click #2020' () {
    if ($("#2020").hasClass("selected")){
      return;
    }
    else {
      //reset ui by removing all greyout items
      $(".selected").removeClass("selected");
      $(".greyout_p").removeClass("greyout_p");
      $(".lens_grey").addClass("lens");
      $(".lens_grey").removeClass("lens_grey");
      $(".endcap_grey").addClass("endcap");
      $(".endcap_grey").removeClass("endcap_grey");
      $(".bracket_grey").addClass("bracket");
      $(".bracket_grey").removeClass("bracket_grey");
      $(".item-list").empty();
      //select clicked one and greyout the rest
      $("#2020").addClass("selected");
      $("#1011").addClass("greyout_p");
      $("#1012").addClass("greyout_p");
      $("#1013").addClass("greyout_p");
      //add selected to sidebar
      var profile = Products.find({ pn: "2020" }).fetch();
      $(".item-list").append('<li>'+profile[0].desc+'</li>');
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
    }
  },
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
      $(".item-list").append('<li class="strip">'+strip[0].desc+'</li>');
    }
  }
});
