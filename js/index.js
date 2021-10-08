$.getScript("./js/fbsdk.js");
console.log("getted1")
var formData;
var type;
async function show(messagetxt){
  var showtxt = await messagetxt;
  var limitW = 3;
  var txtStart = showtxt.slice(0, limitW);
  console.log(messagetxt.lenght)
  if (messagetxt.lenght > limitW){

      showtxt = await txtStart+ "...";
     }
  return showtxt;
}
$("#photo_upload").change(function(){
formData = new FormData();
  if($("#photo_upload").prop("files").length > 1){
        multi=true;
  }else{
        multi=false
  }
for (let i = 0; i < $("#photo_upload").prop("files").length; i++){
    const fileReader = new FileReader();
    const file = document.getElementById("photo_upload").files[i];
    fileReader.onload = () =>{
       type= file.type;
       const data = new Blob([fileReader.result],{name:".mp4",},{type: type,});
        var fileOfBlob = new File([data], '.mp4')
        formData.append("source"+i, fileOfBlob);
          for (var value of formData.values()) {
               console.log(value);
            }
        };
        fileReader.readAsArrayBuffer(file);
        }
})
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
