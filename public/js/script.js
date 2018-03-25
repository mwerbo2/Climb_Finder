$(document).ready(function() {

$('#datetimepickers').datetimepicker({
  timepicker:false,
  format:'m/d/Y'
});


// jQuery('#datetimepicker2').datetimepicker({
//   datepicker: false,
//   formatTime:'h:i A',
//   format: 'h:i A'
// })



  const $body             = $('body');
  const $climbs           = $('<climbs>');
  const $results          = $('.results');

  $climbs.addClass('climbs')

//Event handler for searching for climbers
$('#search').click(function(){
  $results.empty();
  let queryObject = {};
  let climbd = $("#datetimepickers").datetimepicker('getValue');
  console.log(climbd.getTime());
  let loc = document.getElementById("location").options[document.getElementById("location").selectedIndex].value

  if (queryObject.time !== '' & queryObject.climbLocation !== '') {
    queryObject.time = climbd;
    queryObject.climbLocation = loc;
  }

  $.ajax({
    url: '/climbs/',
    type: 'GET',
    dataType: 'json',
    data:queryObject,
    success: function(data) {
      console.log(data)
      let $div = $('<div class="climbs>')
      let $ul = $('<ul>')
      let $p = $('<p>')
      let $img = $('<img src="">')
      let $moreButton = $('<form action="user/profile">')
      let $input = $('<input type="submit" value="Post a Climb">')
      let $moreText = $('<p>').text("Still can't find the right climbing partner? \n Post a climb yourself.");
      $results.css('border', '');

      for (let i = 0; i < data.length; i++) {
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

//Event handler for submitting climb post from profile
$('#createclimb').click(function(){
  const climbPost = {};
  var locat       = document.getElementById("location").options[document.getElementById("location").selectedIndex].value;
  let climbDate   = $("#datetimepickers").datetimepicker('getValue');
  var time        = document.getElementById("time").options[document.getElementById("time").selectedIndex].value;
  var type        = document.getElementById("type").options[document.getElementById("type").selectedIndex].value;
  var rate        = document.getElementById("rate").options[document.getElementById("rate").selectedIndex].value;
  var aboutText   = document.getElementById("aboutme").value;
  
  
  
  if (locat !== '')
    {climbPost.climblocation = locat};
  if (climbDate !== '')
    {climbPost.climbdate = climbDate};
  if (time !== '')
    {climbPost.climbtime = time};
  if (type !== '')
    {climbPost.climbtype = type};
  if (rate !== '')
    {climbPost.climbrate = rate};
  if (aboutText !== "")
    {climbPost.climbAbout = aboutText} 

  $.ajax({
    url: '/user/postClimb',
    type: 'POST',
    dataType: 'json',
    data: climbPost,
  })
  .done(function() {
    console.log("success");
    alert("posted")
  })

})






  console.log("I'm awake!")
});





