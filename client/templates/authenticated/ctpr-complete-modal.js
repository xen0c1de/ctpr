_ = lodash;
const feetToMeter =  3.28084;

Template.ctprCompleteModal.onCreated( function() {
  Template.instance().subscribe( 'products' );
  Template.instance().subscribe( 'users' );
  //init a ReactiveDict to store data calculated but waiting for submission
  this.state = new ReactiveDict();
});

Template.ctprCompleteModal.onRendered( function() {
  $( "#ctpr-complete-form" ).validate({
    rules: {
      emailAddress: {
        required: true,
        email: true
      },
      emailDist: {
        required: true,
        email: true
      }
    },
    messages: {
      emailAddress: {
        required: "Le courriel client est requis!",
        email: "L'adresse courriel du client n'est pas bien formée"
      },
      emailDist: {
        required: "Votre courriel est requis!",
        email: "Votre adresse courriel n'est pas bien formée"
      }
    },
    errorPlacement: function(error, element) {
      error.appendTo( $(".error-messages") );
    }
  });
});

Template.ctprCompleteModal.helpers({
  loggedUserName: function() {
    var user = Meteor.user();

    if ( user ) {
      return user.profile.name.first + " " + user.profile.name.last;
    }
  },
  loggedUserEmail: function() {
    var user = Meteor.user();

    if ( user ) {
      return user.emails[0].address;
    }
  }
});

