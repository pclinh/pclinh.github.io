$.getScript("./js/fbsdk.js");

function show_post(id, permalink){
  $(".selected_post").removeClass("selected_post")
        $("#"+id).addClass("selected_post");
         $("#postdtail").replaceWith("<div id='postdtail'></div>");
             FB.api(
                 '/oembed_post',
                   'GET',
                  {"url":permalink,"maxwidth":"600","useiframe":"true"},
              function(response){
                  $("#postdtail").append(response.html);
               }
            );
  $("iframe").css("background-color","whitesmoke");
}
function cmt(id){
  FB.api(
   id+'/comments',
  'GET',
  {access_token: access_token},
  function(response) {
    console.log(response)
    var cmt_detail= response.data[0].from.name +": " + response.data[0].message
      $("#comment_detail").append(cmt_detail)
  }
);
}
function show(messagetxt){
  var showtxt = messagetxt;
  var limitW = 20;
  var txtStart = showtxt.slice(0, limitW);
  if (messagetxt.length > limitW){
      showtxt = txtStart+ "...";
     }
  return showtxt;
}

function create_time(date){
var d = new Date(date)
dt = d.toLocaleDateString('en-GB');
time = d.toLocaleTimeString('en-GB');
showtime = dt+" "+time; 
return showtime;
}
function change_time(time){
    console.log(time)
    const d = new Date(time)
    return d.toISOString();
}

