$.getScript("./js/fbsdk.js");
console.log();
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
function cmt(id,permalink_url){
  FB.api(
   id+'/comments',
  'GET',
   {},
  function(response){
    $.each(response.data,async function (index, value){
    var cmt_detail="<p class='cmt_link' id="+value.id+">"+value.from.name +": " + value.message;
    console.log(cmt_detail)
      $("#comment_detail").append(cmt_detail);
        }
      );
  }
);
    $(".cmt_link").click(function(){
      const cmt_url= permalink_url+&"comment_id="+value.id;
      window.open(cmt_url);
    })
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
