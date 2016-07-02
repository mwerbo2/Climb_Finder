$(document).ready(function() {


const $body = $('body')
const $climbs =  $('<climbs>')
const $results = $('.results')

$climbs.addClass('climbs')

$('button').click(function(){
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
    let $li = $('<li>')
    let $img = $('<img src="">')

    for (var i = 0; i < data.length; i++) {
      $li.append("<img src="+data[i].imgSmall+">").append('<br />')
      $li.append("Name: " + data[i].name + " ").append('<br />')
      $li.append("Type: " + data[i].type).append('<br />')
      $li.append("Location: " + data[i].location[0]).append('<br />').append('<br />').append('<br />')

      $ul.append($li)
    }
    $results.append($ul)
  }
})
})
  console.log("I'm awake")
});




