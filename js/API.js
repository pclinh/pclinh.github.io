console.log("13")
var message;
var formData;
var type;
var multi=false;
var scheduled_time="";
$.getScript("./js/fbsdk.js");
$.getScript("./js/index.js");
$("#get_btn").click(function get_clicked(){
  $("#show").replaceWith('<p id="show"></p>');
  FB.api(
    "/102135788849157/feed",
    "GET",
    {
     access_token: access_token,
     fields:"id,permalink_url,message,created_time",
    },
   async function (response){
      if (response && !response.error){
      await $.each(response.data,async function (index, value){
            if(value.message != null){
                 var showtxt = await show(value.message)
            }else{
                  var showtxt =""
            }
            showtime= await create_time(value.created_time)
        var row = $("<tr><td>&emsp;&emsp;Ngày tạo:&emsp; " + showtime + "</td><td class='show_content'id='Show_" + value.id + "'>&emsp;&emsp;Nội dung:&emsp;" + showtxt + "</td><td><button class=\"detail_btn\" id=\'detail_" + value.id + "\'>Chi tiết</button><td><button class=\"delete_btn\" id=\'delete_" + value.id + "\'>xóa</button></td><td><button class=\"update_btn\" id=\'update_" + value.id + "\'>Cập nhật</button></td></tr>");
   await $("#show").append(row)
      document.getElementById("update_" + value.id).addEventListener('click', () =>{
  
      }); 
     document.getElementById("delete_" + value.id).addEventListener('click', () =>{
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
$("#post_btn").click(async function(){
  if($("#schedule").prop('checked', true)){
    const time = $("#schedule_date").val()+" "+$("#schedule_time").val();
    scheduled_time= await change_time(time);
  }
  $("#show").replaceWith('<p id="show"></p>');
  message = document.getElementById("post_content").value;
  if (message == "") {
    alert("Vui lòng nhập nội dung");
  } else if ($("#photo_upload").prop("files").length == 0) {
    message = document.getElementById("post_content").value;
    console.log(scheduled_time)
    FB.api(
      "102135788849157/feed",
      "POST",
      {
        message: message,
        published:false,
        access_token: access_token,
        scheduled_publish_time:scheduled_time
      },
      function(response) {
        console.log(response);
      }
    );
  } else {
      if(type.search("image")>=0 && multi==false){
        formData.append("message", message);
            await fetch("https://graph.facebook.com/102135788849157/photos",{
            body: {formData,
                   "scheduled_publish_time":scheduled_time
                  },
            method: "post",
          })
        .then(response => response.json())
        .then(data => alert(data))
      }
        else if(type.search("image")>=0 && multi==true){
          formData.append("message", message);
            await fetch("https://graph.facebook.com/102135788849157/photos",{
            body:{formData,
                  "name":"",
                  "scheduled_publish_time":scheduled_time
                  },
            method: "post",
          })
        .then(response => response.json())
        .then(data => alert(data))
        }
      else if(type.search("video")>=0){
        formData.append("message", message);
            await fetch("https://graph.facebook.com/102135788849157/videos",{
            body: {formData,
                   "scheduled_publish_time":scheduled_time
                  },
            method: "post",
          })
        .then(response =>{if(!response.error)alert("Delete succeed")})
        .then(data => console.log(data))
        }
    }
});
