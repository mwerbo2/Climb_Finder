jQuery('#datetimepicker').datetimepicker( {
  timepicker:false,
  format:'m/d/Y'
});

function isEmpty(obj) {
          for (var key in obj) {
            if(obj.hasOwnProperty(key))
            return "has values";
          }
    return "is empty";
  };


$(document).ready(function() {
  const $body             = $('body');
  const $climbs           = $('<climbs>');
  const $results          = $('.results');

  $climbs.addClass('climbs')




  let who;
  var ajaxCallTwo = function() {
    $.ajax({
      url: '/user/who',
      type: 'GET',
      success: function(data){
        who = data;
        console.log("who front", who)
      }
    })
    .done
    .fail(function() {
      console.log("error");
    })
  };

  var ajaxCallThree = $.ajax({
      url: '/user/who',
      type: 'GET'
    });





$('#search').click(function(){

  $results.empty();
  const queryObject = {};
  if (queryObject.time = $("#datetimepicker").data("xdsoft_datetimepicker").getValue() !== '')
  queryObject.time = $("#datetimepicker").data("xdsoft_datetimepicker").getValue();
  queryObject.unixTime = queryObject.time.getTime();
  if (document.getElementById("location").options[document.getElementById("location").selectedIndex].value !== '') queryObject.climblocation = document.getElementById("location").options[document.getElementById("location").selectedIndex].value;

  console.log(queryObject)
  // console.log("Query time", queryObject.time.getTime(), " location ", queryObject.climblocation);

  $.ajax({
    url: '/climbs/',
    type: 'GET',
    dataType: 'json',
    data:queryObject,
    success: function(data) {
      // ajaxCallTwo();
      let $div = $('<div class="climbs>')
      let $ul = $('<ul>')
      let $p = $('<p>')
      let $img = $('<img src="">')


      $results.css('border', '');
      for (var i = 0; i < data.length; i++) {
        let $diver = $('<div class="climb">')
        let $p1 = $('<p>').text(data[i].fname +" " + data[i].lname).css({
          'font-size': '25px',
          'margin': '5px 0 0 10px'
        });;
        let $p2 = $('<p>').text(data[i].climblocation);
        let $connect = $('<button>').text('Connect');


        $diver.append($p1);
        $diver.append($p2);
        // $diver.append($connect)
        // let $li = $('<li class="gobble">');
        // // $li.attr('data-climbId', data[i].fname);
        // let $save = $("<a href='/user/register'></a>").text("Belay with Me");
        // $li.append("Name: " + data[i].fname + " " + data[i].lname + " ");
        // $li.append("When: " + data[i].climbdate + " ");
        // $li.append("Where: " + data[i].climblocation).append($save).append("<br>").css('border', 'solid');
        // $ul.append($li)
        $results.append($diver);
      }





      //This feature should only be allowed for users who have logged in, but for demo purposes it's open
      // const saveClimbObj ={};
      // $results.append($ul)
      // $('.favorite').click(function(event) {
      //   console.log(this);
      //   console.log($(this).parent().data('climbid'));
      //   saveClimbObj.id = $(this).parent().data('climbid');
      //   console.log(saveClimbObj)

      //   $.ajax({
      //     url: '/climbs/favorites',
      //     type: 'POST',
      //     dataType: 'json',
      //     data: saveClimbObj,
      //   })
      //   .done(function() {
      //     console.log("successfully saved");
      //   })
      //   .fail(function() {
      //     console.log("error");
      //   })
      //   .always(function() {
      //     console.log("completed save");
      //   });
      // })
    },
    error: function(er) {
      // console.log(er)
    },
    complete: function(com){
      console.log(com);
      if (com.responseText === "[]" ) {
        $results.css('border', 'solid');
          let $peep = $('<h1>').text('Looks like no one is climbing this day.');
          let $peepTwo = $('<p style="text-align:center;">').text('Either try searching for a different day or register to post a day that you want to climb.')
          let $reg = $('<li>')
          let $regForm = $('<form action=/user/profile></form>').css('margin-left', '350px');
          let $inputs = $("<input class='login' type='submit' value='Register'>")
          let $nameForm = $('<form action=/user/register></form>')
          $results.append($peep)
          $results.append($peepTwo)
          $regForm.append($inputs)
          $results.append($regForm)
      }

    }
  })
})



  console.log("I'm awake!")
});





