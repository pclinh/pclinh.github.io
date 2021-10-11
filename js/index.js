$.getScript("./js/fbsdk.js");
console.log("getted1")


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
