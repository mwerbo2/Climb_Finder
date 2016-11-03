jQuery('#datetimepicker').datetimepicker();

$(document).ready(function() {



const $body             = $('body');
const $climbs           = $('<climbs>');
const $results          = $('.results');

$climbs.addClass('climbs')


$('#search').click(function(){
  const $type = $('.type').val()
  $results.empty()
  const queryObject = {}
  if (queryObject.time = $("#datetimepicker").data("xdsoft_datetimepicker").getValue())
  queryObject.time = $("#datetimepicker").data("xdsoft_datetimepicker").getValue()
  if (document.getElementById("location").options[document.getElementById("location").selectedIndex].value !== '') queryObject.climblocation = document.getElementById("location").options[document.getElementById("location").selectedIndex].value;

  if ($('.location').val() !== '') queryObject.location = $('.location').val();
  if ($('.rating').val() !== '') queryObject.rating = $('.rating').val();
  if ($('.type').val() !== '') queryObject.type = $('.type').val();
  if ($('.gym').val() !== '') queryObject.gym = $('.gym').val();

  $.ajax({
    url: '/climbs/',
    type: 'GET',
    dataType: 'json',
    data:queryObject,
    success: function(data) {
      let $div = $('<div class="climbs>')
      let $ul = $('<ul>')
      let $img = $('<img src="">')


      for (var i = 0; i < data.length; i++) {
        let $li = $('<li>')
        $li.attr('data-climbId', data[i].id);
        let $save = $('<button class="favorite">').text("Save Climb");
        $li.append("<img src="+data[i].imgSmall+">").append('<br />')
        $li.append("Name: " + data[i].name + " ").append('<br />')
        $li.append("Type: " + data[i].type).append('<br />')
        $li.append("Location: " + data[i].location[0]).append('<br />').append($save).append('<br />').append('<br />')
        $ul.append($li)
      }

      //This feature should only be allowed for users who have logged in, but for demo purposes it's open
      const saveClimbObj ={};
      $results.append($ul)
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





