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
  'click .glyphicon-menu-down' (event) {
    $("span:hidden").show();
    $(".glyphicon-menu-down").hide();
    $(".resume").fadeOut(300);
    $(".cart").animate({'width':'100px','height':'100px'}, 300);
  },
  //shows the cart again
  'click .glyphicon-menu-left' (event) {
    $(".glyphicon-menu-down").show();
    $(".glyphicon-menu-left").hide();
    $(".cart").animate({'width':'25%','height':'40%'}, 300);
    $(".resume").fadeIn(300);
  },
  //when we select the 1011 profilé
  'click #1011' (event) {
    if ($("#1011").hasClass("selected")){
      return;
    }
    else {
      //reset ui by removing all greyout items and clearing cart
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
      $("#1011").addClass("selected");
      $("#1012").addClass("greyout_p");
      $("#1013").addClass("greyout_p");
      $("#2020").addClass("greyout_p");
      //add selected to sidebar
      $(".item-list").append('<li>test</li>');
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
      //select clicked one and greyout the rest
      $("#1012").addClass("selected");
      $("#1011").addClass("greyout_p");
      $("#1013").addClass("greyout_p");
      $("#2020").addClass("greyout_p");
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
      //select clicked one and greyout the rest
      $("#1013").addClass("selected");
      $("#1011").addClass("greyout_p");
      $("#1012").addClass("greyout_p");
      $("#2020").addClass("greyout_p");
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
      //select clicked one and greyout the rest
      $("#2020").addClass("selected");
      $("#1011").addClass("greyout_p");
      $("#1012").addClass("greyout_p");
      $("#1013").addClass("greyout_p");
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
    //check that a profile was selected first
    if( $(".profile").hasClass("selected") ){
      //remove other lens selection first (if any)
      $(".lens").removeClass("selected");
      //select the clicked lens
      $("#"+lens_id).addClass("selected");
    }
  },
  'click .endcap' (event) {
    //get the id of current click target
    var endcap_id = event.currentTarget.id;
    //check that a profile was selected first
    if( $(".profile").hasClass("selected") ){
      //remove other endcap selection first (if any)
      $(".endcap").removeClass("selected");
      //select the clicked endcap
      $("#"+endcap_id).addClass("selected");
    }
  },
  'click .bracket' (event) {
    //get the id of current click target
    var bracket_id = event.currentTarget.id;
    //check that a profile was selected first
    if( $(".profile").hasClass("selected") ){
      //remove other bracket selection first (if any)
      $(".bracket").removeClass("selected");
      //select the clicked bracket
      $("#"+bracket_id).addClass("selected");
    }
  },
  'click .strip' (event) {
    //get the id of current click target
    var strip_id = event.currentTarget.id;
    //remove other strip selection first (if any) and greyout
    $(".strip").removeClass("selected");
    $(".strip").removeClass("greyout_s");
    //select the clicked strip and greyout others
    $(".strip").addClass("greyout_s");
    $("#"+strip_id).removeClass("greyout_s");
    $("#"+strip_id).addClass("selected");
  }
});
