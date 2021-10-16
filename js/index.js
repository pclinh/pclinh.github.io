$.getScript("./js/fbsdk.js");
console.log("3");
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
   id+"/",
  'GET',
   {"fields":"comments",
    "access_token":access_token},
  async function(response){
    if (response && !response.error){
   await $.each(response.comments.data,async function (index, value){
      
    var cmt_detail="<div class='cmt_link' id="+value.id+">"+value.from.name +": " + value.message+"</div>";
    console.log(cmt_detail)
     await $("#comment_detail").append(cmt_detail);
      document.getElementById(value.id).addEventListener('click',async () =>{
           const cmt_id= value.id.slice(value.id.search("_")+1,value.id.length)
           console.log(cmt_id)
           const cmt_url= permalink_url+"&comment_id="+cmt_id;
                   window.open(cmt_url);
      });
        }
      );
    }}
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
