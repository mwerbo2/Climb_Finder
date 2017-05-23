// jQuery('#datetimepicker').datetimepicker( {
//   timepicker:false,
//   format:'m/d/Y'
// });

jQuery('#datetimepicker').datetimepicker();

jQuery('#datetimepicker2').datetimepicker({
  datepicker: false,
  formatTime:'h:i A',
  format: 'h:i A'
})

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

jQuery('#datetimepicker').datetimepicker();



$('#createclimb').click(function(){


  const climbPost = {};
  var locat       = document.getElementById("location").options[document.getElementById("location").selectedIndex].value;
  var climbDate   = $("#datetimepicker").datetimepicker('getValue')
  var uniTime     = date.getTime();
  var time        = document.getElementById("time").options[document.getElementById("time").selectedIndex].value;
  var type        = document.getElementById("type").options[document.getElementById("type").selectedIndex].value;
  var rate        = document.getElementById("rate").options[document.getElementById("rate").selectedIndex].value;
  var aboutTest   = document.getElementById("aboutme").value;
  console.log(aboutTest)
  console.log(date)

  if (locat !== '')
    {climbPost.climblocation = locat;
    climbPost.uniTimes = uniTime};
  if (climbDate !== '')
    {climbPost.climbdate = climbDate};
  if (time !== '')
    {climbPost.climbtime = time};
  if (type !== '')
    {climbPost.climbtype = type};
  if (rate !== '')
    {climbPost.climbrate = rate};



  $.ajax({
    url: '/user/postClimb',
    type: 'POST',
    dataType: 'json',
    data: climbPost,
  })
  .done(function() {
    console.log("success");
  })
  .fail(function(err) {
    console.log("error", err);
  })
  .always(function() {
    console.log("complete");
  });

})

$('.belay').click(function(){
  console.log('hoooooahh')
})


$('#search').click(function(){
  $results.empty();
  const queryObject = {};

  if (queryObject.time = $("#datetimepicker").data("xdsoft_datetimepicker").getValue() !== '')
  queryObject.time = $("#datetimepicker").data("xdsoft_datetimepicker").getValue();
  queryObject.unixTime = queryObject.time.getTime();

  if (document.getElementById("location").options[document.getElementById("location").selectedIndex].value !== '') queryObject.climblocation = document.getElementById("location").options[document.getElementById("location").selectedIndex].value;




  $.ajax({
    url: '/climbs/',
    type: 'GET',
    dataType: 'json',
    data:queryObject,
    success: function(data) {

      let $div = $('<div class="climbs>')
      let $ul = $('<ul>')
      let $p = $('<p>')
      let $img = $('<img src="">')
      let $moreButton = $('<form action="user/profile">')
      let $input = $('<input type="submit" value="Post a Climb">')
      let $moreText = $('<p>').text("Still can't find the right climbing partner? \n Post a climb yourself.");
      $results.css('border', '');

      for (var i = 0; i < data.length; i++) {
        let $diver = $('<div class="climb">').attr('id', data[i].email);
        let $p1 = $('<p>').text(data[i].fname +" " + data[i].lname).css({
          'font-size': '25px',
          'margin': '5px 0 0 10px'
        });;
        // let $belayButton = $('<form method="Post" action="user/belay">')
        // let $belayInput = $('<input class="belay" type="submit" value="Connect">')
        let $bb = $('<button class="belay">').text('Connect');
        let $p2 = $('<p>').text(data[i].level);
        let $p3 = $('<p>').text(data[i].climbtype);
        let $p4 = $('<p>').text(data[i].climbrate);


        // $belayButton.append($belayInput)
        $diver.append($p1);
        $diver.append($p2);
        $diver.append($p3);
        $diver.append($p4);
        $diver.append($bb)
        // let $connect = $('<button>').text('Connect');
        // $diver.append($connect)
        // let $li = $('<li class="gobble">');
        // // $li.attr('data-climbId', data[i].fname);
        // let $save = $("<a href='/user/register'></a>").text("Belay with Me");
        // $li.append("Name: " + data[i].fname + " " + data[i].lname + " ");
        // $li.append("When: " + data[i].climbdate + " ");
        // $li.append("Where: " + data[i].climblocation).append($save).append("<br>").css('border', 'solid');
        // $ul.append($li)
        $results.append($diver);
        $moreButton.append($input)
        $results.append($moreText);
        $results.append($moreButton)

        $('.belay').on('click', function(event) {
          event.preventDefault();
          console.log(event)

        });
    }

    },
    error: function(er) {
      // console.log(er)
    },
    complete: function(com){
      console.log("com", com);
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