Template.ctprCompleteModal.events({
  /*
  Submit the form to send request
  this will grab all the saved information from the ReactiveDict
  and submit it to the server to send 3 mails.
  one to oled, one to the logged user, one to the email in the submit field
  */
  'submit form' ( event, template ) {
    event.preventDefault();

    //define email variables
    var email = template.find( "[name='emailAddress']" ).value,
        name  = template.find( "[name='name']" ).value,
        phone = template.find( "[name='phone']" ).value,
        emailDist = template.find( "[name='emailDist']" ).value,
        phoneDist = template.find( "[name='phoneDist']" ).value,
        nameDist = template.find( "[name='nameDist']" ).value,
        company = template.find( "[name='company']" ).value,
        project = template.find( "[name='project']" ).value,
        ctpr = [],
        drivers = template.state.get('drivers'),
        groups = template.state.get('groups'),
        individuals = template.state.get('individuals'),
        rowArray = template.state.get('rowArray'),
        total = template.state.get('total');

    //grab each ctpr composite into an array
    $( "#item-list li" ).each( function(){
      var item = $(this).text();
      ctpr.push( item );
    });

    //prepare to send email and return errors if any occor to report to user
    if ( email && name && phone !== "" ) {
      Meteor.call( "sendRequest", {
        email: email,
        name: name,
        phone: phone,
        company: company,
        project: project,
        emailDist: emailDist,
        phoneDist: phoneDist,
        nameDist: nameDist,
        ctpr: ctpr,
        code: $("#codeId").text(),
        drivers: drivers,
        groups: groups,
        individuals: individuals,
        rowArray: rowArray,
        total: total,
        userId: Meteor.userId()
      }, ( error, response ) => {
        if ( error ) {
          Bert.alert({
            message: error.reason,
            type: 'warning',
            style: 'growl-top-right'
          });
        } else {
          //hide modal
          $( "#ctpr-complete-modal" ).modal( 'hide' );
          //empty componants on modal list
          $( "#item-list" ).empty();
          //clean strip selected
          $("#stripId").empty();
          //clean code emplacement
          $("#codeId").empty();
          //just create the first row to remplace the current table with
          let newRowContent = '<tr id="0"><td><select id="group0" name="group"><option value="ind" selected="selected">Individuel</option><option value="a">A</option><option value="b">B</option><option value="c">C</option><option value="d">D</option><option value="e">E</option><option value="f">F</option><option value="g">G</option><option value="h">H</option><option value="i">I</option><option value="j">J</option><option value="k">K</option><option value="l">L</option><option value="m">M</option><option value="n">N</option><option value="o">O</option></select></td><td><input id="qty0" type="text" class="form-control" name="qty"></td><td><input id="long0" type="text" class="form-control" name="long"></td><td><input id="dim0" type="checkbox" class="form-control" name="dim" value="dim"></td><td><button type="button" class="btn minus-sign"><span class="glyphicon glyphicon-minus-sign logo-small-red" aria-hidden="true"></span></button></td></tr>';
          //empty the current table
          $( ".prfl-len tbody" ).empty();
          //append the new line to it
          $( ".prfl-len tbody" ).append( newRowContent );
          //empty placeholder for drivers
          $(".drivers-list").empty();
          $(".drivers-count").empty().append("0");
          $(".price-value").empty().append("0$");
          //send out message
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
        message: "S'il vous plaît saisir un courriel, nom et # de téléphone pour vous et le client.",
        type: 'warning',
        style: 'growl-top-right'
      });
    }
  },
  /*
  this event calculates the drivers needed and prices.
  It grabs all the needed information and sends it to the server.
  */
  'click .calculate' (event, template) {
    //preset the drivers and qty array for output
    var drivers = [],
        counter = 0,
        rowArray = [],
        groups = [],
        individuals = [],
        breakvalue = false,
        groupLenTotal = [],
        //get the list of drivers from the database
        drivers_list = Products.find({ category: "drivers" }).fetch(),
        //get the power consumption for the strip from the database.
        wattMeter = Number(Products.findOne({pn:Session.get("strip_id")}).attributes[2].replace(/\D+$/g, ""));

    //grab each driver in database and set up array
    $.each( drivers_list, function(){
      drivers.push( {driver:$(this)[0].pn, qty:0} );
    });

    //loop over each table row to exctract information
    $.each( $(".prfl-len tr"), function() {
      //get all properties from table
      var rowId = $(this)[0].id,
          len = $("#long"+rowId).val(),
          qty = $("#qty"+rowId).val(),
          dimmable = $("#dim"+rowId).prop("checked"),
          group = $("#group"+rowId+" option:selected").val();

      //check that we have numbers or else exit loop
      if( $.isNumeric(len) && $.isNumeric(qty) ){
        //if we have numerics, cast them to numbers for math purposes
        len = Number(len);
        qty = Number(qty);
        //check we have a length of at least a foot
        if( len >= 12 ){
          //check if dimmable
          if( dimmable ){
            //check if individual
            if( group === "ind" ){
              //calculate if length is enough for 60% load on 20W driver for dimming
              if( (len/12/feetToMeter*wattMeter).toFixed(2) < 12 ){
                //if the load is too small, we can't dim properly so we need to
                //tell the user to have longer fixtures or a stronger strip.
                Bert.alert({
                  hideDelay: 6000,
                  message: "Gradation impossible avec ce ruban pour les longueurs individuelles. Essayez un ruban plus fort.",
                  type: 'danger',
                  style: 'growl-top-right'
                });
                breakvalue = true;
                return false;
              }
            } else {
              //in case of groups we need to add them together to check if the
              //total will have enough load.
              let groupObject = _.find(groupLenTotal, ['group',group]);
              //if we already have this group in the array
              if( groupObject != undefined ){
                //add to the length
                groupObject.len += len;
              } else {
                //else we create the entry for this group
                groupLenTotal.push( { group: group, len: len } );
              }
            }
          }
          //add new entry in array with table values
          rowArray.push({
            len:len,
            qty:qty,
            dimmable:dimmable,
            group:group
          });
        }
        else {
          Bert.alert({
            hideDelay: 4000,
            message: "Longueur doit être supérieur à 12 pouces.",
            type: 'warning',
            style: 'growl-top-right'
          });
          breakvalue = true;
          return false;
        }
      }
      else {
        Bert.alert({
          hideDelay: 4000,
          message: "Longueur et Quantité doivent être numérique.",
          type: 'warning',
          style: 'growl-top-right'
        });
        breakvalue = true;
        return false;
      }
    });

    //time to check if groupLenTotal contains lengths that are too small
    //to be dimmable and in that case to break from code.
    $.each( groupLenTotal, function(){
      let groupLen = $(this)[0];
      //calculate if length is enough for 60% load on 20W driver for dimming
      if( (groupLen.len/12/feetToMeter*wattMeter).toFixed(2) < 12 ){
        //if the load is too small, we can't dim properly so we need to
        //tell the user to have longer fixtures or a stronger strip.
        Bert.alert({
          hideDelay: 6000,
          message: "Gradation impossible avec ce ruban pour les longueurs du group "+ groupLen.group +". Essayez un ruban plus fort.",
          type: 'danger',
          style: 'growl-top-right'
        });
        breakvalue = true;
        return false;
      }
    });

    //we break the call to the server if we're missing some info
    //no point in using resources for a missing form field.
    if(breakvalue){
      return;
    }

    //save the input rows for submission in case user changes them between
    //calculations and submital
    template.state.set('rowArray', rowArray);

    //call method to calculate needed drivers
    Meteor.call( 'calculatePRFL', {
      rowArray:rowArray,
      stripId: Session.get("strip_id"),
      profileId: Session.get("profile_id"),
      lensId: Session.get("lens_id"),
      endcapId: Session.get("endcap_id"),
      bracketId: Session.get("bracket_id"),
      drivers: drivers,
      userId: Meteor.userId()
    }, ( error, response ) => {
      if ( error ) {
        Bert.alert({ message: error.reason, type: 'danger', style: 'growl-top-right' });
      } else {
        //grab the returned information
        drivers = response.drivers;
        groups = response.groups;
        individuals = response.individuals;
        var total = response.total;
        //set our ReactiveDict with the groups, individuals and drivers
        //to store them while we wait for the user to submit
        template.state.set('drivers', drivers);
        template.state.set('groups', groups);
        template.state.set('individuals', individuals);
        template.state.set('total', total);
        //empty placeholder for drivers and total
        $(".drivers-list").empty();
        $(".drivers-count").empty();
        $(".price-value").empty();
        //loop over drivers to list them if their qty is greater than 0
        $.each(drivers, function() {
          let qty = $(this)[0].qty;
          if( qty != 0 && $.isNumeric(qty) ){
            $(".drivers-list").append('<li>'+qty+' x '+$(this)[0].driver+'</li>');
            counter += qty;
          }
        });
        //set the total number of drivers
        $(".drivers-count").append(counter);
        //set total price
        $(".price-value").append(total.client_total+"$");
        //enable send button
        $("#submit").prop('disabled', false);
      }
    });
  },
  /*
  When we change from individuals to groups or vice-versa
  */
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
  /*
  when we set a row to dimmable or not. This affects all in the same groups.
  */
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
    //Check to add unique id to row (check current highest)
    let tableRowIds = $('.prfl-len tr').get().reduce(function(a, b){
      return Math.max(a, b.id)
    }, Number.NEGATIVE_INFINITY);
    //inc the row to get a unique number
    tableRowIds++;
    //new html to add when we click the plus sign
    let newRowContent = '<tr id="'+tableRowIds+'"><td><select id="group'+tableRowIds+'" name="group"><option value="ind" selected="selected">Individuel</option><option value="a">A</option><option value="b">B</option><option value="c">C</option><option value="d">D</option><option value="e">E</option><option value="f">F</option><option value="g">G</option><option value="h">H</option><option value="i">I</option><option value="j">J</option><option value="k">K</option><option value="l">L</option><option value="m">M</option><option value="n">N</option><option value="o">O</option></select></td><td><input id="qty'+tableRowIds+'" type="text" class="form-control" name="qty"></td><td><input id="long'+tableRowIds+'" type="text" class="form-control" name="long"></td><td><input id="dim'+tableRowIds+'" type="checkbox" class="form-control" name="dim" value="dim"></td></td><td><button type="button" class="btn minus-sign"><span class="glyphicon glyphicon-minus-sign logo-small-red" aria-hidden="true"></span></button></td></tr>';
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
    //empty placeholder for drivers
    $(".drivers-list").empty();
    $(".drivers-count").empty().append("0");
    $(".price-value").empty().append("0$");
    //empty strip id placeholder
    $( "#item-list" ).empty();
    //clean code emplacement
    $("#codeId").empty();
    //empty out ReactiveDicts
    template.state.set('drivers', []);
    template.state.set('groups', []);
    template.state.set('individuals', []);
    template.state.set('rowArray', []);
    template.state.set('total', {});
    //clear error message
    $(".error-messages").empty();
  }
});
