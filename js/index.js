async function show(messagetxt){
  var showtxt = await messagetxt;
  var limitW = 3;
  var txtStart = showtxt.slice(0, limitW);
  if (showtxt > limitW){
      showtxt = await txtStart+ "...";
     }
  return showtxt;
}
$("#photo_upload").change(function(){
formData = new FormData();
formData.append("access_token", access_token);
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
time = d.getTime();
if (dt < 10) {
dt = '0' + dt;
}
if (month < 10) {
month = '0' + month;
}
showtime = dt+"&emsp;&emsp;"+time; 
return showtime;
}
