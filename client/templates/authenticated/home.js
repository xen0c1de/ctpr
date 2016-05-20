Template.home.events({
  'click #1011' (event) {
    if ($("#1011").hasClass("selected")){
      return;
    }
    else {
      //reset ui by removeing all greyout items
      $(".selected").removeClass("selected");
      $(".greyout_p").removeClass("greyout_p");
      $(".lens_grey").addClass("lens");
      $(".lens_grey").removeClass("lens_grey");
      $(".endcap_grey").addClass("endcap");
      $(".endcap_grey").removeClass("endcap_grey");
      $(".bracket_grey").addClass("bracket");
      $(".bracket_grey").removeClass("bracket_grey");
      //select clicked one and greyout the rest
      $("#1011").addClass("selected");
      $("#1012").addClass("greyout_p");
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
      $("#0200").removeClass("endcap_grey");
      $("#0200").addClass("endcap");
      //greyout non-compatible brackets
      $("#2175").addClass("bracket_grey");
      $("#2175").removeClass("bracket");
    }
  },
  'click #1012' () {
    if ($("#1012").hasClass("selected")){
      return;
    }
    else {
      //reset ui by removeing all greyout items
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
  'click #1013' () {
    if ($("#1013").hasClass("selected")){
      return;
    }
    else {
      //reset ui by removeing all greyout items
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
  'click #2020' () {
    if ($("#2020").hasClass("selected")){
      return;
    }
    else {
      //reset ui by removeing all greyout items
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
  }
});
