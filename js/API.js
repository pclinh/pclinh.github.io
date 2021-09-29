console.log("13")
var message;
var formData;
var type;
//$.getScript("./js/fbsdk.js");
function show(data){
  var limitW = 3;
      var showtxt= data.message;
      var char = 4;
      var txtStart = showtxt.slice(0, limitW);
      var txtEnd = showtxt.slice(txtStart.length);
      if (showtxt < limitW){
          showtxt = txtStart + "...";
      }
      var row = $("<tr><td>&emsp;&emsp;ID:&emsp;"+"&emsp;"+ data.id + "</td><td>&emsp;&emsp;Created time:&emsp; " + data.created_time + "</td><td class='show_content'id='Show_" + data.id + "'>&emsp;&emsp;Content:&emsp;" + showtxt + "</td><td><button class=\"detail_btn\" id=\'detail_" + data.id + "\'>detail</button><td><button class=\"delete_btn\" id=\'delete_" + data.id + "\'>delete</button></td><td><button class=\"update_btn\" id=\'update_" + data.id + "\'>update</button></td></tr>");
      //idshow = "'#Show_" + value.id + "'";
      //console.log(idshow);
      //var content = " <div class='fb-post' data-href='" + value.permalink_url + "' data-width='500'>12</div>";
    $("#show").append(row)
}
$("#get_btn").click(function get_clicked(){
  $("#show").replaceWith('<p id="show"></p>');
  FB.api(
    "/102135788849157/feed",
    "GET",
    {access_token: access_token,
     fields:"id,permalink_url,message,created_time",  
    },
   async function (response){
      if (response && !response.error){
      await $.each(response.data,async function (index, value){
        await show(value)
      document.getElementById("update_" + value.id).addEventListener('click', () =>{
  
      }); 
     await document.getElementById("delete_" + value.id).addEventListener('click', () =>{
        var url ="https://graph.facebook.com/v11.0/"+value.id+"?access_token=" + access_token;
       $.ajax({
          url:url,
          method: 'DELETE',
          success: function (result) {
            alert("Delete succeed");
            get_clicked();
          }
        });
      })
    });
  }}
  )})
$("#photo_upload").change(function(){
  formData = new FormData();
  formData.append("access_token", access_token);
  for (let i = 0; i < $("#photo_upload").prop("files").length; i++){
        const fileReader = new FileReader();
        const file = document.getElementById("photo_upload").files[i];
        fileReader.onload = () =>{
           type= file.type;
           const data = new Blob([fileReader.result],{name:".mp4",},{type: type,});
            var fileOfBlob = new File([data], '.mp4')
            formData.append("source", fileOfBlob);
              for (var value of formData.values()) {
                   console.log(value);
                }
            };
            fileReader.readAsArrayBuffer(file);
            }
})

$("#post_btn").click(async function() {
  message = document.getElementById("post_content").value;
  formData.append("message", message);
  if (message == "") {
    alert("Vui lòng nhập nội dung");
  } else if ($("#photo_upload").prop("files").length == 0) {
    message = document.getElementById("post_content").value;
    FB.api(
      "102135788849157/feed",
      "POST",
      {
        message: message,
        access_token: access_token,
      },
      function(response) {
        console.log(response);
      }
    );
  } else {
      if(type.search("image")>=0){
            await fetch("https://graph.facebook.com/102135788849157/photos",{
            body: formData,
            method: "post",
          })
        .then(response => response.json())
        .then(data => alert(data))
      }
      else if(type.search("video")>=0){
            await fetch("https://graph.facebook.com/102135788849157/videos",{
            body: formData,
            method: "post",
          })
        .then(response => response.json())
        .then(data => console.log(data))
        }
    }
});
