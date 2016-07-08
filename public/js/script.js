$(document).ready(function() {


const $body = $('body')
const $climbs =  $('<climbs>')
const $results = $('.results')

$climbs.addClass('climbs')


$('#search').click(function(){
  const $type = $('.type').val()
  $results.empty()
  const queryObject = {}
  if ($('.location').val() !== '') queryObject.location = $('.location').val();
  console.log(queryObject)
  if ($('.rating').val() !== '') queryObject.rating = $('.rating').val();
  if ($('.type').val() !== '') queryObject.type = $('.type').val();


  $.ajax({
    url: '/climbs/',
    type: 'GET',
    dataType: 'json',
    data:queryObject,
    success: function(data) {
      console.log(data[0].name)
      // console.log(data.length)
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
      const saveClimbObj ={};
      $results.append($ul)
      $('.favorite').click(function(event) {
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
          console.log("success");
        })
        .fail(function() {
          console.log("error");
        })
        .always(function() {
          console.log("complete");
        });

      })
    }
  })
})
  console.log("I'm awake")
});





