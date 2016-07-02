$(document).ready(function() {


const $body = $('body')
const $climbs =  $('<climbs>')
const $results = $('#results')

$climbs.addClass('climbs')

$('button').click(function(){
  console.log('clicked')
  // $results.empty()
  const queryObject = {}
  console.log(queryObject)

  if ($('.location').val() !== '') queryObject.location = $('.location').val();
  console.log(queryObject)
  if ($('.rating').val() !== '') queryObject.rating = $('.rating').val();
  console.log(queryObject)
  if ($('.type').val() !== '') queryObject.type = $('.type').val();
  console.log(queryObject)


$.ajax({
  url: '/climbs',
  type: 'GET',
  dataType: 'json',
  data: queryObject,
  success: function(data) {
    console.log(data)
  }
})







})



  console.log("I'm awake")
});


//grab the search bar value (txt)
//set it to variable



//ajax call to your backend

//on click trigger -get the value the run the ajax

