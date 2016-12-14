jQuery('#datetimepicker').datetimepicker( {
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
  if (document.getElementById("location").options[document.getElementById("location").selectedIndex].value !== '') queryObject.climblocation = document.getElementById("location").options[document.getElementById("location").selectedIndex].value;

  console.log("Query time", queryObject.time.toJSON(), " location ", queryObject.climblocation);

  $.ajax({
    url: '/climbs/',
    type: 'GET',
    dataType: 'json',
    data:queryObject,
    success: function(data) {
      console.log("data ", data)
      let $div = $('<div class="climbs>')
      let $ul = $('<ul>')
      let $img = $('<img src="">')



      for (var i = 0; i < data.length; i++) {
        let $diver = $('<div class="climb">')
        let $p1 = $('<p>').text(data[i].fname);
        let $p2 = $('<p>').text(data[i].climblocation);

        $diver.append($p1);
        $diver.append($p2);
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
      $('.favorite').click(function(event) {
        console.log(this);
        console.log($(this).parent().data('climbid'));
        saveClimbObj.id = $(this).parent().data('climbid');
        console.log(saveClimbObj)

        $.ajax({
          url: '/climbs/favorites',
          type: 'POST',
          dataType: 'json',
          data: saveClimbObj,
        })
        .done(function() {
          console.log("successfully saved");
        })
        .fail(function() {
          console.log("error");
        })
        .always(function() {
          console.log("completed save");
        });
      })
    }
  })
})



  console.log("I'm awake!")
});





