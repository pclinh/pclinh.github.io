$.getScript("./js/fbsdk.js");
console.log("getted1")


async function show(messagetxt){
  console.log(messagetxt)
  var showtxt = await messagetxt;
  var limitW = 3;
  var txtStart = showtxt.slice(0, limitW);
  if (messagetxt.lenght() > limitW){
      showtxt = await txtStart+ "...";
     }
  return showtxt;
}

function create_time(date){
var d = new Date(date)
dt = d.toLocaleDateString('en-GB');
time = d.toLocaleTimeString('en-GB');
showtime = dt+"&emsp;&emsp;"+time; 
return showtime;
}
function change_time(time){
    console.log(time)
    const d = new Date(time)
    return d.toISOString();
}
