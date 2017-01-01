rjQuery('#datetimepicker').datetimepicker( {
  timepicker:false,
  format:'m/d/Y'
});

$(document).ready(function() {
  const $body             = $('body');
  const $climbs           = $('<climbs>');
  const $results          = $('.results');

  $climbs.addClass('climbs')


$('#search').click(function(){
  $results.empty();
  // console.log($("#datetimepicker").data("xdsoft_datetimepicker").getValue())
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
      console.log("data ", data)
      let $div = $('<div class="climbs>')
      let $ul = $('<ul>')
      let $p = $('<p>')
      let $img = $('<img src="">')




      for (var i = 0; i < data.length; i++) {
        let $diver = $('<div class="climb">')
        let $p1 = $('<p>').text(data[i].fname +" " + data[i].lname);
        let $p2 = $('<p>').text(data[i].climblocation);
        let $connect = $('<button>').text('Connect');


        $diver.append($p1);
        $diver.append($p2);
        $diver.append($connect)
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
      const saveClimbObj ={};
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
      console.log(er)
    },
    complete: function(com){
      console.log(com);
      if (com.responseText === "[]" ) {
          let $peep = $('<h1>').text('Looks like no one is climbing this day.');
          let $peepTwo = $('<p>').text('Either try searching for a different day or register a day that you want to climb.')
          let $reg = $('<li>')
          let $regForm = $('<form action=/user/register></form>')
          let $inputs = $("<input class='login' type='submit' value='Register'>")
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





