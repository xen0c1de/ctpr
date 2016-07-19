Template.ctprCompleteModal.events({
  'submit form' ( event, template ) {
    event.preventDefault();

    //define email variables
    var email = template.find( "[name='emailAddress']" ).value,
        name  = template.find( "[name='name']" ).value,
        phone = template.find( "[name='phone']" ).value,
        ctpr,
        qty_len,
        //count the number of row in the current table
        tableRowIds = $(".prfl-len tr").length;

    //grab each ctpr composite into an array
    $( "#item-list li" ).each( function(){
      var item = $(this).text();
      ctpr.push( item );
    });

    //grab each define qty and length defined by user into array
    for ( let j = 0; j < tableRowIds; j++ ) {
      //check that this row was not deleted first
      if( !(template.find( "[name='qty"+j+"']" ) === null) ){
        qty_len.push( { qty:template.find( "[name='qty"+j+"']" ).value, len:template.find( "[name='long"+j+"']" ).value } );
      }
    }

    //prepare to send email and return errors if any occor to report to user
    if ( email && name && phone !== "" ) {
      Meteor.call( "sendRequest", {
        email: email,
        name: name,
        phone: phone,
        ctpr: ctpr,
        qty_len: qty_len
      }, ( error, response ) => {
        if ( error ) {
          Bert.alert({
            message: error.reason,
            type: 'warning',
            style: 'growl-top-right'
          });
        } else {
          //hide modal
          $( "#send-invitation-modal" ).modal( 'hide' );
          //empty componants on modal list
          $( "#item-list" ).empty();
          //reset qty len counter
          tableRowIds=1;
          Bert.alert({
            message: "Demande envoyé!",
            type: 'success',
            style: 'growl-top-right'
          });
        }
      });
    } else {
      Bert.alert({
        hideDelay: 4000,
        message: "S'il vous plaît saisir un courriel, nom et # de téléphone.",
        type: 'warning',
        style: 'growl-top-right'
      });
    }
  },
  'click .calculate' (event) {
    //preset the drivers and qty array for output
    var drivers = [
      {driver:"30W", qty:0},
      {driver:"60W", qty:0},
      {driver:"100W", qty:0},
      {driver:"200W", qty:0},
      {driver:"30W dim", qty:0},
      {driver:"45W dim", qty:0},
      {driver:"60W dim", qty:0},
      {driver:"80W dim", qty:0},
      {driver:"100W dim", qty:0},
      {driver:"200W dim", qty:0}
      ],
      //count the number of row in the current table
      tableRowIds = $(".prfl-len tr").length;

    //loop through rows
    for( let i=0;i<tableRowIds;i++ ) {
      var len = $("#long"+i).val(),
          qty = $("#qty"+i).val(),
          pn = $("#stripId").text(),
          dimmable = $("#dim"+i).prop("checked"),
          indLenWattArray;

      //check len and qty are numbers
      if( $.isNumeric(len) && $.isNumeric(qty) ){
        //if it's the individual groups
        if( $("#group"+i+" option:selected").val() == "ind" ){
          //call method to calculate power consumption of lenghts entered
          Meteor.call( "CalculatePowerConsumption", { len: len, qty: qty, pn: pn }, ( error, response ) => {
            if ( error ) {
              Bert.alert({ message: error.reason, type: 'danger', style: 'growl-top-right' });
            } else {
              //grab the returned information
              indLenWattArray = response;
            }
          });
          //call method to calculate the drivers needed
          Meteor.call( "CalculateDrivers", { powerArray: indLenWattArray, dimmable: dimmable, drivers: drivers }, ( error, response ) => {
            if ( error ) {
              Bert.alert({ message: error.reason, type: 'danger', style: 'growl-top-right' });
            } else {
              //grab the returned information
              drivers = response;
            }
          });
        }
        //this means it's a grouped item
        else {

        }
      }
      else {
        Bert.alert({
          hideDelay: 4000,
          message: "Longueur et Quantité doivent être numérique",
          type: 'warning',
          style: 'growl-top-right'
        });
      }
    }
    //empty placeholder for drivers
    $(".drivers-count").empty();
    $(".drivers-list").empty();
    var counter = 0;
    //loop over drivers to list them if their qty is greater than 0
    $.each(drivers, function() {
      if( $(this).qty != 0 ){
        $(".drivers-list").append('<li>driver : '+$(this).driver+' qté : '+$(this).qty+'</li>');
        counter += $(this).qty;
      }
    });
    $(".drivers-count").append(counter);
  },
  'change select[name=group]' (event) {
        //find which row we're working on
    var rowId = $(event.currentTarget).closest('tr').prop("id"),
        //get the group selected for that row
        group = $("#group"+rowId+" option:selected").val(),
        //count the number of row in the current table
        tableRowIds = $(".prfl-len tr").length;

    //exclude individual group
    if( !(group === "ind") ){
      //loop through rows
      for( let i=0;i<tableRowIds;i++ ) {
        //find the first row with same group
        if( $("#group"+i+" option:selected").val() == group ){
          //check that status of the dim checkbox
          let checkedStatus = $("#dim"+i).prop("checked");
          //if the box is checked
          if( checkedStatus ) {
            //then our new item in this group should also be checked
            $("#dim"+rowId).prop("checked", true);
          }
          else {
            //if not then our new item should not be checked
            $("#dim"+rowId).prop("checked", false);
          }
        }
      }
    }
  },
  'change input[type=checkbox][name=dim]' (event) {
        //find which row we're working on
    var rowId = $(event.currentTarget).closest('tr').prop("id"),
        //get the group selected for that row
        group = $("#group"+rowId+" option:selected").val(),
        //get the status of the checkbox
        checkedStatus = $(event.currentTarget).prop("checked"),
        //count the number of row in the current table
        tableRowIds = $(".prfl-len tr").length;

    if( !(group === "ind") ){
      //loop through rows
      for( let i=0;i<tableRowIds;i++ ) {
        //if row has the same group
        if( $("#group"+i+" option:selected").val() == group ){
          //check it or uncheck it depending on status of currentTarget
          if( checkedStatus ) {
            $("#dim"+i).prop("checked", true);
          }
          else {
            $("#dim"+i).prop("checked", false);
          }
        }
      }
    }
  },
  'click .plus-sign' (event) {
    //count the number of row in the current table
    let tableRowIds = $(".prfl-len tr").length,
        //new html to add when we click the plus sign
        newRowContent = '<tr id="'+tableRowIds+'"><td><select id="group'+tableRowIds+'" name="group"><option value="ind" selected="selected">Individuel</option><option value="a">A</option><option value="b">B</option><option value="c">C</option><option value="d">D</option><option value="e">E</option><option value="f">F</option><option value="g">G</option><option value="h">H</option><option value="i">I</option><option value="j">J</option><option value="k">K</option><option value="l">L</option><option value="m">M</option><option value="n">N</option><option value="o">O</option></select></td><td><input id="qty'+tableRowIds+'" type="text" class="form-control" name="qty"></td><td><input id="long'+tableRowIds+'" type="text" class="form-control" name="long"></td><td><input id="dim'+tableRowIds+'" type="checkbox" class="form-control" name="dim" value="dim"></td></td><td><button type="button" class="btn minus-sign"><span class="glyphicon glyphicon-minus-sign logo-small-red" aria-hidden="true"></span></button></td></tr>';
    //append the new table row to the tbody
    $(".prfl-len tbody").append( newRowContent );
  },
  'click .minus-sign' (event) {
    $(event.currentTarget).closest('tr').remove();
  },
  'click #close' (event) {
    //empty the list containing the products
    $( "#item-list" ).empty();
    //just create the first row to remplace the current table with
    let newRowContent = '<tr id="0"><td><select id="group0" name="group"><option value="ind" selected="selected">Individuel</option><option value="a">A</option><option value="b">B</option><option value="c">C</option><option value="d">D</option><option value="e">E</option><option value="f">F</option><option value="g">G</option><option value="h">H</option><option value="i">I</option><option value="j">J</option><option value="k">K</option><option value="l">L</option><option value="m">M</option><option value="n">N</option><option value="o">O</option></select></td><td><input id="qty0" type="text" class="form-control" name="qty"></td><td><input id="long0" type="text" class="form-control" name="long"></td><td><input id="dim0" type="checkbox" class="form-control" name="dim" value="dim"></td><td><button type="button" class="btn minus-sign"><span class="glyphicon glyphicon-minus-sign logo-small-red" aria-hidden="true"></span></button></td></tr>';
    //empty the current table
    $( ".prfl-len tbody" ).empty();
    //append the new line to it
    $( ".prfl-len tbody" ).append( newRowContent );
  }
});
