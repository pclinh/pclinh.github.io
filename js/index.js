$.getScript("./js/fbsdk.js");
console.log("getted1")

function show_post(id){
  $(".selected_post").removeClass("selected_post")
        $("#"id).addClass("selected_post");
         $("#postdtail").replaceWith("<div id='postdtail'></div>");
             FB.api(
                 '/oembed_post',
                   'GET',
                  {"url":value.permalink_url,"maxwidth":"600","useiframe":"true"},
              function(response){
                  $("#postdtail").append(response.html);
               }
            );
  $("iframe").css("background-color","whitesmoke");
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
function insight(){
FB.api(
    '/102135788849157/insights/page_fans',
    'GET',
    {"date_preset":"today",
     "access_token":access_token 
    },
    function(response) {
      console.log(response)
        const fol = response.data[0].values[0].value
        $("#fol_count").text("Tổng số người thích trang:           "+fol);
    }
);
   
 FB.api(
  '/102135788849157/insights/page_post_engagements/days_28',
  'GET',
  {"date_preset":"yesterday",
  "access_token":access_token},
  function(response) {
      const enga = response.data[0].values[0].value
        $("#month_like_count").text("Lượt tương tác bài viết trong một tháng vừa qua:           "+enga);
  }
);
FB.api(
  '/102135788849157/insights/page_impressions_unique/days_28',
  'GET',
  {"date_preset":"yesterday",
  "access_token":access_token},
  function(response) {
      const impres = response.data[0].values[0].value
        $("#month_impres_count").text("Số người tiếp cận được trong một tháng vừa qua:           "+impres);
  }
);
}
